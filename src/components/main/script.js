import $ from 'jquery';
import io from 'socket.io-client';
import Axios from 'axios';


import AvatarUploader from 'vue-image-crop-upload';

import demo from './demo';
import Profile from './Profile';
import UploadArea from './UploadArea';
import UploadForm from './UploadForm';
import Loading from './Loading'
import CodeEditor from './CodeEditor';
import CodeResult from './CodeResult';
import ChannelForm from './ChannelForm';
import Cover from './Cover';
import InviteForm from './InviteForm'

var socket = io();

export default {
    name: 'main-component',
    components: {
        Profile,
        UploadArea,
        UploadForm,
        Loading,
        CodeEditor,
        CodeResult,
        ChannelForm,
        Cover,
        InviteForm,
        'avatar-uploader': AvatarUploader
    },
    data: () => ({
        vEmbedOptions: {
            plugins: [
                {
                    name: 'url',
                    options: {
                        attributes: { 'target': '_blank' }
                    }
                },
                {
                    name: 'youtube',
                    options: {
                        gAuthKey: 'AIzaSyC8wxFAFPo_utEJx9oSL-OdeLFk5WFHOZI',
                    }
                },
                { name: 'emoji' },
                { name: 'media' },
                { name: 'github' },
                { name: 'facebook' },
                {
                    name: 'map',
                    options: {
                        mode: 'place',
                        gAuthKey: 'AIzaSyC8wxFAFPo_utEJx9oSL-OdeLFk5WFHOZI',
                    }
                },
                {
                    name: 'twitter',
                    options: {
                        hideMedia: false,
                        hideThread: false,
                        lang: 'zh-tw'
                    }
                },
                {
                    name: 'instagram',
                    options: {}
                },
                {
                    name: 'noembed',
                    options: {
                        exclude: ['twitter', 'youtube']
                    }
                }
            ],
        },
        active: {
            loaded: false,
            statusOptions: false,
        },
        status: 'online',
        statusList: [{ id: 'online', text: '線上' }, { id: 'away', text: '離開' }, { id: 'busy', text: '忙碌' }, { id: 'offline', text: '離線' }],
        userId: 'fakeid',
        users: demo.users(),
        channels: demo.channels(),
        currentChannelId: '',
        message: {
            content: '',
            code: {
                language: '',
                content: '',
                input: ''
            },
            files: []
        },
        channel: {
            name: '',
            icon: ''
        },
        rerenderFlag: true,
        channelSearchText: '',
        memberSearchText: '',
        showUploader: false
    }),
    methods: {
        showProfile() {
            this.$modal.show('profile', { user: this.user });
        },
        showUploadArea(e) {
            if (e.dataTransfer.types.some((x) => x === 'Files')) {
                this.$modal.show('upload-area');
            }
        },
        toggleStatusOptions() {
            this.active.statusOptions = !this.active.statusOptions;
        },
        changeStatus(e) {
            this.status = e.target.id || e.target.parentNode.id;
            this.status = this.status.replace('status-', '');
            this.active.statusOptions = false;
            socket.emit('changeStatus', this.status);
        },
        submitMessage(type) {
            switch (type) {
                case 'attachment':
                    if (!this.message.files.length) {
                        return false;
                    }
                    break;

                case 'code':
                    if (!this.message.code.content) {
                        return false;
                    }
                    break;

                default:
                    if (!$.trim(this.message.content)) {
                        return false;
                    }
                    type = 'message';
            }

            socket.emit('message', {
                channel: this.currentChannelId,
                content: this.message.content,
                code: this.message.code,
                files: this.message.files,
                type: type
            });
            this.clearMessage();
        },
        clearMessage() {
            this.message = {
                content: '',
                code: {
                    language: this.message.code.language,
                    content: '',
                    stdin: ''
                },
                files: []
            };
        },
        selectFile() {
            this.$refs.files.click();
        },
        showUploadForm(e) {
            this.$modal.hide('upload-area');

            var files = e.target.files || e.dataTransfer.files;
            for (let file of files) {
                this.message.files.push({
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    data: file
                });
            }
            if (files.length) {
                this.$modal.show('upload-form', { message: this.message });
            }
        },
        selectChannel(channel) {
            if (!this.channels[channel.id].loaded) {
                this.channels[channel.id].loaded = true;
                // Axios.get(`/api/channel/${channel.id}/messages`)
                //     .then((res) => {
                //         const json = res.data;
                //         if (json.success) {
                //             this.channels[channel.id].messages.unshift(...json.data);
                //             this.$forceUpdate();
                //         }
                //     });

                // Axios.get(`/api/channel/${channel.id}/members`)
                //     .then((res) => {
                //         const json = res.data;
                //         if (json.success) {
                //             this.channels[channel.id].members.unshift(...json.data);
                //             this.$forceUpdate();
                //         }
                //     });
            }

            if (this.currentChannelId != channel.id) {
                this.currentChannelId = channel.id;
                this.channel = {
                    name: this.currentChannel.name,
                    icon: this.currentChannel.icon
                }
                this.rerenderFlag = false;
                setTimeout(() => this.rerenderFlag = true, 1);
                setTimeout(() => $('.messages').animate({ scrollTop: $('.messages').get(0).scrollHeight }, 500), 300);
            } else {
                $('.messages').animate({ scrollTop: $('.messages').get(0).scrollHeight }, 500);
            }
        },
        uploadFormOnConfirm() {
            this.$modal.hide('upload-form');
            this.submitMessage('attachment');
        },
        uploadFormOnCancel() {
            this.$modal.hide('upload-form');
            this.clearMessage();
        },
        codeEditorOnConfirm() {
            this.$modal.hide('code-editor');
            this.submitMessage('code');
        },
        codeEditorOnCancel() {
            this.$modal.hide('code-editor');
        },
        showCodeResult(code) {
            this.$modal.show('code-result', { code: code });
        },
        getLastMessage(channel) {
            var i = channel.messages.length - 1;
            var message = channel.messages[i];
            return {
                name: this.users[message.author].name,
                content: message.content || '* 發送了圖片、檔案或程式碼 *'
            };
        },
        channelFormOnConfirm(data) {
            socket.emit('createChannel', data);
        },
        channelFormOnCancel() {
            this.$modal.hide('channel-form');
        },
        upadteProfile(data) {
            Object.assign(this.user, data);
            console.log(data);
            this.$forceUpdate();
        },
        getFileIcon(name) {
            try {
                return require(`@/assets/icon/${name.split('.').pop()}.svg`);
            } catch {
                return require(`@/assets/icon/unknown.svg`);
            }
        },
        inviteFormOnConfirm(data) {
            socket.emit('invite', {
                channel: this.currentChannelId,
                username: data.username
            });
        },
        inviteFormOnCancel() {
            this.$modal.hide('invite-form');
        },
        submitChannelName(e) {
            if (this.channel.name != this.currentChannel.name) {
                Axios.post(`/api/channel/${this.currentChannelId}/edit/name`, {
                    channel: this.currentChannelId,
                    name: this.channel.name
                })
                    .then((res) => {
                        const json = res.data;
                        if (json.success) {
                            Object.assign(this.channels[json.data.id], json.data);
                            this.$forceUpdate();
                        }
                    });
            }
            e.target.blur();
        },
        cropUploadSuccess(json, field) {
            if (json.success) {
                this.channel.icon = json.data.id;
                Axios.post(`/api/channel/${this.currentChannelId}/edit/icon`, {
                    channel: this.currentChannelId,
                    icon: this.channel.icon
                })
                    .then((res) => {
                        const json = res.data;
                        if (json.success) {
                            Object.assign(this.channels[json.data.id], json.data);
                        }
                    });
            }

        }
    },
    computed: {
        filteredChannels() {
            if (this.channelSearchText) {
                var channels = {};
                for (let id in this.channels) {
                    if (this.channels[id].name.toLowerCase().includes(this.channelSearchText.toLowerCase())) {
                        channels[id] = this.channels[id];
                    }
                }
                return channels;
            } else {
                return this.channels;
            }
        },
        currentChannel() {
            return this.channels[this.currentChannelId];
        },
        filteredMembers() {
            if (this.memberSearchText) {
                const members = {};

                for (let id in this.currentChannel.members) {
                    const name = this.users[id].username + (this.users[id].nickname || '');
                    if (name.toLowerCase().includes(this.memberSearchText.toLowerCase())) {
                        members[id] = this.currentChannel.members[id];
                    }
                }
                return members;
            } else {
                return this.currentChannel.members;
            }
        },
        user() {
            return this.users[this.userId];
        }
    },
    mounted() {
        const self = this;

        Axios.all(['/api/user', '/api/channel'].map(x => Axios.get(x)))
            .then(Axios.spread((res1, res2) => {
                const json = [res1.data, res2.data];
                this.userId = json[0].data.id;
                this.user = json[0].data;
                this.channels = {};

                this.users = new Proxy({}, {
                    get(target, name) {
                        if (target[name] === undefined && typeof name === 'string') {
                            Axios.get(`/api/user/${name}`)
                                .then((res) => {
                                    const json = res.data;
                                    if (json.success) {
                                        target[name] = {
                                            get name() {
                                                return this.nickname || this.username;
                                            }
                                        };
                                        Object.assign(target[name], json.data);
                                        self.$forceUpdate();
                                    }
                                });
                            return {};
                        }
                        return target[name];
                    }
                });

                for (let channel of json[1].data) {
                    this.channels[channel.id] = Object.assign({ loaded: false }, channel);

                    this.channels[channel.id].members = {};
                    for (let member of channel.members) {
                        this.channels[channel.id].members[member.id] = member;
                    }
                }
            }))
            .finally(() => {
                this.active.loaded = true;
            });

        socket.on('message', (msg) => {
            this.channels[msg.channel].messages.push(msg);
            this.$forceUpdate();
        });

        socket.on('newChannel', (channel) => {
            this.channels[channel.id] = Object.assign({ loaded: false }, channel);
            this.channels[channel.id].members = {};
            for (let member of channel.members) {
                this.channels[channel.id].members[member.id] = member;
            }
            this.$forceUpdate();
        });

        socket.on('changeStatus', (data) => {
            this.users[data.id].status = data.status;
            this.$forceUpdate();
        });

        socket.on('newMember', (data) => {
            this.channels[data.channel].members[data.member.id] = data.member;
            this.$forceUpdate();
        });

        socket.on('removeMember', (data) => {
            delete this.channels[data.channel].members[data.member.id];
            this.$forceUpdate();
        });
    }
};
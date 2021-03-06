import $ from 'jquery';
import io from 'socket.io-client';
import uuidv4 from 'uuid/v4';
import truncate from 'just-truncate';

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
                {
                    name: 'github',
                    options: {
                        async template(args, options, pluginOptions, { owner, description, html_url, full_name }) {
                            return `
                            <div class="ejs-preview ejs-embed">
                                <div class="ejs-info">
                                    <img src="${owner.avatar_url}" style="width: 80px; height: 80px; margin: 0 10px 0 0; float: left; border-radius: 50%;" />
                                    <h4 class="ejs-title">
                                    <a href="${html_url}">${full_name}</a>
                                    </h4>
                                    <div class="ejs-desc">${truncate(description, 150)}</div>
                                </div>
                            </div>`;
                        }
                    }
                },
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
            const nonce = uuidv4();
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
                type: type,
                nonce: nonce
            });

            this.currentChannel.messages[nonce] = {
                author: this.userId,
                temp: true
            }

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
                // this.axios.get(`/api/channel/${channel.id}/messages`)
                //     .then((res) => {
                //         const json = res.data;
                //         if (json.success) {
                //             this.channels[channel.id].messages.unshift(...json.data);
                //             this.$forceUpdate();
                //         }
                //     });

                // this.axios.get(`/api/channel/${channel.id}/members`)
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
            var ids = Object.keys(channel.messages);
            var i = ids.length - 1;
            var message = channel.messages[ids[i]];

            while (message.temp) {
                message = channel.messages[ids[--i]];
            }

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
                this.axios.post(`/api/channel/${this.currentChannelId}/edit/name`, {
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
                this.channel.icon = json.data.src;
                this.axios.post(`/api/channel/${this.currentChannelId}/edit/icon`, {
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
        },
        logout() {
            this.$fire({
                title: '登出',
                text: '確定要登出嗎',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: '登出',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                if (value) {
                    this.axios.post(`/api/member/logout`)
                        .then((res) => {
                            location.href = '/member';
                        });
                }
            });
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
        this.axios.all(['/api/user', '/api/channel'].map(x => this.axios.get(x)))
            .then(this.axios.spread((res1, res2) => {
                const json = [res1.data, res2.data];
                this.userId = json[0].data.id;
                this.user = json[0].data;
                this.channels = {};

                this.users = new Proxy({}, {
                    get(target, name) {
                        if (target[name] === undefined && typeof name === 'string') {
                            self.axios.get(`/api/user/${name}`)
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
                    channel = Object.assign({ messages: [], members: [] }, channel);

                    const members = {};
                    for (let member of channel.members) {
                        members[member.id] = member;
                    }
                    const messages = {};
                    for (let message of channel.messages) {
                        messages[message.id] = message;
                    }

                    this.channels[channel.id] = Object.assign(channel, { members, messages });
                }
            }))
            .finally(() => {
                var interval = setInterval(() => {
                    if (document.readyState === 'complete') {
                        clearInterval(interval);
                        this.active.loaded = true;
                    }
                }, 100);
            });

        socket.on('message', (msg) => {
            if (msg.nonce) {
                this.channels[msg.channel].messages[msg.nonce] = msg;
                Object.defineProperty(
                    this.channels[msg.channel].messages,
                    msg.id, Object.getOwnPropertyDescriptor(this.channels[msg.channel].messages, msg.nonce)
                );
                delete this.channels[msg.channel].messages[msg.nonce];
            } else {
                this.channels[msg.channel].messages[msg.id] = msg;
            }
            this.$forceUpdate();
        });

        socket.on('newChannel', (channel) => {
            channel = Object.assign({ messages: [], members: [] }, channel);

            const members = {};
            for (let member of channel.members) {
                members[member.id] = member;
            }
            const messages = {};
            for (let message of channel.messages) {
                messages[message.id] = message;
            }

            this.channels[channel.id] = Object.assign(channel, { members, messages });
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
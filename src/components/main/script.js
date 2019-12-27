import $ from 'jquery';
import io from 'socket.io-client';
import Axios from 'axios';

import demo from './demo';
import Profile from './Profile';
import UploadArea from './UploadArea';
import UploadForm from './UploadForm';
import Loading from './Loading.vue'
import CodeEditor from './CodeEditor.vue';
import CodeResult from './CodeResult.vue';

var socket = io();


export default {
    name: 'main-component',
    components: {
        Profile,
        UploadArea,
        UploadForm,
        Loading,
        CodeEditor,
        CodeResult
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
                        exclude: ['twitter', 'youtube', 'twich']
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
        user: {
            id: 'fakeid',
            username: 'Fake User',
            icon: require('@/assets/user.png')
        },
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
        rerenderFlag: true,
        channelSearchText: ''
    }),
    methods: {
        showProfile() {
            this.$modal.show('profile', { user: this.user });
        },
        showUploadArea(e) {
            if (e.dataTransfer.types.some((x) => x === "Files")) {
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
                Axios.get(`/api/channel/${channel.id}/messages`)
                    .then((res) => {
                        const json = res.data;
                        if (json.success) {
                            this.channels[channel.id].messages.unshift(...json.data);
                            this.$forceUpdate();
                        }
                    });
            }

            if (this.currentChannelId != channel.id) {
                this.currentChannelId = channel.id;
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
                name: message.author.name,
                content: message.content || '* 發送了圖片、檔案或程式碼 *'
            };
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
        }
    },
    mounted() {
        Axios.all(['/api/user', '/api/channel'].map(x => Axios.get(x)))
            .then(Axios.spread((res1, res2) => {
                const json = [res1.data, res2.data];
                this.user = json[0].data;
                this.channels = {};

                for (let channel of json[1].data) {
                    this.channels[channel.id] = Object.assign({ messages: [], loaded: false }, channel);
                }
            }))
            .finally(() => {
                this.active.loaded = true;
            });

        socket.on('message', (msg) => {
            this.channels[msg.channel].messages.push(msg);
            this.$forceUpdate();
        });
    }
};
import $ from 'jquery';
import io from 'socket.io-client';

import Profile from './Profile';
import UploadArea from './UploadArea';
import UploadForm from './UploadForm';
import Loading from './Loading.vue'
import Axios from 'axios';

var socket = io();


export default {
    name: 'main-component',
    components: {
        Profile,
        UploadArea,
        UploadForm,
        Loading
    },
    data: () => ({
        active: {
            loaded: false,
            statusOptions: false,
        },
        loaded: false,
        status: 'online',
        user: {
            id: 'fakeid',
            username: 'Fake User',
            icon: require('@/assets/user.png')
        },
        channels: {
            '1': {
                id: '1',
                name: 'Fake Channel1',
                messages: [
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User'
                        },
                        content: 'Fake Channel1 sent'
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',

                        },
                        content: 'Fake Channel1 reply'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User'
                        },
                        content: 'Images sent',
                        attachments: [{ id: '3.jpg', filename: '3.jpg', type: 'image/jpeg' }, { id: '4.jpg', filename: '4.jpg', type: 'image/jpeg' }]
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',
                        },
                        content: 'Images reply',
                        attachments: [{ id: '1.jpg', filename: '1.jpg', type: 'image/jpeg' }, { id: '2.jpg', filename: '2.jpg', type: 'image/jpeg' }]
                    },
                ],
            },
            '2': {
                id: '2',
                name: 'Fake Channel2',
                messages: [
                    {
                        author: {
                            id: '2',
                            name: 'Fake User3'
                        },
                        content: 'Fake Channel2 reply'
                    },
                    {
                        author: {
                            id: 'fakeid',
                            name: 'Fake User',

                        },
                        content: 'Fake Channel2 sent'
                    }
                ]
            },
            '3': {
                id: '3',
                name: 'Fake Channel3',
                messages: []
            }
        },
        currentChannel: '',
        message: {
            content: '',
            files: []
        }
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
            this.status = e.target.dataset.status || e.target.parentNode.dataset.status;
            this.active.statusOptions = false;
        },
        submitMessage() {
            if ($.trim(this.message.content) == '' && !this.message.files.length) {
                return false;
            }
            socket.emit('message', {
                channel: this.currentChannel,
                content: this.message.content,
                files: this.message.files
            });
            this.clearMessage();
        },
        clearMessage() {
            this.message = {
                content: '',
                files: []
            };
        },
        selectFile() {
            this.$refs.files.click();
        },
        upload(e) {
            this.$modal.hide('upload-area');

            var files = e.target.files || e.dataTransfer.files;
            for (let file of files) {
                this.message.files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: file
                });
            }

            this.$modal.show('upload-form', { fileList: files });
        },
        selectChannel(channel) {
            this.currentChannel = channel.id;
        },
        getImages(attachments) {
            attachments = attachments || [];
            return attachments.filter(x => x.type.includes('image'));
        }
    },
    mounted() {
        var urls = ['/api/user', '/api/channel'];
        Axios.all(urls.map(x => Axios.get(x)))
            .then(Axios.spread((res1, res2) => {
                this.loaded = true;
                const json = [res1.data, res2.data];
                this.user = json[0].data;
                this.channels = {};
                for (let channel of json[1].data) {
                    this.channels[channel.id] = Object.assign({ messages: [] }, channel);
                }
            }))
            .catch((err) => {
                console.log(err)
                this.loaded = true;
            });

        socket.on('message', (msg) => {
            this.channels[msg.channel].messages.push(msg);
            this.$forceUpdate();
        });
    }
};
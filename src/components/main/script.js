import $ from 'jquery';
import io from 'socket.io-client';

import Profile from '@/components/profile/index';


var socket = io();


export default {
    name: 'Main',
    components: {
        Profile
    },
    data: () => Object({
        isStatusOptionsActive: false,
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
                        content: 'Fake Channel1 sent',
                        attachments: [{id: '3.jpg', type: 'image/jpeg'}, {id: '4.jpg', type: 'image/jpeg'}]
                    },
                    {
                        author: {
                            id: '1',
                            name: 'Fake User2',

                        },
                        content: 'Fake Channel1 reply',
                        attachments: [{id: '1.jpg', type: 'image/jpeg'}, {id: '2.jpg', type: 'image/jpeg'}]
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
        toggleStatusOptions() {
            this.isStatusOptionsActive = !this.isStatusOptionsActive;
        },
        changeStatus(e) {
            this.status = e.target.dataset.status || e.target.parentNode.dataset.status;
            this.isStatusOptionsActive = false;
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

            this.message = {
                content: '',
                files: []
            };
        },
        selectFile() {
            this.$refs.files.click();
        },
        files(e) {
            for (let file of e.target.files) {
                this.message.files.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    data: file
                });
            }
        },
        selectChannel(channel) {
            this.currentChannel = channel.id;
        },
        getImages(attachments) {
            attachments = attachments || [];
            var images = [];
            for (let file of attachments) {
                if (file.type.includes('image')) {
                    images.push(file.id);
                }
            }
            return images;
        }
    },
    mounted() {
        fetch('/api/user', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    this.user = json.data;
                }

            });

        fetch('/api/channel', {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    this.channels = {};
                    for (let channel of json.data) {
                        this.channels[channel.id] = {
                            id: channel.id,
                            name: channel.name,
                            icon: channel.icon,
                            members: channel.members,
                            messages: channel.messages || [],
                        }
                    }
                }
            });

        socket.on('message', (msg) => {
            this.channels[msg.channel].messages.push(msg);
            this.$forceUpdate();
            $('.messages').animate({ scrollTop: $(document).height() }, 'fast');
        });
    }
};
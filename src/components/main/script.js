import $ from 'jquery';
import io from 'socket.io-client';

import Profile from '@/components/profile/index';


var socket = io();


class Channel {
    constructor(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
        this.messages = [];
    }
}

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
                    }
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
        currentChannel: '1',
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
            if ($.trim(this.message.content) == '') {
                return false;
            }
            // this.channels[this.currentChannel].messages.push({ 
            //     author: Object.assign({}, this.user, {name: this.user.nickname || this.user.username}), 
            //     content: this.message.content 
            // });
            socket.emit('message', {
                channel: this.currentChannel,
                content: this.message.content,
                files: this.message.files
            });

            this.message = {
                content: '',
                files: []
            };

            $('.messages').animate({ scrollTop: $(document).height() }, 'fast');
        },
        keyboard(e) {
            if (e.keyCode === 13) {
                this.submitMessage();
            }
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
        }
    },
    mounted() {
        $('.messages').animate({ scrollTop: $(document).height() }, 'fast');

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
                        this.channels[channel.id] = new Channel(channel);
                    }
                }
            });

        socket.on('message', (msg) => {
            var messages = this.channels[msg.channel].messages;
            this.$set(messages, messages.length, msg);
            this.$forceUpdate();
        });
    }
};
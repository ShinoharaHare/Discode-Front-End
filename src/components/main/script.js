import $ from 'jquery';
import io from 'socket.io-client';

import Profile from '@/components/profile/index';
import Test from '@/components/test';

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
        channels: [
            { id: 1, name: 'Fake Channel1', preview: { name: 'Fake User1', content: 'Fake Preview1' } },
            { id: 2, name: 'Fake Channel2', preview: { name: 'Fake User2', content: 'Fake Preview2' } },
            { id: 3, name: 'Fake Channel3', preview: { name: 'Fake User3', content: 'Fake Preview3' } }
        ],
        channel: {
            name: '',
            id: '',
            messages: [
                {
                    author: {
                        name: 'Hare',
                        id: '5ddaa61bd737fb17b89bf8f4',
                        avatar: '/content/user/5ddaa61bd737fb17b89bf8f4/avatar.png',
                    },
                    content: '你好爛'
                },
                {
                    author: {
                        name: 'test',
                        id: '5ddaa83332be9d24242d1818'
                    },
                    content: '你才爛'
                },
                {
                    author: {
                        name: 'wayne1224',
                        id: '5de7cfc649a8940608a7cc68'
                    },
                    content: '我最爛'
                },
                {
                    author: {
                        name: 'Fake User',
                        id: 'fakeid'
                    },
                    content: '低能何文子'
                }
            ],
        },
        message: {
            author: {},
            content: '',
            reset() {
                this.content = '';
            }
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
            this.channel.messages.push({ author: this.message.author, content: this.message.content });
            this.message.reset();

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
                console.log(file);
            }
        },
        selectChannel(channel) {
            this.channel = channel;

            fetch(`/api/channel/${channel.id}/messages`, {
                method: 'GET'
            })
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        this.channel.messages = json.data;
                    }
                });
        }
    },
    mounted() {
        $('.messages').animate({ scrollTop: $(document).height() }, 'fast');
        this.message.author = this.user;

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
                    this.channels = json.data;
                }
            });
    }
};
import $ from 'jquery';

import Profile from '@/components/profile/index';

export default {
    name: 'Main',
    data: () => Object({
        isStatusOptionsActive: false,
        status: 'online',
        user: {},
        channels: [],
        messages: [
            {
                author: {
                    id: '5ddaa61bd737fb17b89bf8f4',
                    avatar: '/content/user/5ddaa61bd737fb17b89bf8f4/avatar.png',
                },
                content: '你好爛'
            },
            {
                author: {
                    id: '5ddaa83332be9d24242d1818',
                },
                content: '你才爛'
            },
        ],
    }),
    methods: {
        showProfile() {
            this.$modal.show('profile', {});
        },
        toggleStatusOptions() {
            this.isStatusOptionsActive = !this.isStatusOptionsActive;
        },
        changeStatus(e) {
            this.status = e.target.dataset.status || e.target.parentNode.dataset.status;
            this.isStatusOptionsActive = false;
        },
        submitMessage() {
            var message = $('.message-input input').val();
            if ($.trim(message) == '') {
                return false;
            }
            $(`<li class="sent"><img src="${require('@/assets/user.png')}" alt="" /><p>${message}</p></li>`).appendTo($('.messages ul'));
            $('.message-input input').val(null);
            $('.contact.active .preview').html('<span>You: </span>' + message);
            $('.messages').animate({ scrollTop: $(document).height() }, 'fast');
        },
        keyboard(e) {
            if (e.keycode === 13) {
                this.newMessage();
            }
        }
    },
    components: {
        Profile
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
                    this.channels = json.data;
                }
            });


    }
};
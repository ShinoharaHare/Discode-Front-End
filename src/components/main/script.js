import $ from 'jquery';

import Profile from '@/components/profile/index';

export default {
    name: 'Main',
    data: () => Object({
        isStatusOptionsActive: false,
        status: 'online'
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
    }
};
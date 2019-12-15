export default {
    name: 'profile-modal',
    data: () => ({
        user: {}
    }),
    methods: {
        beforeOpen(e) {
            this.user = e.params.user;
        }
    }
}
export default {
    name: 'Profile',
    data: () => ({
        user: {}
    }),
    methods: {
        beforeOpen(e) {
            this.user = e.params.user;
        }
    }
}
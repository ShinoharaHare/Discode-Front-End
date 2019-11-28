import sha256 from 'sha256';

export default {
    name: 'Member',
    data: () => Object({
        isRegisterForm: false,
        username: '',
        password: '',
        repeatPassword: '',
        success: false
    }),
    methods: {
        login() {
            fetch('api/member/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, hash: sha256(this.password) })
            })
            .then((res) => res.json())
            .then((json) => { 
                this.success = json.success;
                setTimeout(() => location.href = '/', 1000);
            });
        },
        register() {
            fetch('api/member/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: this.username, hash: sha256(this.password) })
            })
            .then((res) => res.json())
            .then((json) => { 
                this.success = json.success;
                setTimeout(() => location.href = '/', 1000);
            });
        }
    }
}
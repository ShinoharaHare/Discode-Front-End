import sha256 from 'sha256';

// [A-Za-z0-9_]+
// ^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$


export default {
    name: 'Member',
    data: () => Object({
        isRegisterForm: false,
        username: '',
        password: '',
        confirmPassword: '',
        success: false,
        errorLabels: ['', '', ''],
        errors: [false, false, false],
    }),
    methods: {
        login() {
            if (this.username && this.password) {
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
            } else {

            }
        },
        register() {
            if (!/[A-Za-z0-9_]+/.test(this.username)) {
                
                return;
            }

            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password)) {

                return;
            }
            
            if (this.password !== this.confirmPassword) {

                return;
            }

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
        },
        usernameField() {
            this.errors[0] = /[A-Za-z0-9_]+/.test(this.username);
            console.log(this.username ? !this.validFlags[0] : false)
        },
        passwordField() {
            this.errors[1] = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.password);
        },
        confirmPasswordField() {
            this.errors[2] = this.confirmPassword === this.password;
        }
    }
}
import sha256 from 'sha256';
import error from '@/error'
import Axios from 'axios';

export default {
    name: 'member-component',
    data: () => ({
        form: false,
        success: false,
        username: '',
        password: '',
        confirmPassword: '',
        errorLabels: ['', '', ''],
    }),
    methods: {
        switchForm(bool) {
            this.errorLabels = ['', '', ''];
            this.form = bool;
        },
        login() {
            this.errorLabels = ['', '', ''];
            if (this.username === '') {
                this.errorLabels[0] = '為必填欄位';
            }

            if (this.password === '') {
                this.errorLabels[1] = '為必填欄位';
            }

            if (this.errorLabels.every(x => x === '')) {
                Axios.post('/api/member/login', {
                    username: this.username,
                    hash: sha256(this.password)
                })
                .then((respone) => {
                    const json = respone.data;
                    if (json.success) {
                        this.success = true;
                        setTimeout(() => location.href = '/', 1000);
                    } else {
                        switch (json.error.code) {
                            case error.UserNotFoundError.code:
                                this.$set(this.errorLabels, 0, json.error.msg);
                                break;

                            case error.PasswordIncorrectError.code:
                                this.$set(this.errorLabels, 1, json.error.msg);
                                break;
                        }
                    }
                });
            }
        },
        register() {
            this.errorLabels = ['', '', ''];

            if (this.username === '') {
                this.errorLabels[0] = '為必填欄位';
            } else if (!/[A-Za-z0-9_]+/.test(this.username)) {
                this.errorLabels[0] = '必須是大小寫字母、數字或底線';
            }

            if (this.password === '') {
                this.errorLabels[1] = '為必填欄位';
            } else if (!/[A-Za-z\d]{8,}/.test(this.password)) {
                this.errorLabels[1] = '必須是大小寫字母、數字且至少8個字元';
            } else if (this.password != this.confirmPassword) {
                this.errorLabels[2] = '兩次輸入不一致';
            }
            
            if (this.errorLabels.every(x => x === '')) {
                Axios.post('/api/member/register', {
                    username: this.username,
                    hash: sha256(this.password)
                })
                .then((respone) => {
                    const json = respone.data;
                    if (json.success) {
                        this.success = true;
                        setTimeout(() => location.href = '/', 1000);
                    } else {
                        switch (json.error.code) {
                            case error.UsernameDuplicateError.code:
                                this.$set(this.errorLabels, 0, json.error.msg);
                                break;
                        }
                    }
                });
            }
        },
    }
}
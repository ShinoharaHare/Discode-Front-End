import $ from 'jquery';
import sha256 from 'sha256';


function login(username, password) {
    return fetch(`${location.origin}/api/member?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, hash: sha256(password) })
    });
}

function register(username, password, email) {
    return fetch(`${location.origin}/api/member?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, hash: sha256(password), email: email })
    });
}

export default {
    name: 'Member',
    mounted() {
        $('.info-item .btn').click(() => {
            $('.container').toggleClass('log-in');
        });

        $('.form-item.log-in .btn').click(() => {
            var username = $('.log-in input[name="username"]').val();
            var password = $('.log-in input[name="password"]').val();

            if (true) {
                login(username, password).then((res) => {
                    return res.json();
                }).then((json) => {
                    if (json.code === 0) {
                        $('.container').addClass('active');
                        setTimeout(() => { location.href = '/'; }, 1000);
                    }
                });
            }
        });

        $('.form-item.sign-up .btn').click(() => {
            var username = $('.sign-up input[name="username"]').val();
            var password = $('.sign-up input[name="password"]').val();
            var email = $('.sign-up input[name="email"]').val();

            if (true) {
                register(username, password, email).then((res) => {
                    return res.json();
                }).then((json) => {
                    if (json.code === 0) {
                        $('.container').addClass('active');
                        setTimeout(() => { location.href = '/'; }, 1000);
                    }
                });
            }
        });

    }
}
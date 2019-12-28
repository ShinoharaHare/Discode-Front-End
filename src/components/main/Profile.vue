<template>
    <modal
        name="profile"
        :width="402"
        :height="'auto'"
        @before-open="beforeOpen"
        @opened="opened"
        @closed="closed"
    >
        <avatar-uploader
            v-model="showUploader"
            langType="zh-tw"
            url="/api/upload/avatar"
            @crop-upload-success="cropUploadSuccess"
            :field="'file'"
        ></avatar-uploader>
        <div id="profile-component">
            <div class="title">
                <p>個人資料</p>
            </div>

            <div class="content">
                <div id="head">
                    <div id="pro-pic">
                        <div class="overlay" @click="showUploader=true">
                            <i class="fa fa-pencil"></i>
                        </div>
                        <img
                            class="main"
                            :src="`/content/avatar/${user.avatar}`"
                            @error="$event.target.src=require('@/assets/user.png');"
                        />
                    </div>
                </div>

                <div id="info">
                    <div>
                        <p class="text">使用者名稱:</p>
                        <input type="text" class="input" v-model="user.username" disabled="true" />
                    </div>

                    <div id="nickname">
                        <p class="text">暱稱:</p>
                        <input
                            type="text"
                            class="input"
                            v-model="user.nickname"
                            disabled="true"
                            @keydown.enter="changeNicknameOrNot"
                        />
                        <i class="fa fa-pencil" aria-hidden="true" @click="editNickname"></i>
                    </div>

                    <div id="message">
                        <p class="text">狀態消息:</p>
                        <input
                            type="text"
                            class="input"
                            v-model="user.message"
                            disabled="true"
                            @keydown.enter="changeMessageOrNot"
                        />
                        <i class="fa fa-pencil" aria-hidden="true" @click="editMessage"></i>
                    </div>

                    <div id="password">
                        <p class="text">更改密碼:</p>
                        <input
                            type="password"
                            class="input"
                            v-model="password"
                            disabled="true"
                            @keydown.enter="editPassword"
                        />
                        <i class="fa fa-pencil" aria-hidden="true" @click="editPassword"></i>
                    </div>

                    <div id="current-password">
                        <p class="text">當前密碼:</p>
                        <input
                            type="password"
                            class="input"
                            v-model="currentPassword"
                            disabled="true"
                            @keydown.enter="submitPasswrod"
                        />
                        <i class aria-hidden="true" @click="submitPasswrod"></i>
                    </div>

                    <div>
                        <p class="msg"></p>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';
import sha256 from 'sha256';
import Axios from 'axios';
import AvatarUploader from 'vue-image-crop-upload';

import error from '@/error';

var tmpNickname;
var tmpCurrentPassword;
var tmpMessage;

export default {
    name: 'profile',
    components: {
        'avatar-uploader': AvatarUploader
    },
    data: () => ({
        showUploader: false,
        user: {
            id: '',
            avatar: '',
            username: '',
            nickname: ''
        },
        password: '***************',
        currentPassword: ''
    }),
    methods: {
        opened() {
            $(this.$el)
                .find('.v--modal-box')
                .css('border-radius', '6px');
        },
        beforeOpen(e) {
            this.user = Object.assign({}, e.params.user);
        },
        closed() {
            this.showUploader = false;
            this.password = '***************';
            this.currentPassword = '';
        },
        cropUploadSuccess(json, field) {
            this.user.avatar = json.data.id;
            Axios.post('/api/user/edit/avatar', { avatar: this.user.avatar }).then(res => {
                const json = res.data;
                if (json.success) {
                    this.$emit('upadte-profile', json.data);
                    this.avatar = json.data.avatar;
                }
            });
        },
        editNickname(e) {
            if ($('#nickname i').attr('class') == 'fa fa-pencil') {
                // 第一次按 icon == pencil
                tmpNickname = $('#nickname input').val();

                $('#nickname input')
                    .attr('disabled', false)
                    .focus()
                    .select();

                $('#nickname i').attr('class', 'fa fa-check'); // icon pencil to check
            } else {
                // icon == check  可以submit了
                this.changeNicknameOrNot();
            }
        },
        changeNicknameOrNot() {
            if ($('#nickname input').val() == tmpNickname) {
                $('#nickname input').attr('disabled', true);
                $('#nickname i').attr('class', 'fa fa-pencil');
            } else {
                this.submitNickname();
            }
        },
        editMessage() {
            if ($('#message i').attr('class') == 'fa fa-pencil') {
                // 第一次按 icon == pencil
                tmpMessage = $('#message input').val();

                $('#message input')
                    .attr('disabled', false)
                    .focus()
                    .select();

                $('#message i').attr('class', 'fa fa-check'); // icon pencil to check
            } else {
                this.changeMessageOrNot();
            }
        },
        changeMessageOrNot() {
            if ($('#message input').val() == tmpMessage) {
                $('#message input').attr('disabled', true);
                $('#message i').attr('class', 'fa fa-pencil');
            } else {
                this.submitMessage();
            }
        },
        editPassword(e) {
            if ($('#password i').attr('class') == 'fa fa-pencil') {
                // 第一次按 icon == pencil
                tmpCurrentPassword = $('#password input').val();

                $('#password input')
                    .attr('disabled', false)
                    .focus()
                    .select();

                $('#password i').attr('class', 'fa fa-check'); // icon pencil to check
            } else {
                if ($('#password input').val() == tmpCurrentPassword) {
                    $('#password i').attr('class', 'fa fa-pencil');
                    $('#password input').attr('disabled', true);
                    $('#current-password i').attr('class', '');
                    $('#current-password input').attr('disabled', true);
                } else {
                    $('#password i').attr('class', '');
                    $('#current-password i').attr('class', 'fa fa-check');
                    $('#current-password input')
                        .attr('disabled', false)
                        .focus()
                        .select();
                }
            }
        },
        submitNickname(e) {
            if (this.user.nickname == '') {
                this.user.nickname = this.user.username;
            }
            Axios.post('/api/user/edit/nickname', { nickname: this.user.nickname }).then(res => {
                const json = res.data;

                if (json.success) {
                    this.$emit('upadte-profile', json.data);
                    this.showMessage('更改暱稱成功!!', '#20c920');
                } else {
                    this.showMessage('更改暱稱失敗!!', '#e85a5a');
                }
            });

            $('#nickname i').attr('class', 'fa fa-pencil');
            $('#nickname input').attr('disabled', true);
        },
        submitPasswrod(e) {
            if (!/[A-Za-z\d]{8,}/.test(this.password)) {
                // 格式錯誤
                this.showMessage('密碼格式錯誤!!', '#e85a5a');
                return;
            }

            Axios.post('/api/user/edit/password', {
                hash: sha256(this.password),
                currentHash: sha256(this.currentPassword)
            })
                .then(res => {
                    const json = res.data;
                    if (json.success) {
                        this.showMessage('修改密碼成功!!', '#20c920');
                    } else {
                        switch (json.error.code) {
                            case error.PasswordIncorrectError.code:
                                this.showMessage('密碼錯誤!!', '#e85a5a');
                                break;
                        }
                    }
                })
                .catch(err => {
                    this.showMessage('未知錯誤!!', '#e85a5a');
                });

            $('#password i').attr('class', 'fa fa-pencil');
            $('#password input').attr('disabled', true);
            $('#current-password i').attr('class', '');
            $('#current-password input').attr('disabled', true);
        },
        submitMessage(e) {
            Axios.post('/api/user/edit/message', { message: this.user.message }).then(res => {
                const json = res.data;

                if (json.success) {
                    this.$emit('upadte-profile', json.data);
                    this.showMessage('更改狀態消息成功!!', '#20c920');
                } else {
                    this.showMessage('更改狀態消息失敗!!', '#e85a5a');
                }
            });

            $('#message input').attr('disabled', true);
            $('#message i').attr('class', 'fa fa-pencil');
        },
        showMessage(text, color) {
            $('.msg')
                .show()
                .text(text)
                .css('color', color)
                .delay(2000)
                .fadeOut('slow');
        }
    }
};
</script>

<style lang="scss">
#profile-component {
    position: relative;
    width: 400px;
    height: 630px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    z-index: 100;

    .overlay {
        top: 88px;
        left: 115px;
        position: absolute;
        width: 170px;
        height: 170px;
        border-radius: 50%;
        display: block;
        cursor: pointer;
        background-color: rgb(0, 0, 0, 25%);
        opacity: 0;

        .fa {
            color: white;
            font-size: 50px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            text-align: center;
        }
    }

    :hover.overlay {
        opacity: 1;
    }

    .title p {
        width: auto;
        height: auto;
        font-size: 25px;
        text-align: center;
        margin: 0px;
        padding: 25px 0px 25px 0px;
        color: #f5f5f5;
        background-color: #567696;
    }

    .content {
        width: auto;
        height: 630px;
        border-color: rgb(0, 0, 0);
        border-top: 2px solid;
        background-color: #435d78;
    }

    .content::-webkit-scrollbar {
        width: 8px;
        background: rgba(0, 0, 0, 0);
    }

    .content::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.3);
    }

    #pro-pic {
        height: 190px;
    }

    #pro-pic img {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        display: block;
        margin: auto;
        margin-top: 10px;
        cursor: pointer;
        border: 1px solid gray;
    }

    .main {
        bottom: 180px;
    }

    .text {
        margin-left: 25px;
        border-bottom: 10px;
        font-size: 15px;
        color: #cccccc;
    }

    .msg {
        margin-top: 10px;
        text-align: center;
        font-weight: bold;
        border-bottom: 10px;
        font-size: 20px;
    }

    .input {
        width: 270px;
        margin: 5px 16px 10px 16px;
        font-size: 18px;
        border-radius: 20px;
        border: #435d78;
        padding: 5px 10px;
        text-align: left;
        color: white;
        background-color: #435d78;
    }

    i {
        width: 30px;
        height: 25px;
        position: relative;
        left: 10px;
        background-color: Transparent;
        border: none;
        cursor: pointer;
    }

    .fa {
        color: #ffffffcc;
        font-size: 20px;
    }
}
</style>

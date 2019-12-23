<template>
    <modal
        name="profile"
        :width="modalWidth"
        :height="'auto'"
        @before-open="beforeOpen"
        @opened="hook"
    >
        <avatar-uploader
            v-model="showUploader"
            langType="zh-tw"
            url="/api/user/upload/avatar"
            @crop-upload-success="cropUploadSuccess"
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
                            :src="`/content/user/${user.id}/${user.avatar}`"
                            @error="$event.target.src=require('@/assets/user.png');"
                        />
                    </div>
                </div>

                <div id="info">
                    <div>
                        <p class="text">使用者名稱:</p>
                        <input type="text" class="input" v-model="user.username" disabled="true" />
                    </div>

                    <div>
                        <p class="text">
                            暱稱:
                            <span></span>
                        </p>

                        <input
                            type="text"
                            class="input"
                            v-model="user.nickname"
                            disabled="true"
                            @keydown.enter="submitNickname"
                        />
                        <i class="fa fa-pencil" aria-hidden="true" @click="edit"></i>
                    </div>

                    <div>
                        <p class="text">
                            更改密碼:
                            <span></span>
                        </p>
                        <input
                            type="password"
                            class="input"
                            v-model="password"
                            disabled="true"
                            @keydown.enter="save"
                        />
                        <i class="fa fa-pencil" aria-hidden="true" @click="edit"></i>
                    </div>

                    <div>
                        <p class="text">
                            當前密碼:
                            <span></span>
                        </p>
                        <input type="password" class="input" v-model="currentPassword" />
                        <i class="fa fa-check" aria-hidden="true" @click="submitPasswrod"></i>
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

const MODAL_WIDTH = 400;

export default {
    name: 'profile-component',
    components: {
        'avatar-uploader': AvatarUploader
    },
    data: () => ({
        modalWidth: MODAL_WIDTH,
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
        hook() {
            const modal = $(this.$el).find('.v--modal-box');
            modal.css('border-radius', '6px');
        },
        beforeOpen(e) {
            this.user = Object.assign({}, e.params.user);
        },
        cropUploadSuccess(json, field) {
            this.user.avatar = json.data.avatar;

            Axios.post('/api/user/edit', this.user).then(res => {
                const json = res.data;
                if (json.success) {
                    this.$emit('upadteProfile', json.data);
                    this.avatar = json.data.avatar;
                }
            });
        },
        edit(e) {
            $(e.target)
                .siblings('input')
                .attr('disabled', false)
                .focus()
                .select();
        },
        save(e) {
            $(e.target).attr('disabled', true);
            document.getSelection().removeAllRanges();
        },
        submitNickname(e) {
            Axios.post('/api/user/edit', this.user).then(res => {
                this.save(e);
                const json = res.data;
                if (json.success) {
                    this.$emit('upadteProfile', json.data);
                }
            });
        },
        submitPasswrod(e) {
            if (!/[A-Za-z\d]{8,}/.test(this.password)) {
                return;
            }
            Axios.post('/api/user/edit/password', {
                hash: sha256(this.password),
                currentHash: sha256(this.currentPassword)
            }).then(res => {
                const json = res.data;
                this.save(e);
                if (json.success) {
                } else {
                    switch (json.error.code) {
                        case error.PasswordIncorrectError.code:
                            break;
                    }
                }
            });
        }
    },
    created() {
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
    }
};
</script>

<style lang="scss">
@import url('http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');

#profile-component {
    position: relative;
    width: 400px;
    height: 575px;
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
        height: 510px;
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

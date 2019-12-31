<template>
    <modal
        name="channel-form"
        :width="402"
        :height="452"
        :clickToClose="false"
        @opened="opened"
        @closed="closed"
    >
        <div id="channel-form-component">
            <avatar-uploader
                v-model="showUploader"
                langType="zh-tw"
                url="/api/upload/icon"
                @crop-upload-success="cropUploadSuccess"
                :field="'file'"
            ></avatar-uploader>
            <div class="title">
                <p>創建頻道</p>
            </div>

            <div class="content">
                <div class="pro-pic">
                    <div class="overlay" @click="showUploader=true">
                        <i class="fa fa-pencil"></i>
                    </div>
                    <img
                        :src="icon || require('@/assets/group.png')"
                        @error="$event.target.src=require('@/assets/group.png');"
                    />
                </div>

                <div class="channel-name">
                    <p>頻道名稱:</p>
                    <input type="text" v-model="name" />
                </div>

                <div class="state">
                    <p>公開:</p>
                    <div class="button r button-3">
                        <input type="checkbox" class="checkbox" v-model="public_"/>
                        <div class="knobs"></div>
                        <div class="layer"></div>
                    </div>
                </div>

                <button @click="cancel">
                    <i class="fa fa-close"></i>
                </button>

                <button @click="submit">
                    <i class="fa fa-check"></i>
                </button>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';
import Axios from 'axios';

import AvatarUploader from 'vue-image-crop-upload';

export default {
    name: 'channel-form',
    components: {
        'avatar-uploader': AvatarUploader
    },
    data: () => ({
        showUploader: false,
        icon: '',
        name: '',
        public_: false
    }),
    methods: {
        opened() {
            $(this.$el)
                .find('.v--modal-box')
                .css('border-radius', '6px');
        },
        closed() {
            this.showUploader = false;
            this.icon = '';
            this.name = '';
            this.public_ = false;
        },
        cropUploadSuccess(json, field) {
            this.icon = json.data.src;
        },
        submit() {
            this.$emit('confirm', {
                icon: this.icon || null,
                name: this.name,
                public: this.public_
            });
            this.cancel();
        },
        cancel() {
            this.$emit('cancel');
        }
    }
};
</script>


<style lang="scss">
#channel-form-component {
    position: relative;
    width: 400px;
    height: 450px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background: #435d78;
    overflow: hidden;
    z-index: 100;

    .knobs,
    .layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .button {
        position: relative;
        top: 50%;
        width: 74px;
        height: 36px;
        margin: -20px auto 0 auto;
        overflow: hidden;
    }

    .button.r,
    .button.r .layer {
        border-radius: 100px;
    }

    .button.b2 {
        border-radius: 2px;
    }

    .checkbox {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        cursor: pointer;
        z-index: 3;
    }

    .knobs {
        z-index: 2;
    }

    .layer {
        width: 100%;
        background-color: #ebf7fc;
        transition: 0.3s ease all;
        z-index: 1;
    }

    .button-3 {
        input {
            width: inherit !important;
            height: inherit !important;
        }

        .knobs:before {
            content: '✗';
            position: absolute;
            top: 5px;
            left: 4px;
            width: 20px;
            height: 10px;
            color: #fff;
            font-size: 10px;
            font-weight: bold;
            text-align: center;
            line-height: 1;
            padding: 9px 4px;
            background-color: #dd5454;
            border-radius: 50%;
            transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
        }

        .checkbox:active + .knobs:before {
            width: 46px;
            border-radius: 100px;
        }

        .checkbox:checked:active + .knobs:before {
            margin-left: -26px;
        }

        .checkbox:checked + .knobs:before {
            content: '✓	';
            left: 42px;
            background-color: #50db88;
        }
    }

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
        width: 400px;
        height: 30px;
        font-size: 25px;
        text-align: center;
        margin: 0px;
        padding: 25px 0px 25px 0px;
        color: #f5f5f5;
        background-color: #567696;
    }

    .content {
        width: 400px;
        height: 310px;
        border-color: rgb(0, 0, 0);
        border-top: 2px solid;
        background-color: #435d78;
    }

    .pro-pic {
        width: 170px;
        height: 200px;
        display: block;
        margin: auto;
        padding-top: 5px;
    }

    .pro-pic p {
        margin: 0px 0px 5px 0px;
        color: white;
        text-align: center;
    }

    .pro-pic img {
        width: 170px;
        height: 170px;
        border-radius: 100%;
        border: 1px solid gray;
    }

    .channel-name {
        width: 300px;
        height: 30px;
        margin: auto;
        margin-top: 20px;
    }

    .channel-name p {
        float: left;
        margin: 0px;
        color: #f5f5f5;
    }

    .channel-name input {
        position: relative;
        bottom: 3px;
        float: left;
        width: 200px;
        height: 18px;
        margin-left: 5px;
    }

    .state {
        float: left;
        width: 200px;
        height: 30px;
        margin: 20px 0px 0px 50px;
    }

    .state p {
        position: relative;
        left: 30px;
        top: 5px;
        float: left;
        margin: 0px;
        color: #f5f5f5;
    }

    .state input {
        position: relative;
        bottom: 2px;
        width: 16px;
        height: 16px;
        margin-left: 10px;
    }

    button {
        position: relative;
        left: 35px;
        top: 68px;
        font-size: 20px;
        color: hsla(0, 0%, 100%, 0.8);
        background-color: #435d78;
        border: none;
        cursor: pointer;
    }
    
    button:focus {
        outline: none;
    }
}
</style>
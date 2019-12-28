<template>
    <modal
        name="channel-form"
        :width="400"
        :height="400"
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
                        :src="`/content/icon/${icon}`"
                        @error="$event.target.src=require('@/assets/group.png');"
                    />
                </div>

                <div class="channel-name">
                    <p>頻道名稱:</p>
                    <input type="text" v-model="name" />
                </div>

                <div class="state">
                    <p>公開:</p>
                    <input type="checkbox" v-model="public_" />
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
            this.icon = json.data.id;
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
    height: 400px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background: #435d78;
    overflow: hidden;
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
        float: left;
        margin: 0px;
        color: #f5f5f5;
    }

    .state input {
        width: 16px;
        height: 16px;
        margin-left: 10px;
    }

    button {
        position: relative;
        left: 55px;
        top: 18px;
        font-size: 20px;
        color: hsla(0, 0%, 100%, 0.8);
        background-color: #435d78;
        border: none;
        cursor: pointer;
    }
}
</style>
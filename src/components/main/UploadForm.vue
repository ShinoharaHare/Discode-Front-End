<template>
    <modal
        name="upload-form"
        :width="600"
        :height="350"
        @opened="hook"
        @before-open="beforeOpen"
        @closed="cancel"
    >
        <div id="upload-form-component">
            <coverflow :coverList="coverList" :coverWidth="150" :width="600"></coverflow>

            <div class="info">
                <input type="text" placeholder="註解" autofocus v-model="message.content" />
            </div>

            <div class="button-group">
                <button class="but" @click="confirm">確認</button>
                <button class="but" @click="cancel">取消</button>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';

export default {
    name: 'upload-form',
    data: () => ({
        message: {
            content: '',
            files: []
        },
        coverList: []
    }),
    methods: {
        hook() {
            const modal = $(this.$el).find('.v--modal-box');
            modal.css('border-radius', '6px');
        },
        beforeOpen(e) {
            this.message = e.params.message;
            for (let file of this.message.files) {
                if (file.type.includes('image')) {
                    this.coverList.push({
                        title: file.name,
                        cover: URL.createObjectURL(file.data)
                    });
                }
            }
        },
        confirm() {
            this.$emit('confirm');
        },
        cancel() {
            for (let cover of this.coverList) {
                URL.revokeObjectURL(cover.cover);
            }
            this.coverList = [];
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="scss">
#upload-form-component {
    position: relative;
    width: 600px;
    height: 350px;
    background-color: #bfc5ca;
    border: 3px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    overflow: hidden;
    z-index: 100;

    .coverflow {
        height: 300px !important;
        background-color: #333333 !important;

        img {
            cursor: pointer;
        }
    }
    .coverflow-title-box {
        width: 200px !important;
        left: 0 !important;
        margin-left: 200px !important;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .text {
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: black;
        margin: 15px 0px 0px 10px;
    }
    .info {
        width: 400px;
        height: 20px;
        float: left;
        margin: 12.5px 0px 0px 10px;
    }
    
    .info input {
        position: relative;
        bottom: 3px;
        width: 380px;
        height: 20px;
    }
    .button-group {
        position: relative;
        float: right;
        width: 150px;
        height: 50px;
        right: 20px;
    }
    .but {
        float: right;
        width: 65px;
        font-size: 20px;
        font-weight: bold;
        background-color: #5b82c9;
        text-decoration: none;
        border: 2px solid black;
        border-radius: 10%;
        margin: 10px 5px 0px 5px;
        padding: 0px;
        cursor: pointer;
    }
}
</style>
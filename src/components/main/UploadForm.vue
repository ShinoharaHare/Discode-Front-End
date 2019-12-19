<template>
    <modal name="upload-form" :width="modalWidth" :height="'auto'" @opened="hook">
        <div id="upload-form-component">
            <div class="board">
                <div class="preview">
                    <img src="001.jpg" />
                </div>

                <div class="bottom_text">
                    <p class="text">確定要上傳這張照片嗎?</p>
                    <button class="but">上傳</button>
                    <button class="but">取消</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';

const MODAL_WIDTH = 405;

export default {
    name: 'upload-form-component',
    data: () => ({
        modalWidth: MODAL_WIDTH
    }),
    methods: {
        hook() {
            const modal = $(this.$el).find('.v--modal-box');
            modal.css('border-radius', '6px');
        }
    },
    created() {
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
    }
};
</script>

<style lang="scss">
#upload-form-component {
    .board {
        position: relative;
        width: 400px;
        height: 450px;
        background-color: #bfc5ca;
        border: 3px solid rgba(0, 0, 0, 0.7);
        box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        overflow: hidden;
        z-index: 100;
    }

    .preview {
        width: 390px;
        height: 390px;
        border: 5px solid #2c3e50;
    }

    .preview img {
        width: 390px;
        height: 390px;
    }

    .text {
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: black;
        margin: 10px 0px 0px 20px;
    }

    .but {
        float: right;
        width: 65px;
        font-size: 20px;
        font-weight: bold;
        background-color: #5b82c9;
        text-decoration: none;
        border: 2px solid black;
        margin: 10px 5px 0px 5px;
        padding: 0px;
    }
}
</style>
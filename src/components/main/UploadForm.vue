<template>
    <modal name="upload-form" :width="modalWidth" :height="'auto'" @opened="hook" @before-open="beforeOpen" @closed="closed">
        <div id="upload-form-component">
            <div class="board">
                <coverflow :coverList="coverList" :coverWidth="100" :width="450" bgColor="#333333"></coverflow>

                <div class="bottom-text">
                    <button class="but">確認</button>
                    <button class="but">取消</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';

const modalWidth = 405;

export default {
    name: 'upload-form-component',
    data: () => ({
        modalWidth: modalWidth,
        fileList: [],
        coverList: []
    }),
    methods: {
        hook() {
            const modal = $(this.$el).find('.v--modal-box');
            modal.css('border-radius', '6px');
        },
        beforeOpen(e) {
            this.fileList = e.params.fileList;
            for (let file of this.fileList) {
                if (file.type.includes('image')) {
                    this.coverList.push({
                        title: file.name,
                        cover: URL.createObjectURL(file)
                    });
                }
            }
        },
        closed(e) {
            this.coverList = [];
            this.$emit('cancel');
        }
    },
    created() {
        this.modalWidth = window.innerWidth < modalWidth ? modalWidth / 2 : modalWidth;
    }
};
</script>

<style lang="scss">
#upload-form-component {
    .coverflow-title-box {
        width: 200px !important;
        left: 0 !important;
        margin-left: 125px !important;
    }
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
        margin: 15px 0px 0px 10px;
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
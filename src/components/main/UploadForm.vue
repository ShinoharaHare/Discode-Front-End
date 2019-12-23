<template>
    <modal name="upload-form" :width="modalWidth" :height="'auto'" @opened="hook" @before-open="beforeOpen" @closed="cancel">
        <div id="upload-form-component">
            <coverflow :coverList="coverList" :coverWidth="150" :width="600" :height="400" bgColor="#333333"></coverflow>
            
            <div class="info">
                <p>留言:</p>
                <input type="text">
            </div>

            <div class = "button-group">
                <button class="but">確認</button>
                <button class="but" @click="cancel">取消</button>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';

const MODAL_WIDTH = 600;

export default {
    name: 'upload-form-component',
    data: () => ({
        modalWidth: MODAL_WIDTH,
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
        cancel(e) {
            this.coverList = [];
            this.$emit('cancel');
        }
    },
    created() {
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
    }
};
</script>

<style lang="scss">
#upload-form-component {
    position: relative;
        width: 600px;
        height: 280px;
        background-color: #bfc5ca;
        border: 3px solid rgba(0, 0, 0, 0.7);
        box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
        border-radius: 6px;
        overflow: hidden;
        z-index: 100;
    
    .coverflow-title-box {
        width: 200px !important;
        left: 0 !important;
        margin-left: 200px !important;
    }
    .text {
        float: left;
        font-size: 20px;
        font-weight: bold;
        color: black;
        margin: 15px 0px 0px 10px;
    }
    .info{
        width: 400px;
        height: 20px;
        float: left;
        margin: 12.5px 0px 0px 10px;
    }
    .info p{
        float:left;
    }
    .info input{
        width: 350px;
        height: 50px;
        height: 20px;
    }
    .button-group{
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
        margin: 10px 5px 0px 5px;
        padding: 0px;
    }
}
</style>
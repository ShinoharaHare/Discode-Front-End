<template>
    <modal
        name="upload-form"
        :width="600"
        :height="350"
        @opened="opened"
        @before-open="beforeOpen"
        @closed="cancel"
    >
        <div id="upload-form-component">
            <coverflow :coverList="coverList" :coverWidth="150" :width="600" @change="onChange"></coverflow>

            <div class="info">
                <input type="text" placeholder="註解" v-model="message.content" />
            </div>

            <div class="button-group">
                <button type="button" @click="confirm">確認</button>
                <button type="button" @click="cancel">取消</button>
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
        beforeOpen(e) {
            this.message = e.params.message;
            for (let file of this.message.files) {
                if (file.type.includes('image')) {
                    this.coverList.push({
                        title: file.name,
                        cover: URL.createObjectURL(file.data)
                    });
                } else {
                    let cover;
                    try {
                        cover = require(`@/assets/icon/${file.name.split('.').pop()}.svg`);
                    } catch {
                        cover = require(`@/assets/icon/unknown.svg`);
                    }
                    this.coverList.push({
                        title: file.name,
                        cover: cover
                    });
                }
            }
        },
        opened() {
            $(this.$el)
                .find('.v--modal-box')
                .css('border-radius', '6px');

            $(this.$el)
                .find('input')
                .focus();

            $(this.$el)
                .find('.coverflow-title-box')
                .attr('title', this.coverList[0].title);
        },
        onChange(i) {
            $(this.$el)
                .find('.coverflow-title-box')
                .attr('title', this.coverList[i].title);
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
        white-space: nowrap;
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
        bottom: 6px;
        border: none;
        padding: 3px 8px 3px 8px;
        border-radius: 20px;
        width: 380px;
        height: 25px;
    }

    input:focus {
        outline: none;
    }

    .button-group {
        position: relative;
        float: right;
        width: 150px;
        height: 50px;
        right: 20px;
    }
    button {
        position: relative;
        bottom: 2px;
        float: right;
        width: 65px;
        height: 30px;
        margin: 10px 5px 0px 5px;
        padding: 0px;
        cursor: pointer;
    }
}
</style>
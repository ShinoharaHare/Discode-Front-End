<template>
    <modal name="code-editor" :width="modalWidth" :height="'auto'" @opened="opened" :clickToClose="false">
        <div id="code-editor-component">
            <div class="title">
                <p>程式碼編輯器</p>
            </div>

            <div class="content">
                <div id="editor"></div>

                <div class="bottom">
                    <button class="but">上傳</button>
                    <button class="but" @click="cancel">取消</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import ace from 'ace-builds';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';

const MODAL_WIDTH = 1000;

export default {
    name: 'code-editor',
    data: () => ({
        editor: null
    }),
    methods: {
        opened() {
            this.editor = ace.edit('editor');
            this.editor.setOptions({
                enableSnippets: true,
                enableLiveAutocompletion: true,
                enableBasicAutocompletion: true
            });
            this.editor.session.setMode(`ace/mode/javascript`);
            this.editor.setTheme('ace/theme/twilight');
        },
        cancel() {
            this.$emit('cancel');
        }
    },
    mounted() {},
    created() {
        this.modalWidth = window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
    }
};
</script>

<style lang="scss">
@import url('http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');

#code-editor-component {
    position: relative;
    width: 1000px;
    height: 800px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    overflow: hidden;
    z-index: 100;

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
        height: 725px;
        background-color: #567696;
    }

    #editor {
        width: 950px;
        height: 700px;
        margin-left: 25px;
    }

    .but {
        position: relative;
        float: right;
        width: 60px;
        height: 20px;
        margin: 0px 3px 0px 3px;
    }
}
</style>
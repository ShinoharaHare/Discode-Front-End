<template>
    <modal
        name="code-result"
        :width="1000"
        :height="800"
        @before-open="beforeOpen"
        @opened="opened"
    >
        <div id="code-result-component">
            <div class="title">
                <p>結果</p>
            </div>

            <div id="editor"></div>

            <span class="composing">排版</span>
            
            <div class="bottom">
                <div class="bottom-info">
                    <h3>stdin</h3>
                    <pre>{{stdin}}</pre>
                </div>

                <div class="bottom-info">
                    <h3>stdout</h3>
                    <pre>{{stdout}}</pre>
                </div>

                <div class="bottom-info">
                    <h3>stderr</h3>
                    <pre>{{stderr}}</pre>
                </div>
            </div>

        </div>
    </modal>
</template>

<script>
import ace from 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/webpack-resolver';

export default {
    name: 'code-result',
    data: () => ({
        content: '',
        stdin: '',
        stdout: '',
        stderr: '',
        language: '',
        editor: null
    }),
    methods: {
        beforeOpen(e) {
            const code = e.params.code;
            this.content = code.content;
            this.stdin = code.stdin;
            this.stdout = code.stdout;
            this.stderr = code.stderr;
            this.language = code.language;
        },
        opened() {
            this.editor = ace.edit('editor');
            this.editor.setOptions({
                readOnly: true,
                fontFamily: 'SFMonoRegular',
                fontSize: '14pt'
            });
            this.editor.setTheme('ace/theme/twilight');
            this.editor.session.setMode(`ace/mode/${this.language}`);
            this.editor.setValue(this.content);
        }
    }
};
</script>


<style lang="scss">
#code-result-component {
    position: relative;
    width: 1000px;
    height: 800px;
    background-color: #567696;
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    overflow: hidden;
    z-index: 100;

    #editor {
        width: 950px;
        height: 580px;
        margin-left: 25px;
    }

    .title p {
        width: 100%;
        height: 25px;
        font-size: 25px;
        text-align: center;
        margin: 0px;
        padding: 25px 0px 25px 0px;
        color: #f5f5f5;
        background-color: #567696;
    }

    .composing {
        float: left;
        color: #567696;
        font-size: 13.5px;
    }

    .bottom-info {
        float: left;
        width: 31.4%;
        height: 120px;
        border: 1.3px solid #141414;
        background-color: #141414;
    }

    .bottom-info h3 {
        font-size: 18px;
        font-weight: normal;
        color: white;
        margin: 0px;
        text-align: center;
    }

    .bottom-info pre {
        width: calc(100% - 10px);
        height: calc(100px - 10px);
        margin: 0px;
        padding: 5px;
        overflow: scroll;
        overflow-x: hidden;
        text-align: justify;
        color: white;

        white-space: pre-wrap; /* Since CSS 2.1 */
        word-wrap: break-word;
    }

    .bottom-info pre::-webkit-scrollbar {
        width: 5px;
    }

    .bottom-info pre::-webkit-scrollbar-track {
        background: #141414;
    }

    .bottom-info pre::-webkit-scrollbar-thumb {
        border-radius: 8%;
        background: white;
    }
}
</style>
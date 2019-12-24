<template>
    <modal
        name="code-editor"
        :width="1000"
        :height="'auto'"
        :clickToClose="false"
        @before-open="beforeOpen"
        @opened="opened"
    >
        <div id="code-editor-component">
            <div class="title">
                <p>程式碼編輯器</p>
            </div>

            <div class="content">
                <div id="editor"></div>

                <div class="bottom">
                    <div class="input">
                        <p>輸入:</p>
                        <input type="text" v-model="message.code.input" />
                    </div>

                    <div class="input">
                        <p>註解:</p>
                        <input type="text" v-model="message.content" />
                    </div>

                    <select v-model="message.code.language" @change="changeLanguage">
                        <option
                            :key="language.value"
                            v-for="language in languages"
                            :value="language.value"
                        >{{language.text}}</option>
                    </select>

                    <button class="but" @click="submit">送出</button>
                    <button class="but" @click="cancel">取消</button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import ace from 'ace-builds/src-min-noconflict/ace';
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-min-noconflict/snippets/javascript';
import 'ace-builds/src-min-noconflict/snippets/c_cpp';
import 'ace-builds/src-min-noconflict/snippets/python';
import 'ace-builds/src-min-noconflict/snippets/java'
import 'ace-builds/src-min-noconflict/ext-language_tools';

const template = {
    java: 'public class Main {\r\n    public static void main(String[] args) {\r\n        \r\n    }\r\n}',
    c_cpp: '#include <iostream>\n\nusing std::cin;\nusing std::cout;\nusing std::endl;\n\n\nint main() {\n    \n    return 0;\n}'
};

export default {
    name: 'code-editor',
    data: () => ({
        editor: null,
        languages: [
            { text: 'C++', value: 'c_cpp' },
            { text: 'Javascript', value: 'javascript' },
            { text: 'Python3', value: 'python' },
            { text: 'Java', value: 'java'}
        ],
        message: {
            content: '',
            code: {
                language: '',
                content: '',
                input: ''
            },
            files: []
        },
    }),
    methods: {
        beforeOpen(e) {
            this.message = e.params.message;
            this.message.code.language = this.message.code.language || 'javascript';
        },
        opened() {
            this.editor = ace.edit('editor');
            this.editor.setOptions({
                enableSnippets: true,
                enableLiveAutocompletion: true,
                enableBasicAutocompletion: true,
                fontFamily: 'SFMonoRegular',
                fontSize: '14pt'
            });
            this.changeLanguage();
            this.editor.setTheme('ace/theme/twilight');
        },
        cancel() {
            this.message.code.content = this.editor.getValue();
            this.$emit('cancel');
        },
        submit() {
            this.message.code.content = this.editor.getValue();
            this.$emit('confirm');
        },
        changeLanguage() {
            this.editor.session.setMode(`ace/mode/${this.message.code.language}`);
            this.editor.setValue(template[this.message.code.language] || this.message.code.content);
        }
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
        height: 650px;
        margin-left: 25px;
    }

    .bottom {
        height: 75px;
    }

    .input {
        float: left;
        width: 850px;
        margin-top: 5px;
    }

    .input p {
        float: left;
        width: 100px;
        margin-left: 30px;
        color: white;
    }

    .input input {
        float: left;
        width: 700px;
        height: 20px;
    }

    .bottom select {
        width: 100px;
        height: 20px;
        margin: 6px;
    }

    .but {
        position: relative;
        float: right;
        right: 20px;
        top: 5px;
        width: 60px;
        height: 25px;
        margin: 0px 3px 0px 3px;
        cursor: pointer;
    }
}
</style>
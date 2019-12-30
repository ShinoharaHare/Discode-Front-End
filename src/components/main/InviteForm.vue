<template>
    <modal name="invite-form" :width="402" :height="172" :clickToClose="false" @opened="opened" @closed="closed">
        <div id="invite-form-component">
            <div class="title">
                <p>頻道邀請</p>
            </div>

            <div class="content">
                <div class="input">
                    <p>對方帳號:</p>
                    <input type="text" v-model="username" />
                </div>

                <div class="bottom">
                    <button @click="submit">
                        <i class="fa fa-check"></i>
                    </button>

                    <button @click="cancel">
                        <i class="fa fa-close"></i>
                    </button>
                </div>
            </div>
        </div>
    </modal>
</template>

<script>
import $ from 'jquery';

export default {
    name: 'invite-form',
    data: () => ({
        username: ''
    }),
    methods: {
        opened() {
            $(this.$el)
                .find('.v--modal-box')
                .css('border-radius', '6px');
        },
        closed() {
            this.username = '';
        },
        submit() {
            this.$emit('confirm', { username: this.username });
            this.cancel();
        },
        cancel() {
            this.$emit('cancel');
        }
    }
};
</script>

<style lang="scss">
#invite-form-component {
    position: relative;
    width: 400px;
    height: 170px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
    border-radius: 6px;
    background: #435d78;
    overflow: hidden;
    z-index: 100;

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

    .input {
        width: 400px;
        height: 30px;
        margin-top: 20px;
    }

    .input p {
        float: left;
        color: #f5f5f5;
        margin: 0px 10px 0px 20px;
    }

    .input input {
        float: left;
        width: 230px;
    }

    .bottom button {
        float: right;
        position: relative;
        right: 10px;
        border: none;
        font-size: 18px;
        color: hsla(0, 0%, 100%, 0.8);
        background-color: #435d78;
        cursor: pointer;
    }

    button:focus {
        outline: none;
    }
}
</style>
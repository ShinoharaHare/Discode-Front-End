<template>
  <modal
    name="profile"
    :width="modalWidth"
    :height="'auto'"
    @before-open="beforeOpen"
    @opened="hook"
  >
    <avatar-uploader
      v-model="showUploader"
      langType="zh-tw"
      url="/api/user/upload/avatar"
      @crop-upload-success="cropUploadSuccess"
    ></avatar-uploader>
    <div id="profile-component">
      <div class="title">
        <p>個人資料</p>
      </div>

      <div class="content">
        <div id="head">
          <div id="pro_pic">
            <img
              class="main"
              :src="`/content/user/${id}/${avatar}`"
              @error="$event.target.src=require('@/assets/user.png');"
              @click="showUploader=true"
            />
          </div>
        </div>

        <div id="info">
          <div class="item">
            <span class="text">使用者名稱:</span>
            <span class="error"></span>
            <br />
            <input type="text" class="input" v-model="username" disabled="true"/>
          </div>
          <div class="item">
            <span class="text">暱稱:</span>
            <span class="error"></span>
            <br />
            <input type="text" class="input" v-model="nickname" disabled="true" @keydown.enter="$event.target.disabled=true"/>
            <button @click="edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </div>

          <div class="item">
            <span class="text">更改密碼:</span>
            <span class="error"></span>
            <br />
            <input type="password" class="input" v-model="password" disabled="true" @keydown.enter="$event.target.disabled=true"/>
            <button @click="edit">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
          </div>

          <div class="item">
            <span class="text">輸入密碼:</span>
            <span class="error"></span>
            <br />
            <input type="password" class="input" v-model="currentPassword" />
            <button @click="submit">
              <i class="fa fa-check" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import $ from "jquery";
import sha256 from "sha256";

import AvatarUploader from "vue-image-crop-upload";

const MODAL_WIDTH = 400;

export default {
  name: "profile-component",
  components: {
    "avatar-uploader": AvatarUploader
  },
  data: () => ({
    modalWidth: MODAL_WIDTH,
    showUploader: false,
    id: "",
    avatar: "",
    username: "",
    nickname: "",
    password: "***************",
    currentPassword: ""
  }),
  methods: {
    hook() {
      const modal = $(this.$el).find(".v--modal-box");
      modal.css("border-radius", "6px");
    },
    beforeOpen(e) {
      var user = e.params.user;
      this.id = user.id;
      this.avatar = user.avatar;
      this.username = user.username;
      this.nickname = user.nickname || user.username;
    },
    cropUploadSuccess(json, field) {
      this.avatar = json.data.id;
    },
    edit(e) {
        var input = $(e.target).siblings("input");
        input = input.length ? input : $(e.target).parent().siblings("input");
        input.prop("disabled", false);
        input.focus();
        input.select();
    },
    submit() {

    }
  },
  created() {
    this.modalWidth =
      window.innerWidth < MODAL_WIDTH ? MODAL_WIDTH / 2 : MODAL_WIDTH;
  }
};
</script>

<style lang="scss">
@import url("http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");

#profile-component {
  position: relative;
  width: 400px;
  height: 575px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  box-shadow: 0px -1px 3px rgba(0, 0, 0, 0.1), 0px 2px 6px rgba(0, 0, 0, 0.5);
  border-radius: 6px;
  z-index: 100;

  .item {
    display: block;
  }

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
    height: 510px;
    border-color: rgb(0, 0, 0);
    border-top: 2px solid;
    background-color: #435d78;
  }

  .content::-webkit-scrollbar {
    width: 8px;
    background: rgba(0, 0, 0, 0);
  }

  .content::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
  }

  #pro_pic {
    height: 190px;
  }

  #pro_pic img {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    display: block;
    margin: auto;
    margin-top: 10px;
    cursor: pointer;
    border: 1px solid gray;
  }

  .main {
    bottom: 180px;
  }

  .text {
    margin-left: 25px;
    border-bottom: 10px;
    font-size: 15px;
    color: #cccccc;
  }

  .input {
    width: 270px;
    margin: 5px 16px 10px 16px;
    font-size: 18px;
    border-radius: 20px;
    border: #435d78;
    padding: 5px 10px;
    text-align: left;
    color: white;
    background-color: #435d78;
  }

  button {
    width: 30px;
    height: 25px;
    position: relative;
    left: 10px;
    background-color: Transparent;
    border: none;
    cursor: pointer;
  }

  .fa {
    color: #ffffffcc;
    font-size: 20px;
  }
}
</style>

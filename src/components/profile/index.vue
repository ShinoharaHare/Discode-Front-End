<template>
  <modal name="profile" :width="610" :height="420" @before-open="beforeOpen">
    <div id="profile-component">
      <div class="portfoliocard">
        <div class="coverphoto"></div>
        <img class="profile_picture" :src="user.avatar || require('@/assets/user.png')">
        <div class="left_col">
          <div class = "account">
            <p class = "acc_title">Account:</p>
            <p class = "acc">wayne1224</p>
          </div>
        </div>

        <div class="right_col">
          <h2 class="name">{{user.username}}</h2>
          <ul class="contact_information">
            <li class="work">student</li>
            <li class="website">
              <a class="nostyle" href="#">www.facebook.com</a>
            </li>
            <li class="mail">gginin@test.com</li>
            <li class="phone">0800-092-000</li>
          </ul>
        </div>

      </div>
    </div>
  </modal>
</template>

<style src="./styles.scss" lang="scss"></style>

<script src="./script.js"></script>
<template>
  <modal name="profile" :width="620" :height="402" @before-open="beforeOpen">
    <div id="profile-component">
      <div class="portfoliocard">
        <div class="coverphoto"></div>
        <img class="profile_picture" :src="user.avatar || require('@/assets/user.png')">
        <div class="left_col">
          <div class="followers">
            <div class="follow_count">100</div>Freinds
          </div>
          <!-- <div class="following">
					<div class="follow_count">181</div>
					Following margin: auto auto;
          </div>-->
        </div>
        <div class="right_col">
          <h2 class="name">{{user.username}}</h2>
          <h3 class="location">Taiwan Taipei</h3>
          <ul class="contact_information">
            <li class="work">student</li>
            <li class="website">
              <a class="nostyle" href="#">www.facebook.com</a>
            </li>
            <li class="mail">gginin@test.com</li>
            <li class="phone">0800-092-000</li>
            <li class="resume">
              <a href="#" class="nostyle">download resume</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </modal>
</template>

<style src="./styles.scss" lang="scss"></style>

<script src="./script.js"></script>
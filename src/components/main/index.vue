<template>
  <div id="main-component">
    <profile></profile>
    <div id="frame">
      <div id="sidepanel">
        <!-- 側板(左半邊) -->
        <div id="profile">
          <!-- 個人資料 -->
          <div class="wrap">
            <img id="profile-img" src="@/assets/user.png" class="online" alt />
            <p>User name</p>

            <i class="fa fa-ellipsis-h top-setting-button" aria-hidden="true" @click="showProfile"></i>

            <div id="status-options">
              <!-- 切換當前狀態 -->
              <ul>
                <li id="status-online" class="active">
                  <span class="status-circle"></span>
                  <p>Online</p>
                </li>
                <li id="status-away">
                  <span class="status-circle"></span>
                  <p>Away</p>
                </li>
                <li id="status-busy">
                  <span class="status-circle"></span>
                  <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span class="status-circle"></span>
                  <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="search">
          <!-- 在聊天紀錄中 找聯絡人-->
          <label for>
            <i class="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="text" placeholder="Search contacts" />
        </div>

        <div id="contacts">
          <!-- 聯絡人 聊天紀錄 -->
          <ul>
            <li class="contact">
              <div class="wrap">
                <span class="contact-status online"></span>
                <img src="@/assets/user.png" alt />
                <div class="meta">
                  <p class="name">User online</p>
                  <p class="preview">text</p>
                </div>
              </div>
            </li>

            <li class="contact active">
              <div class="wrap">
                <span class="contact-status busy"></span>
                <img src="@/assets/user.png" alt />
                <div class="meta">
                  <p class="name">User busy and active</p>
                  <p class="preview">text</p>
                </div>
              </div>
            </li>

            <li class="contact">
              <div class="wrap">
                <span class="contact-status away"></span>
                <img src="@/assets/user.png" alt />
                <div class="meta">
                  <p class="name">User away</p>
                  <p class="preview">text</p>
                </div>
              </div>
            </li>

            <li class="contact">
              <div class="wrap">
                <span class="contact-status"></span>
                <img src="@/assets/user.png" alt />
                <div class="meta">
                  <p class="name">User offline</p>
                  <p class="preview">text</p>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div id="bottom-bar">
          <!-- 左下角 設定 按鍵欄 -->
          <!-- <button id = "addcontact"><i class = "fa fa-user-plus fa-fw" aria-hidden = "true"></i> <span>Add contact</span></button> -->
          <button id="settings">
            <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
            <span>settings</span>
          </button>
        </div>
      </div>

      <div class="content">
        <!-- 當前聊天對象的資料 -->
        <div class="contact-profile">
          <img src="@/assets/user.png" alt />
          <p>User busy and active</p>
        </div>

        <div class="messages">
          <!-- 聊天內容 -->
          <ul>
            <li class="sent">
              <img src="@/assets/user.png" alt />
              <p>text sent</p>
            </li>
            <li class="replies">
              <img src="@/assets/user.png" alt />
              <p>text replies</p>
            </li>
          </ul>
        </div>

        <div class="message-input">
          <!-- 聊天輸入欄 -->
          <span>
            <div class="wrap">
              <button class="submit">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
              <button class="submit">
                <i class="fa fa-paperclip" aria-hidden="true"></i>
              </button>
              <input type="text" placeholder="Write your message..." />
              <button class="submit">
                <i class="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss"></style>

<script src="./script.js"></script>
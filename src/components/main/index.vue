<template>
  <div id="main-component">
    <profile></profile>
    <div id="frame">
      <div id="sidepanel">
        <!-- 側板(左半邊) -->
        <div id="profile">
          <!-- 個人資料 -->
          <div class="wrap">
            <img
              id="profile-img"
              :src="user.avatar || require('@/assets/user.png')"
              :class="status"
              @click="toggleStatusOptions"
              @error="$event.target.src=require('@/assets/user.png');"
            />
            <p>{{user.nickname || user.username}}</p>

            <i class="fa fa-ellipsis-h top-setting-button" aria-hidden="true" @click="showProfile"></i>

            <div id="status-options" :class="{'active': isStatusOptionsActive}">
              <!-- 切換當前狀態 -->
              <ul>
                <li
                  id="status-online"
                  :class="{'active': status === 'online'}"
                  @click="changeStatus"
                  data-status="online"
                >
                  <span class="status-circle"></span>
                  <p>線上</p>
                </li>
                <li
                  id="status-away"
                  :class="{'active': status === 'away'}"
                  @click="changeStatus"
                  data-status="away"
                >
                  <span class="status-circle"></span>
                  <p>離開</p>
                </li>
                <li
                  id="status-busy"
                  :class="{'active': status === 'busy'}"
                  @click="changeStatus"
                  data-status="busy"
                >
                  <span class="status-circle"></span>
                  <p>忙碌</p>
                </li>
                <li
                  id="status-offline"
                  :class="{'active': status === 'offline'}"
                  @click="changeStatus"
                  data-status="offline"
                >
                  <span class="status-circle"></span>
                  <p>離線</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="search">
          <!-- 在聊天紀錄中 找聯絡人-->
          <label>
            <i class="fa fa-search" aria-hidden="true"></i>
          </label>
          <input type="text" placeholder="搜尋" />
        </div>

        <div id="contacts">
          <!-- 聯絡人 聊天紀錄 -->
          <ul>
            <li
              class="contact"
              v-for="c in channels"
              :key="c.id"
              :class="{'active': currentChannel == c.id}"
              @click="selectChannel(c)"
            >
              <!-- <span class="contact-status online"></span> -->
              <div class="wrap">
                <img
                  :src="c.icon || require('@/assets/group.png')"
                  @error="$event.target.src=require('@/assets/group.png');"
                />
                <div class="meta">
                  <p class="name">{{c.name}}</p>
                  <p class="preview" v-if="c.messages && c.messages.length">
                    <span>{{c.messages[c.messages.length-1].author.name}}:</span>
                    {{c.messages[c.messages.length-1].content}}
                  </p>
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
            <span>設定</span>
          </button>
        </div>
      </div>

      <div class="content" v-if="channels[currentChannel]">
        <!-- 當前聊天對象的資料 -->
        <div class="contact-profile">
          <img :src="channels[currentChannel].icon || require('@/assets/group.png')" />
          <p>{{channels[currentChannel].name}}</p>
        </div>
        <!-- 聊天內容 -->
        <div class="messages">
          <ul>
            <li
              :key="m.id"
              v-for="m in channels[currentChannel].messages"
              :class="{'sent': m.author.id === user.id, 'replies': m.author.id !== user.id}"
            >
              <img
                :src="m.author.avatar || require('@/assets/user.png')"
                @error="$event.target.src=require('@/assets/user.png');"
              />
              <span>{{m.author.name}}</span>
              <p>{{m.content}}</p>
            </li>
          </ul>
        </div>

        <div class="message-input" @keyup="keyboard">
          <!-- 聊天輸入欄 -->
          <span>
            <div class="wrap">
              <button class="submit">
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
              <button class="submit" @click="selectFile">
                <input
                  type="file"
                  accept="*"
                  multiple="multiple"
                  style="display: none"
                  ref="files"
                  @change="files"
                />
                <i class="fa fa-paperclip" aria-hidden="true"></i>
              </button>
              <input type="text" placeholder="在此輸入訊息" v-model="message.content" />
              <button class="submit" @click="submitMessage">
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
<template>
    <div id="main-component" @dragenter="showUploadArea">
        <profile @upadteProfile="(user)=>Object.assign(this.user, user)"></profile>
        <upload-area @leave="$modal.hide('upload-area')" @dropfile="showUploadForm"></upload-area>
        <upload-form @confirm="submitMessage" @cancel="clearMessage"></upload-form>
        <code-editor @cancel="$modal.hide('code-editor')"></code-editor>
        <loading :class="{'loaded': loaded}"></loading>
        <div id="frame">
            <div id="sidepanel">
                <!-- 側板(左半邊) -->
                <div id="profile">
                    <!-- 個人資料 -->
                    <div class="wrap">
                        <img
                            id="profile-img"
                            :src="`/content/user/${user.id}/${user.avatar}`"
                            :class="status"
                            @click="toggleStatusOptions"
                            @error="$event.target.src=require('@/assets/user.png');"
                        />
                        <p>{{user.nickname || user.username}}</p>

                        <i
                            class="fa fa-ellipsis-h top-setting-button"
                            aria-hidden="true"
                            @click="showProfile"
                        ></i>

                        <div id="status-options" :class="{'active': active.statusOptions}">
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
                            v-title="c.name"
                            title-placement="right"
                        >
                            <!-- <span class="contact-status online"></span> -->
                            <div class="wrap">
                                <img
                                    :src="`/content/channel/${c.id}/${c.icon}`"
                                    @error="$event.target.src=require('@/assets/group.png');"
                                />
                                <div class="meta">
                                    <p class="name">{{c.name}}</p>
                                    <p class="preview" v-if="c.messages && c.messages.length">
                                        <span>{{c.messages[c.messages.length-1].author.name}}:</span>
                                        {{c.messages[c.messages.length-1].content || '* 發送了圖片或檔案 *'}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="bottom-bar">
                    <!-- 左下角 設定 按鍵欄 -->
                    <!-- <button id = "addcontact"><i class = "fa fa-user-plus fa-fw" aria-hidden = "true"></i> <span>Add contact</span></button> -->
                    <button>
                        <i class="fa fa-plus fa-fw" aria-hidden="true"></i>
                        <span>創建頻道</span>
                    </button>
                    <button>
                        <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
                        <span>設定</span>
                    </button>
                </div>
            </div>

            <div class="content" v-if="channels[currentChannel]">
                <!-- 當前聊天對象的資料 -->
                <div class="contact-profile">
                    <img
                        :src="`/content/channel/${channels[currentChannel].id}/${channels[currentChannel].icon}`"
                        @error="$event.target.src=require('@/assets/group.png');"
                    />
                    <p>{{channels[currentChannel].name}}</p>
                </div>
                <!-- 聊天內容 -->
                <div
                    class="messages"
                    v-chat-scroll="{always: false, smooth: true, scrollonremoved:true, smoothonremoved: false}"
                >
                    <ul>
                        <li
                            :key="m.id"
                            v-for="m in channels[currentChannel].messages"
                            :class="{'sent': m.author.id === user.id, 'replies': m.author.id !== user.id}"
                        >
                            <div class="message-profile">
                                <img
                                    :src="`/content/user/${m.author.id}/${m.author.avatar}`"
                                    @error="$event.target.src=require('@/assets/user.png');"
                                />
                                <span>{{m.author.name}}</span>
                            </div>

                            <div class="message-content">
                                <p v-if="m.content">{{m.content}}</p>
                                <ul class="attachment">
                                    <li v-if="getImages(m.attachments).length">
                                        <div v-viewer class="images">
                                            <!-- 測試 -->
                                            <!-- <img
                        :key="a.id"
                        v-for="a in getImages(m.attachments)"
                        :src="require(`@/assets/sample/${a.id}`)"
                        v-title="a.filename"
                                            />-->
                                            <!-- 正式 -->
                                            <img
                                                :key="a.id"
                                                v-for="a in getImages(m.attachments)"
                                                :src="`/content/channel/${m.channel}/${a.id}`"
                                                v-title="a.filename"
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="message-input" @keyup.enter="submitMessage">
                    <!-- 聊天輸入欄 -->
                    <span>
                        <div class="wrap">
                            <button class="submit" @click="$modal.show('code-editor')">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </button>
                            <button class="submit" @click="selectFile">
                                <input
                                    type="file"
                                    accept="*"
                                    multiple="multiple"
                                    style="display: none"
                                    ref="files"
                                    @change="showUploadForm"
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

<style src="./styles.scss" lang="scss">
</style>
<script src="./script.js"></script>
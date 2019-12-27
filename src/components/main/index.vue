<template>
    <div id="main-component" @dragenter="showUploadArea">
        <loading :class="{'loaded': active.loaded}"></loading>

        <profile @upadte-profile="(user)=>Object.assign(this.user, user)"></profile>
        
        <upload-area @leave="$modal.hide('upload-area')" @dropfile="showUploadForm"></upload-area>
        <upload-form @confirm="uploadFormOnConfirm" @cancel="uploadFormOnCancel"></upload-form>

        <code-editor @confirm="codeEditorOnConfirm" @cancel="codeEditorOnCancel"></code-editor>
        <code-result></code-result>

        <channel-form @confirm="channelFormOnConfirm" @cancel="channelFormOnCancel"></channel-form>
        
        <div id="frame">
            <div id="sidepanel">
                <!-- 側板(左半邊) -->
                <div id="profile">
                    <!-- 個人資料 -->
                    <div class="wrap">
                        <img
                            id="profile-img"
                            :src="`/content/avatar/${user.avatar}`"
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
                                    :key="s.id"
                                    v-for="s in statusList"
                                    :id="`status-${s.id}`"
                                    :class="{'active': status === s.id}"
                                    @click="changeStatus"
                                >
                                    <span class="status-circle"></span>
                                    <p>{{s.text}}</p>
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
                    <input type="text" placeholder="搜尋" v-model="channelSearchText" />
                </div>

                <div id="contacts">
                    <!-- 聯絡人 聊天紀錄 -->
                    <ul>
                        <li
                            class="contact"
                            :key="c.id"
                            v-for="c in filteredChannels"
                            :class="{'active': currentChannelId == c.id}"
                            @click="selectChannel(c)"
                            v-title="c.name"
                            title-placement="right"
                        >
                            <!-- <span class="contact-status online"></span> -->
                            <div class="wrap">
                                <img
                                    :src="`/content/icon/${c.icon}`"
                                    @error="$event.target.src=require('@/assets/group.png');"
                                />
                                <div class="meta">
                                    <p class="name">{{c.name}}</p>
                                    <p class="preview" v-if="c.messages && c.messages.length">
                                        <span>{{getLastMessage(c).name}}:</span>
                                        {{getLastMessage(c).content}}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <div id="bottom-bar">
                    <!-- 左下角 設定 按鍵欄 -->
                    <!-- <button id = "addcontact"><i class = "fa fa-user-plus fa-fw" aria-hidden = "true"></i> <span>Add contact</span></button> -->
                    <button @click="$modal.show('channel-form')">
                        <i class="fa fa-plus fa-fw" aria-hidden="true"></i>
                        <span>創建頻道</span>
                    </button>
                    <button>
                        <i class="fa fa-cog fa-fw" aria-hidden="true"></i>
                        <span>設定</span>
                    </button>
                </div>
            </div>

            <div class="content" v-if="currentChannel">
                <!-- 當前聊天對象的資料 -->
                <div class="contact-profile">
                    <img
                        :src="`/content/icon/${currentChannel.icon}`"
                        @error="$event.target.src=require('@/assets/group.png');"
                    />
                    <p>{{currentChannel.name}}</p>
                </div>

                <div class="wrapper">
                    <!-- 聊天內容 -->
                    <div
                        class="messages"
                        v-chat-scroll="{ always: false, smooth: true, scrollonremoved: true, smoothonremoved: false }"
                    >
                        <ul>
                            <li
                                :key="m.id"
                                v-for="m in currentChannel.messages"
                                :class="{'sent': m.author.id === user.id, 'replies': m.author.id !== user.id}"
                            >
                                <div class="message-author">
                                    <img
                                        class="avatar"
                                        :src="`/content/avatar/${m.author.avatar}`"
                                        @error="$event.target.src=require('@/assets/user.png');"
                                    />
                                    <span>{{m.author.name}}</span>
                                </div>

                                <div class="message-content">
                                    <div class="message-box" v-if="m.content && rerenderFlag">
                                        <v-embed :options="vEmbedOptions">{{m.content}}</v-embed>
                                    </div>
                                    <ul class="attachment" v-if="m.attachments">
                                        <li class="images" v-if="m.attachments.images && m.attachments.images.length">
                                            <div class="message-box" v-viewer>
                                                <img
                                                    :key="file.id"
                                                    v-for="file in m.attachments.images"
                                                    :src="`/content/channel/${m.channel}/${file.id}`"
                                                    @error="$event.target.src=require(`@/assets/sample/${file.id}`)"
                                                    v-title="file.name"
                                                />
                                            </div>
                                        </li>
                                        <li class="files" :key="file.id" v-for="file in m.attachments.files">
                                            <!-- 檔名 {{file.name}} -->
                                            <!-- 圖片 :src="file.icon" -->
                                            <!-- 連結 :href="file.id" -->
                                        </li>
                                    </ul>
                                    <div class="code">
                                        <button
                                            v-if="m.code && m.code.content"
                                            @click="showCodeResult(m.code)"
                                        >顯示結果</button>                                        
                                    </div>

                                    <div class="file">
                                                                               
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div class="message-input" @keydown.enter="submitMessage">
                        <!-- 聊天輸入欄 -->
                        <span>
                            <div class="wrap">
                                <button
                                    class="submit"
                                    @click="$modal.show('code-editor', { message: message })"
                                >
                                    <i class="fa fa-code" aria-hidden="true"></i>
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

                <div class="panel">
                    <ul>
                        <li class="contact">
                            <div class="wrap">
                                <span class="online"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="away"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="busy"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li>
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li>              
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        <li class="contact">
                            <div class="wrap">
                                <span class="offline"></span>
                                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                                <div class="meta">
                                    <p class="name">Louis Litt</p>
                                    <p class="preview">You just got LITT up, Mike.</p>
                                </div>
                            </div>
                        </li> 
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./styles.scss" lang="scss">
</style>
<script src="./script.js"></script>
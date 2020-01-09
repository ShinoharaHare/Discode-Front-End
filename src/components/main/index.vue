<template>
    <div id="main-component" @dragenter="showUploadArea">
        <loading :class="{'loaded': active.loaded}"></loading>

        <profile @upadte-profile="upadteProfile"></profile>

        <upload-area @leave="$modal.hide('upload-area')" @dropfile="showUploadForm"></upload-area>
        <upload-form @confirm="uploadFormOnConfirm" @cancel="uploadFormOnCancel"></upload-form>

        <code-editor @confirm="codeEditorOnConfirm" @cancel="codeEditorOnCancel"></code-editor>
        <code-result></code-result>

        <channel-form @confirm="channelFormOnConfirm" @cancel="channelFormOnCancel"></channel-form>
        <invite-form @confirm="inviteFormOnConfirm" @cancel="inviteFormOnCancel"></invite-form>

        <avatar-uploader
            v-model="showUploader"
            langType="zh-tw"
            url="/api/upload"
            @crop-upload-success="cropUploadSuccess"
            :field="'file'"
        ></avatar-uploader>

        <div id="frame">
            <div id="sidepanel">
                <!-- 側板(左半邊) -->
                <div id="profile">
                    <!-- 個人資料 -->
                    <div class="wrap">
                        <img
                            id="profile-img"
                            :src="users[userId].avatar || require('@/assets/user.png')"
                            :class="status"
                            @click="toggleStatusOptions"
                            @error="$event.target.src=require('@/assets/user.png')"
                        />
                        <p id="personal-name">{{users[userId].name}}</p>
                        <p id="personal-message">{{users[userId].message}}</p>

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
                        >
                            <div class="wrap">
                                <img
                                    :src="c.icon || require('@/assets/group.png')"
                                    @error="$event.target.src=require('@/assets/group.png')"
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

                <div class="bottom-bar">
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

            <div class="content">
                <cover v-if="!currentChannel"></cover>

                <div v-if="currentChannel" style="height: 100%;">
                    <!-- 當前聊天對象的資料 -->
                    <div class="contact-profile">
                        <img
                            :src="channel.icon || require('@/assets/group.png')"
                            @error="$event.target.src=require('@/assets/group.png')"
                            @click="showUploader=true"
                        />
                        <input
                            type="text"
                            v-model="channel.name"
                            @keydown.enter="submitChannelName"
                        />
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
                                    :class="{'sent': users[m.author].id === user.id, 'replies': users[m.author].id !== user.id}"
                                >
                                    <div class="message-author">
                                        <img
                                            class="avatar"
                                            :src="users[m.author].avatar || require('@/assets/user.png')"
                                            @error="$event.target.src=require('@/assets/user.png')"
                                        />
                                        <span>{{users[m.author].name}}</span>
                                    </div>

                                    <div class="message-content">
                                        <div class="message-box temp" v-if="m.temp">
                                            <i class="fa fa-spinner fa-spin"></i>
                                        </div>
                                        <div>
                                            <div
                                                class="message-box"
                                                v-if="m.content && rerenderFlag"
                                            >
                                                <v-embed :options="vEmbedOptions">{{m.content}}</v-embed>
                                            </div>
                                            <ul class="attachment" v-if="m.attachments">
                                                <li
                                                    class="images"
                                                    v-if="m.attachments.images && m.attachments.images.length"
                                                >
                                                    <div class="message-box" v-viewer>
                                                        <img
                                                            :key="img.src"
                                                            v-for="img in m.attachments.images"
                                                            :src="img.src"
                                                            @error="$event.target.src=img.src"
                                                            v-title="img.name"
                                                        />
                                                    </div>
                                                </li>
                                                <li
                                                    class="files"
                                                    :key="file.id"
                                                    v-for="file in m.attachments.files"
                                                >
                                                    <div class="message-box">
                                                        <img :src="getFileIcon(file.name)" />
                                                        <a
                                                            :href="file.src"
                                                            target="_blank"
                                                        >{{file.name}}</a>
                                                        <p>{{file.size}} Bytes</p>
                                                        <a
                                                            class="fa fa-download"
                                                            :download="file.name"
                                                            :href="file.src"
                                                            target="_blank"
                                                        ></a>
                                                    </div>
                                                </li>
                                            </ul>
                                            <div class="code">
                                                <button
                                                    v-if="m.code && m.code.content"
                                                    @click="showCodeResult(m.code)"
                                                >顯示結果</button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div class="message-input">
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
                                    <textarea
                                        placeholder="在此輸入訊息"
                                        v-model="message.content"
                                        @keydown.enter.exact.prevent
                                        @keyup.enter.exact="submitMessage"
                                    ></textarea>
                                    <button class="submit" @click="submitMessage">
                                        <i class="fa fa-paper-plane" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </span>
                        </div>
                    </div>

                    <div class="panel">
                        <div id="panel-search">
                            <label>
                                <i class="fa fa-search" aria-hidden="true"></i>
                            </label>
                            <input type="text" placeholder="搜尋" v-model="memberSearchText" />
                        </div>

                        <ul class="members">
                            <li
                                class="contact"
                                :key="m.id"
                                v-for="m in filteredMembers"
                                v-title="users[m.id].message"
                                title-placement="left"
                            >
                                <div class="wrap">
                                    <span :class="users[m.id].status || 'offline'"></span>
                                    <img
                                        :src="users[m.id].avatar || require('@/assets/user.png')"
                                        @error="$event.target.src=require('@/assets/user.png')"
                                    />
                                    <div class="meta">
                                        <p class="name">{{users[m.id].name}}</p>
                                        <p class="preview">{{users[m.id].message}}</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div class="bottom-bar" v-if="!currentChannel.public">
                            <button @click="$modal.show('invite-form')">
                                <i class="fa fa-user-plus" aria-hidden="true"></i>
                                <span>邀請</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./styles.scss" lang="scss">
</style>
<script src="./script.js"></script>
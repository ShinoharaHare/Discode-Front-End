<template>
  <div id="member-component">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div id="title" class="unselectable">
      <span>Discode</span>
    </div>
    <div class="container unselectable" :class="{'log-in': form, 'active': success}">
      <div class="box"></div>
      <div class="container-forms">
        <div class="container-info">
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>有帳號了嗎?</p>
                <div class="btn" @click="switchForm(false);">登入</div>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>還沒有帳號嗎?</p>
                <div class="btn" @click="switchForm(true);">註冊</div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-form">
          <div class="form-item log-in">
            <div class="table">
              <div class="table-cell">
                <div :class="{'error': errorLabels[0]}">
                  <p>用戶名&nbsp;{{errorLabels[0]}}</p>
                  <input name="username" placeholder="用戶名" type="text" v-model="username" />
                </div>

                <div :class="{'error': errorLabels[1]}">
                  <p>密碼&nbsp;{{errorLabels[1]}}</p>
                  <input name="password" placeholder="密碼" type="password" v-model="password" />
                </div>

                <div class="btn" @click="login">登入</div>
              </div>
            </div>
          </div>

          <div class="form-item sign-up">
            <div class="table">
              <div class="table-cell">
                <div :class="{'error': errorLabels[0]}">
                  <p>用戶名&nbsp;{{errorLabels[0]}}</p>
                  <input placeholder="用戶名" type="text" v-model="username" />
                </div>
                <div :class="{'error': errorLabels[1]}">
                  <p>密碼&nbsp;{{errorLabels[1]}}</p>
                  <input placeholder="密碼" type="password" v-model="password" />
                </div>

                <div :class="{'error': errorLabels[2]}">
                  <p>確認密碼&nbsp;{{errorLabels[2]}}</p>
                  <input placeholder="確認密碼" type="password" v-model="confirmPassword" />
                </div>

                <div class="btn" @click="register">註冊</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./styles.scss" lang="scss"></style>

<script src="./script.js"></script>
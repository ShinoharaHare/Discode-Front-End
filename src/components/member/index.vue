<template>
  <div id="member">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <div id="title">
      <span>Discode</span>
    </div>
    <div class="container" :class="{'log-in': isRegisterForm, 'active': success}">
      <div class="box"></div>
      <div class="container-forms">
        <div class="container-info">
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>有帳號了嗎?</p>
                <div class="btn" @click="switchToLogin">登入</div>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>還沒有帳號嗎?</p>
                <div class="btn" @click="switchToRegister">註冊</div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-form">
          <div class="form-item log-in">
            <div class="table">
              <div class="table-cell">
                <input name="username" placeholder="用戶名" type="text" v-model="username" />
                <input name="password" placeholder="密碼" type="password" v-model="password" />
                <div class="btn" @click="login">登入</div>
              </div>
            </div>
          </div>

          <div class="form-item sign-up">
            <div class="table">
              <div class="table-cell">
                <input name="username" placeholder="用戶名" type="text" v-model="username" />
                <input name="password" placeholder="密碼" type="password" v-model="password" />
                <input
                  name="repeatPassword"
                  placeholder="再次輸入密碼"
                  type="password"
                  v-model="repeatPassword"
                />
                <input name="email" placeholder="電子郵件" type="email" v-model="email" />
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
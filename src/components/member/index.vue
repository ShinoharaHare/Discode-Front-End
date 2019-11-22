<template>
  <div id="member">
    <div class="container">
      <div class="box"></div>
      <div class="container-forms">
        <div class="container-info">
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>有帳號了嗎?</p>
                <div class="btn">登入</div>
              </div>
            </div>
          </div>
          <div class="info-item">
            <div class="table">
              <div class="table-cell">
                <p>還沒有帳號嗎?</p>
                <div class="btn">註冊</div>
              </div>
            </div>
          </div>
        </div>

        <div class="container-form">
          <div class="form-item log-in">
            <div class="table">
              <div class="table-cell">
                <input name="username" placeholder="用戶名" type="text" />
                <input name="password" placeholder="密碼" type="password" />
                <div class="btn">登入</div>
              </div>
            </div>
          </div>

          <div class="form-item sign-up">
            <div class="table">
              <div class="table-cell">
                <input name="username" placeholder="用戶名" type="text" />
                <input name="password" placeholder="密碼" type="password" />
                <input name="repeatPassword" placeholder="再次輸入密碼" type="password" />
                <input name="email" placeholder="電子郵件" type="email" />
                <div class="btn">註冊</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./style.css"></style>

<script src="./script.js"></script>
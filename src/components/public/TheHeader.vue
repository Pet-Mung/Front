<template>
  <div class="header_wrap">
    <div class="logo_area">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>pet mall</h1>
    </div>

    <nav>
      <ul class="nav_bar nv_left">
        <li>PRODUCT ALL</li>
        <li>CATEGORY1</li>
        <li>CATEGORY2</li>
      </ul>
      <ul class="nav_bar nv_right">
        <li>
          <router-link to="/join">회원가입</router-link>
        </li>
        <li>
          <router-link to="/login">로그인</router-link>
        </li>
        <li>
          <router-link to="/"
            ><img
              src="@/assets/img/cart.png"
              class="sm_icon"
            />장바구니</router-link
          >
        </li>
        <li>
          <router-link to="/user/mypage"
            ><img
              src="@/assets/img/mypage.png"
              class="sm_icon"
            />마이페이지</router-link
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
/* header */

.header_wrap {
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 200px;
  padding: 10px;
  .logo_area {
    margin: 0 auto;
    width: 150px;
    img {
      width: 80px;
      display: block;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
    }
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.nav_bar {
  width: 100%;
  display: flex;
  margin-top: 20px;
  padding-right: 50px;
  &.nv_right {
    justify-content: right;
  }
}
.nav_bar li {
  /* width : 20%; */
  margin: 10px;
  display: flex;
  align-items: center;
}
</style>

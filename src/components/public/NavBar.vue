<template>
  <nav>
    <ul class="nav_bar nv_left">
      <li>PRODUCT ALL</li>
      <li>CATEGORY1</li>
      <li>CATEGORY2</li>
    </ul>
    <ul class="nav_bar nv_right">
      <li v-if="!loginSuccess">
        <router-link to="/join">회원가입</router-link>
      </li>
      <li v-if="!loginSuccess">
        <router-link to="/login">로그인</router-link>
      </li>
      <li v-if="loginSuccess">
        <router-link to="/login">로그아웃</router-link>
      </li>
      <li v-if="loginSuccess">
        <router-link to="/"
          ><img
            src="@/assets/img/cart.png"
            class="sm_icon"
          />장바구니</router-link
        >
      </li>
      <li v-if="loginSuccess">
        <router-link to="/user/mypage"
          ><img
            src="@/assets/img/mypage.png"
            class="sm_icon"
          />마이페이지</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store =useStore();
const loginSuccess = computed(()=>{
  return store.state.login.loginSuccess;
});
let userId = ref(localStorage.getItem('userId'));
console.log(userId)
if(userId.value == '' || userId.value == undefined ){
  store.commit('login/setLoginStatus',false);
} else{
  store.commit('login/setLoginStatus',true);
}
</script>

<style lang="scss" scoped></style>

<template>
  <div class="user_wrap">
    <div class="int-area">
      <input type="text" id="username" required v-model.trim="info.username" autocomplete="off"/>
      <label for="username">아이디</label>
    </div>
    <div class="int-area">
      <input type="password" id="userPw" required v-model.trim="info.password" />
      <label for="userPw">비밀번호</label>
    </div>
    <div class="btn-area">
      <button id="Lbtn" type="button" @click="loginCheck">LOGIN</button>
    </div>
    <div class="caption">
      <span @click="openModal">Forgot Password?</span>
    </div>
    <ModalComn v-if="isModalOpen" modalName ="비밀번호 찾기" modalSize="small" :modalFlag = 1 />
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ModalComn from "@/components/modal/ModalComn.vue"; 

const router = useRouter();
const store = useStore();
let isCheck = reactive({
    isNotNm : false,
    isNotPw : false,
})
let info = reactive({
  password: "",
  username: "",
  grant_type : "",
  scope : "",
  client_id : "",
  client_secret : "",
});

const loginSuccess = computed(()=>{
  return store.state.login.loginSuccess;
});
const isModalOpen = computed(()=>{
  return store.state.user.isModalOpen;
});

if(loginSuccess.value){
  alert('로그아웃 되셨습니다.');
  store.commit('login/setLoginStatus',false);
  window.sessionStorage.clear();
}

// 로그인 로직 확인
const loginCheck = async () => {
    if(info.username === "") {
        alert("아이디를 입력해주세요.");
        isCheck.isNotNm = true;
    } else if (info.password === "") {
        alert("비밀번호를 입력해주세요.");
        isCheck.isNotNm = false;
        isCheck.isNotPw = true;
    } else {
      await store.dispatch('login/getLoginUser',info);
      if(loginSuccess.value) router.push('/main');
    }
}

// isOpenModal state 관리
const openModal = () => {
  store.commit('user/setIsModalOpen',true);
}

</script>

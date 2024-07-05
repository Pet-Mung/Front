<template>
  <div class="user_wrap">
    <div class="int-area">
      <input type="text" id="username" required v-model="info.username" autocomplete="off"/>
      <label for="username">아이디</label>
    </div>
    <div class="int-area">
      <input type="password" id="userPw" required v-model="info.password" />
      <label for="userPw">비밀번호</label>
    </div>
    <div class="btn-area">
      <button id="Lbtn" type="button" @click="loginCheck">LOGIN</button>
    </div>
    <div class="caption">
      <a href="#">Forgot Password?</a>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/userApi";
import { reactive } from "vue";
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
// [[Target]]: Object
// client_id: ""
// client_secret: ""
// grant_type: ""
// password: "qwer1234!!"
// scope: ""

const getLoginUser = async (info) => {
  try {
    console.log(info);
    const result = await api.loginUser(info);
    console.log(result);
    // access Token, refresh Token, token_type, username 줌
    // access Token을 env 파일에 세팅 ?? api 확인하기
  } catch (error) {
    console.error(error);
  }
};
const loginCheck = () => {
    if(info.username === "") {
        alert("아이디를 입력해주세요.");
        isCheck.isNotNm = true;
    } else if (info.password === "") {
        alert("비밀번호를 입력해주세요.");
        isCheck.isNotNm = false;
        isCheck.isNotPw = true;
    } else {
        getLoginUser(info);
    }
}


</script>

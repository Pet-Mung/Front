<template>
  <div>
    <form>
        <div class="join_input">
            <label for="userEmail">이메일</label>
            <input type="text" id="userEmail" v-model="info.email"/>
        </div>
        <div class="join_input">
            <label for="userName">이름</label>
            <input type="text" id="userName" v-model="info.username"/>
        </div>
        <div class="join_input">
            <label for="userPw">비밀번호</label>
            <input type="password" @keyup="pwdCheck" id="userPw" v-model="info.password"/>
        </div>
        <div class="join_input">
            <label for="userPwChk">비밀번호 확인</label>
            <input type="password" @keyup="pwdCheck" id="userPwChk" v-model="info.password_check"/>
            <span >{{chkPw ? '비밀번호 일치' : '비밀번호 불일치'}}</span>
        </div>
    </form>
    <button type="button" @click="joinBtn">버튼</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/api/userApi.js";

let isInput = false;
let chkPw = false;
let info = {
    password: "",
    password_check: "",
    username: "",
    email: "",
}
onMounted(() => {

});

const createUser = async (info) => {
    console.log(info);
  try {
    const response = await api.joinUser(info);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
const getUsersInfo = async () => {
  try {
    const response = await api.getUsers();
    console.log(response);
  } catch (error) {
    console.error(error);

  }
};
// 비밀번호 확인
const pwdCheck = () =>{
    if(info.password !== "" && info.password_check !== "") {
        isInput = true;
        if(info.password == info.password_check) chkPw = true;
        else {chkPw = false; console.log('chkPw',chkPw)}
    }
    console.log(info.password)
    console.log(info.password_check)
    console.log(isInput)
};
// 회원가입 버튼 클릭시
const joinBtn = () => {
  let info = {
    password: "qwer1234!!",
    password_check: "qwer1234!!",
    username: "qwer",
    email: "user2@example.com",
  };
  createUser(info);
getUsersInfo();
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="user_wrap">
    <!-- email -->
    <div class="user_input">
      <label for="userEmail">이메일</label>
      <input
        type="text"
        id="userEmail"
        v-model="info.email"
        @keyup.enter="isEmailCheck"
      />
      <button
        type="button"
        class="confirm_btn"
        @click="isEmailCheck"
        v-if="!isCheck.isEm"
      >
        다음
      </button>
    </div>
    <transition name="fade">
      <!-- name -->
      <div class="user_input" v-if="isCheck.isEm">
        <label for="userName">아이디</label>
        <input
          type="text"
          id="userName"
          v-model="info.username"
          @keyup.enter="isNameCheck"
        />
        <button
          type="button"
          class="confirm_btn"
          @click="isNameCheck"
          v-if="!isCheck.isNm"
        >
          다음
        </button>
      </div>
    </transition>
    <transition name="fade">
      <!-- password -->
      <div class="user_input" v-if="isCheck.isNm">
        <label for="userPw">비밀번호</label>
        <input
          type="password"
          @keyup="pwdCheck"
          id="userPw"
          v-model="info.password"
        />
      </div>
    </transition>
    <transition name="fade">
      <div class="user_input" v-if="isCheck.isNm">
        <label for="userPwChk">비밀번호 확인</label>
        <input
          type="password"
          @keyup="pwdCheck"
          @keyup.enter="isPwCheck"
          id="userPwChk"
          v-model="info.password_check"
        />
        <img
          v-if="isInput"
          :src="
            chkPw
              ? require('@/assets/img/o.png')
              : require('@/assets/img/x.png')
          "
          :alt="chkPw ? '일치' : '불일치'"
        />
      </div>
    </transition>
    <transition name="fade">
      <div class="confirm_box" v-if="isCheck.isNm">
        <p>8글자 이상 12글자 이하의 숫자와,문자,특수문자로 입력해주세요.</p>
        <button type="button" class="confirm_btn" @click="isPwCheck">
          확인
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRef } from "vue";
import api from "@/api/userApi.js";
import { emailCheck, nameCheck, passwordCheck } from "@/utils/common.js";
import { useRouter } from "vue-router";

let router = useRouter();

let isCheck = reactive({
  isPw: false,
  //   isPwChk: "",
  isNm: false,
  isEm: false,
});
let isInput = toRef(false);
let chkPw = toRef(false);
let info = reactive({
  password: "",
  password_check: "",
  username: "",
  email: "",
});
onMounted(() => {});

const createUser = async (info) => {
  try {
    const result = await api.joinUser(info);
    if (result.status === "201") {
      alert("회원가입에 성공했습니다.");
      router.push("/main");
    }
  } catch (error) {
    console.error(error);
  }
};

// 이메일 확인
const isEmailCheck = () => {
  if (info.email === "") {
    alert("이메일을 입력해주세요.");
  } else if (!emailCheck(info.email)) {
    alert("이메일 형식을 확인하세요.");
  } else isCheck.isEm = true;
};

// 이름 확인
const isNameCheck = () => {
  if (isCheck.isEm) {
    if (info.username === "") {
      alert("아이디를 입력해주세요.");
    } else if (!nameCheck(info.username)) {
      alert("아이디를 확인하세요.");
    } else isCheck.isNm = true;
  }
};

// 비밀번호 확인
const isPwCheck = () => {
  if (isCheck.isNm) {
    if (info.password === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (info.password_check === "") {
      alert("비밀번호 확인을 입력해주세요.");
    } else if (!passwordCheck(info.password, info.password_check)) {
      alert(
        "비밀번호는 8글자 이상 12글자 이하의 숫자와,문자,특수문자로 입력해주세요."
      );
    } else {
      isCheck.isPw = true;
      joinBtn();
    }
  }
};

// 비밀번호 확인 (span)
const pwdCheck = () => {
  if (info.password !== "" && info.password_check !== "") {
    isInput.value = true;
    if (info.password == info.password_check) chkPw.value = true;
    else chkPw.value = false;
  }
};

// 회원가입 버튼 클릭시
const joinBtn = () => {
  isEmailCheck();
  isNameCheck();
  if (isCheck.isEm && isCheck.isNm && isCheck.isPw) {
    createUser(info);
  }
};
</script>
<template>
  <div class="profile_wrap">
    <!-- email -->
    <div class="user_input">
      <label for="userEmail">이메일</label>
      <input type="text" id="userEmail" v-model="info.email" />
    </div>

    <!-- name -->
    <div class="user_input">
      <label for="userName">아이디</label>
      <input type="text" id="userName" v-model="info.user_name" />
    </div>
    <!-- name -->
    <div class="user_input">
      <label for="userPhone">핸드폰 번호</label>
      <input type="text" id="userPhone" v-model="info.phone_number" />
    </div>
    <!-- name -->
    <div class="input_addr">
      <div class="user_input">
        <label>우편번호</label>
        <input
          type="text"
          name="zoneCode"
          v-model="addr.zonecode"
          readonly
          @mousedown="$event.preventDefault()"
          @click="addressSearch"
        />
        <button @click="addressSearch" class="btn_type_01 ml-20">
          주소 검색
        </button>
      </div>
      <div class="user_input">
        <label>주소</label>
        <input
          type="text"
          v-model="info.address"
          readonly
          @mousedown="$event.preventDefault()"
          @click="addressSearch"
        />
      </div>
      <div class="user_input">
        <label>상세주소</label>
        <input
          type="text"
          name="detailAddr"
          placeholder="oo동 ,oo호 입력"
          v-model="addr.detailAddr"
        />
      </div>
    </div>
    <!-- password -->
    <!-- <div class="user_input">
      <label for="userPw">비밀번호</label>
      <input
        type="password"
        @keyup="pwdCheck"
        id="userPw"
        v-model="info.password"
      />
    </div>
    <div class="user_input">
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
          chkPw ? require('@/assets/img/o.png') : require('@/assets/img/x.png')
        "
        :alt="chkPw ? '일치' : '불일치'"
      />
    </div>
    <p>8글자 이상 12글자 이하의 숫자와,문자,특수문자로 입력해주세요.</p> -->
    <div class="confirm_box">
      <button type="button" class="confirm_btn" @click="modifyBtn">확인</button>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/userApi.js";
import { reactive, computed, onBeforeMount } from "vue";
import { emailCheck, nameCheck, phoneCheck } from "@/utils/common.js";
import { useRouter } from "vue-router";

const router = useRouter();
let info = reactive({
  //   password: "",
  //   password_check: "",
  user_name: "",
  email: "",
  address: "",
  phone_number: "",
});
let addr = reactive({
  zonecode: "",
  roadAddr: "",
  detailAddr: "",
});
// info 받아온 값
let originInfo = {};
// 전체 유효성 체크
let isCheck = false;
// 수정했는지 체크 //수정 안했으면 false
let modifyBool = false;

const user_idx = computed(() => {
  return localStorage.getItem("user_idx");
});

// user 정보 조회 api 호출
const getUserInfo = async () => {
  try {
    const result = await api.getOnlyUser(user_idx.value);
    let data = result.data[0];
    originInfo = result.data[0];
    info.user_name = data.user_name;
    info.address = data.address;
    info.phone_number = data.phone_number;
    info.email = data.email;
  } catch (error) {
    console.error(error);
  }
};

// user 정보 수정 api 호출
const putUserInfo = async () => {
  try {
    console.log("1", info);
    const result = await api.putOnlyUser(user_idx.value, info);
    if (result.status == "200") {
      alert(result.detail);
      router.push("mypage");
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
  } else isNameCheck();
};

// 이름 확인
const isNameCheck = () => {
  if (info.user_name === "") {
    alert("아이디를 입력해주세요.");
  } else if (!nameCheck(info.user_name)) {
    alert("아이디를 확인하세요.");
  } else isPhoneCheck();
};

//핸드폰 번호 확인
const isPhoneCheck = () => {
  if (!phoneCheck(info.phone_number)) {
    alert("핸드폰 번호를 확인하세요.");
  } else isCheck = true;
};

// 회원정보 수정 버튼 클릭시
const modifyBtn = () => {
  if (
    originInfo.user_name == info.user_name &&
    originInfo.email == info.email &&
    originInfo.phone_number == info.phone_number &&
    originInfo.address == info.address
  ) {
    modifyBool = false;
  } else modifyBool = true;

  if (modifyBool) {
    // 이메일, 아이디 필수값
    isEmailCheck();
    if (isCheck) putUserInfo();
  } else {
    alert("변경된 사항이 없습니다.");
  }
};

const addressSearch = () => {
  new window.daum.Postcode({
    oncomplete: (data) => {
      addr.zonecode = data.zonecode;
      info.address = data.roadAddress;
      addr.detailAddr = data.detailAddress;
    },
  }).open();
};

onBeforeMount(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
.profile_wrap {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  input {
    width: 287px;
  }
  .input_addr {
    input:not([name="detailAddr"]) {
      cursor: pointer;
    }
    input[name="zoneCode"] {
      width: 170px;
    }
  }
}
</style>

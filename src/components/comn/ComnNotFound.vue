<template>
  <div class="flex_center no_wrap">
    <img src="@/assets/img/logo.png" alt="logo" />
    <p class="fb fs-20">원하시는 페이지를 찾을 수 없습니다.</p>
    <p>
      찾으려는 페이지의 주소가 잘못 입력되었거나, <br />
      주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.<br />
      입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주세요.
    </p>
    <button @click="router.push('/')">홈으로 가기</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="scss" scoped>
.no_wrap {
  height: 50vh;
  img {
    border-radius: 50%;
    border: 1px solid #b4b4b4;
    width: 100px;
    background-color: #fff;
    padding:10px;
  }
  p {
    margin: 10px;
    line-height: 1.5rem;
    text-align: center;
  }
  button {
    background-color: #fff;
    color: #3a3a3a;
    border: 1px solid #c9c9c9;
    padding: 10px;
    border-radius: 20px;
    font-weight: 700;
  }
}
</style>

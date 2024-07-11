<template>
  <div class="mypage_wrap">
    <div class="pd-30 lect_type_01">
      <div class="cont_area">
        <h2 class="fs-40 mb-30 fc-w">My Page</h2>
        <div class="profile">
          <img src="@/assets/img/profile_icon.png" alt="프로필 아이콘" />
          <h3 class="fc-w ml-5 mr-15 pd-10 fs-30">
            {{ data.user_name }}<span class="fs-15"> 님</span>
          </h3>
          <button class="pd-10 fs-15 bx-shadow" @click="router.push('profile')">
            내정보 수정
          </button>
        </div>
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <div class="title_s pd-10">
          <img src="@/assets/img/cart_icon.png" alt="장바구니" />
          <h4 class="fs-18 mlr-10">장바구니</h4>
          <button @click="router.push('basket')" class="fb">더 보기 +</button>
        </div>
        <SliderView :flag="flag" :sliderData="basketData" />
      </div>
    </div>
    <div class="pd-30 lect_type_02">
      <div class="cont_area">
        <div class="title_s pd-10">
          <img src="@/assets/img/purchase_icon.png" alt="구매내역" />
          <h4 class="fs-18 mlr-10">구매내역</h4>
          <button @click="router.push('purchase')" class="fb">더 보기 +</button>
        </div>
        <SliderView :flag="flag" :sliderData="purchaseData" />
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <div class="title_s pd-10">
          <h4 class="fs-18 mlr-10">주문/배송조회</h4>
          <button @click="router.push('delivery')" class="fb">배송 현황</button>
        </div>
        <ul class="delivery_area">
          <li>
            <img src="@/assets/img/delivery_01.png" alt="주문 접수" />
            <p class="mt-10 text-center">주문 접수</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery_02.png" alt="결제 완료" />
            <p class="mt-10 text-center">결제 완료</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery_03.png" alt="배송 준비중" />
            <p class="mt-10 text-center">배송 준비중</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery_04.png" alt="배송 중" />
            <p class="mt-10 text-center">배송 중</p>
          </li>
          <li class="arrow_r">
            <img src="@/assets/img/right_arrow.png" alt="오른쪽 화살표" />
          </li>
          <li>
            <img src="@/assets/img/delivery_m.png" alt="배송 완료" />
            <p class="mt-10 text-center">배송 완료</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/userApi.js";
import { computed, onBeforeMount, ref } from "vue";
import SliderView from "@/components/public/SliderView.vue";
import { useRouter } from "vue-router";
import { getItemWithExpireTime } from "@/utils/common";

let router = useRouter();
let data = ref({});
// slider type
let flag = 1
// let clickTab = ref(1);
// let constructor = (id,user_id,product_id,count,)=>{
//   this.
// }
let basketData = [
  {
    id: 1,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:21:56",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
  {
    id: 2,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:22:24",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
];
let purchaseData = [
  {
    id: 1,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:21:56",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
  {
    id: 2,
    user_id: 5,
    product_id: 1,
    count: 1,
    purchase_chk: true,
    created_at: "2024-07-09T13:22:24",
    updated_at: null,
    name: "aaaa",
    image: require("@/assets/img/default.png"),
  },
];
// const imgAdd = (image) => {
//   this.imgSrc = require(image);
// }
const user_idx = computed(() => {
  return getItemWithExpireTime("userInfoObj")?.user_idx;
});

const getUserInfo = async () => {
  try {
    const result = await api.getOnlyUser(user_idx.value);
    data.value = result.data[0];
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  getUserInfo();
});
</script>
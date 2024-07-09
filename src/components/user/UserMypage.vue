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
          <button class="pd-10 fs-15 fb bx-shadow">내정보 수정</button>
        </div>
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <h4>장바구니 <button>더 보기 +</button></h4>
        <SliderView :sliderData="basketData" />
      </div>
    </div>
    <div class="pd-30 lect_type_02">
      <div class="cont_area">
        <h4>구매내역 <button>더 보기 +</button></h4>
        <SliderView :sliderData="purchaseData" />
      </div>
    </div>
    <div class="pd-30">
      <div class="cont_area">
        <h4>주문/배송조회 <button>배송 현황</button></h4>
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

let data = ref({});
// let clickTab = ref(1);
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
    image : require('@/assets/img/default.png'),
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
    image : require('@/assets/img/default.png'),
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
    image : require('@/assets/img/default.png'),
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
    image : require('@/assets/img/default.png'),
  },
];
// const imgAdd = (image) => {
//   this.imgSrc = require(image);
// }
const user_idx = computed(() => {
  return localStorage.getItem("user_idx");
});

const getUserInfo = async () => {
  try {
    const result = await api.getOnlyUser(user_idx.value);
    data.value = result.data[0];
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(() => {
  getUserInfo();
  console.log(data.value);
});
</script>

<style lang="scss" scoped>
.lect_type_01 {
  background-color: var(--primary-color);
}
.lect_type_02 {
  background-color: var(--primary-color-on);
}
.cont_area {
  max-width: 1200px;
  margin: 0 auto;
}
.profile {
  display: flex;
  align-items: flex-end;
  img {
    width: 100%;
    max-width: 50px;
    border: 2px solid #b15b02;
    background-color: #fff;
    border-radius: 50%;
  }
  h3 {
    border-bottom: 2px solid #fff;
    font-weight: 400;
  }
  button {
    background-color: #fff;
    color: var(--primary-color);
    border-radius: 5px;
    border: 1px solid #ff9c07;
  }
}
.delivery_area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  li {
    margin: 5px;
    img {
      width: 100%;
      max-width: 100px;
    }
    &.arrow_r img {
      max-width: 30px;
    }
  }
}
</style>

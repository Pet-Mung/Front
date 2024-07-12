<template>
  <div>
    <ul class="list_style mb-30">
      <li
        class="list_content"
        v-for="(item, index) in props.list"
        :key="index"
        @click="clickProduct(item.id)"
      >
        <img :src="item.thumbnail"
          :alt="item.name"
          class="pd-10"
        />
        <div class="txt_wrap pd-10">
          <p class="mb-10">
            {{ item.animal_category }} {{ item.category }}
          </p>
          <p class="mb-10 fb fs-18">{{ item.name }}</p>
          <div class="txt_flex ">
            <p>{{ commonNumber(item.price) }}<span>원</span></p>
            <button type="button" class="btn-cart bx-shadow" v-if="isLogin">
              <span v-if="isCart" @click="delCartBtn(item.name)">Delete CART</span>
              <span v-else @click.stop="addCartBtn(item.id)">ADD CART +</span>
              <!-- <img src="@/assets/img/cart_icon.png" alt="cart" /> -->
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { getItemWithExpireTime } from "@/utils/common";
import { computed, defineProps } from "vue";
import { useRouter } from "vue-router";
import { commonNumber } from "@/utils/common";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const props = defineProps({
  list: { type: Array },
});
const isLogin = computed(() => {
  const userId = getItemWithExpireTime("userInfoObj")?.userId;
  if (userId !== null && userId !== undefined) return true;
  else return false;
});
const isCart = false;
const basketInfo = computed(()=>{
  return store.state.common.basketInfo;
});

// 장바구니 조회 api 호출
const getBasket = () =>{
  store.dispatch('common/getBasketView');
} 
// console.log('basketInfo',basketInfo.value);
// 장바구니 추가 api 호출
const addCartBtn = async (productId) =>{
  let count = 1;
  const addBasketinfo = {
    productId : productId,
    count : count,
  }
 
  await store.dispatch('common/addBasket',addBasketinfo);
} 
// 장바구니 삭제 api 호출
const delCartBtn = async (name) =>{
  console.log('basketInfo',basketInfo.value);
  basketInfo.value.filter((item)=>{
    name == item.product_name;
  });
  console.log('basketInfo',basketInfo.value);
  // name 

  console.log(name)
  await store.dispatch('common/delBasket',name);
} 

// detail page 
const clickProduct = (id) => {
  window.sessionStorage.setItem("productId", id);
  router.push(`/shop/products/detail/${id}`);
};

// created
getBasket();
</script>

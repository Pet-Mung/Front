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
              <span v-if="isCart">REMOVE CART</span>
              <span v-else>ADD CART +</span>
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
// 후에 api에서 cart 추가요청해야댐



const clickProduct = (id) => {
  window.sessionStorage.setItem("productId", id);
  router.push(`/shop/products/detail/${id}`);
};

</script>

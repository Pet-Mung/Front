<template>
  <div>
    <ul class="mb-30" v-if="props.list.length == 0 ">
      <li class="no_data" > 
        <img src="@/assets/img/nodata_icon.png" alt="no_data" />
        <p>데이터가 없습니다.</p>
      </li>
    </ul>
    <ul class="list_style">
   
      <li
        class="list_content"
        v-for="(item, index) in displayedPosts"
        :key="index"
        @click="clickProduct(item.id)"
      >
        <img :src="imageCheck(item.thumbnail)" :alt="item.name" class="pd-10" />
        <div class="txt_wrap pd-10">
          <p class="mb-10">{{ item.animal_category }} {{ item.category }}</p>
          <p class="mb-10 fb fs-18">{{ item.name }}</p>
          <div class="txt_flex">
            <p>{{ commonNumber(item.price) }}<span>원</span></p>
            <button type="button" class="btn-cart bx-shadow" v-if="isLogin">
              <span v-if="item.isCart" @click.stop="delCartBtn(item)"
                >Delete CART</span
              >
              <span v-else @click.stop="addCartBtn(item)">ADD CART +</span>
              <!-- <img src="@/assets/img/cart_icon.png" alt="cart" /> -->
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
  <PagingView
    :currentPage="currentPage"
    :totalPages="totalPages"
    :isEmpty="isEmpty"
    @changePage="changePage"
  />
</template>

<script setup>
import { getItemWithExpireTime, commonNumber, imageCheck} from "@/utils/common";
import PagingView from "@/components/comn/ComnPaging.vue";
import { computed, defineProps, ref, } from "vue";
import { useRouter } from "vue-router";
import { useStore, } from "vuex";
const store = useStore();
const router = useRouter();
const props = defineProps({
  list: { type: Array },
});
let currentPage = ref(1); //현재 페이지 번호
let postsperPage = 10; //한 페이지에 보여줄 게시글 갯수
let isEmpty = ref(false); //데이터 빈 값 여부
const totalPages = computed(() => {
  //총 페이지 수
  return Math.ceil(props.list.length / postsperPage);
});

// 현재 페이지에 해당하는 게시글 목록을 반환
const displayedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsperPage;
  const endIndex = startIndex + postsperPage;
  if (!props.list) return [];
  else return props.list.slice(startIndex, endIndex);
});
const isLogin = computed(() => {
  const userId = getItemWithExpireTime("userInfoObj")?.userId;
  if (userId !== null && userId !== undefined) return true;
  else return false;
});
const basketInfo = computed(() => {
  return store.state.user.basketInfo;
});
const user_idx = computed(() => {
    return getItemWithExpireTime("userInfoObj")?.user_idx;
});
// const arr = ref([...props.list]);
// 장바구니 조회 api 호출
const getBasket = async () => {
  await store.dispatch("user/getBasketView");
  // if (basketInfo.value.length >= 1) {
  //   console.log('aa')
  //   basketInfo.value.forEach((basket) => {
  //     arr.value.filter((item) => {
  //       if (item.name == basket.product_name) {
  //         item.isCart = true;
  //       } else {
  //         item.isCart = false;
  //       }
  //     });
  //   });
  // }
};

// 장바구니 추가 api 호출
const addCartBtn = async (item) => {
  let count = 1;
  const addBasketinfo = {
    productId: item.id,
    count: count,
  };
  await store.dispatch("user/addBasket", addBasketinfo);
  item.isCart = true;
  // getBasket();
};
// 장바구니 삭제 api 호출
const delCartBtn = (pdt) => {
  console.log("basketInfo", basketInfo.value);
  let nameArr = {};
  nameArr = basketInfo.value.filter((item) => {
    return pdt.name == item.product_name;
  });
  // nameArr.forEach((item) => {
  //   store.dispatch("common/delBasket", item.id);
  // });
  store.dispatch("user/delBasket", nameArr.id);
  pdt.isCart = false;
  // getBasket();
};

// detail page
const clickProduct = (id) => {
  window.sessionStorage.setItem("productId", id);
  router.push(`/shop/products/detail/${id}`);
};

//페이지 변경
const changePage = (str) => {
  if (str == "prev") currentPage.value--;
  else if (str == "next") currentPage.value++;
  else currentPage.value = str;
};
// created
if(user_idx.value) getBasket();


</script>


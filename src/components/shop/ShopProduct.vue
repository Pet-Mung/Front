<template>
  <div class="shop_wrap">
    <ul class="tab_cat_06 pt-20">
      <li :class="{ active: categoryName == 'ALL' }" @click="selectCtgy('ALL')">
        ALL
      </li>
      <li
        v-for="(item, idx) in ctgy"
        :key="item"
        @click="selectCtgy(item, idx)"
        :class="{ active: categoryName == item && mainPath == 'shop' }"
      >
        {{ item }}
      </li>
  
    </ul>
    <ul class="tab_cat_01 pt-20 pb-20">
      <li :class="{ active: animalTab === 1 }" @click="productDataChange(1)">
        ALL
      </li>
      <li :class="{ active: animalTab === 2 }" @click="productDataChange(2)">
        CAT SUPPLIES
      </li>
      <li :class="{ active: animalTab === 3 }" @click="productDataChange(3)">
        DOG SUPPLIES
      </li>
    </ul>
  </div>
  <ComnList :list="products" :tabChange="animalTab" />
</template>

<script setup>
import productApi from "@/api/productApi";
import { computed, onMounted, onUpdated, ref } from "vue";
import ComnList from "@/components/comn/ComnList.vue";
import { useStore } from "vuex";
import { sortData } from "@/utils/common.js";
import { useRoute, useRouter } from "vue-router";
const store = useStore();
const route = useRoute();
const router =useRouter();
const originalProducts = ref([]);
const products = ref([]);
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const categoryName = computed(() => {
  return store.state.product.category_name;
});
const isChange = computed(() => {
  return store.state.product.isChange;
});
const animalTab = computed(() => {
  return store.state.product.animalTab;
});
const thirdPath = computed(() => {
  return route.path.split("/")[3];
});
let ctgy = ref([]);
// 용품 카테고리 api 호출
const getCtgy = async () => {
  let result = await productApi.getCategory();
  ctgy.value = result;
};
//상품 정보 전체 조회 api 호출
const getAllProduct = async (num) => {
  try {
    const result = await productApi.viewAllProduct();
    if (categoryName.value == "ALL") {
      originalProducts.value = sortData(result);
      productDataChange(num);
    } else {
      let filterData = result.filter(
        (item) => categoryName.value == item.category
      );
      originalProducts.value = sortData(filterData);
      productDataChange(num);
    }
  } catch (error) {
    console.error(error);
  }
};

// tab 선택에 따라 data 변경
const productDataChange = (num) => {
  store.commit("product/setAnimalTab", num);
  if (animalTab.value === 1) {
    products.value = originalProducts.value;
  } else if (animalTab.value === 2) {
    products.value = originalProducts.value.filter((item) => {
      return item.animal_category == "고양이";
    });
  } else if (animalTab.value === 3) {
    products.value = originalProducts.value.filter((item) => {
      return item.animal_category == "강아지";
    });
  }
};

// 선택한 카테고리 이름 store 저장
const selectCtgy = (ctgyName, idx) => {
  idx += 1;
  store.commit("product/setCtgyName", ctgyName);
  if (idx) router.push(`/shop/products/${idx}`);
  else router.push(`/shop/products`);
};

// created
getCtgy();
store.commit('product/setFirstCtgy',thirdPath.value);

// mounted
onMounted(() => {
  getAllProduct(animalTab.value);
});

// updated
onUpdated(() => {
  if (isChange.value) {
    getAllProduct(animalTab.value);
    store.commit("product/setAnimalTab", animalTab.value);
  }
  store.commit("product/setIsChange", false);
});
</script>

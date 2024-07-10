<template>
  <div class="shop_wrap">
    <ul class="tab_cat_01 pt-20 pb-20">
      <li :class="{active : selectTab === 1}" @click="selectTab = 1">ALL</li>
      <li :class="{active : selectTab === 2}" @click="selectTab = 2">CAT SUPPLIES</li>
      <li :class="{active : selectTab === 3}" @click="selectTab = 3">DOG SUPPLIES</li>
    </ul>

  </div>
  <ListView :list="products"/>
</template>

<script setup>
import productApi from "@/api/productApi";
import { onMounted, ref, watch } from "vue";
import ListView from "@/components/public/ListView.vue";

let selectTab = ref(1);
const originalProducts = ref([]);
const products = ref([]);

//상품 정보 전체 조회 api 호출
const getAllProduct = async () => {
  try {
    const result = await productApi.viewAllProduct();
    originalProducts.value = [...result];
    console.log(originalProducts.value);
    productDataChange();
  } catch (error) {
    console.error(error);
  }
};

// tab 선택에 따라 data 변경
const productDataChange = () => {
  if(selectTab.value === 1){
    products.value = originalProducts.value;
  } else if(selectTab.value === 2){
    products.value = originalProducts.value.filter((item)=>{
      return item.animal_category == '고양이'
    });
  } else if(selectTab.value === 3){
    products.value = originalProducts.value.filter((item)=>{
      return item.animal_category == '강아지'
    });
  }
}

onMounted(() => {
  getAllProduct();
});
watch(selectTab,()=>{
  productDataChange();
})


</script>

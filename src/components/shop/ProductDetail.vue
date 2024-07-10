<template>
  <div>product detail</div>
  <div>product detail</div>
  <div>product detail</div>
  <div>product detail</div>
  <div>product detail</div>
  <div>product detail</div>
  <div>product detail</div>
  <img :src="product.image" alt="ss"/>
</template>

<script setup>
import productApi from "@/api/productApi";
import { computed, onMounted, reactive } from "vue";
const productId = computed(() => {
  return window.sessionStorage.getItem("productId");
});
const product = reactive({});
//상품 정보 전체 조회 api 호출
const getOnlyProduct = async () => {
  try {
    const result = await productApi.viewIndividualProduct(productId.value);
    product.value = result;
    console.log(product.value);
  } catch (error) {
    console.error(error);
  }
};
onMounted(()=>{
  getOnlyProduct();
})
</script>

<style lang="scss" scoped></style>

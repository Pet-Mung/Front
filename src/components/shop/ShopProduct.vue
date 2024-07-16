<template>
  <div class="shop_wrap">
    <ul class="tab_cat_01 pt-20 pb-20">
      <li :class="{ active: selectTab === 1 }" @click="selectTab = 1">ALL</li>
      <li :class="{ active: selectTab === 2 }" @click="selectTab = 2">
        CAT SUPPLIES
      </li>
      <li :class="{ active: selectTab === 3 }" @click="selectTab = 3">
        DOG SUPPLIES
      </li>
    </ul>
  </div>
  <ListView :list="products" />
</template>

<script setup>
import productApi from "@/api/productApi";
import { computed, onMounted, onUpdated, ref, watch } from "vue";
import ListView from "@/components/comn/ListView.vue";
import { useStore } from "vuex";
const store = useStore();
let selectTab = ref(1);
const originalProducts = ref([]);
const products = ref([]);
const categoryName = computed(() => {
  return store.state.common.category_name;
});
const isChange = computed(() => {
  return store.state.common.isChange;
});
//상품 정보 전체 조회 api 호출
const getAllProduct = async () => {
  try {
    const result = await productApi.viewAllProduct();
    if (categoryName.value == "ALL") {
      dataSorting(result);
    } else {
      let filterData = result.filter(
        (item) => categoryName.value == item.category
      );
      dataSorting(filterData);
    }
  } catch (error) {
    console.error(error);
  }
};

// sorting
const dataSorting = (data) => {
  let soltArr = [];
  let pattern = /[\D]/gi;
  soltArr = data.sort((a, b) => {
    let createdNumA = a.created_at.replaceAll(pattern, "");
    let updatedNumA =
      a.updated_at == null
        ? a.updated_at
        : a.updated_at.replaceAll(pattern, "") | 0;
    let createdNumB = b.created_at.replaceAll(pattern, "");
    let updatedNumB =
      b.updated_at == null
        ? b.updated_at
        : b.updated_at.replaceAll(pattern, "") | 0;
    let amax = createdNumA > updatedNumA ? createdNumA : a.updatedNumA;
    let bmax = createdNumB > updatedNumB ? createdNumB : a.updatedNumB;
    if (amax < bmax) return 1;
    else if (amax > bmax) return -1;
    else 0;
  });
  originalProducts.value = [...soltArr];
  productDataChange();
};

// tab 선택에 따라 data 변경
const productDataChange = () => {
  if (selectTab.value === 1) {
    products.value = originalProducts.value;
  } else if (selectTab.value === 2) {
    products.value = originalProducts.value.filter((item) => {
      return item.animal_category == "고양이";
    });
  } else if (selectTab.value === 3) {
    products.value = originalProducts.value.filter((item) => {
      return item.animal_category == "강아지";
    });
  }
};

onMounted(() => {
  getAllProduct();
});
onUpdated(() => {
  if (isChange.value) {
    getAllProduct();
    selectTab.value = 1;
  }
  store.commit("common/setIsChange", false);
});
watch(selectTab, () => {
  productDataChange();
});
</script>

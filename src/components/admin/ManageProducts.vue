<template>
  <div class="flex_center mb-20">
    <h3 class="fl text-center fs-30 pd-20">Manage Products</h3>
    <div class="pb-20 btn_area_r">
      <button class="confirm_btn" @click="createProduct()">상품 추가+</button>
    </div>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Idx</th>
          <th>판매자</th>
          <th>동물</th>
          <th>카테고리</th>
          <th>상품이름</th>
          <th>만든 날짜</th>
          <th>수정한 날짜</th>
          <th>수정</th>
        </tr>
      </thead>
      <tbody>
        <tr class="no_data" v-if="displayedPosts.length == 0">
          <img src="@/assets/img/nodata_icon.png" alt="no_data" />
          <p>데이터가 없습니다.</p>
        </tr>
        <tr v-for="product in displayedPosts" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.user_name }}</td>
          <td>{{ product.animal_category }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.created_at?.split("T")[0] }}</td>
          <td>
            {{
              product.updated_at == null
                ? "-"
                : product.updated_at?.split("T")[0]
            }}
          </td>
          <td @click="modifyProduct(product.id)">
            <img
              class="edit_icon"
              src="@/assets/img/edit_icon.png"
              alt="수정 버튼"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PagingView
    :currentPage="currentPage"
    :totalPages="totalPages"
    :isEmpty="isEmpty"
    @changePage="changePage"
  />
</template>

<script setup>
import productApi from "@/api/productApi";
import { sortData } from "@/utils/common.js";
import PagingView from "@/components/public/PagingView.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
let list = ref([]);
let currentPage = ref(1); //현재 페이지 번호
let postsperPage = 5; //한 페이지에 보여줄 게시글 갯수
let isEmpty = ref(false); //데이터 빈 값 여부
const totalPages = computed(() => {
  //총 페이지 수
  return Math.ceil(list.value.length / postsperPage);
});

// 현재 페이지에 해당하는 게시글 목록을 반환
const displayedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsperPage;
  const endIndex = startIndex + postsperPage;
  if (!list.value) return [];
  else return list.value.slice(startIndex, endIndex);
});

//상품 정보 전체 조회 api 호출
const getAllProduct = async () => {
  try {
    const result = await productApi.viewAllProduct();
    list.value = sortData(result);
    isEmpty = list.value.length == 0 ? true : false;
  } catch (error) {
    console.error(error);
  }
};

// 추가하기 이벤트리스너
const createProduct = () => {
  window.sessionStorage.removeItem("click_pdt_idx");
  router.push(`products/0`);
};

// 수정하기 이벤트리스너
const modifyProduct = (id) => {
  window.sessionStorage.setItem("click_pdt_idx", id);
  router.push(`products/${id}`);
};

//페이지 변경
const changePage = (str) => {
  if (str == "prev") currentPage.value--;
  else if (str == "next") currentPage.value++;
  else currentPage.value = str;
};

// created
getAllProduct();
</script>

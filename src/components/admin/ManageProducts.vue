<template>
  <div class="flex_center">
    <h3 class="fl text-center fs-30 pd-20">Manage Products</h3>
    <form @submit.prevent="uploadProduct" class="product-form">
      <div class="pdt_input">
        <label for="name">상품명</label>
        <input type="text" id="name" v-model="product.name" required />
      </div>
      <div class="pdt_select">
        <div class="pdt_input">
          <label for="animalCategory">동물 카테고리</label>
          <select id="animalCategory" v-model="product.animalCategory" required>
            <option value="" disabled>카테고리를 선택하세요</option>
            <option value="고양이">고양이</option>
            <option value="강아지">강아지</option>
          </select>
        </div>
        <div class="pdt_input">
          <label for="category">카테고리</label>
          <select id="category" v-model="product.category" required>
            <option value="" disabled>카테고리를 선택하세요</option>
            <option value="사료">사료</option>
            <option value="간식">간식</option>
            <option value="장난감">장난감</option>
            <option value="노즈워크">노즈워크</option>
            <option value="케어용품">케어용품</option>
            <option value="계절상품">계절상품</option>
            <option value="기타용품">기타용품</option>
          </select>
        </div>
      </div>
      <div class="pdt_select">
        <div class="pdt_input">
          <label for="price">가격</label>
          <input type="number" id="price" v-model="product.price" required />
        </div>
        <div class="pdt_input">
          <label for="count">개수</label>
          <input type="number" id="count" v-model="product.count" required />
        </div>
      </div>
      <div class="pdt_input">
        <label for="image">이미지 첨부</label>
        <!-- <input type="text" id="image" required /> -->
        <div class="custom-file">
          <input id="customFile" type="file" @change="readInputFile" multiple />
        </div>
      </div>
      <div id="imagePreview" ref="imagePreview" class="image_preview">
        <img id="img" />
      </div>
      <div class="pdt_input diff_input">
        <label for="content">상품 설명</label>
        <textarea id="content" v-model="product.content" required></textarea>
      </div>
      <div class="flex_center">
        <button type="submit" class="btn_type_01">상품 등록하기</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import productApi from "@/api/productApi";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
const imagePreview = ref(null);
const selectedFiles = ref([]);
const imageUrls = ref([]);
const product = reactive({
  name: "",
  category: "",
  price: "",
  count: "",
  content: "",
  animalCategory: "",
});
const readInputFile = (e) => {
  imagePreview.value.innerHTML = "";
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
  selectedFiles.value = fileArr;
  // 초기화
  imageUrls.value = [];

  fileArr.forEach((file) => {
    if (!file.type.match("image/.*")) {
      alert("이미지 확장자만 업로드 가능합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;

      imagePreview.value.appendChild(img);

      imagePreview.value.querySelectorAll("img").forEach((element) => {
        element.style.width = "100px";
      });
      imageUrls.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  });
};

const uploadProduct = async () => {
  if (selectedFiles.value.length === 0) {
    alert("업로드할 파일을 선택하세요.");
    return;
  }
  const productData = {
    product_create: {
      name: product.name,
      animal_category: product.animalCategory,
      category: product.category,
      price: product.price,
      count: product.count,
      content: product.content,
      image: imageUrls.value,
    },
  };
  try {
    const result = await productApi.postProduct(productData);
    if (result) {
      alert("등록완료");
      router.go();
    }
    console.log("result", result);
  } catch (error) {
    console.error("업로드 에러", error);
  }
};
</script>

<style lang="scss" scoped></style>

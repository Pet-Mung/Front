<template>
  <div>
    <!-- <h1>Manage Products</h1> -->
    <form @submit.prevent="uploadProduct" class="product-form flex">
      <div>
        <label for="name">상품명:</label>
        <input type="text" id="name" v-model="productName" required />
      </div>
      <div>
        <label for="category">카테고리:</label>
        <select id="category" v-model="productCategory" required>
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
      <div>
        <label for="price">가격:</label>
        <input type="number" id="price" v-model="productPrice" required />
      </div>
      <div>
        <label for="count">개수:</label>
        <input type="number" id="count" v-model="productCount" required />
      </div>
      <div>
        <label for="content">상품 설명:</label>
        <textarea id="content" v-model="productContent" required></textarea>
      </div>
      <div>
        <label for="image">이미지 첨부:</label>
        <!-- <input type="text" id="image" required /> -->
        <div class="custom-file">
          <input id="customFile" type="file" @change="readInputFile" multiple />
        </div>
        <br />
        <div id="imagePreview" ref="imagePreview">
          <img id="img" />
        </div>
      </div>
      <button type="submit">상품 등록하기</button>
    </form>
  </div>
</template>

<script setup>
// import { API } from "@/api/apiAuth";
import productApi from "@/api/productApi";
// import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();

const imagePreview = ref(null);
const selectedFiles = ref([]);
const imageUrls = ref("");

const productName = ref("");
const productCategory = ref("");
const productPrice = ref("");
const productCount = ref("");
const productContent = ref("");

const readInputFile = (e) => {
  // const imagePreview = this.$refs.imagePreview;
  imagePreview.value.innerHTML = "";

  const files = e.target.files;

  const fileArr = Array.prototype.slice.call(files);
  // console.log(fileArr);

  selectedFiles.value = fileArr;
  imageUrls.value = "";
  // console.log(selectedFiles.value);

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
      // console.log(imagePreview.value.querySelector("img"));
      imagePreview.value.querySelectorAll("img").forEach((element) => {
        element.style.width = "100px";
      });
      // imagePreview.value.querySelectorAll("img").style.width = "100px";
      // console.log(imageUrls);
      // imageUrls.value.push(e.target.result);
      imageUrls.value = e.target.result;
      // imageUrls.value += e.target.result + ",";
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
    name: productName.value,
    category: productCategory.value,
    price: productPrice.value,
    count: productCount.value,
    content: productContent.value,
    image: imageUrls.value,
  };
  try {
    const response = await productApi.postProduct(productData);
    console.log("response", response);
    alert("등록완료");
    router.go();
  } catch (error) {
    console.error("업로드 에러", error);
  }
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  // align-items: center;
}
.product-form {
  flex-direction: column;
  row-gap: 20px;
  padding-bottom: 100px;
  label {
    font-size: 16px;
    padding-right: 10px;
  }
  .custom-file {
    padding-top: 12px;
  }
  button {
    padding: 10px;
    background-color: bisque;
    // display: inline;
    width: 120px;
    border-radius: 15px;
  }
}
</style>

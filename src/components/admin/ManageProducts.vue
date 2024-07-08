<template>
  <div>
    <h1>Manage Products</h1>
    <form action="">
      <div>
        <label for="name">상품명:</label>
        <input type="text" id="name" required />
      </div>
      <div>
        <label for="category">카테고리:</label>
        <input type="option" id="category" required />
      </div>
      <div>
        <label for="price">가격:</label>
        <input type="number" id="price" required />
      </div>
      <div>
        <label for="count">개수:</label>
        <input type="number" id="count" required />
      </div>
      <div>
        <label for="content">상품 설명:</label>
        <textarea id="content" required></textarea>
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
      <button @click="uploadFiles" type="button">상품 등록하기</button>
    </form>
  </div>
</template>

<script setup>
import productApi from "@/api/productApi";
// import axios from "axios";
import { ref } from "vue";

const imagePreview = ref(null);
const selectedFiles = ref([]);

const readInputFile = (e) => {
  // const imagePreview = this.$refs.imagePreview;
  imagePreview.value.innerHTML = "";

  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
  console.log(fileArr);

  selectedFiles.value = fileArr;
  console.log(selectedFiles.value);

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
    };
    reader.readAsDataURL(file);
  });
};

const uploadFiles = async () => {
  if (selectedFiles.value.length === 0) {
    alert("업로드할 파일을 선택하세요.");
    return;
  }

  const formData = new FormData();
  selectedFiles.value.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await productApi.postProduct(formData);
    console.log("response", response);
  } catch (error) {
    console.error("업로드 에러", error);
  }
};
</script>

<style lang="scss" scoped></style>

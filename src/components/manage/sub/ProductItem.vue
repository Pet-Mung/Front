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
            <option :value="item" v-for="item in animalCtgy" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
        <div class="pdt_input">
          <label for="category">카테고리</label>
          <select id="category" v-model="product.category" required>
            <option value="" disabled>카테고리를 선택하세요</option>
            <option :value="item" v-for="item in ctgy" :key="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="pdt_select">
        <div class="pdt_input">
          <label for="price">가격</label>
          <input
            type="number"
            id="price"
            v-model.trim="product.price"
            required
          />
        </div>
        <div class="pdt_input">
          <label for="count">개수</label>
          <input
            type="number"
            id="count"
            v-model.trim="product.count"
            required
          />
        </div>
      </div>
      <div class="pdt_input">
        <label for="image">대표 이미지 첨부</label>
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
      </div>
      <quill-editor
        :value="product.content"
        :options="state.editorOption"
        @change="onEditorChange($event)"
      >
      </quill-editor>
      <div class="flex_center">
        <button type="submit" class="btn_type_01">상품 등록하기</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import productApi from "@/api/productApi";
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const product_id = computed(() => {
  return window.sessionStorage.getItem("click_pdt_idx");
});
const imagePreview = ref(null);
const imageUrls = ref([]);
const product = reactive({
  name: "",
  animalCategory: "",
  category: "",
  price: "",
  count: "",
  content: "",
});
const ctgy = ref([]);
const animalCtgy = ref([]);

const state = reactive({
  content: "",
  _content: "",
  editorOption: {
    placeholder: "내용을 입력해주세요...",
    modules: {
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], //style color:rgb
        [{ font: [] }], //글꼴 class
        [{ align: [] }],
        ["clean"],
        ["link", "image", "video"],
      ],
    },
  },
  disabled: false,
});

const onEditorChange = ({ quill, html, text }) => {
  console.log("onEditorChange :", quill, html, text);
  // state._content = html;
  product.content = html;
};
// const onEditorFocus = (editor) => {
//   console.log("onEditorFocus", editor);
// };
// const onEditorBlur = (editor) => {
//   console.log("onEditorBlur", editor);
// };
// const onEditorReady = (editor) => {
//   console.log("onEditorReady", editor);
// };

// 개별 상품 get api 호출
const getProduct = async () => {
  try {
    const result = await productApi.viewIndividualProduct(product_id.value);
    product.name = result.name;
    product.animalCategory = result.animal_category;
    product.category = result.category;
    product.price = result.price;
    product.content = result.content;
    product.count = result.count;
    imageUrls.value = result.image;
    result.image.forEach((el) => {
      const img = document.createElement("img");
      img.src = el;
      imagePreview.value.appendChild(img);
      imagePreview.value.querySelectorAll("img").forEach((element) => {
        element.style.width = "100px";
      });
    });
  } catch (error) {
    console.error(error);
  }
};

// 용품 카테고리 api 호출
const getCtgy = async () => {
  let result = await productApi.getCategory();
  ctgy.value = result;
};
// 동물 카테고리 api 호출
const getAniCtgy = async () => {
  let result = await productApi.getAnimalCategory();
  animalCtgy.value = result;
};
const readInputFile = (e) => {
  imagePreview.value.innerHTML = "";
  const files = e.target.files;
  const fileArr = Array.prototype.slice.call(files);
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
  if (imageUrls.value.length === 0) {
    alert("업로드할 파일을 선택하세요.");
    return;
  }
  try {
    // 수정인 경우
    if (product_id.value) {
      const updatedData = {
        updated_product: {
          name: product.name,
          animal_category: product.animalCategory,
          category: product.category,
          price: product.price,
          count: product.count,
          content: product.content,
          image: imageUrls.value,
        },
      };
      const result = await productApi.editProduct(
        product_id.value,
        updatedData
      );
      if (result) {
        alert("수정완료");
        router.push("/manage/products");
      }
      // 생성인 경우
    } else {
      const createData = {
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
      const result = await productApi.postProduct(createData);
      if (result) {
        alert("등록완료");
        router.push("/manage/products");
      }
    }
  } catch (error) {
    console.error("업로드 에러", error);
  }
};
// created
getCtgy();
getAniCtgy();
if (product_id.value) getProduct();
</script>
<style lang="scss" scoped>
.ql-toolbar.ql-snow + .ql-container.ql-snow {
  height: 400px;
}
</style>

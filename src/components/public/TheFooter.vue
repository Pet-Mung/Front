<template>
  <!-- footer -->
  <div class="footer_wrap">
    <footer>
      <ul class="footer-list">
        <li>
          <ul class="each-list">
            <li>MENU</li>
            <li @click="goProduct(1)">ALL</li>
            <li @click="goProduct(2)">고양이</li>
            <li @click="goProduct(3)">강아지</li>
          </ul>
        </li>
        <li class="mlr-50">
          <dl>
            <dt>주소 :</dt>
            <dd>서울시 어쩌구 저쩌구</dd>
          </dl>
          <dl>
            <dt>이메일</dt>
            <dd>97poolbbang@naver.com</dd>
          </dl>
          <dl>
            <dt>전화번호 :</dt>
            <dd>010 - 9954 - 8079</dd>
          </dl>
          <small>Copyrights ⓒ PET MUNG</small>
        </li>
        <li>
          <ul class="each-list">
            <li>Support</li>
            <li><router-link to="/icons">아이콘 저작권</router-link></li>
            <li><a href="#">본사오시는길</a></li>
            <li><a href="#">고객지원</a></li>
          </ul>
        </li>
      </ul>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

const goProduct = (idx) => {
  router.push(`/shop/products`);
  store.commit("product/setAnimalTab", idx);
  store.commit("product/setIsChange", true);
  store.commit("product/setCtgyName", "ALL");
};
</script>

<style lang="scss" scoped></style>

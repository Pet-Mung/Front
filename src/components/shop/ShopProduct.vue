<template>
  <div class="shop-wrapper">
    <section class="shop-pdt">
      <ul class="pdt-list">
        <li
          class="pdt-list-con"
          v-for="(product, index) in products"
          :key="index"
        >
          <router-link :to="'/shop/products/detail'">
            <img :src="product.image" alt="" />
          </router-link>
          <div class="txt-wrap">
            <p class="pdt-name">
              <router-link :to="'/shop/products/detail'">{{
                product.name
              }}</router-link>
            </p>
            <div class="pdt-price">
              <router-link :to="'/shop/products/detail'">
                <p class="price">{{ product.price }}<span>원</span></p>
              </router-link>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <!-- <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li>
        <li class="pdt-list-con">
          <a href="">
            <img src="@/assets/img/love_cat.jpg" alt="" />
          </a>
          <div class="txt-wrap">
            <p class="pdt-name">
              <a href="">츄르</a>
            </p>
            <div class="pdt-price">
              <a href="">
                <p class="price">30,000<span>원</span></p>
              </a>
            </div>
            <button type="button" class="btn-cart">
              <span class="hide">장바구니 담기/삭제</span>
            </button>
          </div>
        </li> -->
      </ul>
    </section>
  </div>
</template>

<script setup>
import productApi from "@/api/productApi";
import { onMounted, ref } from "vue";

const products = ref([]);

const getAllProduct = async () => {
  try {
    const result = await productApi.viewAllProduct();
    products.value = result;
    console.log(products.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getAllProduct();
});
</script>

<style lang="scss" scoped>
.shop-wrapper {
  margin-bottom: 200px;
}
.hide {
  display: none;
}
.flex {
  display: flex;
  align-items: center;
}
.shop-pdt {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;

  .pdt-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* 4열 그리드 */
    gap: 20px;
    width: 100%;

    .pdt-list-con {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      img {
        max-width: 100%;
        height: auto;
        display: block;
        aspect-ratio: 1;
      }

      .txt-wrap {
        margin-top: 10px;
        position: relative;
        width: 100%;

        .pdt-name {
          margin-bottom: 4px;
        }

        .btn-cart {
          position: absolute;
          right: 9px;
          bottom: -1px;
          z-index: 5;
          width: 20px;
          height: 20px;
          background: url(@/assets/img/cart.png) no-repeat center top;
          background-size: cover;
        }
      }
    }
  }
}
</style>

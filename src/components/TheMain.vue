<template>
  <!-- <div>메인 페이지입니다.</div> -->
  <div class="main-wrapper">
    <section class="main-banner">
      <SliderView :flag="flag" :sliderData="bannerData" />
      <!-- <div class="flex">
        <div class="text">
          <p><strong>몸에 좋은 원료를 울 강쥐 사료에</strong> 담다</p>
          <span>몸에 좋은 이유는 어쩌구저쩌구</span>
        </div>
        <img src="@/assets/img/nemo_cat.jpg" alt="" />
      </div> -->
    </section>
    <section class="new">
      <h4>이 물품은 어떠세요?</h4>
      <ul class="pdt-list">
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
      </ul>
    </section>
  </div>
</template>

<script setup>
import SliderView from "@/components/comn/ComnSlider.vue";
let flag = 3;

let bannerData = [
  {
    title : '고양이용 참치 통조림',
    backgroundImage : require('@/assets/img/banner_01.jpg'),
    content : '클레오티드가 먼저 수용체를 활성화하고 아미노산이 이를 강화시켰다. 또 고양이는 다른 음식의 감칠맛보다 참치가 지닌 감칠맛에 더 강하게 반응했다.',
    
  },
  {
    title : 'cat Bed',
    backgroundImage : require('@/assets/img/banner_02.jpg'),
    content : 'Stylish & Unique Homeware. \n 8 stylish pet buys for the home',
    
  }
]
</script>

<style lang="scss" scoped>
.main-wrapper {
  margin-bottom: 200px;
}
.hide {
  display: none;
}
.flex {
  display: flex;
  align-items: center;
}
section {
  margin-bottom: 70px;
}
.main-banner {
  // background-image: url("@/assets/img/cat.jpg");
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: cover;
  background-color: bisque;
  height: 300px;
  .flex {
    height: 100%;
    max-width: 1200px;
    width: 90%;
    margin: 0 auto;
    justify-content: space-between;
    img {
      height: 100%;
    }
  }
  .text {
    p {
      font-size: 32px;
    }
    span {
      font-size: 16px;
    }
  }
}

.new {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  h4 {
    font-size: 24px;
    margin-bottom: 20px;
  }
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

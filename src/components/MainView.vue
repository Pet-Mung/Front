<template>
  <!-- <div>메인 페이지입니다.</div> -->
  <section>
    <div class="main-banner">
      <div class="flex">
        <div class="text">
          <p><strong>몸에 좋은 원료를 울 강쥐 사료에</strong> 담다</p>
          <span>몸에 좋은 이유는 어쩌구저쩌구</span>
        </div>
        <img src="@/assets/img/nemo_cat.jpg" alt="" />
      </div>
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
body {
  margin-bottom: 200px;
}
.main_wrap {
  max-width: none !important;
  width: 100% !important;
}
.flex {
  display: flex;
  align-items: center;
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
</style>

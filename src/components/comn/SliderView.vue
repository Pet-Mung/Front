<template>
  <div v-if="props.flag == 1 ">
    <Carousel
      v-bind="settings"
      :breakpoints="breakpoints"
      :mouseDrag="mouseDrag"
      :touchDrag="touchDrag"
    >
      <Slide class="" v-for="slide in props.sliderData" :key="slide">
        <div class="carousel__item">
          <img :src="slide.image" :alt="slide.name" class="slide_img" />
          <p>{{ slide.name }}</p>
          <p>{{ slide.count }}</p>
        </div>
      </Slide>
      <template #addons>
        <Navigation v-if="props.sliderData.length > 8" />
      </template>
    </Carousel>
  </div>

  <div v-if="props.flag == 2" class="slider_area">
    <Carousel
      v-bind="settings"
      :autoplay="5000"
      :wrap-around="true"
    >
      <Slide class="" v-for="(slide,idx) in props.sliderData" :key="slide">
        <div class="carousel__item">
          <img :src="slide" :alt="`상품사진 ${idx}`" class="slide_img" />
        </div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Carousel, Slide, Navigation, Pagination } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
const props = defineProps({
  sliderData: { type: Array },
  flag : {type : Number},
});

const settings = {
  itemsToShow: 1.5,
  snapAlign: "center",
};
const breakpoints = {
  // 500px and up
  500: {
    itemsToShow: 3,
    snapAlign: "start",
  },
  // 700px and up
  700: {
    itemsToShow: 5,
    snapAlign: "start",
  },
  // 1024 and up
  1024: {
    itemsToShow: 5,
    snapAlign: "start",
  },
};
// const breakpoint = {
//   300 : {
//     itemsToShow: 1.5,
//     snapAlign: "middle",
//   }

// };
const mouseDrag = props.sliderData?.length >= 8 ? true : false;
const touchDrag = props.sliderData?.length >= 8 ? true : false;
</script>

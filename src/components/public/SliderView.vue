<template>
  <div>
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
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";
const props = defineProps({
  sliderData: { type: Array },
});

const settings = {
  itemsToShow: 1.5,
  snapAlign: "start",
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
const mouseDrag = props.sliderData.length >= 8 ? true : false;
const touchDrag = props.sliderData.length >= 8 ? true : false;
</script>

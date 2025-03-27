<template>
  <div class="bigdata-analytics-banner" v-if="block">
    <carousel
      ref="carousel"
      :autoplay="true"
      :loop="true"
      :smartSpeed="1000"
      :autoplaySpeed="true"
      :autoplayTimeout="5000"
      :perPageCustom="[
        [0, 1],
        [576, 1],
        [768, 1],
        [1024, 1],
        [1200, 1],
      ]"
    >
      <slide>
        <a
          class="banner"
          v-if="block.page_default.data.attributes.imageUrl"
          :style="{
            'background-image': `url(${block.page_default.data.attributes.imageUrl})`,
          }"
        ></a>
        <a 
          v-else
          href=""
          class="banner"
          :style="{
            'background-image': `url(${$config.BASE_URL_IMG}${block.page_default.data?.attributes?.image.data?.attributes?.url})`,
          }"
        >
        </a>
      </slide>
    </carousel>
  </div>
</template>
<script>
export default {
  name: "BannerAuto",
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    nextSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getNextPage());
    },
    prevSlide() {
      this.$refs.carousel.goToPage(this.$refs.carousel.getPreviousPage());
    },
  },
};
</script>

<template>
  <div class="" v-if="block">
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
      <!-- <slide v-for="item in block.items" :key="item.id">
        <a  :href="item.url" class="banner" style="width: 100%;">
          <img :src="$config.BASE_URL_IMG + item.image.data?.attributes?.url" />
        </a>
      </slide> -->
      <div class="banner" style="width: 100%">
        <img
          v-if="block?.attributes?.imageUrl"
          :src="block?.attributes?.imageUrl"
        />
        <img
          v-else
          :src="
            $config.BASE_URL_IMG +
            block?.attributes?.image?.data?.attributes?.url
          "
        />
      </div>
    </carousel>
  </div>
</template>
<script>
export default {
  name: "BannerShop",
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
<style lang="scss" scoped>
.banner {
  width: 100%;
  img {
    width: 100%;
  }
}
</style>

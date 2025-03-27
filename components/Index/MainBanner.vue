<template>
  <div class="bigdata-analytics-banner">
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
      v-if="product"
    >
      <template v-for="item in banners">
        <slide v-if="item.enabledBanner !== false" :key="item.id">
          <img v-if="item?.imageUrl" :src="item?.imageUrl" />
          <a 
            v-else
            :href="`/${item.slug}`"
            class="banner"
            :style="{
              'background-image': `url(${$config.BASE_URL_IMG}${item.image})`,
            }"
          >
          </a>
        </slide>
      </template>
    </carousel>
    <a
      style="position: absolute; top: 50%; left: 25px"
      @click.prevent="prevSlide"
      ><span class="arrow" style="transform: rotate(180deg)"></span
    ></a>
    <a
      style="position: absolute; top: 50%; right: 25px"
      @click.prevent="nextSlide"
      ><span class="arrow"></span
    ></a>
  </div>
</template>
<script>
export default {
  name: "MainBanner",
  props: {
    product: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      banners: [],
    };
  },
  mounted() {
    this.product.child_categories.data.forEach((items) => {
      items?.attributes?.ListPages.forEach((item) => {
        this.banners.push({
          image: item?.page_default?.data?.attributes?.imageUrl
            ? item?.page_default?.data?.attributes?.imageUrl
            : item?.page_default?.data?.attributes?.image?.data?.attributes?.url,
          slug: item?.page_default?.data?.attributes?.slug,
          enabledBanner: item?.page_default?.data?.attributes?.enabledBanner,
          orderBannerHome:
            item?.page_default?.data?.attributes?.orderBannerHome,
        });
      });
    });
    this.banners = this.banners.sort((a, b) => {
      return a.orderBannerHome - b.orderBannerHome;
    });
    this.banners = this.banners.sort(function (a, b) {
      return (a.orderBannerHome === null) - (b.orderBannerHome === null);
    });
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

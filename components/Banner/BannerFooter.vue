<template>
  <div>
    <swiper
      class="enable swiper"
      v-if="activeBanners?.length > 0"
      :options="swiperOption"
    >
      <template v-for="banner in banners">
        <SwiperSlide v-if="showBanner(banner)" class="banner" :key="banner.id">
          <a  :href="banner?.link" style="display: block">
            <img
              width="100%"
              :src="
                banner?.imageUrl
                  ? banner?.imageUrl
                  : $config.BASE_URL_IMG + banner?.image.data.attributes.url
              "
              alt=""
            /> </a
        ></SwiperSlide>
      </template>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <ContactFooter class="contact" />
    <div class="space" v-if="activeBanners?.length > 0"></div>
    <div class="space active"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  props: ["banners"],
  components: {
    Swiper,
    SwiperSlide,
  },
  computed: {
    activeBanners() {
      let currentDate = new Date();
      return this.banners?.filter((banner) => {
        let startDate = new Date(banner.startDate);
        let endDate = new Date(banner.endDate);
        return startDate <= currentDate && currentDate <= endDate;
      });
    },
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      },
    };
  },
  methods: {
    showBanner(banner) {
      let currentDate = new Date();
      const start = Date.parse(banner.startDate);
      const end = Date.parse(banner.endDate);
      return currentDate >= start && currentDate <= end;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  width: 100%;
  // z-index: 997;
  z-index: 96;
}
.enable {
  position: fixed;
  bottom: 60px;
  left: 0;
  right: 0;
  // height: 65px;
  width: 100%;

  z-index: 997;
  .swiper {
    width: 100%;
    .banner {
      width: 100%;
    }
  }
}
// .space {
//   height: 65px;
// }
.space {
  height: 65px;
  &.active {
    height: 60px;
  }
}
@media (max-width: 768px) {
  .space {
    height: 50px;
    &.active {
      height: 50px;
    }
  }
  .enable {
    display: none;
  }
}
</style>

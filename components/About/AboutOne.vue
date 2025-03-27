<template>
  <section class="about-area ptb-80" v-if="block">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="ml-about-img">
            <img
              data-wow-delay="0.6s"
              class="wow fadeInDown animated"
              style="visibility: visible; animation-delay: 0.6s"
              v-if="block.imageUrl"
              :src="block.imageUrl"
            />
            <nuxt-img
              :src="block.image.data?.attributes?.url"
              data-wow-delay="0.6s"
              alt="big-monitor"
              class="wow fadeInDown animated"
              style="visibility: visible; animation-delay: 0.6s"
              provider="strapi"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="ml-about-content">
            <p class="sub-title">{{ block.subTitle }}</p>
            <h2>
              {{ block.title }}
            </h2>
            <div class="bar"></div>
            <span v-html="block.description"></span>
            <a 
              v-if="block.btnUrl"
              :href="block.btnUrl"
              class="btn btn-secondary"
              >{{ block.btnText }}</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutOne",
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
};
</script>

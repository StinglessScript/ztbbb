<template>
  <div class="about-area ptb-80">
    <div v-if="block !== null" class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <div class="about-image">
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
          <div class="about-content">
            <div class="section-title">
              <h2>{{ block.title }}</h2>
              <div class="bar"></div>
              <span v-html="block.description"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutTwo",

  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

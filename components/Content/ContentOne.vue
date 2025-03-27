<template>
  <section class="features-area-two ptb-80" v-if="block !== null">
    <div class="container">
      <div
        class="row justify-content-center align-items-center"
        v-for="item in block.contents"
        :key="item.id"
      >
        <div class="col-lg-6 col-md-12 services-content">
          <div class="section-title">
            <h2>{{ item.title }}</h2>
            <div class="bar"></div>
            <span
              v-html="
                `${item.detail}`.replace(
                  /\/uploads\//g,
                  `${$config.baseURL}/uploads/`
                )
              "
            ></span>
          </div>
          <a 
            v-if="item.btnUrl"
            :href="item.btnUrl"
            class="btn btn-primary"
          >
            {{ item.btnText }}
          </a>
        </div>
        <div class="col-lg-6 col-md-12">
          <img
            v-if="item?.imageUrl"
            :src="item?.imageUrl"
            data-wow-delay="0.6s"
            alt="big-monitor"
            class="wow fadeInDown animated"
            style="visibility: visible; animation-delay: 0.6s"
          />
          <nuxt-img
            v-else
            :src="item.image.data.attributes.url"
            data-wow-delay="0.6s"
            alt="big-monitor"
            class="wow fadeInDown animated"
            style="visibility: visible; animation-delay: 0.6s"
            provider="strapi"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContentOne",
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

<style lang="scss" scoped></style>

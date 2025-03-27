<template>
  <section class="pricing-area ptb-80 bg-f7fafd">
    <div class="container">
      <div class="section-title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.description }}
        </p>
      </div>
      <div class="row">
        <div
          class="col-lg-4 col-md-6 col-sm-6"
          v-for="pricing in block.pricings"
          :key="pricing.id"
        >
          <div class="single-pricing-table">
            <div class="pricing-header">
              <img v-if="pricing?.imageUrl" :src="pricing?.imageUrl" />
              <nuxt-img
                :src="pricing.image.data?.attributes?.url"
                :atl="pricing.title"
                provider="strapi"
              />
              <h3>{{ pricing.title }}</h3>
            </div>
            <div class="price">
              <span
                >{{ pricing.price }}<span> VNĐ/{{ pricing.unit }}</span></span
              >
            </div>
            <div class="pricing-features">
              <span v-html="pricing.detail"></span>
            </div>
            <div class="pricing-footer">
              <a  :href="pricing.btnUrl" class="btn btn-primary">{{
                pricing.btnText
              }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shape8 rotateme">
      <img src="/img/shape2.27038015.svg" alt="shape" />
    </div>
    <div class="shape2 rotateme">
      <img src="/img/shape2.27038015.svg" alt="shape" />
    </div>
    <div class="shape7"><img src="/img/shape4.f044bf53.svg" alt="shape" /></div>
    <div class="shape4"><img src="/img/shape4.f044bf53.svg" alt="shape" /></div>
  </section>
</template>

<script>
export default {
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

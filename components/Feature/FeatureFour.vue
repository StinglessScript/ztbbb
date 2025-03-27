<template>
  <section class="why-choose-us ptb-80">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="section-title">
            <h2>{{ block.title }}</h2>
            <div class="bar"></div>
            <p>
              {{ block.description }}
            </p>
          </div>
          <div class="why-choose-us-image">
            <div class="why-choose-us-image">
              <img
                v-if="block?.imageUrl"
                :src="block?.imageUrl"
                class="main-pic wow fadeInUp"
                alt="main-pic"
              />
              <nuxt-img
                v-else
                :src="block.image.data.attributes.url"
                class="main-pic wow fadeInUp"
                alt="main-pic"
                provider="strapi"
              />
            </div>
            <img
              v-if="block?.imageUrl"
              :src="block?.imageUrl"
              class="main-pic wow fadeInUp"
              alt="main-pic"
            />
            <nuxt-img
              v-else
              :src="block.image.data.attributes.url"
              alt="main-pic"
              provider="strapi"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12">
          <div class="row">
            <div
              class="col-lg-6 col-md-6 col-sm-6"
              v-for="feature in block.features"
              :key="feature.id"
            >
              <div class="single-why-choose-us">
                <div class="icon"><i :class="feature.flaticon"></i></div>
                <h3>{{ feature.name }}</h3>
                <span v-html="feature.detail"> </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

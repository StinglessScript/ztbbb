<template>
  <div class="features-area ptb-80 bg-eef6fd" v-if="block">
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
          class="col-lg-6 col-md-6 col-sm-6 mb-2"
          v-for="feature in block.features"
          :key="feature.id"
        >
          <div
            class="single-features"
            :class="{ active: !feature.image.data && !feature.name }"
          >
            <!-- <div class="icon" v-if="feature.image.data">
              <nuxt-img
                :src="feature.image.data?.attributes?.url"
                alt="main-pic"
                provider="strapi"
              />
            </div> -->

            <h3 v-if="feature.name">
              <a href="#">{{ feature.name }}</a>
            </h3>
            <p v-html="feature.description"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureFive",

  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  // created: async function(){
  //     this.features = await this.$strapi.find('features-pages'+'?populate=*')
  //     this.features = this.features.data
  // }
};
</script>
<style lang="scss" scoped>
.single-features {
  padding-left: 40px;
}
</style>

<template>
  <div v-if="block">
    <!-- <MainBanner :product="solutions" /> -->
    <div class="services-area ptb-80">
      <div class="container">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-lg-6 col-md-12 services-content">
            <div class="section-title">
              <a  :href="`/giai-phap/}`"
                ><h2>{{ block?.header.title }}</h2></a
              >
              <div class="bar"></div>
              <p>{{ block?.header.description }}</p>
            </div>

            <div class="row" v-if="block?.features">
              <div
                class="col-lg-6 col-md-6 col-sm-6"
                v-for="item in block?.features"
                :key="item?.id"
              >
                <a  class="box" :href="item?.url">
                  <feather :type="item?.icon"></feather>
                  <p>{{ item?.name }}</p>
                </a>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 services-right-image">
            <img v-if="block?.imageUrl" :src="block?.imageUrl" />
            <nuxt-img
              v-else-if="!block?.imageUrl && block?.image !== null"
              :src="block?.image?.data?.attributes?.url"
              width="350"
              class="wow fadeInDown"
              v-wow
              data-wow-delay="0.6s"
              alt="main-pic"
              provider="strapi"
            />
            <img
              v-else
              src="~/assets/img/services-right-image/cercle-shape.png"
              class="bg-image rotateme"
              alt="shape"
            />
            <div v-if="block?.image !== null">
              <nuxt-img
                :src="block?.image?.data?.attributes?.url"
                width="350"
                class="wow fadeInDown"
                v-wow
                data-wow-delay="0.6s"
                alt="main-pic"
                provider="strapi"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "featureTwo",
  components: {},
  data() {
    return {};
  },

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
<style lang="scss" scoped>
.services-area:nth-of-type(2n-1) {
  background: #f7fafd;
  .row {
    flex-direction: row-reverse;
    .row {
      flex-direction: row;
    }
  }
}
</style>
<style>
@media (max-width: 768px) {
  .ptb-80 {
    padding-top: 40px;
  }
}
</style>

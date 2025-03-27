<template>
  <div class="pricing-area ptb-80 bg-f9f6f6">
    <div class="container">
      <div class="section-title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>{{ block.header.description }}</p>
      </div>

      <div class="row justify-content-center">
        <div
          v-for="item in block.pricings"
          class="col-lg col-md-6 col-sm-6 mb-4"
          :class="{
            'col-lg-4': block.pricings.length < 3 || block.pricings.length > 4,
          }"
          :key="item.id"
        >
          <ProductCsCard :item="item" />

          <!-- <div class="pricing-table">
            <div class="pricing-header">
              <h3>{{ item.name }}</h3>
            </div>

            <div class="price" v-if="item.price">
              <div
                class="originalPrice"
                :class="{ active: item.originalPrice }"
              >
                <span>{{ item.originalPrice }}</span>
              </div>
              <span>{{ item.price }}</span>
              <span class="sale" v-if="item.originalPrice"
                >- {{ handleSale(item.price, item.originalPrice) }} %</span
              >
              <div class="unit">
                <span> VNĐ/ {{ item.unit }}</span>
              </div>
            </div>

            <div class="pricing-features active">
              <span v-html="`${item.detail}`.replace(
                /\/uploads\//g,
                `${$config.baseURL}/uploads/`
              )"></span>
            </div>

            <div class="pricing-footer">
              <a
                v-if="`${item.btnUrl}`.includes('http')"
                :href="item.btnUrl"
                target="_blank"
                class="btn btn-primary"
                >{{ item.btnText }}</a
              >
              <a  v-else :href="item.btnUrl" class="btn btn-primary">{{
                item.btnText
              }}</a>
            </div>
          </div> -->
        </div>
      </div>
      <div class="row" v-if="block.note">
        <div class="col-lg-6 col-md-0 col-sm-0"></div>
        <div class="col-lg-6 col-md-12 col-sm-12">
          <span v-html="block.note"></span>
        </div>
      </div>
    </div>

    <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
    <div class="shape7"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape4"><img src="~/assets/img/shape4.svg" /></div>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape4 from "~/assets/img/shape4.svg";
import ProductCsCard from "@/components/Product/ProductCsCard.vue";

export default {
  name: "Pricing",
  components: {
    Shape2,
    Shape4,
    ProductCsCard,
  },
  props: {
    block: {
      type: Object,
      default: {},
    },
  },

  methods: {
    handleSale(price, originalPrice) {
      price = price.replaceAll(".", "");
      originalPrice = originalPrice.replaceAll(".", "");
      return (100 - (Number(price) / Number(originalPrice)) * 100).toFixed();
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  padding-bottom: 20px;
}
.pricing-area:nth-of-type(2n-1) {
  background: #eef6fd;
}
</style>

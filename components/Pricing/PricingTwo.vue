<template>
  <div class="pricing-area ptb-80" v-if="block">
    <div class="container">
      <div class="section-title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.description }}
        </p>
      </div>
      <div class="tab pricing-tab bg-color">
        <b-card no-body>
          <b-tabs
            content-class="mt-3"
            align="center"
            active-nav-item-class="current"
          >
            <b-tab
              v-for="(pricings, index) in block.tabs"
              :key="index"
              :title="pricings.name"
            >
              <div class="tabs_item">
                <div
                  class="row justify-content-center"
                  style="margin-bottom: 16px"
                >
                  <div
                    v-for="item in pricings.pricings"
                    class="col-lg-3 col-md-6 col-sm-6 mb-4"
                    :key="item.id"
                  >
                    <div class="pricing-table" style="padding-bottom: 75px">
                      <div class="pricing-header h-100">
                        <h3 ref="name">{{ item.name }}</h3>
                      </div>
                      <div class="price">
                        <div
                          class="originalPrice"
                          :class="{ active: item.originalPrice }"
                        >
                          <span>{{ item.originalPrice }}</span>
                        </div>
                        <span>{{ item.price }}</span>
                        <span class="sale" v-if="item.originalPrice"
                          >-
                          {{ handleSale(item.price, item.originalPrice) }}
                          %</span
                        >
                        <div class="unit">
                          <span> VNĐ/ {{ pricings.unit }}</span>
                        </div>
                      </div>

                      <div class="pricing-features active">
                        <span v-html="`${item.detail}`"></span>
                      </div>

                      <div class="pricing-footer">
                        <a
                          v-if="`${item.btnUrl}`.includes('http')"
                          :href="item.btnUrl"
                          target="_blank"
                          class="btn btn-primary"
                          >{{ item.btnText }}</a
                        >
                        <a 
                          v-else
                          :href="item.btnUrl"
                          class="btn btn-primary"
                          >{{ item.btnText }}</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>

    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg"/>
    </div>
    <div class="shape3"><img src="~/assets/img/shape3.svg"/></div>
    <div class="shape4"><img src="~/assets/img/shape4.svg"/></div>
    <div class="shape6 rotateme">
      <img src="~/assets/img/shape4.svg"/>
    </div>
    <div class="shape7"><img src="~/assets/img/shape4.svg"/></div>
    <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg"/>
    </div>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";
export default {
  name: "PricingTwo",
  components: {
    Shape2,
    Shape3,
    Shape4,
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

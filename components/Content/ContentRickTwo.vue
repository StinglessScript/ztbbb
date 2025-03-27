<template>
  <div class="pricing-area ptb-80" v-if="block">
    <div class="container">
      <div class="section-title" v-if="block.header">
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
              v-for="(content, index) in block.contents"
              :key="index"
              :title="content.title"
            >
              <span
                v-html="
                  `${content.detail}`.replace(
                    /\/uploads\//g,
                    `${$config.baseURL}/uploads/`
                  )
                "
              ></span>
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
  components: {
    Shape2,
    Shape3,
    Shape4,
  },
  name: "PricingTwo",

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

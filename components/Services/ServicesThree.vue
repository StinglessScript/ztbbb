<template>
  <div class="solutions-area ptb-80">
    <div class="container" v-if="block">
      <div class="section-title" v-if="block.header">
        <span class="sub-title">{{ block.header.subTitle }}</span>
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.descriptione }}
        </p>
      </div>

      <div class="row g-4">
        <div
          class="col-lg-3 col-sm-6 col-md-6"
          v-for="service in block.services"
          :key="service.id"
        >
          <div class="single-solutions-box">
            <div class="icon">
              <img v-if="service?.imageUrl" :src="service?.imageUrl" />
              <nuxt-img
                :src="service.image.data?.attributes?.url"
                style="width: 48px"
                provider="strapi"
              />
            </div>
            <h3>
              <a  :href="service.url">{{ service.title }}</a>
            </h3>
            <p>
              {{ service.description }}
            </p>
            <a 
              v-if="service.url"
              :href="service.url"
              class="learn-more-btn"
              ><feather :type="block.icon"></feather>
              {{ service.btnText }}</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="shape1"><img src="~/assets/img/shape1.png" alt="shape" /></div>
    <div class="shape2 rotateme">
      <Shape2 />
    </div>
    <div class="shape3"><Shape3 /></div>
    <div class="shape4"><Shape4 /></div>
    <div class="shape6 rotateme">
      <Shape4 />
    </div>
    <div class="shape7"><Shape4 /></div>
    <div class="shape8 rotateme">
      <Shape2 />
    </div>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";
export default {
  name: "ServicesThree",
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

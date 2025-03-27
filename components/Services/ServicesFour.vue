<template>
  <section class="solutions-area ptb-80" v-if="block">
    <div class="container">
      <div class="section-title" v-if="block.header.title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.description }}
        </p>
      </div>
      <div class="row">
        <div class="col-lg-4 col-sm-6 col-md-6" v-for="service in block.services" :key="service.id">
          <div class="solutions-box">
            <div class="icon">
              <feather :type="service.icon"></feather>
              <img
                src="data:image/png;base64,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"
                alt="image" />
            </div>
            <h3>
              <a href="#"> {{ service.title }}</a>
            </h3>
            <p v-html="service.description"/>
              <!-- {{ service.description }} -->
  
            <a :href="service.slug" class="learn-more-btn" v-if="service.slug">
              <feather type="plus-circle"></feather>

              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="shape2 rotateme">
      <!-- <img src="/img/shape2.27038015.svg" alt="shape" /> -->
      <img src="~/assets/img/shape1.png"/>
<!-- <Shape2/> -->
    </div>
    <!-- <div class="shape3"><img src="/img/shape3.78dc5ae6.svg" alt="shape" /></div>
    <div class="shape4"><img src="/img/shape4.f044bf53.svg" alt="shape" /></div> -->
    <div class="shape3"><img src="~/assets/img/shape3.svg"/></div>
    <div class="shape4"><img src="~/assets/img/shape4.svg"/></div>
    <div class="shape6 rotateme">
      <!-- <img src="/img/shape4.f044bf53.svg" alt="shape" /> -->
      <img src="~/assets/img/shape4.svg"/>
    </div>
    <div class="shape8 rotateme">
      <!-- <img src="/img/shape2.27038015.svg" alt="shape" /> -->
      <img src="~/assets/img/shape2.svg"/>
    </div>
  </section>
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

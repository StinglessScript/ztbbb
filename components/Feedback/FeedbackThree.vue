<template>
  <div class="ml-feedback-area ptb-80">
    <div class="container">
      <div class="section-title">
        <h2>Our Clients Feedback</h2>
        <div class="bar"></div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

      <div class="ml-feedback-slides">
        <carousel
          :autoplay="true"
          :loop="true"
          :smartSpeed="1000"
          :autoplaySpeed="true"
          :autoplayTimeout="5000"
          :perPageCustom="[
            [0, 1],
            [576, 1],
            [768, 1],
            [1024, 1],
            [1200, 1],
          ]"
          v-if="feedbacks !== []"
        >
          <slide v-for="feedback in feedbacks" :key="feedback.id">
            <div class="single-ml-feedback-item">
              <div class="client-info">
                <nuxt-img
                  :src="feedback?.attributes?.img.data?.attributes?.url"
                  alt="image"
                  provider="strapi"
                />
                <h3>{{ feedback?.attributes?.name }}</h3>
                <span>{{ feedback?.attributes?.position }}</span>
              </div>
              <p>{{ feedback?.attributes?.shortDesc }}</p>
              <div class="rating">
                <feather type="star"></feather>
                <feather type="star"></feather>
                <feather type="star"></feather>
                <feather type="star"></feather>
                <feather type="star"></feather>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>

    <div class="shape1"><img src="~/assets/img/shape1.png" alt="shape" /></div>
    <div class="shape2 rotateme"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape3"><img src="~/assets/img/shape3.svg" /></div>
    <div class="shape4"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape6 rotateme"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape7"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape8 rotateme"><img src="~/assets/img/shape4.svg" /></div>
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
  name: "FeedbackTwo",

  data() {
    return {
      feedbacks: [],
    };
  },
  created: async function () {
    this.feedbacks = await this.$strapi.find("feedback-pages" + "?populate=*");
    this.feedbacks = this.feedbacks.data;
  },
};
</script>

<template>
  <div class="ml-feedback-area ptb-80" v-if="block">
    <div class="container">
      <div class="section-title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.description }}
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
          <slide v-for="feedback in block.feedbacks" :key="feedback.id">
            <div class="single-ml-feedback-item">
              <div class="client-info">
                <img v-if="feedback?.imageUrl" :src="feedback?.imageUrl" />
                <nuxt-img
                  v-else-if="!feedback?.imageUrl && feedback.image.data"
                  :src="feedback.image.data.attributes.url"
                  alt="image"
                  provider="strapi"
                />
                <span>{{ feedback.position }}</span>
              </div>
              <h3>{{ feedback.name }}</h3>
              <p>{{ feedback.content }}</p>
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
    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
    <div class="shape3"><img src="~/assets/img/shape3.svg" /></div>
    <div class="shape4"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape6 rotateme">
      <img src="~/assets/img/shape4.svg" />
    </div>
    <div class="shape7"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg" />
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
  name: "FeedbackTwo",

  data() {
    return {
      feedbacks: [],
    };
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

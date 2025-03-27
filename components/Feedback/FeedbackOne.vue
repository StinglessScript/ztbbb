<template>
  <div class="feedback-area ptb-80 bg-f7fafd" v-if="block">
    <div class="container">
      <div class="section-title">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>{{ block.header.description }}</p>
      </div>

      <div class="feedback-slides">
        <div class="client-feedback">
          <div>
            <slick ref="slick" :options="slickOptions" :asNavFor="$refs.slick2">
              <div
                class="item"
                v-for="feedback in block.feedbacks"
                :key="feedback.id"
              >
                <div class="single-feedback">
                  <div class="client-img">
                    <img v-if="feedback?.imageUrl" :src="feedback?.imageUrl" />
                    <nuxt-img
                      v-else
                      :src="feedback.image.data.attributes.url"
                      provider="strapi"
                    />
                  </div>

                  <h3>{{ feedback.name }}</h3>
                  <span>{{ feedback.position }}</span>
                  <p>{{ feedback.content }}</p>
                </div>
              </div>
            </slick>
          </div>
        </div>

        <div class="client-thumbnails">
          <div>
            <slick
              ref="slick2"
              :asNavFor="$refs.slick"
              :options="slickOptions2"
            >
              <div
                class="item"
                v-for="feedback in block.feedbacks"
                :key="feedback.id"
              >
                <div class="img-fill">
                  <img v-if="feedback?.imageUrl" :src="feedback?.imageUrl" />
                  <nuxt-img
                    v-else
                    :src="feedback.image.data.attributes.url"
                    provider="strapi"
                  />
                </div>
              </div>
            </slick>
          </div>

          <button class="prev-arrow slick-arrow">
            <feather type="arrow-left"></feather>
          </button>

          <button class="next-arrow slick-arrow">
            <feather type="arrow-right"></feather>
          </button>
        </div>
      </div>
    </div>

    <div class="shape1"><img src="~/assets/img/shape1.png" alt="shape" /></div>
    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
    <div class="shape4"><img src="~/assets/img/shape4.svg" /></div>
    <div class="shape5"><img src="~/assets/img/shape5.png" alt="shape" /></div>
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

import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";

export default {
  components: {
    Shape2,
    Shape3,
    Shape4,
    Slick,
  },
  name: "FeedbackOne",
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      slickOptions: {
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        fade: true,
        autoplay: true,
        draggable: true,
        prevArrow: ".client-feedback .prev-arrow",
        nextArrow: ".client-feedback .next-arrow",
      },
      slickOptions2: {
        slidesToShow: 5,
        slidesToScroll: 1,
        cssEase: "linear",
        autoplay: true,
        centerMode: true,
        draggable: false,
        focusOnSelect: true,
        prevArrow: ".client-thumbnails .prev-arrow",
        nextArrow: ".client-thumbnails .next-arrow",
      },
    };
  },

  methods: {
    next() {
      this.$refs.slick.next();
    },

    prev() {
      this.$refs.slick.prev();
    },
  },
};
</script>

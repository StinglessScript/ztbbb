<template>
  <div class="free-trial-area" v-if="block">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="free-trial-image">
            <img v-if="block?.imageUrl" :src="block?.imageUrl" />
            <nuxt-img
              :src="block.image.data?.attributes?.url"
              :atl="block.heading"
              provider="strapi"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-12">
          <div class="free-trial-content">
            <h2>{{ block.heading }}</h2>

            <form class="newsletter-form">
              <input
                type="email"
                class="input-newsletter"
                placeholder="Nhập email của bạn ở đây .."
              />
              <button type="submit">{{ block.btnText }}</button>
            </form>

            <p>
              {{ block.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="shape2 rotateme">
      <Shape2 />
    </div>
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
import Shape4 from "~/assets/img/shape4.svg";
export default {
  name: "TrialOne",
  components: {
    Shape2,
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

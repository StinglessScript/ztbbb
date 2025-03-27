<template>
  <section class="features-area-two ptb-80">
    <div class="container">
      <div class="row h-100 justify-video-center align-items-center">
        <div class="col-lg-12 col-md-12 services-video">
          <div class="section-title">
            <h2>{{ block.header.title }}</h2>
            <div class="bar"></div>
            <p>{{block.header.description}}</p>
            <iframe
              id="uChpe"
              height="450"
              :src="block.url"
              allowfullscreen=""
              class="video-box"
              style="border: none; width: 100%"
            ></iframe>
          </div>
        </div>
        <div class="col-lg-8 col-md-12 justify-item-center"></div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped></style>

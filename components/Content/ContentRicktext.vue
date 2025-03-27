<template>
  <section class="blog-details-area ptb-80">
    <div class="container">
      <div class="section-title" v-if="block.header">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
      </div>
      <div class="blog-details-desc">
        <div class="article-content">
          <span
            v-html="
              `${block.detail}`.replace(
                /\/uploads\//g,
                `${$config.baseURL}/uploads/`
              )
            "
          ></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContentRicktext",
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
};
</script>
<style lang="scss">
.article-content{
  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

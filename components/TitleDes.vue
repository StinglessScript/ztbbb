<template>
  <div class="features-area ptb-80 pb-2 bg-eef6fd" v-if="block">
    <div class="container">
      <div class="section-title">
        <h2>{{ block?.title }}</h2>
        <div class="bar"></div>
        <p class="mb-2" v-for="item in block?.descriptions" :key="item.id">
          {{ item.content }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TitleDes",

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

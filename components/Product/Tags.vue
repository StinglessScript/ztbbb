<template>

    <div class="widget widget_tag_cloud">
      <h3 class="widget-title">Tags</h3>
      <div class="tagcloud">
        <a href="#" v-for="tag in tags" :key="tag.id">{{ tag.name }}</a>
      </div>
    </div>

</template>

<script>
export default {
  data() {
    return {
      tags: null,
    };
  },
  mounted() {
    this.getProductTags();
  },
  methods: {
    getProductTags() {
      this.$store
        .dispatch("getProductTags")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.tags = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

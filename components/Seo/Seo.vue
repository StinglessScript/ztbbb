<template></template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  head() {
    return {
      title: this.block?.metaTitle,
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          // href: this.$store.state.host + this.$route.path,
          href: this.$route.path,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.block?.metaDescription,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.block?.metaDescription,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.block?.metaTitle,
        },
        {
          hid: "og:site_name",
          name: "og:site_name",
          content: "Long Van",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.block?.metaKeywords,
        },
        {
          hid: "image",
          name: "image",
          content: this.block?.imageUrl
            ? this.block?.imageUrl
            : this.block?.urlImage
            ? this.block?.urlImage
            : this.block?.image.data
            ? `${this.$config.BASE_URL_IMG}${this.block?.image.data?.attributes?.url}`
            : "",
        },
        {
          hid: "og:image",
          name: "og:image",
          content: this.block?.imageUrl
            ? this.block?.imageUrl
            : this.block?.urlImage
            ? this.block?.urlImage
            : this.block?.image.data
            ? `${this.$config.BASE_URL_IMG}${this.block?.image.data?.attributes?.url}`
            : "",
        },
        {
          hid: "og:type",
          name: "og:type",
          content: `website`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>

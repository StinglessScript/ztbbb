<template>
  <section class="domain-search-area ptb-80">
    <div class="container">
      <div class="domain-search-content">
        <h2>{{ block?.title }}</h2>

        <form
          class="d-lg-flex justify-content-between"
          method="post"
          :action="url + params"
          enctype="application/x-www-form-urlencoded"
        >
          <div class="mobile">
            <input
              type="text"
              name="domain-search"
              id="domain-search"
              v-model="params"
              :placeholder="block?.placeholder"
              class="form-control"
            />
          </div>
          <button type="submit">{{ block?.btnText }}</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "DomainTwo",
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      url: "https://support.longvan.net/domain/tim-kiem-domain.xhtml?ten-mien=",
      params: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.form-control {
  width: 100% !important;
}
.domain-price {
  // margin: 20px 0 10px;
  display: flex;
  justify-content: space-between;

  .domain-price-item {
  }
}
</style>

<template>
  <section class="boxes-area ptb-80">
    <div class="container">
      <div class="section-title" v-if="block.header">
        <h2>{{ block.header.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block.header.description }}
        </p>
      </div>
      <div class="row">
        <div
          class="col-lg-3 col-md-6 col-sm-6 mb-4"
          v-for="(service, index) in block.services"
          :key="service.id"
        >
          <div class="single-box" :class="listColor[index]">
              <div class="icon" v-if="service.icon">
                <feather :type="service.icon"></feather>
              </div>
              <h3>{{ service.title }}</h3>
              <p v-html="service.detail"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesSix",
  data() {
    return {
      listColor: [
        "",
        "bg-f78acb",
        "bg-c679e3",
        "bg-eb6b3d",
        "bg-c679e3",
        "",
        "bg-f78acb",
        "bg-c679e3",
        "",
        "bg-eb6b3d",
        "bg-f78acb",
        "bg-eb6b3d",
      ],
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

<style lang="scss" scoped>
.boxes-area {
  margin-top: 0;
}
</style>

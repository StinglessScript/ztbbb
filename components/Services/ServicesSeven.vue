<template>
  <section class="repair-why-choose-us ptb-80">
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
          class="col-lg-4 col-md-6 col-sm-6 mb-4"
          v-for="service in block.services"
          :key="service.id"
        >
          <div class="single-repair-box">
            <div class="icon"><i :class="service.flaticon"></i></div>
            <h3>{{ service.title }}</h3>
            <p>
              {{ service.description }}
            </p>
            <a  v-if="service.url" :href="service.url">
              <feather type="arrow-right"></feather>
            </a>
            <div class="back-icon"><i :class="service.flaticon"></i></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesSeven",

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

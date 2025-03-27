<template>
  <div class="row ptb-80 justify-content-center">
    <div class="col-lg-10 col-md-6 col-sm-6">
      <div class="single-pricing-table">
        <div class="pricing-header">
          <i v-for="icons in icon" :key="icons.id" :class="icons" class="mr-4"
            >{{ icons }}
          </i>
        </div>
      </div>
    </div>
    <ProductEx/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: [
        "flaticon-cloud",
        "flaticon-data",
        "flaticon-vps",
        "flaticon-shield",
        "flaticon-team",
        "flaticon-rocket",
        "flaticon-diamond",
        "flaticon-money",
        "flaticon-data-1",
        "flaticon-dashboard",
        "flaticon-support",
        "flaticon-star",
        "flaticon-star-1",
        "flaticon-star-2",
        "flaticon-plus",
        "flaticon-line",
        "flaticon-monitor",
        "flaticon-idea",
        "flaticon-layout",
        "flaticon-hard-disk",
        "flaticon-smartphone",
        "flaticon-reload",
        "flaticon-laptop",
        "flaticon-update-arrows",
        "flaticon-handshake",
        "flaticon-repair",
        "flaticon-delivery-truck",
        "flaticon-left-quote",
        "flaticon-software",
        "flaticon-gear",
        "flaticon-skyline",
        "flaticon-car-insurance",
        "flaticon-factory",
        "flaticon-chip",
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>

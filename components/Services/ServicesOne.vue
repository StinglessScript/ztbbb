<template>
  <section class="services-area-two ptb-80 bg-f9f6f6">
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
          class="col-lg-4 col-md-6 col-sm-6"
          v-for="service in block.services"
          :key="service.id"
        >
          <div class="single-services-box">
            <div class="icon">
              <feather :type="service.icon"></feather>
            </div>
            <h3>
              {{ service.title }}
            </h3>
            <p>
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ServicesOne",

  data() {
    return {
      services: [],
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
.services-area-two {
  padding-bottom: 50px;
}

.single-services-box {
  position: relative;
  background: #ffffff;
  margin-bottom: 30px;
  border-radius: 5px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  padding-left: 20px;
  padding-top: 30px;
  padding-right: 20px;
  padding-bottom: 30px;
}

.single-services-box h3 {
  font-size: 18px;
  margin-top: 25px;
  margin-bottom: 15px;
}

.single-services-box .icon {
  text-align: center;
  width: 55px;
  height: 55px;
  line-height: 70px;
  background: #cdf1d8;
  border-radius: 50%;
  color: #44ce6f;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.single-services-box .icon.bg-c679e3 {
  color: #c679e3;
  background: #edc3fc;
}

.single-services-box .icon.bg-eb6b3d {
  color: #eb6b3d;
  background: rgba(235, 107, 61, 0.3);
}

.single-services-box::before,
.single-services-box::after {
  content: "";
  position: absolute;
  width: 0;
  height: 4px;
  background: #44ce6f;
  opacity: 0;
  visibility: hidden;
  bottom: 0;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}

.single-services-box::before {
  left: 0;
}

.single-services-box::after {
  right: 0;
}

.single-services-box:hover {
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  -webkit-box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
}

.single-services-box:hover .icon {
  background: #44ce6f;
  color: #ffffff;
}

.single-services-box:hover .icon.bg-c679e3 {
  background: #c679e3;
}

.single-services-box:hover .icon.bg-eb6b3d {
  background: #eb6b3d;
}

.single-services-box:hover::after,
.single-services-box:hover::before {
  opacity: 1;
  visibility: visible;
  width: 50%;
}
</style>

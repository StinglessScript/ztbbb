<template>
  <div>
    <div class="agency-services-area ptb-80" v-if="block">
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
            class="col-lg-4 col-sm-6 col-md-6"
            v-for="service in block.services"
            :key="service.id"
          >
            <div class="agency-services-box">
              <img v-if="service?.imageUrl" :src="service?.imageUrl" />
              <nuxt-img
                v-else-if="!service?.imageUrl && service.image.data"
                :src="service.image.data.attributes.url"
                :atl="service.title"
                provider="strapi"
              />
              <div class="content">
                <h3>
                  <a href="#">{{ service.title }}</a>
                </h3>
                <a href="#" class="read-more-btn">Read More </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="shape2 rotateme">
        <img src="/img/shape2.27038015.svg" alt="shape" />
      </div>
      <div class="shape3">
        <img src="/img/shape3.78dc5ae6.svg" alt="shape" />
      </div>
      <div class="shape4">
        <img src="/img/shape4.f044bf53.svg" alt="shape" />
      </div>
      <div class="shape6 rotateme">
        <img src="/img/shape4.f044bf53.svg" alt="shape" />
      </div>
      <div class="shape7">
        <img src="/img/shape4.f044bf53.svg" alt="shape" />
      </div>
      <div class="shape8 rotateme">
        <img src="/img/shape2.27038015.svg" alt="shape" />
      </div>
    </div>
  </div>
</template>

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
};
</script>

<style lang="scss" scoped>
.agency-services-area {
  padding-bottom: 50px;
  position: relative;
  z-index: 1;
  background: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#d5fefd),
    color-stop(#e1fdff),
    color-stop(#effdff),
    color-stop(#fafdff),
    to(#ffffff)
  );
  background: linear-gradient(
    to top,
    #d5fefd,
    #e1fdff,
    #effdff,
    #fafdff,
    #ffffff
  );
}

.agency-services-box {
  margin-bottom: 30px;
  text-align: center;
}

.agency-services-box img {
  height: 285px;
  border-radius: 7px;
}

.agency-services-box .content {
  -webkit-transition: 0.5s;
  transition: 0.5s;
  background: #ffffff;
  position: relative;
  border-radius: 7px;
  padding: 25px;
  -webkit-box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.05);
  margin-left: 15px;
  margin-right: 15px;
  margin-top: -30px;
}

.agency-services-box .content h3 {
  -webkit-transition: 0.5s;
  transition: 0.5s;
  font-size: 20px;
  margin-bottom: 0;
}

.agency-services-box .content .read-more-btn {
  display: inline-block;
  border-radius: 30px;
  padding: 9px 25px;
  border: 1px solid #e6e6e6;
  background-color: #ffffff;
  position: absolute;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  bottom: -22px;
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  font-weight: 500;
}

.agency-services-box .content .read-more-btn i {
  position: relative;
  top: 3px;
}

.agency-services-box .content .read-more-btn svg {
  width: 15px;
  margin-left: 2px;
}

.agency-services-box .content .read-more-btn:hover {
  background-color: #44ce6f;
  border-color: #44ce6f;
  color: #ffffff;
}

.agency-services-box:hover .content {
  -webkit-transform: translateY(-20px);
  transform: translateY(-20px);
}

.agency-services-box:hover .content h3 {
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
}

.agency-services-box:hover .content .read-more-btn {
  opacity: 1;
  visibility: visible;
}
</style>

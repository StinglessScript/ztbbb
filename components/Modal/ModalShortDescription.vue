<template>
  <div>
    <div
      style="
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #02020250;
        margin-top: 0px !important;
        cursor: pointer;
      "
      @click="handleShowModal('')"
    ></div>
    <div
      class="widget-area widget-area-modal w80 w30"
      style="
        position: fixed;
        top: 10%;
        z-index: 1000;
        padding: 0 15px 0 15px;
        background-color: #fff;
        height: 550px;
        overflow: auto;
        transform: translateX(-50%);
        left: 50%;
        border-color: rgb(68, 206, 111) !important;
        border: 2px solid rgb(68, 206, 111) !important;
        border-top-width: 4px !important;
        border-radius: 20px;
      "
      id="secondary"
    >
      <div style="position: relative; height: auto; padding: 10px">
        <div class="d-flex justify-content-between">
          <div></div>
          <div
            style="
              text-align: center;
              font-size: 18px;
              font-weight: 600;
              color: #44ce6f;
            "
          >
            {{ dataProduct?.title }}
          </div>
          <span style="cursor: pointer" @click="handleShowModal('')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="12"
              fill="#4caf50"
              viewBox="0 0 384 512"
            >
              <path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </span>
        </div>
        <div class="widget widget_categories">
          <div v-html="dataDes"></div>
        </div>

        <div
          v-if="!dataDes"
          style="
            position: fixed;
            background-color: rgba(155, 151, 151, 0.26);
            z-index: 999;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
          "
        >
          <div class="logo-bg"></div>
          <div class="loader-bg"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["handleShowModal", "dataProduct"],
  data() {
    return {
      dataDes: null,
    };
  },

  mounted() {
    console.log("🚀 ~ mounted ~ this.dataProduct:", this.dataProduct)
    if (
      this.dataProduct?.shortDescription ||
      this.dataProduct?.short_description
    ) {
      this.dataDes = this.dataProduct?.shortDescription
        ? this.dataProduct?.shortDescription
        : this.dataProduct?.short_description;
    }
  },
};
</script>

<style>
@media (max-width: 768px) {
  .w80 {
    width: 80% !important;
  }

  .w100 {
    width: 100% !important;
  }
}

.w30 {
  width: 30%;
}

.loader-bg {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -90px;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 2px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

.logo-bg {
  height: 55px;
  width: 55px;
  background-image: url("~/assets/img/logo-lvs.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -75px;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>

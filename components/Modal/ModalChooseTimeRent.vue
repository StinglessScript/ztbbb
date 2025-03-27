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
      "
      @click="handleCloseModal"
      v-if="showModale == true"
    ></div>
    <div
      v-if="showModale == true"
      class="widget-area widget-area-modal"
      :class="showModale ? 'widget-area-modal' : 'widget-area-modal-close'"
      style="
        position: fixed;
        top: 35%;
        z-index: 1000;
        padding: 15px;
        background-color: #fff;
        height: 490px;
        overflow: auto;
        width: 100%;
      "
      id="secondary"
    >
      <div style="display: flex; flex-direction: column; gap: 0.5rem">
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding-bottom: 10px;
          "
        >
          <div style="font-weight: 500; font-size: 16px">
            {{ dataModalTimesMobile?.productOrColocation?.title }}
            <!-- {{
              dataModalTimesMobile?.colocation
                ? ` - ${dataModalTimesMobile?.colocation?.title}`
                : ""
            }} -->
          </div>
          <div @click="handleCloseModal">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="red"
                stroke="red"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 7L7 17M7 7l10 10"
              />
            </svg>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem">
          <div
            class="hover-select"
            v-for="itemDiscount in dataModalTimesMobile?.productOrColocation
              ?.dataDiscount"
            style="display: flex; justify-content: space-between"
            @click="
              handleChooseTimeRent(
                itemDiscount,
                dataModalTimesMobile?.productOrColocation,
                dataModalTimesMobile?.type,
                dataModalTimesMobile?.item
              )
            "
            :class="
              itemDiscount?.time == (rent?.time || rent?.data) ? 'active' : ''
            "
          >
            <div class="d-flex flex-column gap-2" style="width: 100%">
              <div
                v-if="dataModalTimesMobile?.productOrColocation"
                class="d-flex justify-content-between"
              >
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    {{ itemDiscount?.time }}
                    {{
                      dataModalTimesMobile?.productOrColocation?.unitDTO?.name
                    }}
                  </div>
                  <small
                    v-if="
                      dataModalTimesMobile?.productOrColocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    "
                    style="color: rgb(24, 127, 56)"
                  >
                    {{
                      dataModalTimesMobile?.productOrColocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    }}</small
                  >
                </div>
                <div
                  style="color: rgb(24, 127, 56); font-weight: 600"
                  class="d-flex flex-column"
                >
                  <div class="d-flex justify-content-end">
                    {{
                      convertPrice(
                        dataModalTimesMobile?.productOrColocation?.dataDiscount?.find(
                          (c) => c.time == itemDiscount?.time
                        )?.price * itemDiscount?.time
                      )
                    }}
                  </div>
                  <small
                    v-if="
                      dataModalTimesMobile?.productOrColocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.oldPrice
                    "
                    style="
                      color: #8f8e8e;
                      text-decoration: line-through;
                      font-size: 13px;
                    "
                    v-for="d in dataModalTimesMobile?.productOrColocation?.dataDiscount?.find(
                      (c) => c.time == itemDiscount?.time
                    )?.oldPrice"
                  >
                    {{ convertPrice(d?.priceDiscount) }}
                  </small>
                </div>
              </div>
              <!-- <div
                v-if="dataModalTimesMobile?.colocation"
                class="d-flex justify-content-between"
              >
                <div class="d-flex flex-column">
                  <div>
                    {{ itemDiscount?.time }}
                    {{ dataModalTimesMobile?.colocation?.unitDTO?.name }}
                  </div>
                  <small
                    v-if="
                      dataModalTimesMobile?.colocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    "
                    style="color: rgb(24, 127, 56)"
                  >
                    {{
                      dataModalTimesMobile?.colocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    }}</small
                  >
                </div>
                <div style="color: rgb(24, 127, 56); font-weight: 600">
                  {{
                    convertPrice(
                      dataModalTimesMobile?.colocation?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.price * itemDiscount?.time
                    )
                  }}
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import component
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
// import theme
import "vue-slider-component/theme/default.css";
import SVGMenu from "~/assets/img/list.svg";
import SVGFilter from "~/assets/img/filter-2.svg";
import SVTag from "~/assets/img/label.svg";

// import theme
export default {
  name: "CategorySidebar",
  props: ["showModale", "dataModalTimesMobile", "rent"],
  components: {
    VueSlider,
    SVGMenu,
    SVGFilter,
    SVTag,
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {
    handleCloseModal() {
      this.$emit("handleVisibleMultipleTimeMobile", null);
    },

    handleChooseTimeRent(item, data, type, packageData) {
      //console.log("🚀 ~ handleChooseTimeRent ~ item, data, type, packageData:", item, data, type, packageData)
      this.$emit("handleChooseTimeRent", item, data, type, packageData);
    },

    convertPrice(price) {
      //this.product.currency_code;
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      } else {
        return "0" + "đ";
      }
    },
  },
};
</script>
<style lang="scss">
$light-green-color: #44ce6f;

.vue-slider-dot-tooltip-inner {
  border-color: $light-green-color;
  background-color: $light-green-color;
}

.vue-slider-process {
  background: $light-green-color;
}

/* dot style */
.vue-slider-dot-handle {
  background: $light-green-color;
}

.vue-slider-dot-handle-focus {
  background: $light-green-color;
}

.vue-slider-rail {
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.widget-area-modal {
  animation: slideInFromBottom 0.3s ease-out;
}

.widget-area-modal-close {
  animation: slideInFromTop 0.3s ease-out;
}

@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  25% {
    opacity: 1;
    transform: translateY(0);
  }
  75% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
    transform: translateX(-50%);
    left: 50%;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    transform: translateX(-50%);
    left: 50%;
  }
}

.activev2 {
  background: #44ce6f;
  color: #ffffff;
}
</style>

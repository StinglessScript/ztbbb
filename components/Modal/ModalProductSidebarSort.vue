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
        top: 68%;
        z-index: 1000;
        padding: 0 15px 0 15px;
        background-color: #fff;
        height: 100%;
        overflow: auto;
        width: 100%;
      "
      id="secondary"
    >
      <div style="position: relative; height: 100%">
        <span
          style="float: right; position: relative; bottom: -10px"
          @click="handleCloseModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="14"
            viewBox="0 0 384 512"
            fill="#bbb"
          >
            <path
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </span>
        <div class="d-flex flex-column gap-2">
          <div
            class="products-filter-title"
            style="
              border-bottom: 1px solid #bbb;
              height: 48px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
            "
          >
            Sắp xếp
          </div>
          <div
            class="products-filter-action"
            style="height: 112px; display: flex; flex-flow: column"
          >
            <div
              style="
                border-bottom: 1px solid #bbb;
                height: 56px;
                display: flex;
                align-items: center;
                padding: 10px 20px;
              "
              class="filter-action-item"
              @click="handleSortOptionModal('NEW', 1)"
              :class="{
                '': indexActiveSortOption !== 1,
                activev2: indexActiveSortOption === 1,
              }"
            >
              Mới nhất
            </div>
            <div
              class="filter-action-item"
              style="
                height: 56px;
                display: flex;
                align-items: center;
                padding: 10px 20px;
              "
              @click="handleSortOptionModal('BUY-A-LOT ', 2)"
              :class="{
                '': indexActiveSortOption !== 2,
                activev2: indexActiveSortOption === 2,
              }"
            >
              Bán chạy
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
  props: ["showModale"],
  components: {
    VueSlider,
    SVGMenu,
    SVGFilter,
    SVTag,
  },
  data() {
    return { indexActiveSortOption: "", sortOption: "" };
  },
  mounted() {},
  watch: {},
  methods: {
    handleCloseModal() {
      this.$emit("closeShowModale");
    },

    handleSortOptionModal(type, number) {
      this.$emit("handleSortOption", type, number);
      if (this.indexActiveSortOption !== number) {
        this.sortOption = type;
        this.indexActiveSortOption = number;
        this.handleCloseModal();
      } else {
        this.sortOption = "";
        this.indexActiveSortOption = "";
        this.handleCloseModal();
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

<template>
  <div>
    <div
      style="padding-bottom: 10px"
      v-if="
        operatingSystems?.productFeatureDTOS?.length > 0 &&
        (operatingSystems?.subType == null ||
          operatingSystems?.subType == 'SELECT')
      "
    >
      <div class="">
        <div class="sub-title-card" style="border-top: none">
          <div style="font-weight: 600; padding-bottom: 12px">
            <!--  padding-bottom: 12px -->
            {{ operatingSystems?.name }}
            <span
              v-if="operatingSystems?.requireData"
              style="
                color: red;
                font-size: 12px;
                position: relative;
                bottom: 5px;
              "
              >*</span
            >
          </div>
        </div>
        <div class="d-flex justify-content-between" style="width: 100%">
          <div style="width: 100%">
            <div
              class="custom-dropdown"
              style="position: relative; width: 100%"
            >
              <!-- Dropdown Select -->
              <div class="dropdown-container" style="position: relative">
                <div
                  class="dropdown-selected"
                  @click="toggleDropdown()"
                  style="
                    background-color: #fff;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    width: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                  @blur="handleBlur"
                  tabindex="0"
                  :style="{
                    border: `1px solid ${
                      validateOption?.find(
                        (c) => c.id == operatingSystems?.id
                      ) &&
                      !isOpen &&
                      isError
                        ? 'red'
                        : '#ddd'
                    }`,
                  }"
                  :class="
                    validateOption?.find((c) => c.id == operatingSystems?.id) &&
                    !isOpen &&
                    isError
                      ? 'shake'
                      : ''
                  "
                >
                  <div v-if="dataOption?.productName" style="width: 90%">
                    <span
                      style="
                        font-size: 14px;
                        color: #333;
                        display: flex;
                        gap: 0.5rem;
                      "
                    >
                      <div
                        style=""
                        v-if="
                          dataOption?.productDetail?.featured_image ||
                          dataOption?.productDetail?.images?.length > 0
                        "
                      >
                        <img
                          style="
                            width: 20px;
                            height: 20px;
                            border-radius: 50%;
                            object-fit: cover;
                          "
                          :src="
                            dataOption?.productDetail?.featured_image ||
                            dataOption?.productDetail?.images?.[0] ||
                            ''
                          "
                        />
                      </div>
                      <span
                        style="
                          width: 100%;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                        >{{ dataOption?.productName }}</span
                      >
                    </span>
                  </div>
                  <div v-else>
                    <span
                      >Chọn {{ operatingSystems?.name?.toLowerCase() }}</span
                    >
                  </div>

                  <span>
                    <svg
                      v-if="isOpen == false"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path fill="#44ce6f" d="m7 10l5 5l5-5z" />
                    </svg>
                    <svg
                      v-else
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path fill="#44ce6f" d="m7 14l5-5l5 5z" />
                    </svg>
                  </span>
                </div>

                <!-- Dropdown List -->
                <div
                  v-if="isOpen == true"
                  class="dropdown-list"
                  style="
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: white;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    max-height: 200px;
                    overflow-y: auto;
                    z-index: 89;
                  "
                >
                  <div
                    class="dropdown-item"
                    v-for="os in operatingSystems?.productFeatureDTOS"
                    :key="os.productId"
                    @mousedown="handleUpdateOption(os, operatingSystems)"
                    style="
                      padding: 10px;
                      cursor: pointer;
                      display: flex;
                      align-items: center;
                    "
                  >
                    <div
                      class="d-flex gap-1"
                      style="display: flex; align-items: center; gap: 5px"
                    >
                      <span
                        v-if="
                          os?.productDetail?.featured_image ||
                          os?.productDetail?.images?.length > 0
                        "
                      >
                        <img
                          :src="
                            os?.productDetail?.featured_image ||
                            os?.productDetail?.images?.[0] ||
                            ''
                          "
                          alt="product image"
                          style="
                            width: 20px;
                            height: 20px;
                            object-fit: cover;
                            border-radius: 50%;
                          "
                        />
                      </span>
                      <span style="font-size: 14px; color: #333">
                        {{ os?.productName }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "value",
    "operatingSystems",
    "checkQualify",
    "product",
    "selectedSystem",
    "loadingOperatingSystem",
    "index",
    "widthSelect",
    "show",
    "validateOption",
    "order"
  ],
  data() {
    return {
      dataSelect: "",
      isOpen: false,
      dataOption: null,
      isError: false,
    };
  },
  mounted() {
    if (this.validateOption?.find((c) => c.id == this.operatingSystems?.id)) {
      this.isError = true;
    }

    // this.dataSelect = this.value?.value
    //   ? this.value?.value
    //   : `Chọn ${this.operatingSystems?.name?.toLowerCase()}`;
    console.log("🚀 ~ mounted ~ this.value:", this.value)
    const data = this.operatingSystems?.productFeatureDTOS?.find(
      (c) => c.productId == this.value?.value
    );
    console.log("🚀 ~ mounted ~ data:", data);

    this.dataSelect = data?.productId;
    this.dataOption = data;

    if (this.operatingSystems?.productFeatureDTOS) {
      const options = this.operatingSystems.productFeatureDTOS.map(
        (os) => os.productId
      );
      if (!options.includes(this.dataSelect)) {
        this.dataSelect = ""; // Đặt dataSelect về giá trị rỗng để hiển thị tùy chọn mặc định
      }
    }

    const checkHCM = this.operatingSystems?.productFeatureDTOS?.find(
      (c) => c.productId == process.env.PRODUCT_OPTION_DEFAULT
    );

    if (checkHCM) {
      //console.log("🚀 ~ mounted ~ checkHCM:", checkHCM);
      this.handleUpdateOption(checkHCM, this.operatingSystems);
      this.dataSelect = checkHCM?.productId;
      this.dataOption = checkHCM;
    }
  },

  methods: {
    handleBlur() {
      this.isOpen = false;
      this.isError = false;
    },

    toggleDropdown() {
      this.isOpen = !this.isOpen;
      //this.$emit("handleShow");
    },
    handleUpdateOption(dataSelect, operatingSystems) {
      // console.log("🚀 ~ handleUpdateOption ~ operatingSystems:", operatingSystems)
      // console.log("🚀 ~ handleUpdateOption ~ dataSelect:", dataSelect)
      this.dataSelect = dataSelect?.productId;
      this.dataOption = dataSelect;
      this.$emit(
        "handleChangeOptionSystem",
        dataSelect?.productId,
        operatingSystems?.id,
        operatingSystems?.name,
        this.index + 2,
        "os",
        this.operatingSystems?.productFeatureDTOS
      );
      if (this.operatingSystems?.productFeatureDTOS[0]?.qualify == "OS") {
        this.$store.commit("setIsOS", dataSelect?.productId);
      }
      // if (this.show == true) {
      this.isOpen = false;
      //   //this.$emit("handleShow");
      // }
    },
  },

  watch: {
    value: {
      handler(newVal, oldVal) {
        //console.log("🚀 ~ handler ~ newVal:", newVal, oldVal);
        if (newVal.value) {
          this.dataSelect = newVal.value;
          const data = this.operatingSystems?.productFeatureDTOS?.find(
            (c) => c.productId == newVal?.value
          );
          //console.log("🚀 ~ handler ~ data:", data);
          this.dataOption = data;
        }

        //console.log("🚀 ~ handler ~  this.dataSelect:", this.dataSelect);
      },
      deep: true,
    },

    validateOption: {
      handler(newVal, oldVal) {
        //console.log("🚀 ~ handler ~ newVal:", newVal, oldVal);
        if (newVal?.find((c) => c.id == this.operatingSystems?.id)) {
          this.isError = true;
        }

        //console.log("🚀 ~ handler ~  this.dataSelect:", this.dataSelect);
      },
      deep: true,
    },
  },
};
</script>

<style>
@media (max-width: 768px) {
  .w-full-custom {
    width: 100% !important;
  }
}
</style>

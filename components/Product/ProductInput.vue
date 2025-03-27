<template>
  <div style="padding-bottom: 10px">
    <div class="">
      <div class="sub-title-card" style="border-top: none">
        <div style="font-weight: 600; padding-bottom: 12px">
          <!--  padding-bottom: 12px -->
          {{ operatingSystems?.name }}
          <span
            v-if="operatingSystems?.requireData"
            style="color: red; font-size: 12px; position: relative; bottom: 5px"
            >*</span
          >
        </div>
      </div>
      <div class="d-flex justify-content-between" style="width: 100%">
        <div style="width: 100%">
          <div
            class="w-full-custom w100"
            style="
              border-radius: 5px;
              outline: none;
              padding-left: 5px;
              border: 1px solid rgb(221, 221, 221);
              display: flex;
              align-items: center;
            "
            :style="{
              width: widthSelect ? `${widthSelect}%` : '50%',
              border: `1px solid ${
                validateOption?.find((c) => c.id == operatingSystems?.id)
                  ? 'red'
                  : '#ddd'
              }`,
            }"
            :class="
              validateOption?.find((c) => c.id == operatingSystems?.id)
                ? 'shake'
                : ''
            "
          >
            <!-- <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path d="M21 12a9 9 0 1 0-9 9M3.6 9h16.8M3.6 15h7.9" />
                  <path
                    d="M11.5 3a17 17 0 0 0 0 18m1-18a17 17 0 0 1 2.574 8.62M15 18a3 3 0 1 0 6 0a3 3 0 1 0-6 0m5.2 2.2L22 22"
                  />
                </g>
              </svg>
            </span> -->
            <input
              type="text"
              class="w-full-custom w100"
              style="
                width: 100%;
                height: 35px;
                border: none;
                outline: none;
                padding-left: 5px;
                min-height: 44.6px;
                background-color: #fff;
                padding: 10px;
                border-radius: 5px;
                /* box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px; */
              "
              v-model="dataInput"
              @blur="
                ValidateDomain(
                  dataInput,
                  operatingSystems?.id,
                  operatingSystems?.name
                )
              "
            />
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
    "validateOption",
  ],

  data() {
    return {
      dataInput: "",
      isError: false,
    };
  },

  mounted() {
    this.dataInput = this.value?.value ? this.value?.value : "";
    if (this.validateOption?.find((c) => c.id == this.operatingSystems?.id)) {
      this.isError = true;
    }
  },

  methods: {
    ValidateDomain(dataInput, id, name) {
      this.isError = false;
      // this.isError = false;
      // const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/;
      // if (!domainRegex.test(dataInput)) {
      //   this.$toast.error("Vui lòng nhập đúng định dạng Domain.");
      // } else {
      //   //alert("Nhap dung r")
      //   this.$emit(
      //     "handleChangeOptionSystem",
      //     dataInput,
      //     id,
      //     name,
      //     this.index + 2,
      //     "input"
      //   );
      //   //this.handleChangeOptionSystem(dataInput, id, name);
      // }
      this.$emit(
        "handleChangeOptionSystem",
        dataInput || "",
        id,
        name,
        this.index + 2,
        "input"
      );
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

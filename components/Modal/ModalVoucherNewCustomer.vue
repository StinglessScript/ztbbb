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
    ></div>
    <div
      class="widget-area widget-area-modal w80 w40"
      style="
        position: fixed;
        top: 10%;
        z-index: 1000;
        background-color: rgb(253, 254, 249);
        height: auto;
        min-height: 250px;
        overflow: auto;
        transform: translateX(-50%);
        left: 50%;
        border: 2px solid rgb(255, 255, 237);
        border-radius: 5px;
      "
      id="secondary"
    >
      <div style="position: relative; height: auto; padding: 20px 0px">
        <!-- <div
          class="d-flex justify-content-between"
          style="padding-right: 10px; padding-top: 5px"
        >
          <div></div>
          <div
            style="
              text-align: center;
              font-size: 12px;
              font-weight: 600;
              color: #44ce6f;
            "
          ></div>
          <span style="cursor: pointer" @click="handleShowModal()">
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
        </div> -->
        <div class="">
          <div class="container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-12">
                <img
                  src="~/assets/img/box.png"
                  loading="lazy"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    font-weight: bold;
                  "
                />
              </div>
              <div class="col-lg-6 col-md-6 col-12">
                <div
                  class="d-flex flex-column justify-content-between"
                  style="height: 100%; gap: 1rem"
                >
                  <div class="">
                    <h3 style="font-weight: bold; text-align: center">
                      Ưu Đãi Thành Viên Mới
                    </h3>
                    <p style="text-align: center">
                      Cảm ơn bạn đã đăng ký tài khoản! Chúng tôi gửi tặng bạn ưu
                      đãi này như một lời tri ân.
                    </p>
                  </div>
                  <div
                    class="d-flex flex-column justify-content-center align-items-center"
                  >
                    <div class="voucher">
                      <div class="title">GIFT VOUCHER</div>
                      <div
                        class="amount"
                        v-if="
                          this.$store.getters.newCusomer?.voucherType ==
                          'PERCENT'
                        "
                      >
                        {{
                          this.$store.getters.newCusomer?.discountPercent || 0
                        }}%
                      </div>
                      <div class="amount" v-else>
                        {{
                          convertPrice(
                            this.$store.getters.newCusomer?.discountAmount
                          )
                        }}
                      </div>
                      <div class="scallop"></div>
                    </div>
                  </div>
                  <div
                    class="button-action sell-button"
                    @click="handleShowModal()"
                  >
                    Nhận Voucher
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
import { formatData } from "../../utils/formatUrt";
export default {
  props: ["voucher"],
  data() {
    return {};
  },

  mounted() {},

  methods: {
    handleShowModal() {
      this.$store.commit("setLoading", true);
      this.$store.commit("setNewCusomer", "");
      console.log(
        "🚀 ~ handleShowModal ~ this.$store.getters.vuex_redirect_url:",
        this.$store.getters.vuex_redirect_url
      );
      if (this.$store.getters.vuex_redirect_url.type == "href") {
        window.location.href = this.$store.getters.vuex_redirect_url.redirect;
      } else {
        this.$router.push({
          path: this.$store.getters.vuex_redirect_url.redirect,
        });
        this.$store.commit("setVuex_redirect_url", {
          type: null,
          redirect: null,
        });
      }
    },

    convertPrice(price) {
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      } else {
        return " ";
      }
    },
  },
};
</script>

<style>
.voucher {
  width: 250px;
  background-color: #eabd48d9;
  border-radius: 10px;
  border: 3px dashed rgb(253, 254, 249); /* Đường kẻ đứt */
  position: relative;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.voucher .title {
  font-size: 14px;
  font-weight: bold;
  color: #2d2d2d;
}

.voucher .amount {
  font-size: 45px;
  font-weight: bold;
  color: #e63946;
}

/* Thêm hiệu ứng cho phần tem */
.voucher .scallop {
  position: absolute;
  bottom: -8px; /* Điều chỉnh vị trí đường răng cưa */
  left: 0;
  width: 100%;
  height: 16px;
  clip-path: polygon(
    0% 100%,
    10% 70%,
    20% 100%,
    30% 70%,
    40% 100%,
    50% 70%,
    60% 100%,
    70% 70%,
    80% 100%,
    90% 70%,
    100% 100%
  );
}

@media (max-width: 768px) {
  .w80 {
    width: 80% !important;
  }

  .w100 {
    width: 100% !important;
  }
}

.w40 {
  width: 40%;
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

.button-action {
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  align-items: center;
  border: 0;
  border-radius: 2px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.09);
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: center;
  outline: 0;
  text-transform: capitalize;

  color: #fff;
  outline: 0;
  overflow: visible;
  position: relative;

  height: 48px;
}
.sell-button {
  background: rgb(22, 179, 100);

  &:hover {
    background: #2ba351;
    transition: background 0.3s ease;
  }
}
</style>

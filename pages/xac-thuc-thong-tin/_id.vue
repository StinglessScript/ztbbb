<template>
  <div>
    <div
      v-if="loading == true"
      style="
        position: fixed;
        background-color: rgba(155, 151, 151, 0.26);
        z-index: 999;
        width: 100%;
        height: 100%;
        top: 0;
      "
    >
      <div class="logo-bg"></div>
      <div class="loader-bg"></div>
    </div>
    <div style="background: #fcfcfd">
      <div class="container" style="padding: 80px 16px">
        <div class="row justify-content-center">
          <div class="info d-flex flex-column justify-content-center gap-3">
            <div class="d-flex justify-content-between row">
              <div
                class="col-lg-5 col-md-9 col-sm-12 mb-4 d-flex justify-content-center align-items-center flex-column"
                style="padding-left: 10px; padding-right: 10px"
              >
                <div
                  class="info-title"
                  style="color: #44ce6f; text-align: center"
                >
                  Xác thực thông tin để sử dụng dịch vụ
                </div>
                <div class="d-flex flex-column" style="width: 100%">
                  <div class="">
                    <!-- <div class="info-des">
                      Cảm ơn bạn đã sử dụng dịch vụ của Long Vân System.
                    </div> -->

                    <div>
                      <ModalLinkingAccountWithOrder
                        :checkModal="checkModal"
                        :phone="order?.order?.ownerPhone"
                        :name="order?.order?.ownerName"
                        @handleShowModal="handleShowModal"
                        @handleUpdateLinking="handleUpdateLinking"
                        :typeLogin="typeLogin"
                        :url="`${userInside}/order/detail?orderId=${$route.params.id}`"
                        :order="order"
                        :redirectUrl="$route.query.redirectUrl"
                        @handleLoading="handleLoading"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div
                  class="d-flex justify-content-center gap-4 pt-4 d-flex-columb"
                  v-if="$store.getters.getUser"
                >
                  <div class="btn btn-primary-light" @click="$router.push('/')">
                    Trở lại trang chủ
                  </div>
                  <div
                    @click="$router.push('/cua-hang')"
                    class="btn btn-primary"
                  >
                    Xem sản phẩm khác
                  </div>
                </div> -->
              </div>

              <div
                class="col-lg-7 col-md-3 col-sm-12 mb-4 d-flex justify-content-between flex-column"
                style="padding-left: 10px; padding-right: 10px"
              >
                <div>
                  <div class="info-des">
                    Mã đơn hàng của bạn là:<span class="textPrimary">
                      {{ $route.params.id }}
                    </span>
                  </div>
                  <div class="info-list">
                    <!-- <div class="info-item d-flex">
                      <feather type="check" style="overflow: unset"></feather>
                      <div>
                        <span>Bộ phận kinh doanh </span>{{ " " }}sẽ liên hệ bạn
                        qua SĐT:
                        <span class="textPrimary" style="padding-left: 5px"
                          >{{ order?.order?.ownerPhone }} </span
                        >.
                      </div>
                    </div> -->
                    <div class="info-item d-flex">
                      <feather type="check" style="overflow: unset"></feather>
                      <div>
                        Liên hệ trực tiếp với chúng tôi nếu có vấn đề phát sinh.
                      </div>
                    </div>
                    <div class="info-item d-flex">
                      <feather type="check" style="overflow: unset"></feather>
                      <div>
                        Bạn có thể liên hệ thông qua tổng đài miễn phí
                        <a class="textPrimary" href="tel:1800.6070">
                          1800.6070</a
                        >
                        hoặc quét QR Zalo để được hỗ trợ.
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-center align-items-center">
                  <a
                    href="https://zalo.me/1365034174709453259"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="d-flex flex-column align-items-center"
                  >
                    <img
                      src="~/assets/imgPayment/scanZalo.jpg"
                      height="150px"
                      width="150px"
                    />
                    <span
                      style="
                        font-size: 14px;
                        font-weight: bold;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                      >Nhấn hoặc quét mã để được hỗ trợ</span
                    >
                  </a>
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
import Cookies from "js-cookie";
import ModalVatInfo from "../../components/Modal/ModalVatInfo.vue";
import ModalFullVatInfo from "../../components/Modal/ModalFullVatInfo.vue";
import ModalLinkingAccountWithOrder from "@/components/Modal/ModalLinkingAccountWithOrder.vue";

export default {
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      user: {},
      tokenData: null,
      userInside: process.env.USER_INSIDE_URL,
      order: {},
      countdown: 10, // Thời gian đếm ngược ban đầu
      intervalId: null,
      serviceId: null,

      isOn: false,
      dataVatInfoSent: null,
      dataCookiesRequestBill: {
        companyName: "",
        taxCode: "",
        email: "",
        address: "",
      },
      isBoolean: false,
      dataVatInfoUser: [],
      loading: false,
      orderDetail: null,
      checkModal: false,
      linking: false,

      //typeLogin: null,
    };
  },
  mounted() {
    console.log("🚀 ~ mounted ~ this.order:", this.order);
    if (this.order?.order?.ownerPartyId) {
      this.$router.push(this.redirectToPreviousUrl());
    } else {
      this.$store.commit("setLoading", false);
    }

    // if (this.statusId == 1) {
    //   this.checkAndUpdateOrderStatus();
    // }

    this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, {
      domain: ".longvan.net",
      path: "/",
    });

    //this.getUser();
  },
  watch: {
    tokenData: function () {
      this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      });
    },
  },
  computed: {
    statusId() {
      const id = this.$route.query.statusCode;
      console.log("🚀 ~ file: _id.vue:514 ~ statusId ~ id:", id);

      return id;
    },
  },
  methods: {
    redirectToPreviousUrl(readyV2) {
      // this.$emit("handleLoading", true);
      this.$store.commit("setLoading", true);
      let newRedirectUrl = this.$route.query.redirectUrl;

      // Kiểm tra nếu redirectUrl chưa chứa dấu "?"
      if (!newRedirectUrl.includes("?")) {
        // Thêm dấu "?" vào redirectUrl
        newRedirectUrl += "?";
      } else {
        // Nếu redirectUrl đã có dấu "?" thì thêm dấu "&" vào redirectUrl
        newRedirectUrl += "&";
      }

      // Tạo chuỗi query mới bằng cách loại bỏ redirectUrl và thêm "&" vào các tham số query còn lại
      const queryString = Object.keys(this.$route.query)
        .filter((key) => key !== "redirectUrl") // Loại bỏ redirectUrl khỏi danh sách các tham số query
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              this.$route.query[key]
            )}`
        )
        .join("&");

      // Ghép chuỗi query mới với redirectUrl
      newRedirectUrl += queryString;

      const prevUrl = newRedirectUrl || "";
      //console.log("🚀 ~ redirectToPreviousUrl ~ prevUrl:", prevUrl);
      const targetRoute = readyV2
        ? prevUrl && prevUrl !== "/"
          ? prevUrl
          : this.userInside
        : this.userInside;
      // `${this.supportV1}?source=user-inside`;

      const targetDomain = new URL(targetRoute, this.currentDomain).origin;
      //const currentDomain = window.location.origin;

      this.$router.push(prevUrl);
    },

    async handleLoading(data) {
      this.loading = data;
    },

    callSupport() {
      const phoneNumber = "18006070"; // Replace this with the actual phone number
      window.location.href = `tel:${phoneNumber}`;
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Tránh rò rỉ bộ nhớ khi component bị hủy
  },

  async asyncData({ order, store, route, error, $sdk }) {
    try {
      // const [getOrderDetails] = await Promise.all([
      //   store.dispatch("getOrderDetail", route.params.id),
      // ]);
      store.commit("setLoading", true);
      const [getOrderDetails] = await Promise.all([
        // store.dispatch("getOrderDetail", route.params.id),
        $sdk.order_graphQL.getOrderDetail(route.params.id),
      ]);

      const resCustomer = await store.dispatch(
        "checkUsernameExisted",
        getOrderDetails?.order?.ownerPhone
      );
      // if (resCustomer?.data?.checkUsernameExisted == true) {
      //   this.typeLogin = "PW";
      // } else {
      //   this.typeLogin = "OTP";
      // }

      order = getOrderDetails;
      // store.commit("setLoading", false);
      return {
        order,
        typeLogin:
          resCustomer?.data?.checkUsernameExisted == true ? "PW" : "OTP",
      };
    } catch (err) {
      error({ statusCode: 404, message: "Post not found" });
    }
  },

  head() {
    return {
      title: "Xác thực thông tin",
    };
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .d-flex-columb {
    display: flex;
    flex-flow: column;
  }
}

.textPrimary {
  color: #44ce6f;
  text-decoration: dashed;
}

.custormWidth {
  width: 75%;
}

@media screen and (max-width: 760px) {
  .info {
    width: 100% !important;
  }

  .disCssDesk {
    display: none;
  }

  .disCssMobile {
    display: block;
  }

  .flex-column-mobile {
    display: flex;
    flex-flow: column;
  }

  .custormWidth {
    width: 100%;
  }
}

.container-button {
  width: 46px;
  height: 24px;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.toggle-button-new {
  width: 16px;
  height: 16px;
  background-color: gray;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 1px;
  transform: translateY(-50%);
  transition: left 0.3s ease, background-color 0.3s ease;
}

.toggle-button-new.on {
  left: 25px; /* Đẩy sang bên phải */
  background-color: #44ce6f; /* Màu xanh lá */
}

.send-item {
  margin-bottom: 8px;
  .send-err {
    color: red;
  }
  .item-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      // margin-top: 24px;
    }
    .send-input {
      background: #ffffff;
      border: 1px solid #e3e8ef;
      border-radius: 6px;
      padding: 5px 10px;
      width: 100%;
    }
  }

  .item-info {
    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      margin-top: 24px;
    }
    .send-input {
      background: #ffffff;
      border: 1px solid #e3e8ef;
      border-radius: 6px;
      padding: 5px 10px;
      width: 100%;
    }
  }
}

.btn-send {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  &.active {
    background: #44ce6f;
    border-radius: 6px;
    color: #ffffff;
  }
  background: #ffffff;
  border: 1px solid #44ce6f;
  color: #44ce6f;

  border-radius: 6px;
  padding: 13px 0;
  width: 100%;
  margin: 12px 0;
  &:first-child {
    margin-top: 24px;
  }
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

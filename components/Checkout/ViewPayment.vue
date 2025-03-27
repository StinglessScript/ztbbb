<template>
  <div
    class="row justify-content-center"
    style="padding-top: 30px !important; padding-bottom: 30px"
  >
    <!-- {{ order }} -->
    <div class="col-lg-12 col-md-12">
      <div class="cart-items">
        <div class="payment-info">
          <div class="row">
            <div class="col-lg-6">
              <div class="payment-info-item">
                <div>Mã đơn hàng:</div>
                <strong>{{ order?.order?.id }}</strong>
              </div>
              <!-- <div class="payment-info-item">
                <div>Ngày tạo:</div>
                <div>21312312</div>
              </div>
              <div class="payment-info-item">
                <div>Hạn thanh toán:</div>
                <div>21312312</div>
              </div> -->
              <div class="payment-info-item">
                <div>Cần thanh toán:</div>
                <strong style="color: #44ce6f">{{
                  convertPrice(order?.order?.currentTotalPrice?.amount)
                }}</strong>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="payment-info-item">
                <div>Trạng thái thanh toán:</div>
                <strong style="color: red">Chưa thanh toán</strong>
              </div>
              <div
                @click="handleCancelPayment()"
                class="payment-info-item justify-content-center justify-content-lg-between"
                style="cursor: pointer"
              >
                <div></div>
                <strong style="color: #44ce6f; text-decoration: underline"
                  >Chọn phương thức thanh toán khác</strong
                >
              </div>
              <!-- <div class="payment-info-item">
                <div> Mã đơn hàng: </div>
                <div> 21312312 </div>
              </div>
              <div class="payment-info-item">
                <div> Mã đơn hàng: </div>
                <div> 21312312 </div>
              </div>
              <div class="payment-info-item">
                <div> Mã đơn hàng: </div>
                <div> 21312312 </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="row bg-payment-info gap1rem">
          <div class="col-12 col-md-6">
            <div
              style="
                font-size: 18px;
                font-style: normal;
                font-weight: 500;
                line-height: 24px;
              "
            >
              {{ transferInfo?.bankName }}
            </div>
            <ul>
              <li>Số tài khoản: {{ transferInfo?.accountNumber }}</li>
              <li>
                Tên tài khoản:
                {{ transferInfo?.accountName }}
              </li>
              <!-- <li>Chi nhánh: Đông Sài Gòn (PGD: Thảo Điền), TP.HCM</li> -->
              <li>Nội dung: {{ transferInfo?.transferInfo }}</li>
              <!-- <li>Nội dung: inv{{ paymentItem.data }}inv</li> -->
            </ul>
            <div class="d-none d-lg-block">
              <div class="d-flex justify-content-center gap-4">
                <!-- <div
                  @click="$emit('handleShow')"
                  style="display: flex; justify-content: center"
                >
                  <div
                    class="product-body-button"
                    style="
                      padding: 12px 24px;
                      width: 230px;
                      background: #fff;
                      border: 1px solid #44ce6f;
                      color: #44ce6f;
                      border-radius: 6px;
                      cursor: pointer;
                      text-align: center;
                    "
                  >
                    <div>Phương thức thanh toán</div>
                  </div>
                </div> -->
                <div
                  style="display: flex; justify-content: center"
                  @click="succesPayment()"
                >
                  <div
                    class="product-body-button"
                    style="
                      padding: 12px 24px;
                      width: 230px;
                      background: #44ce6f;
                      color: #fff;
                      border-radius: 6px;
                      cursor: pointer;
                      text-align: center;
                    "
                  >
                    <div>Hoàn tất thanh toán</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-md-6 d-flex">
            <img
              :src="paymentItem.qrCodeUrl"
              style="margin-left: auto; margin-right: auto"
            />
          </div>
          <div class="d-block d-lg-none">
            <div class="d-flex flex-column gap-4">
              <!-- <div
                @click="$emit('handleShow')"
                style="display: flex; justify-content: center"
              >
                <div
                  class="product-body-button"
                  style="
                    padding: 12px 24px;
                    width: 230px;
                    background: #fff;
                    border: 1px solid #44ce6f;
                    color: #44ce6f;
                    border-radius: 6px;
                    cursor: pointer;
                    text-align: center;
                  "
                >
                  <div>Phương thức thanh toán</div>
                </div>
              </div> -->
              <div
                style="display: flex; justify-content: center"
                @click="succesPayment()"
              >
                <div
                  class="product-body-button"
                  style="
                    padding: 12px 24px;
                    width: 230px;
                    background: #44ce6f;
                    color: #fff;
                    border-radius: 6px;
                    cursor: pointer;
                    text-align: center;
                  "
                >
                  <div>Hoàn tất thanh toán</div>
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
export default {
  name: "ViewPayment",
  props: ["paymentItem", "order", "user", "transferInfo", "show", "userId"],
  data() {
    return {
      statusInterval: null,
      order: {},
      serviceId: null,
      user: {},
    };
  },

  mounted() {
    if (this.show) {
      this.handleGetServiceID();
      // this.getOrderDetails();
      this.checkStatusPayment();

      // Call checkStatusPayment every 3 seconds
      this.statusInterval = setInterval(() => {
        if (this.show) {
          this.checkStatusPayment();
        }
      }, 3000);
    }
    // this.user = this.$store.getters.getUser
    //   ? this.$store.getters.getUser
    //   : JSON.parse(Cookies.get("authInfo"));
  },
  beforeDestroy() {
    if (this.show == true) {
      // Clear the interval when the component is destroyed
      if (this.statusInterval) {
        clearInterval(this.statusInterval);
      }
    }
  },
  methods: {
    async handleCancelPayment() {
      try {
        const response = await this.$sdk.paymentLV.cancelPayment(
          this.paymentItem?.data,
          "Thay đổi phương thức thanh toán",
          this.userId
        );
        if (response) {
          this.$emit("handleShow");
        }

        //console.log("🚀 ~ handleCancelPayment ~ this.$store.getters.getUser:", this.$store.getters.getUser?.partyId)
      } catch (error) {
        this.$toast.error(error);
      }
    },

    async handleGetServiceID() {
      try {
        const res = await this.$store.dispatch(
          "getServiceIdFromOrderId",
          this.$route.params.id
        );

        this.serviceId = res.data.getServiceIds[0];

        //console.log("this.serviceId", this.serviceId);
      } catch (err) {
        this.$toast.error(err);
      }
    },
    async getOrderDetails() {
      const id = this.$route.params.id;
      const response = await this.$store.dispatch("getOrderDetail", id);

      if (response.data.orderDetail.order?.financialStatus == "PAID") {
        clearInterval(id);
        this.$router.push(
          this.order?.order?.ownerPartyId
            ? "/ket-qua-thanh-toan/" + this.order?.order?.id + "?statusCode=0"
            : "/xac-thuc-thong-tin/" + this.order?.order?.id + "?statusCode=0"
        );
      } else if (
        response.data.orderDetail.order?.financialStatus != "PAID" &&
        response.data.orderDetail.order?.financialStatus != "PENDING" &&
        response.data.orderDetail.order?.financialStatus != "VOIDED"
      ) {
        clearInterval(id);
        this.$router.push(
          this.order?.order?.ownerPartyId
            ? "/ket-qua-thanh-toan/" + this.order?.order?.id + "?statusCode=400"
            : "/xac-thuc-thong-tin/" + this.order?.order?.id + "?statusCode=400"
        );
      }
    },
    async succesPayment() {
      const hostname = window.location.origin;
      const id = this.$route.params.id;
      const response = await this.$sdk.paymentLV.confirmPaidManual(
        this.paymentItem?.data,
        this.userId
      );
      if (response) {
        // if (
        //   this.order?.lineItems?.some((item) =>
        //     ["THANG", "NAM", "tháng", "năm", "Tháng", "Năm"].includes(
        //       item.orderLineItem.unitType
        //     )
        //   )
        // ) {
        //   window.location.href = `${process.env.USER_INSIDE_URL}/service/detail?id=${this.serviceId}`;
        // } else {
        //   window.location.href = `${process.env.USER_INSIDE_URL}/order/detail?orderId=${this.order?.order?.id}`;
        // }

        this.$router.push(
          this.order?.order?.ownerPartyId
            ? `/ket-qua-thanh-toan/${this.order?.order?.id}?createBy=${this.userId}&statusCode=0`
            : `/xac-thuc-thong-tin/${this.order?.order?.id}?createBy=${this.userId}&statusCode=0`
        );
      }

      //`${hostname}/ket-qua-thanh-toan/${id}?statusCode=0&&pttt=chuyen-khoan`;
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
        return price;
      }
    },
    async checkStatusPayment() {
      try {
        if (this.show) {
          const id = this.$route.params.id;
          const res = await this.$sdk.paymentLV.paymentsByOrders([id]);

          const paymentItem = res?.find(
            (c) => c.paymentId == this.paymentItem?.data
          );
          if (paymentItem?.statusCode == 0) {
            clearInterval(this.statusInterval);
            this.$router.push(
              this.order?.order?.ownerPartyId
                ? "/ket-qua-thanh-toan/" +
                    this.order?.order?.id +
                    "?statusCode=0"
                : "/xac-thuc-thong-tin/" +
                    this.order?.order?.id +
                    "?statusCode=0"
            );
          } else if (paymentItem?.statusCode == -1) {
            //console.log("đã vào");
            clearInterval(this.statusInterval);
            this.$router.push(
              this.order?.order?.ownerPartyId
                ? "/ket-qua-thanh-toan/" +
                    this.order?.order?.id +
                    "?statusCode=400"
                : "/xac-thuc-thong-tin/" +
                    this.order?.order?.id +
                    "?statusCode=400"
            );
          }
        }
        // Process the response if needed
      } catch (error) {
        console.error("Error checking invoice status:", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .gap1rem {
    display: flex;
    gap: 1rem;
  }
}
.payment-info-item {
  display: flex;
  justify-content: space-between;
  padding: 4px;
}
.bg-payment-info {
  padding: 18px;
  margin-top: 24px;
  background: #f7f7f9;

  img {
    width: 60%;
  }
}
ul {
  margin-top: 12px;
}
li {
  padding: 8px 0px;
}
</style>

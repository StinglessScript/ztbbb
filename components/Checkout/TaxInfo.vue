<template>
  <div class="index cart">
    <div class="cart-area">
      <div class="container">
        <div class="back"></div>

        <div>
          <div>
            <div class="row justify-content-center">
              <div class="col-lg-12 col-md-12">
                <div class="cart-items">
                  <div class="taxinfo-tilte mb-4">Thông tin xuất hoá đơn</div>
                  <table style="width: 100%">
                    <thead>
                      <tr class="tax-header-line">
                        <th></th>
                        <th class="p-3">Tên công ty</th>
                        <th>Mã số thuế</th>
                        <th>Địa chỉ</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="company in companies"
                        :key="company.id"
                        class="tax-item"
                      >
                        <td class="p-2">
                          <input
                            type="radio"
                            :value="company.id"
                            v-model="selectedCompanyId"
                          />
                        </td>
                        <td class="p-2">{{ company.name }}</td>
                        <td class="p-2">{{ company.taxId }}</td>
                        <td class="p-2">{{ company.address }}</td>
                        <td class="p-2">{{ company.email }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="row justify-content-center py-4">
              <div class="col-lg-12 col-md-12">
                <div class="cart-items">
                  <div class="taxinfo-tilte">
                    Thêm thông tin xuất hóa đơn mới:
                    <div class="btn-add" @click="toggleAdd = !toggleAdd">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6h-2Z"
                        />
                      </svg>
                    </div>
                  </div>

                  <ValidationObserver
                    v-slot="{ handleSubmit }"
                    v-if="toggleAdd"
                  >
                    <form @submit.prevent="handleSubmit(onSubmit)">
                      <div class="form-outline mb-2">
                        <ValidationProvider
                          mode="lazy"
                          rules="required|phone"
                          v-slot="{ errors }"
                        >
                          <label class="form-label" for="phone"
                            >Tên công ty
                            <span style="color: red">*</span>

                            <span style="color: red">{{ errors[0] }}</span>
                          </label>
                          <div class="input-field">
                            <input
                              id="company"
                              v-model="company"
                              type="text"
                              class="form-control form-control-lg"
                            />
                          </div>
                        </ValidationProvider>
                      </div>
                      <div class="form-outline mb-2">
                        <ValidationProvider
                          name="password"
                          width="50%"
                          rules="required|min:6"
                          mode="lazy"
                          v-slot="{ errors }"
                        >
                          <label class="form-label" for="email"
                            >Mã số thuế
                            <span style="color: red">*</span>
                            <span style="color: red">{{ errors[0] }}</span>
                          </label>
                          <input
                            id="tax"
                            v-model="tax"
                            type="text"
                            class="form-control form-control-lg"
                          />
                        </ValidationProvider>
                      </div>
                      <div class="form-outline mb-2">
                        <ValidationProvider
                          name="address"
                          width="50%"
                          rules="required"
                          mode="lazy"
                          v-slot="{ errors }"
                        >
                          <label class="form-label" for="address"
                            >Địa chỉ
                            <span style="color: red">*</span>
                            <span style="color: red">{{ errors[0] }}</span>
                          </label>
                          <input
                            id="address"
                            v-model="address"
                            type="text"
                            class="form-control form-control-lg"
                            placeholder="Nhập mật khẩu"
                          />
                        </ValidationProvider>
                      </div>
                      <div class="row">
                        <div class="col-6 form-outline mb-2">
                          <ValidationProvider
                            name="email"
                            width="50%"
                            rules="required|email"
                            mode="lazy"
                            v-slot="{ errors }"
                          >
                            <label class="form-label" for="email"
                              >Địa chỉ email nhận hóa đơn của tôi
                              <span style="color: red">*</span>
                              <span style="color: red">{{ errors[0] }}</span>
                            </label>
                            <input
                              id="email"
                              v-model="email"
                              type="email"
                              class="form-control form-control-lg"
                            />
                          </ValidationProvider>
                        </div>
                        <div class="col-6 form-outline mb-2">
                          <label class="form-label" for="email"
                            >Địa chỉ email khác nhận hóa đơn
                          </label>
                          <input
                            id="email2"
                            v-model="email2"
                            type="email"
                            class="form-control form-control-lg"
                          />
                        </div>
                      </div></form
                  ></ValidationObserver>
                </div>
                <div>
                  <div class="d-flex justify-content-end gap-4 pt-4">
                    <div class="btn btn-primary-light" @click="callSupport()">
                      Tôi không cần xuất hoá đơn
                    </div>
                    <div
                      @click="$router.push('/thanh-toan/' + $route.params.id)"
                      class="btn btn-primary"
                    >
                      Xuất hoá đơn
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
import PageTitle from "../../components/Common/PageTitle";
import Cookies from "js-cookie";
import SVGDelete from "~/assets/img/remove.svg";
import SVGCart2 from "~/assets/img/cart-2.svg";
import SVGCart1 from "~/assets/img/1.svg";
import ViewPayment from "@/components/Checkout/ViewPayment";

export default {
  name: "Cart",
  data() {
    return {
      toggleAdd: false,
      selectedCompanyId: null,
      tax: "",
      company: "",
      companies: [
        {
          id: 1,
          name: "Công ty A",
          taxId: "ABC123",
          address: "Địa chỉ A",
          email: "emailA@example.com",
        },
        {
          id: 2,
          name: "Công ty B",
          taxId: "XYZ456",
          address: "Địa chỉ B",
          email: "emailB@example.com",
        },
        // Add more company objects here
      ],
      user: {},
      name: "",
      phone: "",
      email: "",
      email2: "",
      note: "",
      carts: null,
      products: {},
      parsedobj: null,
      product: {},
      productParse: {},
      items: [],
      idOp: [],
      id: null,
      toggle: false,
      demo: false,
      showLoader: true,
      loading: false,
      orderId: "",
      isNextStep: false,
      order: {},
      paymentMethods: [],
      loadingCreatePayment: false,
      idActive: "",
      paymentItem: "",
    };
  },
  components: { SVGDelete, SVGCart2, SVGCart1, PageTitle, ViewPayment },
  computed: {
    title() {
      return this.demo ? "Đặt hàng thành công" : "Giỏ hàng";
    },
    totalCart() {
      if (this.order) {
        return this.order?.lineItems?.reduce((total, lineItem) => {
          return (
            total +
            lineItem.orderLineItem.variant.unitPrice.amount *
              lineItem.orderLineItem.quantity
          );
        }, 0);
      }
    },
    VAT() {
      if (this.order) {
        return this.order?.lineItems?.reduce((total, lineItem) => {
          return total + lineItem.orderLineItem.totalVAT.amount;
        }, 0);
      }
    },
  },
  mounted() {
    this.getUser();
  },
  watch: {
    carts: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    async createPayment(paymentId) {
      this.idActive = paymentId;
      const data = {
        orderId: this.$route.query.id,
        paymentMethod: paymentId,
        returnUrl: "http://localhost:3011/",
        createBy: this.user.fullName,
      };
      this.loadingCreatePayment = true;
      try {
        const res = await this.$store.dispatch("createPayment", data);
        console.log(
          "🚀 ~ file: CartConfirm.vue:224 ~ createPayment ~ res:",
          res
        );
        this.loadingCreatePayment = false;
        const containsHttp = res.data.createPayment.data.includes("http");
        if (containsHttp) {
          window.location.href = res.data.createPayment.data;
        } else {
          this.paymentItem = res.data.createPayment;
        }
      } catch (error) {
        this.loadingCreatePayment = false;
      }
    },

    async getPayments() {
      const res = await this.$store.dispatch("getPaymentDetail");
      this.paymentMethods = res.data.getPaymentMethod;
    },

    async getUser() {
      const token = Cookies.get(process.env.ACCESSTOKEN_NAME, { domain: '.longvan.net', path:"/" });
      console.log("🚀 ~ file: CartConfirm.vue:177 ~ getUser ~ token:", token);
      const res = await this.$store.dispatch("getUserByToken", {
        token: token,
        orgId: "LONGVAN",
      });
      this.user = res.data.getUserDetail;
    },
    async getOrderDetail() {
      const id = this.$route.query.id;
      console.log("🚀 ~ file: CartConfirm.vue:231 ~ getOrderDetail ~ id:", id);
      const res = await this.$store.dispatch("getOrderDetail", id);
      this.order = res.data.orderDetail;
    },

    goto(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop;
      window.scrollTo(0, top + 300);
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
  },
};
</script>
<style lang="scss" scoped>
label {
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  color: rgba(20, 20, 21, 1);
}
.btn-add {
  background: #44ce6f;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}
table th,
.table td {
  white-space: nowrap; /* Giữ nội dung cột trong một hàng */
}

/* Định dạng lại bảng và các phần tử con khi màn hình nhỏ hơn */
@media (max-width: 767px) {
  .table th,
  .table td {
    display: block; /* Hiển thị thành block để chiếm toàn bộ chiều rộng màn hình */
  }
  .table td {
    border: 1px solid var(--e-3-e-8-ef-100-divider-card, #e3e8ef);
    background: var(--ffffff, #fff);
    position: relative; /* Cho phép sử dụng position để canh lề nội dung */
    padding-left: 50%; /* Canh lề trái của nội dung */
    padding: 8px;
  }
  .table td::before {
    content: attr(
      data-label
    ); /* Hiển thị giá trị của data-label là nội dung trước nội dung thực tế */
    position: absolute; /* Hiển thị nội dung mới trước nội dung thực tế */
    left: 0; /* Đặt lại vị trí của nội dung mới */
    width: 50%; /* Đặt lại chiều rộng của nội dung mới */
    padding-left: 15px; /* Tùy chỉnh canh lề của nội dung mới */
    font-weight: bold; /* Tùy chỉnh font-weight của nội dung mới */
  }
}
.tax-item {
  border: 1px solid var(--e-3-e-8-ef-100-divider-card, #e3e8ef);
  background: var(--ffffff, #fff);
}
.tax-header-line {
  border-radius: 6px 6px 0px 0px;
  border: 1px solid var(--e-3-e-8-ef-100-divider-card, #e3e8ef);
  background: var(--eff-4-ff-100, #ecfaf1);
  color: #44ce6f;
  padding: 10px 20px;
}
.taxinfo-tilte {
  font-size: 22px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 26px;
}
.back-page {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
}
.payment-list-title {
  display: block;
  text-align: center;
  padding: 20px 0px 12px;
  font-weight: 600;
  width: 100%;
}
.textPrimary {
  color: #44ce6f;
}
.py-8 {
  padding: 8px 0;
}
.back {
  padding: 32px 0;
  font-size: 20px;
  font-weight: 500;
}
.index {
  z-index: 1;
}
.spinner-3 {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
}
@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}
.send-bottom {
  .btn-send {
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
}
.send-item {
  // padding-left: 10px;

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
.is-pc {
  padding-top: 36px;
}
.price-total {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #44ce6f;
}
.cart-pay {
  display: flex;
  align-items: center;
  .radio-btn {
    width: 18px;
    height: 18px;
    border: #44ce6f 1px solid;
    border-radius: 50%;
    margin-right: 16px;
  }

  background: #ffffff;
  /* 44CE6F 100% */
  padding: 20px;
  border-radius: 6px;
  margin-top: 48px;

  border: 1px solid #44ce6f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}
.cart-area {
  background-color: #fcfcfd;
}
.is-mobile {
  display: none;
}
// .info-right {
//   width: 50%;
//   svg {
//     width: 20%;
//   }
// }
.remove {
  color: red;
  margin-left: 25px;
  position: relative;
  top: -1px;
  float: right;
}
// .order-item {
//   box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
//   border: 1px solid #e6e6e6;
//   border-radius: 5px;
//   padding: 0 10px;
//   width: 95%;
//   margin: auto;
// }
.order-item__product {
  img {
    min-width: 80px;
    height: 80px;
    object-fit: cover;
    flex-basis: 10%;
  }
}
.order-item__bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.order-product-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}
.order-product-item__info {
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}
.order-product-item__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 10px;
}
.dongia {
  p {
    font-size: 16px;
  }
}
.order-item__btn {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: flex-end;
}

.btn-danger {
  background-color: #f44336; /* Red */
}
//responsive mobile  and tablet
@media (max-width: 768px) {
  .input-counter {
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
  }
  .is-mobile {
    display: block;

    .cart-header {
      label {
        padding-left: 0;
      }
    }
  }
  .is-pc {
    display: none;
  }
}

.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #44ce6f;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@-webkit-keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  left: 12px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

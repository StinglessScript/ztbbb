<template>
  <div class="index cart">
    <!-- <PageTitle class="is-pc" :pageTitle="title" /> -->

    <div class="cart-area" v-if="!showLoader">
      <div class="container" v-show="!demo">
     
        <div class="row" v-if="carts?.length > 0">
          <div class="back">
            <a @click="$router.go(-1)"><feather type="arrow-left"></feather></a>
            <span>Xác nhận đặt hàng</span>
          </div>

          <div class="col-lg-8 col-md-12">
            <div class="cart-items">
              <div class="cart-header">
                <div class="row border-bottom">
                  <div class="col-5 font-weight-bold">Tên</div>
                  <div class="col-2 font-weight-bold">Đơn giá</div>
                  <div class="col-2 font-weight-bold">Số lượng</div>
                  <div class="col-3 font-weight-bold">Thành tiền</div>
                  <!-- <div class="col-1 font-weight-bold"></div> -->
                </div>
              </div>
              <div class="cart-item" v-for="cart in carts" :key="cart.id">
                <div class="row item">
                  <div class="col-5">{{ cart.product.title }}</div>
                  <div class="col-2">
                    {{ convertPrice(cart.product.price) }}
                  </div>
                  <div class="col-2">{{ cart.quantity }}</div>
                  <div class="col-3">{{ convertPrice(cart.price) }}</div>
                  <!-- <div class="col-1">
                    <div
                      style="cursor: pointer"
                      v-if="cart.allow_delete"
                      @click="removeItem(cart.id, cart.parent_id)"
                    >
                      <img src="~/assets/img/remove.svg" />
                    </div>
                  </div> -->
                </div>

                <div
                  v-for="itemchild in cart.line_item_child"
                  :key="itemchild.id"
                >
                  <div class="row item-child">
                    <div class="col-5">{{ itemchild.product.title }}</div>
                    <div class="col-2">
                      {{ convertPrice(itemchild.product.price) }}
                    </div>
                    <div class="col-2">{{ itemchild.quantity }}</div>
                    <div class="col-2">
                      {{ convertPrice(itemchild.total_price) }}
                    </div>
                    <!-- <div class="col-1">
                      <div
                        v-if="itemchild.allow_delete"
                        @click="removeItem(itemchild.id, itemchild.parent_id)"
                      >
                        <img src="~/assets/img/remove.svg" />
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
              <!-- <div class="cart-footer">
                  <div class="row py-2">
                    <div class="col-5"></div>
                    <div class="col-2"></div>
                    <div class="col-2">Tổng</div>
                    <div class="col-2">{{ convertPrice(cartTotal) }}</div>
                    <div class="col-1"></div>
                  </div>
                  <div class="row py-2">
                    <div class="col-5"></div>
                    <div class="col-2"></div>
                    <div class="col-2">VAT(10%)</div>
                    <div class="col-2">
                      {{ convertPrice((cartTotal * 10) / 100) }}
                    </div>
                    <div class="col-1"></div>
                  </div>
                  <div class="row py-2">
                    <div class="col-5"></div>
                    <div class="col-2"></div>
                    <div class="col-2">Tổng đơn hàng</div>
                    <div class="col-2 price-total">
                      {{ convertPrice(cartTotal + (cartTotal * 10) / 100) }}
                    </div>
                    <div class="col-1"></div>
                  </div>
                </div> -->
              <!-- <div class="cart-pay">
                <div class="radio-btn"></div>
                <span>
                  Tôi muốn trả góp trong 6 tháng<br />
                  Số tiền hàng tháng bạn sẽ phải trả: 2.000.000đ
                </span>
              </div> -->
            </div>
          </div>
          <div class="col-lg-4 col-md-12 mb-100">
            <div class="cart-send">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="send-item">
                    <div class="send-title">
                      Tổng cộng ({{ carts?.length }} sản phẩm)
                    </div>
                    <div class="send-body">
                      {{ convertPrice(cartTotal) }}
                      <!-- <div class="price">{{ convertPrice(cartTotal) }}</div> -->
                    </div>
                  </div>
                  <div class="send-item">
                    <div class="send-title">Voucher</div>
                    <div class="send-body">
                      <!-- {{ convertPrice(cartTotal + (cartTotal * 10) / 100) }} -->
                      <!-- <div class="price">{{ convertPrice(cartTotal) }}</div> -->
                    </div>
                  </div>
                  <div class="send-item">
                    <div class="send-title">VAT</div>
                    <div class="send-body">
                      {{ convertPrice((cartTotal * 10) / 100) }}
                      <!-- <div class="price">{{ convertPrice(cartTotal) }}</div> -->
                    </div>
                  </div>
                </div>

                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="pay-item">
                    <div class="pay-title">Tổng thanh toán</div>
                    <div class="pay-body">
                      {{ convertPrice(cartTotal + (cartTotal * 10) / 100) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="cart-send">
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="pay-item">
                    <div class="pay-title active">Thông tin khách hàng</div>
                  </div>

                  <ValidationObserver v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(checkStep)">
                      <div class="form-item">
                        <ValidationProvider
                          mode="lazy"
                          rules="required"
                          v-slot="{ errors }"
                        >
                          <div class="form-info">
                            <label class="form-label" for="required"
                              >Họ và tên</label
                            >
                            <input
                              id="name"
                              v-model="name"
                              class="form-input"
                              type="text"
                            />
                          </div>
                          <div class="form-err">{{ errors[0] }}</div>
                        </ValidationProvider>
                      </div>
                      <div class="form-item">
                        <ValidationProvider
                          mode="lazy"
                          rules="required|phone"
                          v-slot="{ errors }"
                        >
                          <div class="form-info">
                            <label class="form-label" for="password"
                              >Số điện thoại</label
                            >
                            <input
                              id="phone"
                              v-model="phone"
                              class="form-input"
                              type="text"
                            />
                          </div>
                          <div class="form-err">{{ errors[0] }}</div>
                        </ValidationProvider>
                      </div>
                      <div class="form-item">
                        <ValidationProvider
                          mode="lazy"
                          rules="required|email"
                          v-slot="{ errors }"
                        >
                          <div class="form-info">
                            <label class="form-label" for="password"
                              >Email</label
                            >
                            <input
                              class="form-input"
                              id="email"
                              v-model="email"
                              type="email"
                            />
                          </div>
                          <div class="form-err">{{ errors[0] }}</div>
                        </ValidationProvider>
                      </div>
                      <div class="pay-item">
                        <div class="pay-bottom">
                          <button
                            type="submit"
                            @click="isNextStep = true"
                            class="btn-send active"
                          >
                            Xác nhận đặt hàng
                          </button>
                          <button
                            @click="isNextStep = false"
                            type="submit"
                            class="btn-send"
                          >
                            Nhận tư vấn và dùng thử
                          </button>
                        </div>
                      </div>
                    </form>
                  </ValidationObserver>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div>
            <div class="container-fluid mt-100">
              <div class="row">
                <div class="col-md-12">
                  <div class="card-body cart">
                    <div class="col-sm-12 text-center">
                      <img
                        src="~/assets/img/No data-cuate.png"
                        width="260"
                        height="260"
                        class="img-fluid"
                      />
                      <h4>
                        <strong
                          >Không có sản phẩm nào trong giỏ hàng của bạn</strong
                        >
                      </h4>
                      <a 
                        href="/cua-hang"
                        class="btn btn-primary cart-btn-transform m-3"
                        data-abc="true"
                        >Tiếp tục mua hàng</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container" style="padding: 80px 16px" v-show="demo">
        <div class="line-btn" ref="ok">
          <div class="noti-susses">
            <feather type="check-circle"></feather> Đã gửi thông tin
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 col-md-12 col-sm-12 mb-4">
            <div class="info">
              <div class="info-title">
                Cảm ơn bạn {{ name }} đã sử dụng dịch vụ của chúng tôi
              </div>
              <div class="info-des">
                Chúng tôi đã nhận được đơn hàng của bạn
              </div>
              <div class="info-des">Mã đơn hàng của bạn là: {{ orderId }}</div>
              <div class="info-list">
                <div class="info-item">
                  <feather type="check"></feather>Chúng tôi sẽ liên hệ bạn qua
                  SĐT: {{ phone }} trong 24 giờ.
                </div>
                <div class="info-item">
                  <feather type="check"></feather> Thông tin đơn hàng sẽ được
                  gửi về Email {{ email }}.
                </div>
                <div class="info-item">
                  <feather type="check"></feather> Liên hệ trực tiếp với chúng
                  tôi nếu có vấn đề phát sinh.
                </div>
              </div>
            </div>
          </div>
          <div
            class="col-lg-5 col-md-12 col-sm-12 mb-4"
            v-if="!$store.getters.isAuthenticated"
          >
            <div class="info d-flex">
              <div class="info-left">
                <div class="info-title">
                  Tạo tài khoản để quản lý đơn hàng dễ dàng
                </div>
                <a  href="/dang-ky"
                  ><button class="info-btn">Đăng ký</button></a
                >
              </div>
              <div class="info-right">
                <img src="~/assets/img/1.svg" class="banner" />
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-12 col-sm-12 mb-4" v-else>
            <div class="info d-flex">
              <div class="info-left">
                <div class="info-title">Tham khảo những dịch vụ khác</div>
                <a  href="/cua-hang"
                  ><button class="info-btn">Xem ngay</button></a
                >
              </div>
              <div class="info-right">
                <img src="~/assets/img/cart-2.svg" class="banner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="d-flex justify-content-center" style="margin: 80px">
      <div class="spinner-3"></div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle";
import Cookies from "js-cookie";
import SVGDelete from "~/assets/img/remove.svg";
import SVGCart2 from "~/assets/img/cart-2.svg";
import SVGCart1 from "~/assets/img/1.svg";

export default {
  name: "Cart",
  data() {
    return {
      user: {},
      name: "",
      phone: "",
      email: "",
      note: "",
      carts: null,
      cartTotal: 0,
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
      orderId: "",
      isNextStep: false,
    };
  },
  components: { SVGDelete, SVGCart2, SVGCart1, PageTitle },
  computed: {
    title() {
      return this.demo ? "Đặt hàng thành công" : "Giỏ hàng";
    },
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.getUserInfo();
    }
    this.getCart();
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
    checkStep() {
      if (this.isNextStep) {
        this.handleCustomer();
      } else {
        this.createOrder();
      }
    },

    handleCustomer() {
    const  payload = {
        name: this.name,
        phone: this.phone,
        email: this.email,
      };
      this.$store.commit("setCustomer", payload);
      this.$router.push('/thanh-toan')
    },
    goto(refName) {
      let element = this.$refs[refName];
      let top = element.offsetTop;
      window.scrollTo(0, top + 300);
    },
    getUserInfo() {
      this.$store
        .dispatch("getCustomerInfo")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.user = response.data;
              this.id = this.user.id;
              this.name = this.user.name;
              this.phone = this.user.phone;
              this.email = this.user.email;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    filterData() {
      let result = [];
      if (this.carts && Object.keys(this.carts).length > 0) {
        result = this.carts.map((item, index) => {
          return item.id;
        });
        return result;
      }
    },
    createOrder() {
      const customer = {
        id: this.id,
        email: this.email,
        name: this.name,
        phone: this.phone,
      };
      let order = {
        customer: customer,
        note: this.note,
        cart_ids: this.filterData(),
        // shipping_address_id: "12109",
        // shipping_address: {
        //   address1: "256 Hai bà huyện Thanh Quan ",
        //   name: "Tên lạ",
        //   phone: "0973977338",
        //   province_code: "20",
        //   district_code: "2068",
        //   ward_code: "20691",
        // },
        // payment_method: "1017",
        // payment_gateway: "",
      };

      !this.$store.getters.isAuthenticated
        ? this.$store
            .dispatch("createOrderWithoutLoginById", order)
            .then((data) => {
              switch (data.status) {
                case 1:
                  this.demo = !this.demo;
                  this.orderId = data.data[0].order_id;
                  //   this.goto("ok");
                  this.deleteCart();
                  this.$toast.success(data.message, {});
                  break;
                case 0:
                  this.$toast.error(data.message, {});
                  break;
              }
            })
            .catch((error) => {
              console.log(error);
            })
        : this.$store
            .dispatch("createOrderWithLoginByCartId", order)
            .then((data) => {
              switch (data.status) {
                case 1:
                  this.demo = !this.demo;
                  //   this.goto("ok");
                  this.deleteCart();
                  this.$toast.success(data.message, {});
                  break;
                case 0:
                  this.$toast.error(data.message, {});
                  break;
              }
            })
            .catch((error) => {
              console.log(error);
            });
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

    removeItem(id, parentId) {
      if (this.carts.length === 1 && !parentId) {
        this.deleteCart();
      } else {
        this.$store
          .dispatch("deleteItemFromCart", id)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.$store.commit("setCountItem", +1);
                this.getCart();
                this.$toast.success(data.message, {});
                break;
              case 0:
                this.$toast.error(data.message, {});
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteCart() {
      this.$store
        .dispatch("deleteCart")
        .then((res) => {
          Cookies.remove("sessionId");
          this.$store.commit("setCountItem", +1);
          this.getCart();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCart() {
      if (this.$route.query.productid) {
        if (this.$store.state.sessionId2 || Cookies.get("sessionId2")) {
          const sessionId2 = Cookies.get("sessionId2")
            ? Cookies.get("sessionId2")
            : this.$store.state.sessionId2;
          this.$store
            .dispatch("getCart", sessionId2)
            .then((data) => {
              // data.items.forEach((element) => {
              //   this.products = {};
              //   this.parsedobj = null;
              //   this.getProductById(element.product.parentId, element.product.id);
              // });
              this.carts = data.items;
              this.cartTotal = data.total_price;
            })
            .catch((error) => {
              console.log(error);
              this.carts = [];
            });
        } else {
          this.carts = [];
        }
      } else {
        if (Cookies.get("sessionId") !== undefined) {
          this.$store
            .dispatch("getCart", Cookies.get("sessionId"))
            .then((data) => {
              console.log(data.items);

              // data.items.forEach((element) => {
              //   this.products = {};
              //   this.parsedobj = null;
              //   this.getProductById(element.product.parentId, element.product.id);
              // });
              this.carts = data.items;
              this.cartTotal = data.total_price;
            })
            .catch((error) => {
              console.log(error);
              this.carts = [];
            });
        } else {
          this.carts = [];
        }
      }
    },
    increaseQuantity(id, quantity) {
      quantity++;
      let update = {
        product_id: id,
        quantity: quantity,
      };
      this.$store
        .dispatch("updateCart", update)
        .then((data) => {
          this.getCart();
        })
        .catch((error) => {});
    },
    decreaseQuantity(id, quantity) {
      if (quantity > 1) {
        quantity--;
        let update = {
          product_id: id,
          quantity: quantity,
        };
        this.$store
          .dispatch("updateCart", update)
          .then((data) => {
            this.getCart();
            switch (data.status) {
              case 1:
                this.getCart();
                break;
              case 0:
                break;
            }
          })
          .catch((error) => {});
      }
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>

<template>
  <div class="index cart">
    <div class="cart-area" v-if="!showLoader">
      <div class="container" v-show="!demo">
        <div class="back">
          <a @click="$router.go(-1)"><feather type="arrow-left"></feather></a>
          <span>Giỏ hàng</span>
        </div>
        <!-- <div class="row is-mobile">
          <div class="cart-mheader">
            <a @click="$router.go(-1)"><feather type="arrow-left"></feather></a>
            <span>Giỏ hàng</span>
          </div>
          <template v-if="carts?.length > 0">
            <div class="cart-send">
              <div class="send-step active">
                <span>Gửi Thông Tin</span>
                <div class="icon active">
                  <feather type="send"></feather>
                  <div class="arrow"></div>
                </div>
              </div>
              <div class="send-step">
                <span>Nhận Tư Vấn</span>
                <div class="icon">
                  <feather type="phone"></feather>
                  <div class="arrow"></div>
                </div>
              </div>
              <div class="send-step">
                <span>Hoàn Tất</span>
                <div class="icon"><feather type="check"></feather></div>
              </div>
            </div>
            <div class="cart-items" v-for="(cart, i) in carts" :key="i">
              <div class="cart-header">
                <div v-if="cart.line_item_child">
                  <label for="vehicle1">Mua và đặt chỗ</label>
                </div>
                <div class="quantity" v-if="!cart.line_item_child">
                <div class="input-counter">
                  <span
                    @click="decreaseQuantity(cart.product.id, cart.quantity)"
                    class="counter-btn"
                  >
                    <feather type="minus"></feather>
                  </span>
                  {{ cart.quantity }}
                  <span
                    @click="increaseQuantity(cart.product.id, cart.quantity)"
                    class="counter-btn"
                  >
                    <feather type="plus"></feather>
                  </span>
                </div>
              </div>

                <a @click="removeItem(cart.id)">Xóa</a>
              </div>
              <div class="cart-line"></div>
              <div class="cart-info">
                <div class="info-name">{{ cart.product.title }}</div>
                <div class="info-price">
                  {{ convertPrice(cart.final_price) }}
                </div>
              </div>
              <template v-for="item in cart.line_item_child">
                <div
                  class="cart-option"
                  v-if="cart.line_item_child.length > 0"
                  :key="item.id"
                >
                  <div class="option-info">
                    {{ item.product.title }}
                    <div class="d-flex">
                      <div class="option-price">
                        {{ convertPrice(item.product.price) }}
                      </div>
                      <div class="option-delete">
                        <div
                          v-if="item.allow_delete"
                          @click="removeItem(item.id)"
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="option-detail"></div>
                </div>
              </template>
              <div class="cart-footer">
                <div class="quantity">
                  <span class="lablePrice">Giá đơn hàng:</span
                  ><span class="price">
                    {{ convertPrice(cart.finalLinePrice) }}</span
                  >
                </div>
              </div>
            </div>
            <div class="cart-total">
              <div class="total-price">
                <div class="name">Tổng thanh toán</div>
                <div class="item">
                  <span>1 đơn hàng</span>
                  <span class="price"> {{ convertPrice(cartTotal) }}</span>
                </div>
              </div>
              <div class="total-send">
                <div class="send-name">
                  Nhập thông tin
                  <feather
                    style="cursor: pointer"
                    @click="toggle = !toggle"
                    :type="!toggle ? 'chevron-up' : 'chevron-down'"
                  ></feather>
                </div>
                <div v-show="toggle" class="send-body">
                  <div class="items">
                    <ValidationProvider
                      mode="lazy"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <div class="item-info">
                        <label class="form-label" for="required"
                          >Họ và tên</label
                        >
                        <input
                          id="name"
                          v-model="name"
                          type="text"
                          class="form-control form-control-lg"
                          placeholder="Họ và tên"
                        />
                      </div>
                      <div class="send-err">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="items">
                    <ValidationProvider
                      mode="lazy"
                      rules="required|phone"
                      v-slot="{ errors }"
                    >
                      <div class="item-info">
                        <label class="form-label" for="password"
                          >Số điện thoại</label
                        >
                        <input
                          id="phone"
                          v-model="phone"
                          type="text"
                          class="form-control form-control-lg"
                          placeholder="Số điện thoại"
                        />
                      </div>
                      <div class="send-err">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="items">
                    <ValidationProvider
                      mode="lazy"
                      rules="required|min:6"
                      v-slot="{ errors }"
                    >
                      <div class="item-info">
                        <label class="form-label" for="password">Email</label>
                        <input
                          id="email"
                          v-model="email"
                          type="email"
                          class="form-control form-control-lg"
                          placeholder="Email"
                        />
                      </div>
                      <div class="send-err">{{ errors[0] }}</div>
                    </ValidationProvider>
                  </div>
                  <div class="items">
                    <div class="item-info">
                      <label class="form-label" for="password">Ghi chú</label>
                      <textarea
                        name="note"
                        id="note"
                        v-model="note"
                        cols="30"
                        rows="4"
                        placeholder="Ghi chú"
                        class="form-control"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div class="total-footer">
                <div class="send-btn" @click="createOrder">Đặt Hàng</div>
                <div class="send-noti" v-if="!toggle && !name">
                  <feather type="info" style="color: #f9a825"></feather>
                  <span style="color: #f9a825">Bạn chưa điền thông tin</span>
                </div>
              </div>
            </div>
          </template>
        </div> -->
        <div class="row" v-if="carts?.length > 0">
          <div class="col-lg-8 col-12 mb-4">
            <div class="cart-items is-pc">
              <div class="cart-header">
                <div class="row border-bottom">
                  <div class="col-5 font-weight-bold">Tên</div>
                  <div class="col-2 font-weight-bold">Đơn giá</div>
                  <div class="col-2 font-weight-bold">Số lượng</div>
                  <div class="col-2 font-weight-bold">Thành tiền</div>
                  <div class="col-1 font-weight-bold"></div>
                </div>
              </div>
              <div class="cart-item" v-for="cart in carts" :key="cart.id">
                <div class="row item">
                  <div class="col-5">{{ cart.product.title }}</div>
                  <div class="col-2">
                    {{ convertPrice(cart.product.price) }}
                  </div>
                  <div class="col-2">{{ cart.quantity }}</div>
                  <div class="col-2">{{ convertPrice(cart.price) }}</div>
                  <div class="col-1 d-flex align-items-center">
                    <div
                      style="cursor: pointer"
                      v-if="cart.allow_delete"
                      @click="removeItem(cart.id, cart.parent_id)"
                    >
                      <img src="~/assets/img/remove.svg" />
                    </div>
                  </div>
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
                    <div class="col-1">
                      <div
                        v-if="itemchild.allow_delete"
                        @click="removeItem(itemchild.id, itemchild.parent_id)"
                      >
                        <img src="~/assets/img/remove.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
            </div>
            <div class="cart-items is-mobile">
              <div class="cart-item" v-for="cart in carts" :key="cart.id">
                <div class="d-flex justify-content-between align-items-center">
                <div class="font-weight-bold">{{ cart.product.title }}</div>
                <div class="d-flex align-items-center">
                      <div
                        style="cursor: pointer;width: 45px;"
                        v-if="cart.allow_delete"
                        @click="removeItem(cart.id, cart.parent_id)"
                      >
                        <img src="~/assets/img/remove.svg" />
                      </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="item-price">
                    <span> Đơn giá :</span>
                    {{ convertPrice(cart.product.price) }}
                  </div>
                  x
                  <div class="item-quantity">{{ cart.quantity }}</div>
                </div>

                <div class="d-flex justify-content-between">
                  <div class="item-price">
                    <span> Thành tiền :</span>
                    {{ convertPrice(cart.price) }}
                  </div>
                </div>
                <div class="mb-2"></div>
                <div
                  v-for="itemchild in cart.line_item_child"
                  :key="itemchild.id"
                >
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="font-weight-bold">
                      {{ itemchild.product.title }}
                    </div>
                    <div class="d-flex align-items-center">
                      <div
                        style="cursor: pointer"
                        v-if="itemchild.allow_delete"
                        @click="removeItem(itemchild.id, itemchild.parent_id)"
                      >
                        <img src="@/assets/img/remove.svg" />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="item-price">
                      <span> Đơn giá :</span>
                      {{ convertPrice(itemchild.product.price) }}
                    </div>
                    x
                    <div class="item-quantity">{{ itemchild.quantity }}</div>
                  </div>

                  <div class="d-flex justify-content-between">
                    <div class="item-price">
                      <span> Thành tiền :</span>
                      {{ convertPrice(itemchild.total_price) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-12 mb-100">
            <div class="cart-send">
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
              <div class="send-item pb-2 border-bottom">
                <div class="send-title">VAT</div>
                <div class="send-body">
                  {{ convertPrice((cartTotal * 10) / 100) }}
                  <!-- <div class="price">{{ convertPrice(cartTotal) }}</div> -->
                </div>
              </div>
              <div class="pay-item">
                <div class="pay-title">Tổng thanh toán</div>
                <div class="pay-body">
                  {{ convertPrice(cartTotal + (cartTotal * 10) / 100) }}
                </div>
              </div>

              <div class="pay-item">
                <div class="pay-bottom">
                  <a  class="btn-send active" href="/xac-nhan-dat-hang">
                    Xác nhận giỏ hàng
                  </a>
                  <button @click="$router.push('/cua-hang')" class="btn-send">
                    Chọn thêm sản phẩm
                  </button>
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
                          >Không có sản phẩm nào trong giỏ hàng của bạn</strong
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
                  this.goto("ok");
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
                  this.goto("ok");
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
              console.log("ấ", data);

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
  padding-top: px;
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

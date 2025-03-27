<template>
  <div class="cart-area ptb-80">
    <div class="container">
      <div class="row">
        <div
          class="order-item mb-2 is-mobile"
          v-for="(cart, i) in cart"
          :key="i"
        >
          <div class="order-item__product mb-2">
            <div class="order-product-item d-flex">
              <img :src="cart.image" alt="" class="justify-content-start" />
              <div class="order-product-item__info">
                <div class="order-product-item__title">
                  <strong>{{ cart.product.title }}</strong>
                </div>
                <div class="d-flex justify-content-between">
                  <div class="m-2">
                    <p class="d-flex align-items-center mb-1">
                      Số lượng:<span class="ml-2">
                        <div
                          style="border: 1px #eee solid; width: 80px"
                          class="d-flex justify-content-between align-items-center"
                        >
                          <span
                            style="border-right: 1px #eee solid"
                            class="d-flex justify-content-between align-items-center"
                            @click="
                              decreaseQuantity(cart.product.id, cart.quantity)
                            "
                          >
                            <feather type="minus"></feather>
                          </span>
                          <span> {{ cart.quantity }}</span>
                          <span
                            style="border-left: 1px #eee solid"
                            class="d-flex justify-content-between align-items-center"
                            @click="
                              increaseQuantity(cart.product.id, cart.quantity)
                            "
                          >
                            <feather type="plus"></feather>
                          </span></div
                      ></span>
                    </p>
                    <p>
                      Đơn giá:<span class="ml-2"></span
                      >{{ convertPrice(cart.final_price) }}
                    </p>
                  </div>

                  <a
                    href="javascript:void(0)"
                    class="remove"
                    @click="removeItem(cart.product.id, cart.supplier_id)"
                  >
                    <feather type="trash-2"></feather>
                  </a>
                </div>
                <p class="d-flex justify-content-end">
                  <span class="mr-2" style="color: red">Thành tiền:</span>
                  <span>{{ convertPrice(cart.final_line_price) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12">
          <form v-if="cart.length > 0">
            <div class="cart-table table-responsive is-pc">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(cart, i) in cart" :key="i">
                    <td class="product-thumbnail">
                      <a  :href="`/san-pham/${cart.product.handle}`">
                        <img :src="cart.image" :alt="cart.title" />
                      </a>
                    </td>

                    <td class="product-name">
                      <a  :href="`/san-pham/${cart.product.handle}`">
                        {{ cart.product.title }}
                      </a>
                    </td>

                    <td class="product-price">
                      <span class="unit-amount">{{
                        convertPrice(cart.final_price)
                      }}</span>
                    </td>

                    <td class="product-quantity">
                      <div class="input-counter">
                        <span
                          @click="
                            decreaseQuantity(cart.product.id, cart.quantity)
                          "
                          class="minus-btn"
                        >
                          <feather type="minus"></feather>
                        </span>
                        {{ cart.quantity }}
                        <span
                          @click="
                            increaseQuantity(cart.product.id, cart.quantity)
                          "
                          class="plus-btn"
                        >
                          <feather type="plus"></feather>
                        </span>
                      </div>
                    </td>

                    <td class="product-subtotal">
                      <span class="subtotal-amount">
                        {{ convertPrice(cart.final_line_price) }}
                      </span>

                      <a
                        href="javascript:void(0)"
                        class="remove"
                        @click="removeItem(cart.product.id, cart.supplier_id)"
                      >
                        <feather type="trash-2"></feather>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="cart-buttons">
              <div class="row align-items-center">
                <div class="col-lg-7 col-md-7 col-sm-7">
                  <div class="continue-shopping-box">
                    <a  href="/cua-hang" class="btn btn-light">
                      Tiếp tục mua hàng
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div class="cart-totals">
              <div class="header-card d-flex align-items-center">
                <h3 style="margin-right: 18px">Tổng thanh toán:</h3>

                <h3 style="color: red; font-size: 18px">
                  {{ convertPrice(cartTotal) }}
                </h3>
              </div>
              <div class="d-flex justify-content-end">
                <a  href="/checkout" class="btn btn-primary">
                  Tiến hành đặt hàng
                </a>
              </div>
            </div>
          </form>

          <div v-else>
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
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "Cart",
  data() {
    return {
      cart: [],
      cartTotal: 0,
    };
  },

  mounted() {
    this.getCart();
  },
  methods: {
    //conver price to vnd
    convertPrice(price) {
      if (price) {
        return (
          price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " ₫"
        );
      } else {
        return price;
      }
    },
    removeItem(product_id, supplier_id) {
      let payload = {
        product_id: product_id,
        supplier_id: supplier_id,
      };
      this.$store
        .dispatch("deleteItemFromCart", payload)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {});
              this.getCart();
              this.$store.commit("setCountItem", -1);

              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        })
        .catch((error) => {
          this.$toast.error("Máy chủ đang bảo trì", {});
        });
    },
    getCart() {
      if (Cookies.get("sessionId") !== undefined) {
        this.$store
          .dispatch("getCart")
          .then((data) => {
            this.cart = data.items;
            this.cartTotal = data.total_price;
            switch (data.status) {
              case 1:
                this.cart = data.data.items;
                this.cartTotal = data.data.total_price;
                break;
              case 0:
                break;
            }
          })
          .catch((error) => {});
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
.is-mobile {
  display: none;
}
.remove {
  color: red;
  margin-left: 25px;
  position: relative;
  top: -1px;
  float: right;
}
.order-item {
  box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 0 10px;
  width: 95%;
  margin: auto;
}
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
.btn-cus {
  // background-color: #4caf50; /* Green */
  border: none;
  // color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
  margin: 4px 2px;
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
  }
  .is-pc {
    display: none;
  }
}
</style>

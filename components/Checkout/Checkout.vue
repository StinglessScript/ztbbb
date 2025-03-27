<template>
  <div class="checkout-area ptb-80">
    <modal name="my-modal" :adaptive="true" :scrollable="true" height="auto">
      <div class="modal-header">
        <h4 class="modal-title text-center">Thêm địa chỉ</h4>
      </div>
      <div class="modal-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(createAddress)">
            <div class="form-group active">
              <label>Họ và tên <span class="required">*</span></label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="name"
                  v-model="customer.name"
                  class="form-control"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group active">
              <label>Số điện thoại <span class="required">*</span></label>
              <ValidationProvider
                style="width: 100%"
                rules="required|phone"
                mode="lazy"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="phone"
                  v-model="customer.phone"
                  class="form-control"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group active">
              <label>Địa chỉ <span class="required">*</span></label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  id="address"
                  v-model="shipping_address.address1"
                  class="form-control"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group active">
              <label>Thành phố <span class="required">*</span></label>
              <div class="select-box">
                <select
                  v-if="provinces !== []"
                  class="form-control"
                  style="width: 100%"
                  v-model="shipping_address.province_code"
                  @change="getDistricts"
                >
                  <option value="">Chọn tỉnh/thành phố</option>
                  <option 
                    v-for="province in provinces"
                    :key="province.id"
                    :value="province.provinceId"
                  >
                    {{ province.provinceName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group active">
              <label>Quận/ Huyện <span class="required">*</span></label>

              <div class="select-box">
                <select
                  v-if="districts !== []"
                  class="form-control"
                  v-model="shipping_address.district_code"
                  @change="getWards"
                >
                  <option value="">Chọn quận/huyện</option>
                  <option
                    v-for="district in districts"
                    :key="district.id"
                    :value="district.districtId"
                  >
                    {{ district.districtName }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group active">
              <label>Phường/ Xã <span class="required">*</span></label>

              <div class="select-box">
                <select
                  v-if="wards !== []"
                  class="form-control"
                  v-model="shipping_address.ward_code"
                >
                  <option value="">Chọn phường/xã</option>
                  <option
                    v-for="ward in wards"
                    :key="ward.id"
                    :value="ward.wardId"
                  >
                    {{ ward.wardName }}
                  </option>
                </select>
              </div>
            </div>

            <div class="modal-footer" style="width: 100%">
              <slot name="footer">
                <button
                  type="button"
                  class="btn btn-default"
                  @click="$modal.hide('my-modal')"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-primary">Thêm</button>
              </slot>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </modal>
    <div class="container" v-if="success === false && items">
      <div class="row" v-if="!this.$store.getters.isAuthenticated">
        <div class="col-lg-12 col-md-12">
          <div class="user-actions">
            <feather type="edit"></feather>
            <span
              >Bạn đã có tài khoản?
              <a  href="/dang-nhap"
                >Nhấn vào đây để đăng nhập</a
              ></span
            >
          </div>
        </div>
      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(createOrder)">
          <div class="row">
            <div class="col-lg-6 col-md-12">
              <div class="billing-details1">
                <h3 class="title">Thông tin người nhận</h3>
                <div class="row" v-if="!$store.getters.isAuthenticated">
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
                      <label>Họ và tên <span class="required">*</span></label>
                      <ValidationProvider
                        mode="lazy"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          id="name"
                          v-model="customer.name"
                          class="form-control"
                        />
                        <span style="color: red">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label
                        >Số điện thoại <span class="required">*</span></label
                      >
                      <ValidationProvider
                        rules="required|phone"
                        mode="lazy"
                        v-slot="{ errors }"
                      >
                        <input
                          type="text"
                          id="phone"
                          v-model="customer.phone"
                          class="form-control"
                        />
                        <span style="color: red">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="form-group">
                      <label
                        >Địa chỉ Email <span class="required">*</span></label
                      >
                      <input
                        type="email"
                        id="email"
                        v-model="customer.email"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="col-lg-12 col-md-6">
                    <div class="form-group">
                      <label>Địa chỉ <span class="required">*</span></label>
                      <input
                        type="text"
                        id="address"
                        v-model="shipping_address.address1"
                        class="form-control"
                      />
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
                      <label>Thành phố <span class="required">*</span></label>
                      <div class="select-box">
                        <select
                          v-if="provinces !== []"
                          class="form-control"
                          v-model="shipping_address.province_code"
                          @change="getDistricts"
                        >
                          <option value="">Chọn tỉnh/thành phố</option>
                          <option
                            v-for="province in provinces"
                            :key="province.id"
                            :value="province.provinceId"
                          >
                            {{ province.provinceName }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
                      <label>Quận/ Huyện <span class="required">*</span></label>

                      <div class="select-box">
                        <select
                          v-if="districts !== []"
                          class="form-control"
                          v-model="shipping_address.district_code"
                          @change="getWards"
                        >
                          <option value="">Chọn quận/huyện</option>
                          <option
                            v-for="district in districts"
                            :key="district.id"
                            :value="district.districtId"
                          >
                            {{ district.districtName }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
                      <label>Phường/ Xã <span class="required">*</span></label>

                      <div class="select-box">
                        <select
                          v-if="wards !== []"
                          class="form-control"
                          v-model="shipping_address.ward_code"
                        >
                          <option value="">Chọn phường/xã</option>
                          <option
                            v-for="ward in wards"
                            :key="ward.id"
                            :value="ward.wardId"
                          >
                            {{ ward.wardName }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
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
                <div class="row" v-else>
                  <!-- get user addres -->
                  <div class="col-lg-12 col-md-12 payment-method">
                    <div class="payment-method-title">
                      <h3 class="title">Chọn địa chỉ</h3>
                    </div>
                    <div class="row" v-if="addresses.length === 0">
                      <div class="col-lg-12 col-md-12">
                        <div class="user-actions">
                          <span
                            >Bạn chưa có địa chỉ nào
                            <a
                              style="color"
                              @click.prevent="$modal.show('my-modal')"
                            >
                              Thêm địa chỉ
                            </a></span
                          >
                        </div>
                      </div>
                    </div>
                    <div style="margin-bottom: 8px"></div>

                    <p
                      style="margin-bottom: 12px"
                      v-for="(item, index) in addresses"
                      :key="item.id"
                    >
                      <input
                        @change="selectAddress(index)"
                        type="radio"
                        :id="item.id"
                        :value="item.id"
                        name="address"
                        :checked="item.address_default ? 'checked' : ''"
                      />
                      <label :for="item.id"
                        >{{ item.name }}, {{ item.phone }},
                        {{ item.full_address }}</label
                      >
                    </p>
                  </div>
                  <div class="col-lg-12 col-md-12">
                    <div class="form-group">
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
            </div>

            <div class="col-lg-6 col-md-12">
              <div class="order-details">
                <h3 class="title">Đơn hàng của bạn</h3>

                <div class="order-table table-responsive">
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr v-for="(cart, i) in cart" :key="i">
                        <td class="product-name">
                          <a  :href="`/san-pham/${cart.product.handle}`">
                            {{ cart.product.title }}
                            <span style="color: red; font-size: 18px"
                              >x {{ cart.quantity }}</span
                            >
                          </a>
                        </td>

                        <td class="product-total">
                          <span
                            class="subtotal-amount"
                            v-if="cart.final_line_price !== null"
                          >
                            {{ convertPrice(cart.final_line_price) }}
                          </span>
                        </td>
                      </tr>

                      <tr>
                        <td class="total-price">
                          <span>Tổng đơn đặt hàng</span>
                        </td>

                        <td class="product-subtotal">
                          <span class="subtotal-amount">
                            {{ convertPrice(cartTotal) }}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="payment-method">
                  <div class="payment-method-title">
                    <h3 class="title">Hình thức thanh toán</h3>
                  </div>
                  <p v-for="(payment, index) in payments" :key="index">
                    <input
                      type="radio"
                      :id="payment.id"
                      @change="selectPayment(index)"
                      name="radio-group"
                    />
                    <label :for="payment.id">{{ payment.name }}</label>
                  </p>
                </div>

                <button type="submit" class="btn btn-primary order-btn">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form></ValidationObserver
      >
    </div>
    <div class="container show" v-else>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-12">
          <div class="order-details text-center">
            <h3 class="title">QUÝ KHÁCH ĐÃ ĐẶT HÀNG THÀNH CÔNG</h3>
            <p>
              Cảm ơn quý khách đã đặt mua sản phẩm của chúng tôi ! Đơn hàng của
              quý khách sẽ được nhân viên kiểm tra và giao hàng trong thời gian
              sớm nhất.
            </p>
            <div>
              <a  href="/">
                <button class="btn btn-danger m-2">Trở về trang chủ</button>
              </a>
              <a  href="/cua-hang">
                <button class="btn btn-primary">Tiếp tục mua hàng</button>
              </a>
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
  name: "Checkout",
  data() {
    return {
      success: false,
      name: "",
      phone: "",
      idAddress: "",
      payments: [],
      user: {},
      cart: [],
      cartTotal: 0,
      addresses: [],
      provinces: [],
      districts: [],
      wards: [],
      note: "",
      payment_method: "",
      items: [],
      customer: {
        email: "",
        name: "",
        phone: "",
        gender: "",
        avatar: "",
        birthday_time_long: 0,
      },
      shipping_address_id: "",
      shipping_address: {
        address1: "",
        name: this.name,
        phone: this.phone,
        province_code: "",
        district_code: "",
        ward_code: "",
      },
    };
  },

  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.getUserAddresses();
      this.getUserInfo();
    }
    this.getProvinces();
    this.getCart();
    this.getPayment();
  },
  methods: {
    filterData() {
      let result = [];
      if (this.cart && Object.keys(this.cart).length > 0) {
        result = this.cart.map((item, index) => {
          return {
            quantity: item.quantity,
            product_id:
              item.variant_id == null ? item.product_id : item.variant_id,
            supplier_id: "",
          };
        });
        return result;
      }
    },
    async getPayment() {
      this.$store.dispatch("getPaymentServices").then((res) => {
        this.payments = res.data;
      });
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
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectPayment(index) {
      this.payment_method = this.payments[index].id;
    },
    selectAddress(id) {
      if (this.addresses) {
        this.shipping_address.address1 = this.addresses[id].address1;
        this.shipping_address.name = this.addresses[id].name;
        this.shipping_address.phone = this.addresses[id].phone;
        this.shipping_address.province_code = this.addresses[id].province_code;
        this.shipping_address.district_code = this.addresses[id].district_code;
        this.shipping_address.ward_code = this.addresses[id].ward_code;
        this.shipping_address_id = this.addresses[id].id;
      }
    },
    //create addresses
    createAddress() {
      let body = {
        name: this.customer.name,
        phone: this.customer.phone,
        address1: this.shipping_address.address1,
        province_code: this.shipping_address.province_code,
        district_code: this.shipping_address.district_code,
        ward_code: this.shipping_address.ward_code,
      };
      this.$store
        .dispatch("createOrderAddress", body)
        .then((data) => {
          switch (data.status) {
            case 0:
              this.$toast.error(data.message, {});
              break;
            case 1:
              this.$toast.success(data.message, {});
              this.$modal.hide("my-modal");
              this.getUserAddresses();
              break;
            case 2:
              this.this.$toast.warning(data.message, {});
          }
        })
        .catch((error) => {
          console.log(error);
          
        });
    },
    // create order
    async createOrder() {
      if (!this.$store.getters.isAuthenticated) {
        this.shipping_address.name = this.customer.name;
        this.shipping_address.phone = this.customer.phone;
      }
      //set value user vao customer
      if (this.$store.getters.isAuthenticated) {
        this.customer.email = this.user.email;
        this.customer.name = this.user.name;
        this.customer.phone = this.user.phone;
        this.customer.avatar = "";
        this.customer.birthday_time_long = this.user.birthday_time_long;
      }
      let order = {
        customer: this.customer,
        note: this.note,
        line_items: this.filterData(),
        shipping_address_id: !this.$store.getters.isAuthenticated
          ? ""
          : this.shipping_address_id,
        shipping_address: this.shipping_address,
        payment_method: this.payment_method,
        payment_gateway: "",
      };

      !this.$store.getters.isAuthenticated
        ? this.$store
            .dispatch("createOrderWithoutLogin", order)
            .then((data) => {
              switch (data.status) {
                case 1:
                  this.$toast.success(data.message, {});
                  this.removeCart();
                  this.success = true;
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
            .dispatch("createOrderWithLogin", order)

            .then((data) => {
              switch (data.status) {
                case 1:
                  this.$toast.success(data.message, {});
                  window.scrollTo(0, 140);
                  this.removeCart();
                  this.success = true;
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
    //remove cart
    async removeCart() {
      this.$store
        .dispatch("deleteCart")
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$store.commit("setCountItem", 1);
              Cookies.remove("sessionId");
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
      return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " ₫";
    },
    async getCart() {
      this.$store
        .dispatch("getCart")
        .then((data) => {
          this.cart = data.items;
          this.cartTotal = data.total_price;
          let result = [];
          result = cart.map((item, index) => {
            return {
              quantity: item.quantity,
              product_id:
                item.variant_id == null ? item.product_id : item.variant_id,
              supplier_id: "",
            };
          });
          this.items = result;
          switch (data.status) {
            case 1:
              this.cart = data.data.items;
              this.cartTotal = data.data.total_price;
              let result = [];
              result = cart.map((item, index) => {
                return {
                  quantity: item.quantity,
                  product_id:
                    item.variant_id == null ? item.product_id : item.variant_id,
                  supplier_id: "",
                };
              });
              this.items = result;

              break;
            case 0:
              break;
          }
        })
        .catch((error) => {});
    },
    async getUserAddresses() {
      this.$store.dispatch("getListAddresses").then((res) => {
        this.addresses = res.data;
        if (this.addresses.length > 0) {
          this.addresses.forEach((item, index) => {
            if (item.address_default) {
              this.selectAddress(index);
            }
          });
        }
      });
    },
    async getProvinces() {
      this.$store.dispatch("getListProvinces").then((response) => {
        this.provinces = response;
      });
    },

    async getDistricts() {
      this.$store
        .dispatch("getListDistricts", this.shipping_address.province_code)
        .then((response) => {
          this.districts = response;
        });
    },
    async getWards() {
      this.$store
        .dispatch("getListWards", this.shipping_address.district_code)
        .then((response) => {
          this.wards = response;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.billing-details1 .payment-method {
  margin-top: 0px;
  padding-top: 12px;
}
.checkout-area .title {
  font-size: 18px;
  margin-bottom: 16px;
}
.info-method {
  margin-top: 40px;
  border-top: 1px solid #eaedff;
  padding-top: 35px;

  p {
    font: {
      size: 14px;
    }
    [type="radio"] {
      &:checked,
      &:not(:checked) {
        display: none;
      }
    }
    [type="radio"] {
      &:checked,
      &:not(:checked) {
        + label {
          padding-left: 27px;
          cursor: pointer;
          display: block;
          color: #000;
          position: relative;
          margin-bottom: 8px;
          font: {
            weight: 500;
          }
          &::before {
            content: "";
            position: absolute;
            left: 0;
            top: 4px;
            width: 18px;
            height: 18px;
            border: 1px solid #dddddd;
            border-radius: 50%;
            background: #fff;
          }
          &::after {
            content: "";
            width: 12px;
            height: 12px;
            background: green;
            position: absolute;
            top: 7px;
            left: 3px;
            border-radius: 50%;
            transition: transition;
          }
        }
      }
    }
    [type="radio"] {
      &:not(:checked) {
        + label {
          &::after {
            opacity: 0;
            visibility: hidden;
            transform: scale(0);
          }
        }
      }
    }
    [type="radio"] {
      &:checked {
        + label {
          &::after {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
          }
        }
      }
    }
  }
}
.form-group  {
  &.active {
    display: flex;
  justify-content: space-between;
  label {
    width: 150px;
    margin-right: 10px;
  }
  .select-box {
    width: 100%;
  }
  }
}
</style>

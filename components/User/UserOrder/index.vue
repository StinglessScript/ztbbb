<template>
  <div>
    <div>
      <Loader :loading="showLoader" />

      <div class="order-status" v-if="status">
        <ul class="nav nav-tabs">
          <li class="nav-item" v-for="item in status" :key="item.id">
            <a 
              :href="`?${item.value}`"
              class="nav-link"
              v-on:click.native="getListOrder((statusActive = `${item.value}`))"
              >{{ item.description }}</a
            >
          </li>
        </ul>
      </div>

      <div class="input-group" style="margin: 4px 0">
        <input
          type="search"
          class="form-control rounded mr-sm-2"
          placeholder="Tìm kiếm id hoặc mã đơn hàng ..."
          aria-label="Search"
          v-model="keyword"
          aria-describedby="search-addon"
        />
        <button type="button" class="btn-cus" @click="getListOrder">
          Tìm kiếm
        </button>
      </div>

      <div
        class="order-item mb-2"
        v-for="item in listOrder.orders"
        :key="item.id"
        @click="
          getOrderDetail(item.id);
          $modal.show('my-modal');
        "
      >
        <div
          class="order-item__top d-flex justify-content-between align-items-center"
        >
          <div>
            <span>Mã đơn hàng: #{{ item.id }}</span>
          </div>
          <div>
            <span
              ><span>Trạng thái: </span>
              <span style="color: red">{{ item.status }}</span></span
            >
          </div>
        </div>
        <div class="order-item__product mb-2" v-if="item.line_items">
          <div
            class="order-product-item d-flex"
            v-for="product in item.line_items"
            :key="product.id"
          >
            <img :src="product.image" alt="" class="justify-content-start" />
            <div class="order-product-item__info" v-if="product">
              <div class="order-product-item__title" v-if="product.product">
                <strong
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    line-height: 25px;
                    -webkit-line-clamp: 2;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                  "
                  >{{ product.product.title }}</strong
                >
              </div>

              <div class="mb-3" v-if="product.product">
                <p>
                  Số lượng:<span class="ml-2"
                    >{{ product.quantity }} {{ product.product.unit }}</span
                  >
                </p>
                <p>
                  Đơn giá:<span class="ml-2"></span
                  >{{ convertPrice(product.final_price) }}
                </p>
              </div>

              <div class="d-flex justify-content-end">
                <p>
                  Thành tiền:
                  <span>{{ convertPrice(product.final_line_price) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          class="order-item__bottom d-flex justify-content-between align-items-center"
        >
          <div style="font-size: 16px; color: rgb(204, 204, 204)">
            {{ item.created_at.split(".")[0].replace("T", "    ") }}
          </div>
          <p class="dongia">
            <span style="color: red">Tổng tiền:</span>
            <span>{{ convertPrice(item.total_price) }}</span>
          </p>
        </div>
      </div>
      <div
        class="empty"
        v-if="listOrder.orders && listOrder.orders.length === 0"
      >
        <img src="~/assets/img/No data-amico.png" width="300px" alt="" />
        <h3>Không có đơn hàng nào trong mục này !</h3>
      </div>
      <Pagination
        v-if="listOrder.totalPage"
        :total-pages="listOrder.totalPage"
        :per-page="recordsPerPage"
        :current-page="page"
        @pagechanged="onPageChange"
      />
    </div>
    <modal
      name="my-modal"
      :min-width="200"
      :min-height="200"
      :scrollable="true"
      :reset="true"
      width="90%"
      responesive="true"
      height="auto"
    >
      <Loader :loading="showLoader" />
      <div class="modal-header">
        <h4 class="modal-title">Chi tiết đơn hàng #{{ orderDetail.id }}</h4>
      </div>
      <div class="modal-body">
        <div class="address-item d-flex">
          <div class="address-item-title d-flex">
            <div class="address-item-title__lable mr-4">
              <div>Tên:</div>
              <div>Số điện thoại:</div>
              <div>địa chỉ:</div>
            </div>
            <div
              class="address-item-title__value"
              v-if="orderDetail.shipping_address"
            >
              <div>
                {{ orderDetail.shipping_address.name }}
              </div>

              <div>{{ orderDetail.shipping_address.phone }}</div>
              <div>{{ orderDetail.shipping_address.full_address }}</div>
            </div>
          </div>
        </div>
        <div class="order-item mb-2">
          <div
            class="order-item__top d-flex justify-content-between align-items-center"
          >
            <div>
              <span>Mã đơn hàng: #{{ orderDetail.id }}</span>
            </div>
            <div>
              <span
                ><span>Trạng thái: </span>
                <span style="color: red">{{ orderDetail.status }}</span></span
              >
            </div>
          </div>
          <div class="order-item__product mb-2">
            <div
              class="order-product-item d-flex"
              v-for="product in orderDetail.line_items"
              :key="product.id"
            >
              <img :src="product.image" alt="" class="justify-content-start" />
              <div class="order-product-item__info">
                <div class="order-product-item__title">
                  <strong>{{ product.product.title }}</strong>
                </div>

                <div class="mb-3">
                  <p>
                    Số lượng:<span class="ml-2"
                      >{{ product.quantity }} {{ product.product.unit }}</span
                    >
                  </p>
                  <p>
                    Đơn giá:<span class="ml-2"></span
                    >{{ convertPrice(product.final_price) }}
                  </p>
                </div>

                <div class="d-flex justify-content-end">
                  <p>
                    Thành tiền:
                    <span>{{ convertPrice(product.final_line_price) }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            class="order-item__btn d-flex"
            v-if="orderDetail.statusId !== `CANCELED`"
          >
            <div class="btn-group">
              <button
                class="btn-cus btn-danger"
                @click="$modal.show('my-modal-cancel')"
              >
                Hủy đơn hàng
              </button>
              <button
                class="btn-cus btn-success"
                @click="confirmOrder(orderDetail.id)"
              >
                Xác nhận nhận hàng
              </button>
            </div>
          </div>
          <div
            class="order-item__bottom d-flex justify-content-between align-items-center"
          >
            <div style="font-size: 16px; color: rgb(204, 204, 204)">
              {{ orderDetail.created_at }}
            </div>
            <p class="dongia">
              <span style="color: red">Tổng tiền:</span>
              <span v-if="orderDetail.total_price !== undefined">{{
                convertPrice(orderDetail.total_price)
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="modal-footer" style="width: 100%">
        <slot name="footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="$modal.hide('my-modal')"
          >
            Đóng
          </button>
        </slot>
      </div>
    </modal>
    <modal
      name="my-modal-cancel"
      :min-width="200"
      :min-height="200"
      :scrollable="true"
      :reset="true"
      width="400px"
      responesive="true"
      height="auto"
    >
      <div class="modal-header">
        <h4 class="modal-title">Lý do hủy đơn hàng</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Lý do</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="reason"
          ></textarea>
        </div>
      </div>
      <div class="modal-footer" style="width: 100%">
        <slot name="footer">
          <button
            type="button"
            class="btn btn-danger"
            @click="$modal.hide('my-modal-cancel')"
          >
            Đóng
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="cancelOrder(orderDetail.id, reason)"
          >
            Xác nhận
          </button>
        </slot>
      </div>
    </modal>
  </div>
</template>

<script>
import Pagination from "@/components/Common/Pagination.vue";
import Loader from "@/components/Common/Loader.vue";
export default {
  name: "user-order",
  props: ["props"],
  components: {
    Pagination,
    Loader,
  },
  mounted() {
    this.listOrder = this.props;
    this.getStatus();
  },
  data() {
    return {
      id: "",
      checkOrders: [],
      listOrder: {},
      page: 1,
      totalPages: 0,
      totalRecords: 0,
      recordsPerPage: 10,
      enterpageno: "",
      sort: "",
      reason: "",
      keyword: "",
      showLoader: false,
      orderDetail: {},
      status: [],
      statusActive: "",
    };
  },
  watch: {
    listOrder: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },
    orderDetail: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },
  },

  methods: {
    async confirmOrder(id) {
      this.$store
        .dispatch("confirmReceivedOrder", id)
        .then((response) => {
          switch (response.status) {
            case 1:
              this.$toast.success(response.message, {});
              this.getOrderDetail(id);
              this.getListOrder();
              break;
            case 0:
              this.$toast.error(response.message, {});
              break;
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {});
        });
    },
    getStatus() {
      this.$store
        .dispatch("getOrdersStatus")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.status = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getOrderDetail(id) {
      this.showLoader = true;
      this.$store
        .dispatch("getOrderInfo", id)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.orderDetail = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async cancelOrder(id, reason) {
      this.$toast.info("Đã gửi yêu cầu hủy đơn", {});
      const payload = {
        reason: reason,
        order_id: id,
      };
      this.$store
        .dispatch("cancelOrder", payload)
        .then((response) => {
          switch (response.status) {
            case 1:
              this.$toast.success(response.message, {});
              this.$modal.hide("my-modal-cancel");
              this.getOrderDetail(id);
              this.getListOrder();
              break;
            case 0:
              this.$toast.error(response.message, {});
              break;
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {});
        });
    },
    async getListOrder() {
      this.showLoader = true;
      let payload = {
        keyword: this.keyword,
        status: this.statusActive,
        currentPage: this.page,
        maxResult: 4,
      };
      this.$store
        .dispatch("getListOrder", payload)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.listOrder = response.data;
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    onPageChange(page) {
      this.page = page;
      this.getListOrder();
      //scroll to top product list
      window.scrollTo({
        top: 300,
        behavior: "smooth",
      });
    },
    convertPrice(price) {
      return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " ₫";
    },
  },
};
</script>

<style lang="scss" scoped>
.order-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebebeb;
  ul {
    list-style: none;
    display: flex;
  }
}
.order-item {
  box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
}
.order-item__product {
  border-bottom: 1px solid #e6e6e6;
  img {
    min-width: 100px;
    height: 100px;
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
.order-item__top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e6e6e6;
  padding-bottom: 4px;
}
.order-product-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
}
.order-product-item__info {
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 10px;
  p {
    padding-bottom: 2px;
    margin-bottom: 2px;
  }
}
.order-product-item__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 4px;
}
.dongia {
  p {
    font-size: 16px;
  }
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.order-item__btn {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: flex-end;
}
.order-item {
  &:hover {
    box-shadow: 0 1px 3px rgb(50 50 93 / 15%), 0 1px 0 rgb(0 0 0 / 2%);
  }
  cursor: pointer;
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
.address-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.btn-danger {
  background-color: #f44336; /* Red */
}
</style>

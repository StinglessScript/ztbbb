<template>
  <div>
    <div class="account-body" v-if="!isDetail">
      <div class="account-title">Đơn hàng</div>
      <div class="account-tabs w-100">
        <b-card no-body>
          <b-tabs content-class="mt-3" active-nav-item-class="current">
            <b-tab
              v-for="(item, index) in tabs"
              :key="index"
              :title="item.name"
            >
              <div class="tab_item">
                <table class="table">
                  <thead class="theader">
                    <tr>
                      <th scope="col">Mã đơn hàng</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Số tiền</th>
                      <th scope="col">Thời gian đặt hàng</th>
                      <th scope="col">Thanh toán</th>
                      <th scope="col">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="itemOrder in listOrder?.orders"
                      :key="itemOrder.id"
                      class="trStyle"
                    >
                      <th class="thStyle">
                        <a @click="orderDetail(itemOrder.id)">
                          #{{ itemOrder.id }}
                        </a>
                      </th>
                      <td class="tdStyle" style="text-align: left">
                        <div
                          class="btn-radio"
                          :class="{ red: itemOrder.statusId === 'CANCELED' }"
                        ></div>

                        {{ itemOrder.status }}
                      </td>
                      <td class="tdStyle">
                        {{ convertPrice(itemOrder.total_price) }}đ
                      </td>
                      <td class="tdStyle">
                        {{ changeTime(itemOrder.created_at) }}<br />
                        {{ changeDate(itemOrder.created_at) }}
                      </td>
                      <td>0</td>
                      <td><img src="~/assets/img/dot.svg" @click="openMenu" />
                          <div class="d-none" style="position: absolute; top: 0;">
                            <ul>
                              <li>Liên hệ về đơn</li>
                              <li>Xuất hoá đơn</li>
                              <li>Yêu cầu huỷ</li>
                            </ul>
                          </div>
                      </td>
                    </tr>
                    <!-- <div class="d-flex justify-content-between">
                      <div>Danh sách trên trang</div>
                      <div>trong 3 trang</div>
                    </div> -->
                  </tbody>
                </table>
              </div>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
    </div>
    <Transition name="slide-fade">
      <ReceiptDetail v-if="isDetail" />
    </Transition>
  </div>
</template>

<script>
import ReceiptDetail from "./ReceiptDetail.vue";
import SVGDot from "~/assets/img/dot.svg";
import moment from "moment";
export default {
  components: {
    ReceiptDetail,
    SVGDot,
  },
  data() {
    return {
      listOrder: null,
      isDetail: false,

      tabs: [
        {
          name: "Tất cả",
          component: "test",
        },
        {
          name: "Đang xử lý",
          component: "test",
        },
        {
          name: "Chờ thanh toán",
          component: "test",
        },
        {
          name: "Hoàn tất",
          component: "test",
        },
        {
          name: "Đã huỷ",
          id: "CANCELED",
          component: "test",
        },
      ],
    };
  },
  created() {
    this.getListOrder();
    if (this.$route.query.id) {
      this.isDetail = true;
    }
  },
  watch: {
    $route(pathUrl) {
      this.isDetail = pathUrl.query?.id ? true : false;
    },
  },

  methods: {
    openMenu (){
      
    },
    changeTime(time) {
      return moment(time).format("hh:mm ");
    },
    changeDate(time) {
      return moment(time).format("DD-MM-YYYY ");
    },
    orderDetail(id) {
      this.$router.push({
        path: "don-hang",
        query: { id: id },
      });
    },
    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    async getListOrder() {
      this.showLoader = true;
      let payload = {
        keyword: this.keyword,
        status: this.statusActive,
        currentPage: 1,
        maxResult: 10,
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
  },
};
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* Trước 2.1.8 thì dùng .slide-fade-leave-active */ {
  transform: translateX(1000px);
  opacity: 0;
}

.trStyle {
  .thStyle {
    text-align: center;
    vertical-align: middle;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.5px;
    text-decoration-line: underline;
    color: #364152;
    cursor: pointer;
  }
  .tdStyle {
    text-align: center;
    vertical-align: middle;
  }
}
.theader {
  background: #ecfaf1;
  border-width: 1px 1px 0px 1px;
  border-style: solid;
  border-color: #e3e8ef;
  border-radius: 6px 6px 0px 0px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #44ce6f;
}

.btn-radio {
  border: 1px solid #9aa4b2;
  width: 12.5px;
  height: 12.5px;
  border-radius: 50%;
  display: inline-block;
  background-color: #fff;
  margin-right: 11px;

  &.red {
    border: 1px solid #9aa4b2;
    background-color: #9aa4b2;
  }
}
</style>

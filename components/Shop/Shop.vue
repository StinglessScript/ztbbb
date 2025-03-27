<template>
  <div class="shop-area ptb-80" @click="isToggleSort = false">
    <div class="container">
      <Loader :loading="showLoader" />
      <div class="row">
        <div class="col-lg-3">
          <ProductSidebar
            :categories="categories"
            :idCategory="idCategory"
            style="margin-top: 16px"
            @sortTag="setTag"
            @sortPrice="setSortPrice"
          />
        </div>
        <div class="col-lg-9 col-md-12 col-sm-12">
          <div class="woocommerce-topbar">
            <div class="row align-items-center justify-content-between">
              <div class="col-lg-3">
                <div class="woocommerce-result-count">Sắp xếp theo</div>
              </div>
              <div class="col-lg-9 d-flex justify-content-end">
                <a
                  @click="handleSortOption('NEW', 1)"
                  class="btn-default"
                  :class="{
                    'outline-default': indexActiveSortOption !== 1,
                    'btn-green': indexActiveSortOption === 1,
                  }"
                >
                  Mới nhất</a
                >

                <a
                  @click="handleSortOption('BUY-A-LOT ', 2)"
                  class="btn-default"
                  :class="{
                    'outline-default': indexActiveSortOption !== 2,
                    'btn-green': indexActiveSortOption === 2,
                  }"
                >
                  Bán chạy</a
                >
                <a
                  class="btn-default"
                  :class="{
                    'outline-default': !nameSortPrice,
                    'btn-green': nameSortPrice,
                  }"
                  @click.stop="toggleSort"
                >
                  {{ nameSortPrice ? nameSortPrice : "Giá"
                  }}<feather type="chevron-down"></feather
                ></a>
                <div class="sort-price" v-show="isToggleSort">
                  <a
                    class="sort-item"
                    :class="{ active: i === indexSortOnChange }"
                    v-for="(item, i) in sortPrices"
                    :key="i"
                    @click="onChangeSort(item.name, item.query, i)"
                  >
                    {{ item.name }}
                  </a>
                </div>

                <!-- <select class="form-select" @change.prevent="onChangeSort">
                  <option value="">Giá</option>
                  <option value="ASC-NAME">Từ A - Z</option>
                  <option value="DESC-NAME">Từ Z - A</option>
                  <option value="ASC-PRICE">Giá tăng dần</option>
                  <option value="DESC-PRICE">Giá giảm dần</option>
                </select> -->
              </div>
            </div>
          </div>
          <!-- <Tags /> -->

          <div class="row">
            <div class="empty" v-if="listItems.length === 0">
              <img src="~/assets/img/No data-amico.png" width="300px" alt="" />
              <h3>Không có sản phẩm bạn cần tìm!</h3>
            </div>
            <div
              class="col-lg-4 col-md-6 col-sm-6"
              v-for="product in listItems"
              :key="product.id"
              ref="product"
            >
              <div class="single-products">
                <div class="products-top">
                  <div class="products-image">
                    <a 
                      :href="
                        $route.query.showBy
                          ? `/san-pham/${product.handle}?showBy=${$route.query.showBy}`
                          : `/san-pham/${product.handle}`
                      "
                    >
                      <img
                        :src="product.featured_image"
                        alt="image"
                        width="80%"
                      />
                    </a>
                  </div>
                  <div class="products-ticked">
                    <span>Chính sách đổi SP linh hoạt</span>
                  </div>
                  <div class="products-content">
                    <div class="products-header">
                      <div class="rating">
                        <star-rating
                          :rating="product.rating.average_rating"
                          :read-only="true"
                          :star-size="16"
                          :increment="0.01"
                          border-color="#F9A000"
                          inactive-color="#fff"
                          active-color="#F9A000"
                          :border-width="2"
                          :show-rating="false"
                          :padding="5"
                        ></star-rating>
                      </div>

                      <!-- <p>Đã Bán 200</p> -->
                    </div>
                    <a 
                      :href="
                        $route.query.showBy
                          ? `/san-pham/${product.handle}?showBy=${$route.query.showBy}`
                          : `/san-pham/${product.handle}`
                      "
                      ><h3>{{ product.title }}</h3>
                    </a>

                    <div class="products-price" v-if="product.price !== null">
                      {{ convertPrice(product.price) }}
                      <span>{{ product.currency_code }}</span>
                      <div class="price-right">
                        <div class="price-ori" v-if="product.compare_at_price">
                          {{ convertPrice(product.compare_at_price)
                          }}<span>{{ product.currency_code }}</span>
                        </div>
                        <!-- <span
                          >{{ product.currency_code }}</span
                        > -->
                      </div>
                    </div>
                    <div class="products-price" v-else></div>
                    <!-- <span
                      style="
                        color: rgb(255, 66, 78);
                        font-size: 25px;
                        line-height: 30px;
                        font-weight: bold;
                      "
                      v-else
                      >Liên hệ</span
                    > -->

                    <!-- <p style="font-size: 12px; margin-bottom: 24px">
                      Khi Bạn Đặt Máy Chủ 12 Tháng Tại DATACENTER Của Chúng Tôi
                    </p> -->
                    <div class="products-bt">
                      <a 
                        :href="
                          $route.query.showBy
                            ? `/san-pham/${product.handle}?showBy=${$route.query.showBy}`
                            : `/san-pham/${product.handle}`
                        "
                        class="products-btn"
                      >
                        Chi tiết</a
                      >

                      <!-- <a href="javascript:void(0)" class="products-btn compare">
                        So Sánh
                      </a> -->
                    </div>
                  </div>
                </div>
                <div class="products-footer">
                  <div class="icon"><feather type="dollar-sign"></feather></div>
                  Ưu Đãi Tặng/Giảm Giá Sau Khi Thuê Dịch Vụ
                </div>
              </div>
            </div>
          </div>
          <Pagination
            v-if="listItems.length !== 0"
            :total-pages="totalPages"
            :per-page="recordsPerPage"
            :maxResult="maxResult"
            :current-page="page"
            @pagechanged="onPageChange"
            @click="goto('product')"
            @maxResultChange="onMaxResultChange"

          />
        </div>
      </div>
    </div>
 
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Pagination from "../Common/Pagination";
import Loader from "@/components/Common/Loader.vue";
import ProductsDetails from "@/components/Product/ProductsDetails.vue";

export default {
  name: "Shop",
  components: {
    Pagination,
    Loader,
    ProductsDetails,
  },
  props: ["favorites", "nameBtn"],
  data() {
    return {
      isToggleSort: false,
      asNavFor1: [],
      asNavFor2: [],
      options1: {
        dots: false,
        fade: true,
        navButtons: true,
      },

      options2: {
        autoplay: false,
        centerMode: true,
        dots: false,
        navButtons: false,
        slidesToShow: 5,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 5,
            },
          },

          {
            breakpoint: 1000,
            settings: {
              navButtons: false,
            },
          },
        ],
      },
      listItems: [],
      page: 1,
      totalPages: 0,
      success: false,
      totalRecords: 0,
      maxResult: 10,
      recordsPerPage: 10,
      enterpageno: "",
      sort: "",
      query: "",
      selectedOption: {},
      quantity: 1,
      id: "",
      product: null,
      test: [],
      selected: [],
      activeIndex: null,
      activeI: null,
      options_relationship1: {},
      default: {
        price: "",
      },
      idCategory: "",
      showLoader: false,
      sort_order: "",
      sort_by: "",
      name: "",
      sortPrice: { from: "0", to: "100000000" },
      categories: [],
      sortOption: "",
      sortPrices: [
        { name: "Giá : Thấp tới Cao", query: "ASC-PRICE" },
        { name: "Giá : Cao tới Thấp", query: "DESC-PRICE" },
        { name: "Giá : Khuyến mãi", query: "ASC-PRICE" },
      ],
      nameSortPrice: "",
      indexSortOnChange: "",
      indexActiveSortOption: "",
    };
  },
  mounted() {
    this.showLoader = true;
    this.getProducts();
    this.getCategories();
  },
  watch: {
    listItems: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    onMaxResultChange(page) {
      this.maxResult = parseInt(page);
      this.getProducts();
    },
    handleSortOption(option, id) {
      this.showLoader = true;
      if (this.indexActiveSortOption !== id) {
        this.sortOption = option;
        this.indexActiveSortOption = id;

        this.getProducts();
      } else {
        this.sortOption = "";
        this.indexActiveSortOption = "";
        this.getProducts();
      }
    },
    toggleSort() {
      this.isToggleSort = !this.isToggleSort;
    },

    getCategories() {
      this.$store
        .dispatch("getCategories")
        .then((data) => {
          switch (data.status) {
            case 1:
              this.categories = data.data;
              break;
            case 0:
              console.log(data.message);
              break;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goto() {
      window.scrollTo(0, top);
    },
    getProducts(name) {
      const { slug } = this.$route.params;

      if (slug) {
        this.idCategory = slug.split("-").pop();
      }
      const payload = {
        sort_order: this.sort_order,
        sort_by: this.sort_by,
        category: this.idCategory,
        currentPage: this.page,
        tag: name,
        option: this.sortOption,
        // price_from: this.sortPrice.from,
        // price_to: this.sortPrice.to,
        maxResult: this.maxResult,
      };
      this.$store
        .dispatch(
          this.favorites ? "getFavoriteProducts" : "getProducts",
          payload
        )
        .then((rs) => {
          switch (rs.status) {
            case 1:
              this.listItems = rs.data.products;
              this.totalPages = rs.data.totalPage;
              this.goto();
              break;
            case 0:
              console.log(rs.message);
              break;
          }
        })
        .catch((error) => {
          console.log(error);
          error({ statusCode: 404, message: "Post not found" });
        });
    },
    checked(i, value, index, options_relationship) {
      if (this.selected[i] === value.name) {
        this.selected[i] = null;
        this.activeIndex = null;
        this.activeI = null;
        this.success = false;
        if (this.product.images.length > 1) {
          this.$refs.thumbnails.goTo(0);
        }
        this.product.price = this.default.price; // set price of product
        delete this.options_relationship1[i];
      } else {
        this.selected[i] = value.name;
        this.activeIndex = index;
        this.activeI = i;
        this.options_relationship1[i] = options_relationship[value.id];
      }
      this.test = Object.values(this.options_relationship1).flat();
      if (Object.keys(this.options_relationship1).length > 1) {
        const arry = this.test;
        const toFindDuplicates = (arry) =>
          arry.filter((item, index) => arry.indexOf(item) !== index);
        const duplicateElementa = toFindDuplicates(arry);
        this.test = duplicateElementa;
      } else {
        this.test = Object.values(this.options_relationship1).flat();
      }
    },
    opened() {
      this.asNavFor1.push(this.$refs.thumbnails);
      this.asNavFor2.push(this.$refs.main);
    },
    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    onChangeSort(name, value, i) {
      this.indexSortOnChange = i;
      console.log(this.indexSortOnChange);
      this.nameSortPrice = name;
      this.sort_order = value.split("-")[0];
      this.sort_by = value.split("-")[1];

      this.showLoader = true;
      this.getProducts();
    },
    onPageChange(page) {
      this.page = page;
      this.showLoader = true;
      this.getProducts();
    },
    onChangeRecordsPerPage() {
      this.getProducts();
    },

    addToCart(product) {
      if (product.variants === null) {
        product = {
          id: product.id,
          quantity: this.quantity,
          supplier_id: product.supplier_id,
        };
        this.$store
          .dispatch("addToCart", product)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.$toast.success(data.message, {});
                this.$store.commit("setCountItem", 1);
                this.$store.commit("setSessionId");
                Cookies.set("sessionId", this.$store.getters.getSessionId);
                break;
              case 0:
                this.$toast.error(data.message, {});
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.default.price = product.price;
        this.product = product;

        this.product.images.unshift(this.product.featured_image);
        if (this.product.variants.length > 1) {
          let item = this.product.variants; // get variants of product
          for (let index = 0; index < item.length; index++) {
            const element = item[index];
            if (this.product.images.indexOf(element.featured_image) === -1) {
              this.product.images.push(element.featured_image);
            } else {
            }
          }
        }
        this.options_relationship1 = {};
        this.selected = [];
        this.test = [];
        this.activeIndex = null;
        this.activeI = null;
        this.$modal.show("my-modal");
      }
    },
    setTag(setTag) {
      this.page = setTag.page;
      this.showLoader = true;
      this.getProducts(setTag.id);
    },
    setSortPrice(price) {
      this.showLoader = true;
      this.sortPrice.from = price[0];
      this.sortPrice.to = price[1];

      this.getProducts();
    },
    addToCart2() {
      let product = {
        id: this.product.id,
        quantity: this.quantity,
        supplier_id: this.product.supplier_id,
      };
      //check success
      if (!this.success && this.product.options_full.length > 0) {
        this.$toast.warning("Vui lòng chọn phân loại hàng", {});
      } else {
        this.$store
          .dispatch("addToCart", product)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.$modal.hide("my-modal");
                this.quantity = 1;
                this.selected = [];
                this.activeIndex = null;
                this.activeI = null;
                this.selectedOption = {};
                this.$toast.success(data.message, {});
                this.$store.commit("setCountItem", +1);
                this.$store.commit("setSessionId");
                Cookies.set("sessionId", this.$store.getters.getSessionId);
                break;
              case 0:
                break;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    handleVariants(name, value) {
      this.selectedOption[name] = value; // set selected option
      let obj = { ...this.selectedOption }; // clone selected option
      let variants = Object.values(obj); // get values of selected option
      let item = this.product.variants; // get variants of product
      for (let index = 0; index < item.length; index++) {
        const element = item[index];
        if (element.options !== null) {
          let variantsList = Object.values(element.options); // get values of variants
          if (variantsList.sort().toString() === variants.sort().toString()) {
            // this.product.title = element.title; // set title of product
            this.product.price = element.price; // set price of product
            this.product.id = element.id;
            if (
              this.product.images.indexOf(element.featured_image) !== -1 &&
              this.product.images.length > 1
            ) {
              this.$refs.thumbnails.goTo(
                this.product.images.indexOf(element.featured_image)
              );
            }
            this.success = true;
          }
        }
      }
    },

    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// .products-btn {
//   &s.compare {
//     background: #fff;
//   }
// }
.modal-header {
  border-bottom: none;
}

.closeModal {
  position: absolute;
  border: none;
  color: #000;
  background: #fff;

  font-size: 20px;
  top: 0;
  right: 0;
  z-index: 9999;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.slide--thumbniail {
  &.agile__slide--active {
    border: 1px solid green;
  }
}
.sort-price {
  position: absolute;
  top: 40px;
  right: 20px;
  background: #fff;
  border: 1px solid #e3e8ef;
  border-radius: 6px;
  z-index: 10;
  .sort-item {
    display: block;
    color: #697586;

    padding: 10px 58px 10px 10px;
    border-bottom: 1px solid #e3e8ef;
    cursor: pointer;
    &.active {
      background: #ecfaf1;
      border-color: #e3e8ef;
      color: #364152;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

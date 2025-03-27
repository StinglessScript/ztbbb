<template>
  <div>
    <BannerAdsCategory />
    <div class="container">
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
          <div class="products">
            <div class="products-search">
              <div class="products-input-search"></div>

              <div class="products-btn-search">Tìm kiếm</div>
            </div>
            <div class="products-filter">
              <div class="products-filter-title">Sắp xếp theo</div>
              <div class="products-filter-action">
                <div
                  class="filter-action-item"
                  @click="handleSortOption('NEW', 1)"
                  :class="{
                    '': indexActiveSortOption !== 1,
                    activev2: indexActiveSortOption === 1,
                  }"
                >
                  Mới nhất
                </div>
                <div
                  class="filter-action-item"
                  @click="handleSortOption('BUY-A-LOT ', 2)"
                  :class="{
                    '': indexActiveSortOption !== 2,
                    activev2: indexActiveSortOption === 2,
                  }"
                >
                  Bán chạy
                </div>
                <div
                  class="filter-action-item active"
                  :class="{
                    '': !nameSortPrice,
                    activev2: nameSortPrice,
                  }"
                  @click.stop="toggleSort"
                >
                  {{ nameSortPrice ? nameSortPrice : "Giá" }}
                  <img
                    :style="{
                      transform: isToggleSort
                        ? 'rotate(3.142rad)'
                        : 'rotate(0)',
                    }"
                    v-if="!nameSortPrice"
                    src="~/assets/img/down.svg"
                  />
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
                </div>
              </div>
            </div>
            <div class="products-grid">
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="product in listItems"
                  :key="product.id"
                  ref="product"
                >
                  <ProductCard :product="product" />
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
  name: "ShopV2",
  components: {
    Pagination,
    Loader,
    ProductsDetails,
  },
  props: ["favorites", "nameBtn"],
  data() {
    return {
      maxResult: 10,
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
      sortPrice: { from: "0", to: "100000000" },
      idCategory: "",
      showLoader: false,
      sort_order: "",
      sort_by: "",
      name: "",
      categories: [],
      sortOption: "",
      indexActiveSortOption: "",
      sortPrices: [
        { name: "Giá : Thấp tới Cao", query: "ASC-PRICE" },
        { name: "Giá : Cao tới Thấp", query: "DESC-PRICE" },
        { name: "Giá : Khuyến mãi", query: "ASC-PRICE" },
      ],
      isToggleSort: false,
      nameSortPrice: "",
      indexSortOnChange: "",
      indexActiveSortOption: "",
    };
  },
  mounted() {
    this.showLoader = true;
    this.getProducts();
    this.getCategories();
    if (this.$route.params.slug) {
      this.idCategory = /[^-]*$/.exec(`${this.$route.params.slug}`)[0];
    }
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
        .catch((data) => {
          console.log(error);
        });
    },
    goto() {
      window.scrollTo(0, top);
    },
    setSortPrice(price) {
      this.showLoader = true;
      this.sortPrice.from = price[0];
      this.sortPrice.to = price[1];
      this.getProducts();
    },
    getProducts(name) {
      // const { slug } = this.$route.params;
      const slug = this.$route.params.slug2
        ? this.$route.params.slug2
        : this.$route.params.slug;

      if (slug) {
        this.idCategory = slug.split("-").pop();
      }
      const payload = {
        sort_order: this.sort_order,
        sort_by: this.sort_by,
        category: this.idCategory ? this.idCategory : "",
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
          this.$toast.error(error.message, {});
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
    toggleSort() {
      this.isToggleSort = !this.isToggleSort;
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
.products {
  padding: 0 32px 0 32px;
  width: 100%;

  .products-search {
    margin-bottom: 20px;
    display: flex;
    width: 100%;
    .products-input-search {
      width: 86%;
      height: 46px;
      border: 1px solid #d9d9d9;
      border-radius: 5px 0px 0px 5px;
    }
    .products-btn-search {
      height: 46px;
      width: 180px;
      background: #44ce6f;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
      border-radius: 0px 6px 6px 0px;
      display: flex;
      justify-content: center;
      padding: 10px 40px;
      color: #ffffff;
      align-items: center;
    }
  }
  .products-filter {
    display: flex;
    align-items: center;
    padding: 0 12px;
    justify-content: space-between;
    width: 100%;
    height: 46px;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    .products-filter-title {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
    }
    .products-filter-action {
      display: flex;
      gap: 12px;
      .filter-action-item {
        background: #ffffff;
        cursor: pointer;
        border: 1px solid #16b364;
        border-radius: 6px;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        // text-align: center;
        color: #44ce6f;
        padding: 4px 26px;
        &.activev2 {
          background: #44ce6f;
          color: #ffffff;
        }
        &.active {
          display: flex;
          justify-content: space-between;
          width: 120px;
          // text-align: start;
          img {
            margin: 0px;
          }
          padding: 4px;
        }
        position: relative;
        .sort-price {
          position: absolute;
          bottom: -90px;
          right: 0px;
          width: 120px;
          background: #fff;
          border: 1px solid #e3e8ef;
          border-radius: 6px;
          z-index: 10;
          .sort-item {
            display: block;
            color: #000;

            padding: 4px;

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
      }
    }
  }
  .products-grid {
    //margin-top: 46px;
    margin-top: 16px;
  }
}
</style>

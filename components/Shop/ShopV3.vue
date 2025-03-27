<template>
  <div style="position: relative" :style="{ height: loadding ? '80vh' : auto }">
    <!-- <BannerAdsCategory /> -->
    <div class="container" style="padding-top: 10px; padding-bottom: 10px">
      <div class="row">
        <div class="col-lg-3">
          <ProductSidebar
            :categories_props="categories"
            :idCategory="idCategory"
            style="margin-top: 16px"
            @sortTag="setTag"
            @sortPrice="setSortPrice"
          />
        </div>
        <div class="col-lg-9 col-md-12 col-sm-12">
          <div class="products" style="position: relative">
            <div
              @click="handleShowModal"
              class="d-block d-lg-none"
              style="position: fixed; right: 0; z-index: 998; top: 40%"
            >
              <div
                style="
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                  padding: 0.571rem;
                  color: white;
                  border-radius: 4px;
                  background-color: #44ce6f;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M10 20v-7L2.95 4h18.1L14 13v7zm2-7.7L16.95 6h-9.9zm0 0"
                  />
                </svg>
              </div>
            </div>
            <!-- <div
              @click="handleShowModalSort"
              class="d-block d-lg-none"
              style="position: fixed; right: 0; z-index: 998; top: 48%"
            >
              <div
                style="
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                  padding: 0.571rem;
                  color: white;
                  border-radius: 4px;
                  background-color: #44ce6f;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path fill="#fff" d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z" />
                </svg>
              </div>
            </div> -->
            <div class="d-none d-lg-block">
              <div
                v-if="dataCategory"
                style="margin-top: 16px; margin-bottom: 16px"
                class="widget-area"
              >
                <div class="widget">
                  <h3 class="widget-title" style="justify-content: center">
                    {{ dataCategory?.title }}
                  </h3>
                </div>
                <div
                  style="margin-top: 10px"
                  v-html="dataCategory?.description"
                ></div>
              </div>
              <div class="products-search">
                <template style="position: relative">
                  <input
                    class="products-input-search"
                    style="
                      outline: none;
                      padding-left: 10px;
                      padding-right: 10px;
                      font-size: 14px;
                    "
                    placeholder="Tìm tên sản phẩm, mã sản phẩm,..."
                    v-model="keyword"
                    @keyup.enter="getProducts()"
                  />
                  <div
                    v-if="keyword"
                    @click="handleClearKeyword"
                    style="
                      position: absolute;
                      right: 27%;
                      top: 10px;
                      cursor: pointer;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="red"
                        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      />
                    </svg>
                  </div>
                </template>
                <div
                  class="products-btn-search"
                  style="outline: none; cursor: pointer"
                  @click="getProducts()"
                >
                  Tìm kiếm
                </div>
              </div>
            </div>
            <div class="d-block d-lg-none">
              <div class="products-search">
                <template style="position: relative">
                  <input
                    class="products-input-search"
                    style="
                      outline: none;
                      padding-left: 10px;
                      padding-right: 10px;
                      font-size: 12px;
                    "
                    placeholder="Tìm tên sản phẩm, mã sản phẩm,..."
                    v-model="keyword"
                    @keyup.enter="getProducts()"
                  />
                  <div
                    v-if="keyword"
                    @click="handleClearKeyword"
                    style="
                      position: absolute;
                      right: 27%;
                      top: 10px;
                      cursor: pointer;
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="red"
                        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
                      />
                    </svg>
                  </div>
                </template>

                <div
                  class="products-btn-search"
                  style="
                    outline: none;
                    cursor: pointer;
                    width: 46px !important;
                    padding: 0 !important;
                  "
                  @click="getProducts()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#fff"
                      d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989q-.975.35-1.96.35q-2.402 0-4.066-1.663q-1.664-1.664-1.664-4.065T5.47 5.436q1.663-1.667 4.064-1.667q2.402 0 4.068 1.664q1.666 1.664 1.666 4.067q0 1.042-.369 2.017q-.37.975-.97 1.668l6.262 6.261zM9.538 14.23q1.99 0 3.361-1.37q1.37-1.37 1.37-3.361q0-1.99-1.37-3.36q-1.37-1.37-3.36-1.37q-1.99 0-3.361 1.37q-1.37 1.37-1.37 3.36q0 1.99 1.37 3.36q1.37 1.37 3.36 1.37"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <!-- <div class="products-filter">
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
            </div> -->
            <div
              class="products-grid"
              v-if="listItems?.length > 0 && loadding == false"
            >
              <div class="row">
                <div
                  class="col-lg-4 col-md-6 col-sm-6"
                  v-for="product in listItems"
                  :key="product.id"
                  ref="product"
                >
                  <!-- product.qualify ||  'BARE_METAL'-->
                  <component
                    :is="'BARE_METAL'"
                    :product="product"
                    :key="product.id"
                    :price="priceForId[product.id]"
                    :options="productOtions[product.id]"
                  />
                </div>
              </div>
            </div>
            <div
              style="padding-top: 20px"
              v-else-if="listItems?.length <= 0 && loadding == false"
            >
              <span
                >Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp với từ
                khóa "<span style="font-weight: 600">{{ keyword }}</span
                >"</span
              >
              <div style="padding: 20px 40px">
                <span style="font-weight: 600"
                  >Để tìm được kết quả chính xác hơn, bạn vui lòng:</span
                >
                <li>Kiểm tra lỗi chính tả của từ khóa đã nhập.</li>
                <li>Thử lại bằng từ khóa khác.</li>
                <li>Thử lại bằng những từ khóa tổng quát hơn.</li>
                <li>Thử lại bằng những từ khóa ngắn gọn hơn.</li>
              </div>
            </div>
          </div>
          <Pagination
            v-if="listItems?.length > 0"
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
    <ModalProductSidebar
      v-if="showModale"
      :showModale="showModale"
      :categories="categories"
      :idCategory="idCategory"
      @sortTag="setTag"
      @sortPrice="setSortPrice"
      @closeShowModale="handleCloseModal"
      :categories_props="categories"
    />
    <ModalProductSidebarSort
      :showModale="showModaleSort"
      @closeShowModale="handleCloseModalSort"
      @handleSortOption="handleSortOption"
    />

    <div
      v-if="loadding == true"
      style="
        position: fixed;
        background-color: rgba(155, 151, 151, 0.26);
        z-index: 999;
        width: 100%;
        height: 100%;
        top: 0;
      "
    >
      <div class="logo-bg"></div>
      <div class="loader-bg"></div>
    </div>
  </div>
</template>

<script>
import Pagination from "../Common/Pagination";
import Loader from "@/components/Common/Loader.vue";
import BARE_METAL from "@/components/Product/ProductCardBareMetal.vue";
import OFFICE_365 from "@/components/Product/ProductCardBackupMicro365";
import ModalProductSidebar from "@/components/Modal/ModalProductSidebar";
import ModalProductSidebarSort from "@/components/Modal/ModalProductSidebarSort";

export default {
  name: "ShopV3",
  components: {
    Pagination,
    Loader,
    BARE_METAL,
    OFFICE_365,
    ModalProductSidebar,
    ModalProductSidebarSort,
  },
  props: ["favorites", "nameBtn", "category"],
  data() {
    return {
      showModale: false,
      maxResult: 30,
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
      productOtions: {},
      listItems: null,
      page: 1,
      totalPages: 0,
      success: false,
      totalRecords: 0,
      recordsPerPage: 20,
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
      sortPrice: { from: "", to: "" },
      idCategory: "",
      showLoader: false,
      sort_order: "",
      sort_by: "",
      name: "",
      categories: [],
      sortOption: "",
      indexActiveSortOption: "",
      keyword: "",
      sortPrices: [
        { name: "Giá : Thấp tới Cao", query: "ASC-PRICE" },
        { name: "Giá : Cao tới Thấp", query: "DESC-PRICE" },
        { name: "Giá : Khuyến mãi", query: "ASC-PRICE" },
      ],
      isToggleSort: false,
      nameSortPrice: "",
      indexSortOnChange: "",
      formatId: "",
      priceForId: {},
      tags: "",
      showModaleSort: false,
      hostname: "",
      loadding: true,

      dataCategory: null,
      //this.$route.query.tags ? this.$route.query.tags.split("-")[1] : ""
    };
  },
  mounted() {
    if (process.client) {
      this.hostname = window.location.hostname;
    }
    this.showLoader = true;
    // this.getProducts(this.tags, this.idCategory);
    this.getCategories();

    // if (this.$route.params.slug) {
    //   this.idCategory = /[^-]*$/.exec(`${this.$route.params.slug}`)[0];
    // }
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
    handleClearKeyword() {
      this.keyword = "";
    },
    handleCloseModal() {
      this.showModale = false;
    },
    handleShowModal() {
      this.showModale = true;
    },
    handleCloseModalSort() {
      this.showModaleSort = false;
    },
    handleShowModalSort() {
      this.showModaleSort = true;
    },
    onMaxResultChange(page) {
      this.maxResult = parseInt(page);
      this.getProducts(this.tags, this.idCategory);
    },
    handleSortOption(option, id) {
      if (this.indexActiveSortOption !== id) {
        this.sortOption = option;
        this.indexActiveSortOption = id;

        this.getProducts(this.tags, this.idCategory);
      } else {
        this.sortOption = "";
        this.indexActiveSortOption = "";
        this.getProducts(this.tags, this.idCategory);
      }
    },
    getCategories() {
      this.$store
        .dispatch("getCategories", this.$route.query.store)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.categories = data.data;
              // console.log(
              //   "this.categories",
              //   this.categories?.map((item) => item.id).join(",")
              // );
              this.getIdCategory();
              break;
            case 0:
              console.log(data.message);
              this.loadding = false;
              break;
          }
        })
        .catch((data) => {
          this.loadding = false;
          console.log(error);
        });
    },
    goto() {
      window.scrollTo(0, top);
    },
    setSortPrice(price) {
      this.handleCloseModal();
      this.showLoader = true;
      this.sortPrice.from = price[0];
      this.sortPrice.to = price[1];
      this.getProducts(this.tags, this.idCategory);
    },

    getIdCategory() {
      const formatIdCategory = this.categories
        ?.map((item) => item.id)
        .join(",");
      this.formatId = formatIdCategory;
      const slug = this.$route.params.slug2
        ? this.$route.params.slug2
        : this.$route.params.slug;
      //console.log("slug", this.$route.query);
      if (slug) {
        if (this.category) {
          this.dataCategory = this.category;
          this.idCategory = this.category.id;

          this.getProducts(
            this.tags || this.$route.query?.tags,
            this.idCategory
          );
        }

        // const data = { store: this.$route.query.store, slug };
        // this.$store
        //   .dispatch("getDeltailCategoryByHandle", data)
        //   .then((rs) => {
        //     //console.log("tôi nè", rs.data.id);

        //     switch (rs.status) {
        //       case 1:
        //         this.dataCategory = rs.data;
        //         this.idCategory = rs.data.id;
        //         this.getProducts(
        //           this.tags || this.$route.query?.tags,
        //           this.idCategory
        //         );

        //         break;
        //       case 0:
        //         console.log(rs.message);
        //         this.loadding = false;
        //         break;
        //     }
        //   })
        //   .catch((error) => {
        //     this.$toast.error(error.message, {});
        //     this.loadding = false;
        //     error({ statusCode: 404, message: "Post not found" });
        //   });
      } else {
        this.getProducts(
          this.tags || this.$route.query?.tags,
          formatIdCategory
        );
      }
    },

    async getProducts(name, id) {
      //console.log("nè nè", this.$route.query.tags, this.tags);
      this.listItems = null;
      const payload = {
        sortOrder: this.sort_order,
        sortBy: this.sort_by,
        keyword: this.keyword,
        priceFrom: this.sortPrice.from ? this.sortPrice.from : null,
        priceTo: this.sortPrice.to ? this.sortPrice.to : null,
        category: id ? id : this.formatId ? this.formatId : this.idCategory,
        currentPage: this.page,
        tag: name ? name : this.tags,
        maxResult: this.maxResult,
        display: "PUBLIC",
        subType: "CONFIG,SIMPLE,VARIABLE",
        status: "ON_SELL",
      };

      if (this.listItems == null) {
        this.loadding = true;

        try {
          // const rs = await this.$store.dispatch("getProducts", payload);
          const rs = await this.$sdk.product.getProducts(
            payload,
            this.$route.query.store
          );

          if (rs) {
            const ids = rs.data.map((item) => item.id);
            const responseListPrice = await this.$sdk.product.getListPrice(
              ids,
              this.$route.query.store
            );
            // console.log(
            //   "🚀 ~ getProducts ~ responseListPrice:",
            //   responseListPrice
            // );

            // this.listItems = rs.data.map((item) => {
            //   // Tìm giá tương ứng trong responseListPrice dựa trên id của item
            //   const price = responseListPrice[item?.id] || [];

            //   // Duyệt qua các đối tượng trong subPrices và thay đổi type thành type của object cha
            //   const updatedPrice = price?.map((p) => {
            //     // Cập nhật lại giá trị của type trong các subPrices
            //     const updatedSubPrices = p?.subPrices?.map((subPrice) => ({
            //       ...subPrice, // Giữ lại tất cả các thuộc tính của subPrice
            //       type: subPrice?.type == "QUANTITY" ? p?.type : subPrice?.type, // Cập nhật type cho subPrice từ object cha
            //     }));

            //     // Trả về đối tượng price đã được cập nhật
            //     return {
            //       ...p,
            //       subPrices: updatedSubPrices || [], // Thay thế subPrices cũ bằng subPrices đã cập nhật
            //     };
            //   });

            //   // Trả về đối tượng mới, với thông tin từ item và giá đã được cập nhật
            //   return {
            //     ...item, // Giữ lại tất cả các thuộc tính của item
            //     discountPrice: updatedPrice.length > 0 ? updatedPrice : null, // Gắn giá vào item, nếu có giá
            //   };
            // });

            const listData = rs.data.map((item) => {
              // Tạo một bản sao mới của đối tượng để đảm bảo nó có thể chỉnh sửa
              const newItem = { ...item };

              // Khởi tạo discountPrice nếu chưa tồn tại
              if (!newItem.discountPrice) {
                newItem.discountPrice = [];
              }

              // Tìm giá tương ứng trong responseListPrice dựa trên id của item
              let price = responseListPrice[newItem?.id] || [];

              // Duyệt qua các đối tượng trong subPrices và thay đổi type thành type của object cha
              let listPrice = price?.flatMap((d) => {
                if (!d?.subPrices || d?.subPrices?.length === 0) {
                  // Nếu không có subPrices, trả về 1 đối tượng mặc định
                  return [
                    {
                      time: d?.quantity || 1,
                      type: d?.type,
                      percentDiscount: d?.discountPercent || 0,
                      price: d?.price || 0,
                      hint: d?.hint || null,
                      priceDiscount:
                        d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                      unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                      unitDTO_name: newItem.unitDTO?.name || "default", // Default name if not available
                      defaultPrice: d?.defaultPrice ? false : true, // Default to true when no subPrices
                      attributes: {
                        value: d?.attributes?.some(
                          (a) =>
                            a.attrName == "CAMPAIN" ||
                            a.attrName == "CAMPAIGN_ACTION"
                        ),
                        campain: d?.attributes || [],
                      },
                    },
                  ];
                }

                // Trường hợp có subPrices, xử lý từng phần tử trong subPrices
                const subPriceData = d?.subPrices?.map((c) => {
                  return {
                    time: c?.quantity, // Time (quantity)
                    type: c?.type == "QUANTITY" ? d?.type : c?.type,
                    percentDiscount: c?.discountPercent, // Discount percent
                    price: c?.price, // Price
                    hint: c?.hint || null, // Hint (or null if not provided)
                    priceDiscount:
                      c?.displayPrice || c?.price * (c?.quantity || 1) || 0, // Calculating priceDiscount
                    unitDTO_id: newItem.unitDTO?.id, // Unit DTO ID
                    unitDTO_name: newItem.unitDTO?.name, // Unit DTO Name
                    defaultPrice: d?.defaultPrice === c.id, // Checking if this is the default price
                    attributes: {
                      value: c?.attributes?.some(
                        (a) =>
                          a.attrName == "CAMPAIN" ||
                          a.attrName == "CAMPAIGN_ACTION"
                      ),
                      campain: c?.attributes || [],
                    },
                  };
                });

                // Thêm 1 đối tượng mặc định vào cuối mảng subPriceData nếu có subPrices
                return [
                  {
                    time: d?.quantity || 1,
                    type: d?.type,
                    percentDiscount: d?.discountPercent || 0,
                    price: d?.price || 0,
                    hint: d?.hint || null,
                    priceDiscount:
                      d?.displayPrice || d?.price * (d?.quantity || 1) || 0,
                    unitDTO_id: newItem.unitDTO?.id || 1, // Default to 1 if unitDTO is not available
                    unitDTO_name: newItem.unitDTO?.name || "Tháng", // Default name if not available
                    defaultPrice: d?.defaultPrice
                      ? d?.defaultPrice == d?.id
                        ? true
                        : false
                      : true, // Default to true when subPrices exist
                    attributes: {
                      value: d?.attributes?.some(
                        (a) =>
                          a.attrName == "CAMPAIN" ||
                          a.attrName == "CAMPAIGN_ACTION"
                      ),
                      campain: d?.attributes || [],
                    },
                  },
                  ...subPriceData,
                ];
              });

              let type = listPrice[0]?.type;
              // Tiếp tục xử lý filterData và updatedDataDiscount như ban đầu
              let filterData = [...listPrice];
              //console.log("🚀 ~ listData ~ filterData:", filterData)
              const updatedDataDiscount = [];

              // Các bước xử lý filterData và cập nhật dataDiscount
              filterData
                .filter((item) => item.type === "PROMOTION")
                .forEach((promotion) => {
                  const matchingRentData = filterData.filter(
                    (rent) =>
                      (rent.type === "RENT" || rent.type === "SELL") &&
                      rent.time === promotion.time
                  );

                  if (matchingRentData.length > 0) {
                    promotion.oldPrice = matchingRentData;

                    updatedDataDiscount.push(promotion);

                    matchingRentData.forEach((rent) => {
                      const rentIndex = filterData.indexOf(rent);
                      if (rentIndex !== -1) {
                        filterData.splice(rentIndex, 1);
                      }
                    });
                  } else {
                    updatedDataDiscount.push(promotion);
                  }
                });

              filterData.forEach((item) => {
                if (item.type === "RENT" || item.type === "SELL") {
                  updatedDataDiscount.push(item);
                }
              });

              updatedDataDiscount.forEach((price, index) => {
                price.number = index + 1;
              });

              updatedDataDiscount.forEach((discount) => {
                if (discount.oldPrice) {
                  // Kiểm tra oldPrice và cập nhật defaultPrice
                  let defaultPriceFound = false;
                  discount.oldPrice.forEach((oldItem) => {
                    if (oldItem.defaultPrice) {
                      defaultPriceFound = true;
                      oldItem.defaultPrice = false; // Set oldPrice's defaultPrice to false
                    }
                  });

                  // Nếu tìm thấy defaultPrice trong oldPrice, thì set parent defaultPrice to true
                  if (defaultPriceFound) {
                    discount.defaultPrice = true;
                  }
                }
              });

              // Đẩy dữ liệu vào discountPrice
              newItem.discountPrice.push(...updatedDataDiscount);
              let dataDefault = updatedDataDiscount?.find(
                (c) => c.defaultPrice == true
              );

              return {
                ...newItem,
                type:
                  dataDefault?.type != "PROMOTION"
                    ? dataDefault?.type
                    : dataDefault?.oldPrice[0]?.type,
                discountPrice:
                  updatedDataDiscount.length > 0 ? updatedDataDiscount : [],
              };
            });

            this.listItems = listData;

            //console.log("🚀 ~ this.listItems=rs.data.map ~ this.listItems:", this.listItems)
            const optionProducts = this.listItems?.filter(
              (product) => product.subType === "OPTION"
            );
            // const optionProductIds = optionProducts.map(
            //   (product) => product.id
            // );
            this.totalPages = rs.totalPage;
            this.goto();
            this.loadding = false;
          } else {
            this.listItems = [];
            this.loadding = false;
          }
        } catch (error) {
          this.listItems = [];
          this.loadding = false;
          console.log("🚀 ~ getProducts ~ error:", error);
          this.$toast.error(error.message, {});
          error({ statusCode: 404, message: "Post not found" });
        } finally {
          this.loadding = false;
        }
      }
    },

    convertData(inputData) {
      const convertedObj = {};

      for (const item of inputData) {
        const productId = item.productId;
        // const convertedProduct = {
        //   id: item.productId,
        //   price: item.price,
        //   priceInstallment: item.priceInstallment,
        //   loanTenure: item.loanTenure,
        //   typename: item.__typename,
        // };

        convertedObj[productId] = item;
      }

      return convertedObj;
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
      this.getProducts(this.tags, this.idCategory);
    },
    onPageChange(page) {
      this.page = page;
      this.showLoader = true;
      this.getProducts(this.tags, this.idCategory);
    },
    onChangeRecordsPerPage() {
      this.getProducts(this.tags, this.idCategory);
    },
    toggleSort() {
      this.isToggleSort = !this.isToggleSort;
    },
    setTag(setTag) {
      console.log("setTag", setTag);
      this.page = setTag.page;
      this.tags = setTag.slug;
      this.showLoader = true;
      this.getProducts(setTag.slug, this.idCategory);
      this.showModale = false;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.loader-bg {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -90px;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 2px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

.logo-bg {
  height: 55px;
  width: 55px;
  background-image: url("~/assets/img/logo-lvs.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -75px;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
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
@media (max-width: 768px) {
  .products {
    .products-filter {
      display: none;
    }
  }
}
</style>

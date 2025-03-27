<template>
  <div class="container pt-40" >
    <div class="row justify-content-center">
      <div
        v-for="item in listItems"
        class="col-lg-3 col-md-6 col-sm-6 mb-4"
        :key="item.id"
      >
      <ProductCsCard :item="item" />
    </div>
    </div>
  </div>
</template>
<script>
import ProductCsCard from "@/components/Product/ProductCsCard.vue";
export default {
  name: "Shop",
  components: { ProductCsCard },
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
    getProducts() {
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
        option: this.sortOption,
        // price_from: this.sortPrice.from,
        // price_to: this.sortPrice.to,
        maxResult: this.maxResult,
      };
      this.$store
        .dispatch("getProducts", payload)
        .then((rs) => {
          switch (rs.status) {
            case 1:
              this.listItems = rs.data.products;
              this.totalPages = rs.data.totalPage;
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
  },
};
</script>

<style lang="scss" scoped>
.pt-40 {
  padding: 70px 0;
}
</style>

<template>
  <div>
    <div class="page-title-area" style="margin-top: 70px">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <!-- <h1>{{ article.attributes.title }}</h1> -->
            <h1>Danh sách bài viết</h1>
          </div>
        </div>
      </div>

      <div class="shape1">
        <img src="~/assets/img/shape1.png" alt="shape" />
      </div>
      <div class="shape2 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
      <div class="shape3">
        <img src="~/assets/img/shape3.svg" />
      </div>
      <div class="shape4">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape5">
        <img src="~/assets/img/shape5.png" alt="shape" />
      </div>
      <div class="shape6 rotateme">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape7">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape8 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
    </div>
    <div class="blog-area ptb-80">
      <div class="container">
        <div class="row">
          <BlogGridThree
            :block="listArticle"
            :categories="categories"
            :listTags="listTags"
          />
        </div>
      </div>
      <div
        style="padding: 10px"
        class="d-flex justify-content-center"
        v-if="pages < maxPages"
      >
        <a
          @click="handleLoadMore"
          class="box-hover-text"
          style="
            width: 150px;
            color: #fff;
            text-align: center;
            cursor: pointer;
            justify-content: center;
            border: 1px solid #44ce6f;
          "
          >Xem thêm</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import BlogSidebar from "../../components/Common/BlogSidebar";
import { formatDate } from "../../utils/dateUtils";
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      populate: "*",
      Blocks: {
        populate: [
          "header",
          "services.image",
          "tabs.pricings",
          "faqs",
          "features.image",
          "feedbacks.image",
          "pricings.image",
          "pricings.apps.image",
          "pricings.items",
          "pricingex",
          "contents.image",
          "info",
          "departments.items",
          "image",
          "domains",
          "descriptions",
          "page_default.image",
          // "child_categories.page_defaults.image",
          "child_categories.ListPages.page_default.image",
          "child_categories.image",
          "preferentials.items",
          "Items",
          "*",
        ],
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export default {
  name: "BlogDetails",
  middleware: ["checkAuth", "middlewareHeader"],
  components: {
    BlogSidebar,
  },
  head() {
    return {
      // title: this.article.attributes.metaData.metaTitle,
      title: "Danh sách bài viết",
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          // href: this.$store.state.host + this.$route.path,
          href: this.$route.path,
        },
      ],
    };
  },
  data() {
    return {
      listArticle: null,
      pages: 1,
      pageSize: 25,
      maxPages: 10,
    };
  },
  mounted() {
    // this.fetchArtical();
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  },

  // watch: {
  //   "$route.query": "fetchArtical",
  // },

  // watchQuery(newQuery, oldQuery) {
  //   console.log("🚀 ~ watchQuery ~ oldQuery:", oldQuery)
  //   console.log("🚀 ~ watchQuery ~ newQuery:", newQuery)
  //   if (newQuery.tags != oldQuery.tags) {
  //     this.$store.commit("setLoading", true);
  //     this.listArticle = [];
  //     this.pages = 1;
  //     this.fetchArticalFromTags(newQuery.tags, 1);
  //   }
  // },

  watch: {
    "$route.query"(newTags, oldTags) {
      if (newTags != oldTags) {
        // this.$store.commit("setLoading", true);
        this.listArticle = [];
        this.pages = 1;
        this.fetchArticalFull(1);
      }
    },
    // Giám sát query parameters mỗi khi route thay đổi
    "$route.query.tags"(newTags, oldTags) {
      if (newTags != oldTags) {
        // this.$store.commit("setLoading", true);
        this.listArticle = [];
        this.pages = 1;
        this.fetchArticalFromTags(newTags, 1);
      }
    },
    "$route.query.category"(newTags, oldTags) {
      if (newTags != oldTags) {
        //this.$store.commit("setLoading", true);
        this.listArticle = [];
        this.pages = 1;
        this.fetchArticalFromCategories(newTags, 1);
      }
    },
  },

  // watchQuery(newQuery, oldQuery) {
  //   if (newQuery.category != oldQuery.category) {
  //     this.$store.commit("setLoading", true);
  //     this.listArticle = [];
  //     this.pages = 1;
  //     this.fetchArticalFromCategories(newQuery.category, 1);
  //   }
  // },

  methods: {
    handleLoadMore() {
      this.pages += 1;
      this.fetchArtical(this.pages);
    },

    convertTime(data) {
      return formatDate(data);
    },

    async fetchArtical(pages) {
      try {
        if (this.$route.query.tags) {
          this.fetchArticalFromTags(this.$route.query.tags, pages);
        } else if (this.$route.query.category) {
          this.fetchArticalFromCategories(this.$route.query.category, pages);
        } else {
          this.fetchArticalFull(pages);
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
      }
    },

    async fetchArticalFromTags(tag, pages) {
      try {
        // if(pages == 1){
        //   this.listArticle = [];
        // }
        const query = qs.stringify(
          { populate: "deep" },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find(
          "articles",
          `?filters[tags][slug]=${tag}&${query}&pagination[page]=${this.pages}&pagination[pageSize]=${this.pageSize}`
        );
        //console.log("get_pages1", get);
        const newArtical = get.data;
        //this.$store.commit("setLoading", false);
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }

        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
        this.$store.commit("setLoading", false);
      }
    },

    async fetchArticalFull(pages) {
      try {
        // if(pages == 1){
        //   this.listArticle = [];
        // }
        const query = qs.stringify(
          {
            populate: "deep",
            pagination: {
              page: this.pages,
              pageSize: 10,
            },
          },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find("articles", `?${query}`);
        //console.log("get_pages1", get);
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
        this.$store.commit("setLoading", false);
      }
    },

    async fetchArticalFromCategories(category, pages) {
      try {
        // if(pages == 1){
        //   this.listArticle = [];
        // }
        const query = qs.stringify(
          { populate: "deep" },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find(
          "articles",
          `?filters[categories][slug]=${category}&${query}&pagination[page]=${this.pages}&pagination[pageSize]=${this.pageSize}`
        );
        //console.log("🚀 ~ fetchArticalFromCategories ~ get:", get);
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.listArticle = newArtical;
        } else {
          this.listArticle = [...this.listArticle, ...newArtical];
        }
        setTimeout(() => {
          this.$store.commit("setLoading", false);
        }, 1000);
        //console.log("get_pages2", get);
      } catch (error) {
        console.log(error);
        this.$toast.error(error);
        this.$store.commit("setLoading", false);
      }
    },
  },
  async asyncData({ route, $strapi, store }) {
    try {
      // Check if required query parameters are available
      const hasTags = route.query.tags;
      const hasCategory = route.query.category;

      // Construct the query strings conditionally based on availability of tags and categories
      const query = qs.stringify(
        {
          populate: "deep",
        },
        { encodeValuesOnly: true }
      );

      const queryDeep = qs.stringify(
        { populate: "deep" },
        { encodeValuesOnly: true }
      );

      store.commit("setLoading", true);

      // Initialize variables to hold the responses
      let listArticleResponse,
        articlesResponse,
        listArticleResponseCategory,
        categoriesResponse,
        tagsResponse;

      // Perform API calls conditionally based on the parameters
      if (hasTags) {
        listArticleResponse = await $strapi.find(
          "articles",
          `?filters[tags][slug]=${route.query.tags}&${query}`
        );
      }

      if (hasCategory) {
        listArticleResponseCategory = await $strapi.find(
          "articles",
          `?filters[categories][slug]=${route.query.category}&${query}`
        );
      }

      // Always fetch articles and categories, tags
      articlesResponse = await $strapi.find("articles", `?${query}`);
      categoriesResponse = await $strapi.find(
        "categories",
        `?filters[articleCategory][$eq]=true&${queryDeep}`
      );
      tagsResponse = await $strapi.find("tags", `?${queryDeep}`);

      // Handle the responses
      const categories = categoriesResponse?.data || [];
      const listTags = tagsResponse?.data || [];

      // Determine the maximum pages based on the presence of tags or categories
      const maxPages = hasTags
        ? listArticleResponse?.meta?.pagination?.pageCount || 1
        : hasCategory
        ? listArticleResponseCategory?.meta?.pagination?.pageCount || 1
        : articlesResponse?.meta?.pagination?.pageCount;

      // Set the final list of articles based on the conditions
      let listArticle = [];

      if (hasTags) {
        listArticle = listArticleResponse?.data || [];
      } else if (hasCategory) {
        listArticle = listArticleResponseCategory?.data || [];
      } else {
        listArticle = articlesResponse?.data || [];
      }

      store.commit("setLoading", false);

      // Return the combined data
      return {
        listArticle,
        articles: articlesResponse?.data || [],
        maxPages,
        categories,
        listTags,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      store.commit("setLoading", false);
      return {
        listArticle: [],
        articles: [],
        maxPages: 1,
        categories: [],
        listTags: [],
      };
    }
  },
};
</script>
<style lang="scss" scoped>
h1 {
  &.title-size {
    font-size: 24px;
    line-height: 28px;
    margin-top: 12px;
    color: #44ce6f;
  }
}

.box-hover-text {
  border-radius: 50px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #23bdb8, #43e794) !important;
  color: white;
  margin: 0;
}
</style>

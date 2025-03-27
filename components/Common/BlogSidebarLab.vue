<template>
    <div class="widget-area" id="secondary">
      <!-- <div class="widget widget_search">
        <form class="search-form">
          <label>
            <span class="screen-reader-text">Tìm kiếm:</span>
            <input type="search" class="search-field" placeholder="Nhập từ khoá..." />
          </label>
          <button type="submit">
            <feather type="search"></feather>
          </button>
        </form>
      </div> -->
      <div class="widget widget_startp_posts_thumb" v-if="listblog.length > 0">
        <h3 class="widget-title">Bài viết liên quan</h3>
        <div>
          <div
            class="item"
            v-for="item in listblog"
            :key="item.id"
            v-if="
              item.slug != $route.params.slug &&
              item.slug != $route.params.slug2 &&
              item.slug != $route.params.slug3 &&
              item.slug != $route.params.lab
            "
          >
            <div class="info2" style="padding-left: 8px">
              <time>{{ convertTime(item?.createdAt) }}</time>
              <h4 class="title usmall">
                <a
                  @click="handleClickRelateArticle(item?.slug)"
                  style="cursor: pointer"
                >
                  {{ item?.title }}
                </a>
              </h4>
              <p class="block-ellipsis" v-if="item?.description">
                {{ item?.description }}
              </p>
            </div>
  
            <div class="clear"></div>
          </div>
        </div>
      </div>
  
      <div class="widget widget_categories" v-if="categories.length > 0">
        <h3 class="widget-title">Danh mục</h3>
  
        <ul style="margin-top: 8px">
          <li v-for="category in categories" :key="category.id">
            <!-- :href="`blogs?category=${category.attributes.slug}`" -->
            <!-- <a  :href="category.attributes.slug">{{
              category.attributes.title
            }}</a> -->
            <a @click="handleClickCategory(category)" style="cursor: pointer">{{
              category.attributes.title
            }}</a>
            <!-- <a  href="#">{{
              category.attributes.title
            }}</a> -->
          </li>
        </ul>
      </div>
  
      <div class="widget widget_tag_cloud" v-if="listTags.length > 0">
        <h3 class="widget-title">Tags</h3>
  
        <div class="tagcloud">
          <template v-for="tag in listTags">
            <a
              @click="handleClick(tag)"
              :key="tag.id"
              v-if="tag.attributes.articles?.data.length > 0"
              >{{ tag.attributes.name }}
              <span class="tag-link-count">
                ({{ tag.attributes.articles?.data.length }})</span
              ></a
            >
          </template>
  
          <!-- <a href="#" v-for="tag in listTags" :key="tag.id">{{ tag.attributes.name }} <span class="tag-link-count"> ({{
            tag.attributes.articles?.data.length }})</span></a> -->
  
          <!-- <a href="#">IT <span class="tag-link-count"> (3)</span></a>
          <a href="#">Spacle <span class="tag-link-count"> (3)</span></a>
          <a href="#">Games <span class="tag-link-count"> (2)</span></a>
          <a href="#">Fashion <span class="tag-link-count"> (2)</span></a>
          <a href="#">Travel <span class="tag-link-count"> (1)</span></a>
          <a href="#">Smart <span class="tag-link-count"> (1)</span></a>
          <a href="#">Marketing <span class="tag-link-count"> (1)</span></a>
          <a href="#">Tips <span class="tag-link-count"> (2)</span></a> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import moment from "moment";
  const qs = require("qs");
  import { formatDate } from "../../utils/dateUtils";
  export default {
    name: "BlogSidebarLab",
    props: ["listblog", "listTags", "categories", "pageUrl", "pageUrl"],
    data() {
      return {
        // categories: [],
        // listblog: [],
        // listTags: [],
        testData: [],
      };
    },
  
    // created: async function () {
    //   const query = qs.stringify(
    //     { populate: "deep" },
    //     { encodeValuesOnly: true }
    //   );
    //   const data2 = await this.$strapi.find(
    //     "categories",
    //     `?filters[articleCategory][$eq]=true&${query}`
    //   );
    //   const data3 = await this.$strapi.find("tags", `?${query}`);
    //   this.listTags = data3.data;
    //   this.categories = data2.data;
    //   if (this.category) {
    //     const id = this.category.attributes.slug;
  
    //     const data = await this.$strapi.find(
    //       "articles",
    //       `?filters[categories][slug][$eq]=${id}&${query}&pagination[pageSize]=5`
    //     );
    //     this.listblog = data.data;
    //   }
    // },
    mounted() {
      console.log("this.$route", this.pageUrl);
    },
    methods: {
      convertTime(data) {
        return moment(data).format("DD-MM-YYYY ");
      },
      handleClickRelateArticle(slug) {
        this.$store.commit("setLoading", true);
        if (this.pageUrl) {
          this.$router.push(`/${this.pageUrl}/${slug}`);
        } else {
          this.$router.push({
            path: `${slug}`,
            // query: { category: data?.attributes.slug },
          });
        }
      },
      handleClick(data) {
        this.$store.commit("setLoading", true);
        if (this.pageUrl) {
          // this.$router.push({
          //   path: this.checkLayout.pageUrl,
          //   query: { tags: data?.attributes.slug },
          // });
          this.$router.push(`/${this.pageUrl}?tags=${data?.attributes.slug}`);
        } else {
          this.$router.push({
            path: "danh-sach-bai-viet",
            query: { tags: data?.attributes.slug },
          });
        }
      },
      handleClickCategory(data) {
        this.$store.commit("setLoading", true);
        if (this.pageUrl) {
          this.$router.push(`/${this.pageUrl}/${data?.attributes.slug}`);
        } else {
          this.$router.push({
            path: "danh-sach-bai-viet",
            query: { category: data?.attributes.slug },
          });
        }
      },
      async handleRender() {
        const data = await this.$strapi.find(
          "articles",
          `?filters[categories][slug][$eq]=${id}&${query}&pagination[pageSize]=5`
        );
        this.testData = data;
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .block-ellipsis {
    display: block;
    display: -webkit-box;
    max-width: 100%;
  
    //height: 30px;
    margin: 4px auto;
    font-size: 14px;
    line-height: 16px;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  a:hover,
  a:focus {
    color: #44ce6f !important;
    text-decoration: none;
  }
  
  .widget-area .widget_categories ul {
    padding-left: 0;
    margin-bottom: 0;
    list-style-type: none;
  }
  
  .widget-area .widget_categories ul li {
    position: relative;
    margin-bottom: 12px;
    color: #6084a4;
    padding-left: 14px;
    font-weight: 500;
    font-size: 14px;
  }
  
  .widget-area .widget_categories ul li:last-child {
    margin-bottom: 0;
  }
  
  .widget-area .widget_categories ul li::before {
    background: #44ce6f;
    height: 7px;
    width: 7px;
    content: "";
    left: 0;
    top: 8px;
    position: absolute;
  }
  
  .widget-area .widget_categories ul li a {
    color: #0e314c;
    display: block;
  }
  
  .widget-area .widget_categories ul li a:hover {
    color: #44ce6f;
  }
  
  .widget-area .widget_categories ul li .post-count {
    float: right;
  }
  
  .widget-area .tagcloud a:hover,
  .widget-area .tagcloud a:focus {
    color: #ffffff !important;
    background-color: #44ce6f;
    border-color: #44ce6f;
  }
  
  .widget-area .widget .widget-title {
    border-bottom: 1px solid #eeeeee;
    padding-bottom: 10px;
    margin-bottom: 25px;
    position: relative;
    font-size: 19px;
  }
  
  .widget-area .widget .widget-title::before {
    content: "";
    position: absolute;
    background: #44ce6f;
    bottom: -1px;
    left: 0;
    width: 50px;
    height: 1px;
  }
  </style>
  
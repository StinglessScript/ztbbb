<template>
  <div>
    <div class="page-title-area" style="margin-top: 70px">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container is-pc">
            <div
              class="row"
              v-if="
                author?.attributes?.name ||
                author?.attributes?.introduce ||
                author?.attributes?.avatar?.data?.attributes?.url
              "
            >
              <div
                v-if="author?.attributes?.name || author?.attributes?.introduce"
                class="row-50"
              >
                <h1
                  v-if="author?.attributes?.name"
                  style="
                    color: #44ce6f;
                    font-size: 3rem;
                    line-height: 3.5rem;
                    margin-top: 0;
                    text-align: left;
                  "
                >
                  {{ author?.attributes?.name }}
                </h1>
                <div
                  style="font-size: 20px; font-weight: 100; line-height: 1.5em"
                  v-if="author?.attributes?.introduce"
                  v-html="author?.attributes?.introduce"
                ></div>
              </div>
              <div
                :style="{
                  width: `${
                    author?.attributes?.name || author?.attributes?.introduce
                      ? '50%'
                      : '100%'
                  }`,
                }"
              >
                <nuxt-img
                  v-if="author?.attributes?.avatar?.data?.attributes?.url"
                  :src="author?.attributes?.avatar?.data?.attributes?.url"
                  alt="image"
                  provider="strapi"
                  style="min-height: 276px; max-height: 400px"
                />
                <img
                  style="min-height: 276px; max-height: 400px"
                  v-else-if="
                    !author?.attributes?.avatar?.data?.attributes?.url &&
                    author?.attributes?.imageUrl
                  "
                  :src="author?.attributes?.imageUrl"
                />
                <img
                  v-else-if="
                    !author?.attributes?.imageUrl &&
                    !author?.attributes?.avatar?.data?.attributes?.url
                  "
                  src="~/assets/img/blog-image/9.jpg"
                  style="min-height: 276px; max-height: 400px"
                />
              </div>
            </div>
            <h1 v-else>Tác Giả</h1>
          </div>
          <div class="container is-mobile">
            <div
              class="row flex-column-reverse"
              style="gap: 3rem"
              v-if="
                author?.attributes?.name ||
                author?.attributes?.introduce ||
                author?.attributes?.avatar?.data?.attributes?.url
              "
            >
              <div
                v-if="author?.attributes?.name || author?.attributes?.introduce"
                class="row-100"
              >
                <h1
                  v-if="author?.attributes?.name"
                  style="
                    color: #44ce6f;
                    font-size: 2rem;
                    line-height: 2.5rem;
                    margin-top: 0;
                    text-align: left;
                  "
                >
                  {{ author?.attributes?.name }}
                </h1>
                <div
                  style="font-size: 14px; font-weight: 100; line-height: 1em"
                  v-if="author?.attributes?.introduce"
                  v-html="author?.attributes?.introduce"
                ></div>
              </div>
              <div style="width: 100%; position: relative">
                <nuxt-img
                  v-if="author?.attributes?.avatar?.data?.attributes?.url"
                  :src="author?.attributes?.avatar?.data?.attributes?.url"
                  alt="image"
                  provider="strapi"
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    border: 2px solid rgb(68, 206, 111);
                    z-index: 2;
                    position: relative;
                    background: white;
                  "
                />
                <img
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    border: 2px solid rgb(68, 206, 111);
                    z-index: 2;
                    position: relative;
                    background: white;
                  "
                  v-else-if="
                    !author?.attributes?.avatar?.data?.attributes?.url &&
                    author?.attributes?.imageUrl
                  "
                  :src="author?.attributes?.imageUrl"
                />
                <img
                  v-else-if="
                    !author?.attributes?.imageUrl &&
                    !author?.attributes?.avatar?.data?.attributes?.url
                  "
                  src="~/assets/img/blog-image/9.jpg"
                  style="
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    border: 2px solid rgb(68, 206, 111);
                    z-index: 2;
                    position: relative;
                    background: white;
                  "
                />

                <div
                  style="
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 10px;
                    border-top: 2px solid #44ce6f;
                    z-index: 1;
                  "
                ></div>
              </div>
            </div>
            <h1 v-else>Tác Giả</h1>
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
    <div class="blog-area ptb-80" v-if="author?.attributes?.additional">
      <div class="container">
        <div class="row">
          <div v-html="formatImageUrls(author?.attributes?.additional)"></div>
        </div>
      </div>
    </div>
    <div class="blog-area ptb-80">
      <div class="container">
        <div class="row">
          <h3 style="padding-bottom: 10px" v-if="article?.data?.length > 0">
            Danh sách bài viết ({{ article?.data?.length }})
          </h3>
          <div class="blog-area ptb-40">
            <div class="container">
              <div class="row">
                <div class="col-12 px-2">
                  <div class="row" v-if="article?.data?.length > 0">
                    <template>
                      <div
                        v-for="item in article?.data"
                        class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-5 d-flex align-items-stretch"
                        style="margin-bottom: 1.5rem"
                        :key="item.id"
                      >
                        <div
                          class="single-blog-post-item"
                          style="cursor: pointer"
                        >
                          <div class="post-image h-full" style="width: 100%">
                            <a
                              @click="handleClick(item?.attributes)"
                              class="h-full cursor-pointer"
                              style="height: 100%; width: 100%"
                            >
                              <img
                                style="height: 100%; width: 100%; aspect-ratio: 1 / 1; object-fit: cover"
                                v-if="item?.attributes?.imageUrl"
                                :src="item?.attributes?.imageUrl"
                              />
                              <nuxt-img
                                v-else-if="
                                  !item?.attributes?.imageUrl &&
                                  item?.attributes?.cover?.data
                                "
                                :src="
                                  item?.attributes?.cover?.data?.attributes?.url
                                "
                                alt="image"
                                provider="strapi"
                                style="min-height: 276px; width: 100%; aspect-ratio: 1 / 1; object-fit: cover"
                              />
                              <img
                                v-else-if="
                                  !item?.attributes?.imageUrl &&
                                  !item?.attributes?.cover?.data
                                "
                                src="~/assets/img/blog-image/9.jpg"
                                style="min-height: 276px; width: 100%; aspect-ratio: 1 / 1; object-fit: cover"
                              />
                            </a>
                          </div>
                          <div class="position-relative">
                            <ul class="post-meta post-meta-mobile">
                              <span>{{
                                changeDate(item?.attributes?.publishedAt)
                              }}</span>
                            </ul>
                            <div
                              class="d-flex flex-column justify-content-between h-full"
                              style="padding-top: 35px"
                            >
                              <h5 class="post-meta-h5" style="">
                                <a
                                  @click="handleClick(item?.attributes)"
                                  class="learn-more-btn cursor-pointer"
                                  style="word-break: break-all"
                                >
                                  {{ item?.attributes?.title }}
                                </a>
                              </h5>
                              <div
                                class="d-flex flex-column justify-content-end h-full"
                              >
                                <!-- <span
                                  class="px-3"
                                  style="
                                    padding-left: 1rem;
                                    padding-right: 1rem;
                                  "
                                >
                                  Tác giả
                                  <span class="span-author">
                                    {{
                                      item?.attributes?.author?.attributes
                                        ?.name
                                    }}
                                  </span>
                                </span> -->
                                <a
                                  @click="handleClick(item?.attributes)"
                                  class="read-more-btn font-a"
                                  >Xem thêm
                                  <feather
                                    class="feather-plus-circle"
                                    type="plus-circle"
                                  ></feather>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="w-100 h-100 d-flex justify-content-center" v-else>
                    <h4>Chưa có bài viết</h4>
                  </div>
                </div>
              </div>
            </div>
            <div
              style="padding: 10px"
              class="d-flex justify-content-center"
              v-if="pages < maxPages && article?.data?.length > 0"
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
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["author", "article"],

  data() {
    return {
      pages: 1,
      pageSize: 25,
      maxPages: 10,
    };
  },

  mounted() {
    this.pages = this.article?.meta?.pagination?.page || 1;
    this.maxPages = this.article?.meta?.pagination?.pageCount || 10;
  },

  methods: {
    formatImageUrls(content) {
      const strapiUrl = process.env.baseURL; // Địa chỉ của Strapi API

      // Sử dụng regex để tìm tất cả các thẻ <img> có thuộc tính src bắt đầu bằng "/uploads"
      return content.replace(
        /<img [^>]*src="(\/uploads[^"]*)"/g,
        (match, p1) => {
          // Kiểm tra nếu phần đường dẫn ảnh bắt đầu bằng "/uploads"
          if (p1.startsWith("/uploads")) {
            return match.replace(p1, strapiUrl + p1); // Thêm URL của Strapi vào trước đường dẫn ảnh
          }
          return match; // Nếu không phải "/uploads", giữ nguyên thẻ img
        }
      );
    },
    async handleLoadMore() {
      try {
        this.pages += 1;
        const query = qs.stringify(
          {
            populate: "deep",
            pagination: {
              page: this.pages,
              pageSize: this.pageSize,
            },
          },
          { encodeValuesOnly: true }
        );
        const get = await this.$strapi.find(
          "articles",
          `?filters[author][slug][$eq]=${this.$route.params.id}&${query}`
        );
        //console.log("get_pages1", get);
        const newArtical = get.data;
        this.maxPages = get.meta.pagination.pageCount;
        if (this.pages == 1) {
          this.article = newArtical;
        } else {
          this.article = [...this.article, ...newArtical];
        }
      } catch (error) {
        console.log("🚀 ~ handleLoadMore ~ error:", error);
        this.$toast.error("handleLoadMore", error);
      }
    },

    changeDate(time) {
      return moment(time).format("DD-MM-YYYY ");
    },

    handleClick(item) {
      this.$store.commit("setLoading", true);
      const baseUrl = item?.layout?.data?.attributes?.pageUrl || "";

      const articleSlug = item?.slug;
      const mainCategory = item?.mainCategory?.data?.attributes?.slug;
      const routePath = baseUrl
        ? `/${baseUrl}${mainCategory ? `/${mainCategory}` : ""}/${articleSlug}`
        : `${articleSlug}`;
      return this.$router.push(routePath);
    },
  },
};
</script>

<style lang="scss">
.row-50 {
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}

.row-100 {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
}
</style>

<template>
  <div>
    <div class="page-title-area" style="margin-top: 70px">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <h2>{{ article?.attributes?.title }}</h2>
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
    <!-- <div class="blog-details-area ptb-80" v-if="quickLap">
      <div class="container" :class="{ 'quick-lap': quickLap }">
        <div class="row">
          <div class="col-lg-5 col-md-12 px-2">
            <div
              class="blog-details-desc"
              style="border-bottom: 1px solid #ced4da; padding: 10px"
              :class="{ 'quick-lap-blog-details-desc': quickLap }"
            >
              <div class="article-content">
                <div class="entry-meta">
                  <ul style="display: flex">
                    <li style="display: flex">
                      <i>
                        <feather type="clock" style="width: 15px"></feather>
                      </i>
                      <a href="#">{{
                        convertTime(article?.attributes?.createdAt)
                      }}</a>
                    </li>

                    <li
                      style="display: flex"
                      v-if="article?.attributes?.author.data"
                    >
                      <i>
                        <feather type="user" style="width: 15px"></feather>
                      </i>
                      <a href="#">{{
                        article?.attributes?.author.data?.attributes?.name
                      }}</a>
                    </li>
                  </ul>
                </div>

                <span v-html="article?.attributes?.content"></span>
              </div>

              <div class="article-footer" v-if="article?.attributes?.tags.data">
                <div class="article-tags">
                  <a
                    href="#"
                    v-for="tag in article?.attributes?.tags.data"
                    :key="tag.id"
                  >
                    {{ tag?.attributes?.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 col-md-12 px-2" v-if="quickLap">
            <div
              class="widget-area"
              style="
                border-bottom: 1px solid #ced4da;
                height: 600px;
                padding-top: 10px;
                padding-bottom: 10px;
              "
            >
              <div class="d-flex w-full justify-content-center">
                <h5>Trải nghiệm tính năng</h5>
              </div>
              <iframe :src="isSSH" style="height: 550px; width: 100%" />
            </div>
          </div>
          <div
            class="col-md-12 px-2"
            :class="quickLap ? 'col-lg-2' : 'col-lg-4'"
          >
            <BlogSidebar
              :listblog="[]"
              :listTags="listTags"
              :categories="categories"
              :checkLayout="checkLayout"
            />
          </div>
        </div>
        <div class="container" id="target-section-relate">
          <RelateToInfor
            v-if="listblog.length > 0"
            :header="'Bài viết liên quan'"
            :slidesData="listblog"
          />
          <RelateToInfor
            v-if="slidesData.filter((c) => c.type == 'Product').length > 0"
            :header="'Sản phẩm liên quan'"
            :slidesData="slidesData.filter((c) => c.type == 'Product')"
          />
        </div>
      </div>
    </div> -->
    <div class="blog-details-area ptb-80">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-12 px-2">
            <div class="blog-details-desc">
              <div class="article-content">
                <div
                  class="entry-meta d-flex justify-content-between align-items-center gap-4 flex-wrap"
                >
                  <div>
                    <ul style="display: flex">
                      <li style="display: flex">
                        <i>
                          <feather type="clock" style="width: 15px"></feather>
                        </i>
                        <a href="#">
                          {{ convertTime(article?.attributes?.createdAt) }}
                        </a>
                      </li>

                      <li
                        style="display: flex"
                        v-if="article?.attributes?.author.data"
                      >
                        <i>
                          <feather type="user" style="width: 15px"></feather>
                        </i>
                        <a 
                          style="cursor: pointer"
                          :href="
                            handlePagesAuthor(
                              article?.attributes?.author?.data?.attributes
                                ?.slug
                            )
                          "
                        >
                          {{
                            article?.attributes?.author.data?.attributes?.name
                          }}
                        </a>
                      </li>
                      <li v-else>Chưa có tác giả</li>
                    </ul>
                  </div>
                  <!-- <div
                    v-if="quickLap?.length > 0"
                    style="display: flex; gap: 0.25rem; flex-wrap: wrap"
                  >
                    <div style="position: relative">
                      <div
                        class="dropdown-selected w100"
                        @click="toggleDropdown()"
                        style="
                          background-color: #fff;
                          padding: 5px;
                          border: 1px solid #ddd;
                          border-radius: 5px;
                          display: flex;
                          align-items: center;
                          justify-content: space-between;
                          cursor: pointer;
                          width: 180px;
                        "
                        @blur="handleBlur"
                        tabindex="0"
                      >
                        <div v-if="chooseId?.title">
                          <span
                            style="
                              font-size: 14px;
                              color: #333;
                              display: flex;
                              gap: 0.5rem;
                            "
                          >
                            <div
                              style=""
                              v-if="
                                chooseId?.featured_image ||
                                chooseId?.featuredImage ||
                                chooseId?.images?.length > 0
                              "
                            >
                              <img
                                style="
                                  width: 20px;
                                  height: 20px;
                                  border-radius: 50%;
                                  object-fit: cover;
                                "
                                :src="
                                  chooseId?.featured_image ||
                                  chooseId?.featuredImage ||
                                  chooseId?.images?.[0] ||
                                  ''
                                "
                              />
                            </div>
                            <span class="truncated-text">{{ chooseId?.title }}</span>
                          </span>
                        </div>
                        <div v-else>
                          <span>Chọn hệ điều hành</span>
                        </div>

                        <span>
                          <svg
                            v-if="isOpenDrop == false"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path fill="#44ce6f" d="m7 10l5 5l5-5z" />
                          </svg>
                          <svg
                            v-else
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path fill="#44ce6f" d="m7 14l5-5l5 5z" />
                          </svg>
                        </span>
                      </div>

                      <div
                        v-if="isOpenDrop == true"
                        class="dropdown-list w100"
                        style="
                          position: absolute;
                          top: 100%;

                          right: 0;
                          background-color: white;
                          border: 1px solid #ddd;
                          border-radius: 5px;
                          max-height: 200px;
                          overflow-y: auto;
                          z-index: 89;
                          width: 180px;
                        "
                      >
                        <div
                          class="dropdown-item"
                          v-for="os in dataDetailOS"
                          :key="os.id"
                          @mousedown="handleUpdateOption(os)"
                          style="
                            padding: 10px;
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                          "
                        >
                          <div
                            class="d-flex gap-1"
                            style="display: flex; align-items: center; gap: 5px"
                          >
                            <span
                              v-if="
                                os?.featured_image ||
                                os?.featuredImage ||
                                os?.images?.length > 0
                              "
                            >
                              <img
                                :src="
                                  os?.featured_image ||
                                  os?.featuredImage ||
                                  os?.images?.[0] ||
                                  ''
                                "
                                alt="product image"
                                style="
                                  width: 20px;
                                  height: 20px;
                                  object-fit: cover;
                                  border-radius: 50%;
                                "
                              />
                            </span>
                            <span style="font-size: 14px; color: #333">
                              {{ os?.title }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style="
                        border: 1px solid #44ce6f;
                        border-radius: 6px;
                        padding: 5px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                      "
                      class="hover-greed"
                      @click="handleOpenLab()"
                    >
                      <ul style="display: flex">
                        <li style="display: flex; gap: 0.25rem">
                          <i style="top: -1px; color: #44ce6f">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="17"
                              height="17"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M14 2h-4c-3.28 0-4.919 0-6.081.814a4.5 4.5 0 0 0-1.105 1.105C2 5.08 2 6.72 2 10s0 4.919.814 6.081a4.5 4.5 0 0 0 1.105 1.105C5.08 18 6.72 18 10 18h4c3.28 0 4.919 0 6.081-.814a4.5 4.5 0 0 0 1.105-1.105C22 14.92 22 13.28 22 10s0-4.919-.814-6.081a4.5 4.5 0 0 0-1.105-1.105C18.92 2 17.28 2 14 2m-3 13h2m1.5 7l-.316-.419c-.71-.944-.887-2.387-.437-3.581M9.5 22l.316-.419c.71-.944.887-2.387.437-3.581M7 22h10"
                                color="currentColor"
                              />
                            </svg>
                          </i>
                          <a style="color: #44ce6f"> Thực hành với Lab </a>
                        </li>
                      </ul>
                    </div>
                  </div> -->
                </div>

                <span v-html="article?.attributes?.content"></span>
              </div>
              <div class="article-footer" v-if="article?.attributes?.tags.data">
                <div class="article-tags">
                  <a 
                    style="cursor: pointer"
                    :href="handleClickTags(tag)"
                    v-for="tag in article?.attributes?.tags.data"
                    :key="tag.id"
                  >
                    {{ tag?.attributes?.name }}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-12 px-2">
            <BlogSidebar
              :category="article?.attributes?.categories?.data[0]"
              :listblog="listblog"
              :listTags="listTags"
              :categories="categories"
              :checkLayout="checkLayout"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogSidebar from "../Common/BlogSidebar";
import { formatDate } from "../../utils/dateUtils";
import RelateToInfor from "../Relate/RelateToInfor.vue";

export default {
  name: "BlogDetails",
  components: {
    BlogSidebar,
  },
  props: [
    "article",
    "listblog",
    "listTags",
    "categories",
    "quickLap",
    "slidesData",
    "checkLayout",
  ],
  head() {
    return {
      title: this.article?.attributes?.metaData.metaTitle
        ? this.article?.attributes?.metaData.metaTitle
        : this.article?.attributes?.title,
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          // href: this.$store.state.host + this.$route.path,
          href: this.$route.path,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.article?.attributes?.metaData.metaDescription
            ? this.article?.attributes?.metaData.metaDescription
            : this.article?.attributes?.description,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: this.article?.attributes?.metaData.metaDescription
            ? this.article?.attributes?.metaData.metaDescription
            : this.article?.attributes?.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: this.article?.attributes?.metaData.metaTitle
            ? this.article?.attributes?.metaData.metaTitle
            : this.article?.attributes?.title,
        },
        {
          hid: "og:site_name",
          property: "og:site_name",
          content: "Long Van",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.article?.attributes?.metaData.metaKeywords,
        },
        {
          hid: "image",
          name: "image",
          content: this.article.attributes.metaData.imageUrl
            ? this.article.attributes.metaData.imageUrl
            : this.article.attributes.metaData.image.data
            ? `${this.$config.BASE_URL_IMG}${this.article.attributes.metaData.image.data.attributes.url}`
            : "" || this.article.attributes.metaData.urlImage,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: this.article.attributes.metaData.imageUrl
            ? this.article.attributes.metaData.imageUrl
            : this.article.attributes.metaData.image.data
            ? `${this.$config.BASE_URL_IMG}${this.article.attributes.metaData.image.data.attributes.url}`
            : "" || this.article.attributes.metaData.urlImage,
        },
        {
          hid: "og:type",
          property: "og:type",
          content: `website`,
        },
      ],
    };
  },

  mounted() {
    if (this.quickLap?.length > 0) {
      this.handleMapPromissData();
    }
  },

  computed: {
    // isSSH() {
    //   return `${process.env.SSH}/?hostname=${this.quickLap?.data?.ipConnect}&port=${this.quickLap?.data?.portConnect}&username=${this.quickLap?.data?.username}&password=${this.quickLap?.data?.password}&scrollback=50000`;
    // },
  },
  data() {
    return {
      dataDetailOS: [],
      chooseId: null,
      isOpenDrop: false,
      // details: this.detailsContent,
    };
  },
  methods: {
    handleClickTags(data) {
      this.$store.commit("setLoading", true);
      if (
        this.checkLayout &&
        this.checkLayout.pageUrl == this.$route.params.slug
      ) {
        // this.$router.push(
        //   `/${this.checkLayout.pageUrl}?tags=${data?.attributes.slug}`
        // );
        return `/${this.checkLayout.pageUrl}?tags=${data?.attributes.slug}`;
      } else {
        // this.$router.push({
        //   path: "danh-sach-bai-viet",
        //   query: { tags: data?.attributes.slug },
        // });
        return `danh-sach-bai-viet?tags=${data?.attributes.slug}`;
      }
    },
    handlePagesAuthor(id) {
      // this.$store.commit("setLoading", true);
      // this.$router.push(`/author/${id}`);
      return `/author/${id}`;
    },
    async handleUpdateOption(item) {
      this.chooseId = item;
    },

    async handleMapPromissData() {
      const results = await Promise.all(
        (this.quickLap || []).map((c) => this.handleGetProduct(c))
      );
      this.dataDetailOS.push(...results.filter(Boolean));
      this.chooseId = this.dataDetailOS[0];
    },

    async handleGetProduct(id) {
      try {
        const response = await this.$sdk.product.getProductById(
          id,
          this.$route.query.store
        );
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetProduct ~ error:", error);
        this.$toast.error(error, {});
      }
    },

    handleBlur() {
      this.isOpenDrop = false;
    },

    toggleDropdown() {
      this.isOpenDrop = !this.isOpenDrop;
      //this.$emit("handleShow");
    },

    convertTime(data) {
      return formatDate(data);
    },

    handleOpenLab() {
      if (this.chooseId?.id) {
        const redirectUrl = `/thuc-hanh-lab/${
          this.$route.params.slug3
            ? this.$route.params.slug3
            : this.$route.params.slug2
            ? this.$route.params.slug2
            : this.$route.params.slug
        }?lab=${this.chooseId?.id}`;

        if (
          this.$store.getters.getUser?.partyId ||
          this.$store.getters.getUser?.id
        ) {
          this.$store.commit("setLoading", true);
          return this.$router.push(redirectUrl);
        } else {
          this.$store.commit("setLoading", true);
          return this.$router.push(
            `/dang-nhap?redirectUrl=${encodeURIComponent(redirectUrl)}`
          );
        }
      } else {
        this.$toast.error("Vui lòng chọn hệ điều hành.");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$light-green-color: #44ce6f;
$white-color: #ffffff;
$black-color: #0e314c;
$border-color: #d9d9d9;
$navlink-color: #4a6f8a;
$paragraph-color: #6084a4;
$purple-color: #c679e3;

h1 {
  &.title-size {
    font-size: 24px;
    line-height: 28px;
    margin-top: 12px;
    color: #44ce6f;
  }
}

.blog-details-desc {
  .article-content {
    // margin-top: 30px;

    .entry-meta {
      margin-bottom: 8px;

      ul {
        padding-left: 0;
        margin-bottom: 0;
        list-style-type: none;

        li {
          position: relative;
          display: inline-block;
          color: $black-color;
          margin-right: 20px;

          a {
            display: inline-block;
            color: $paragraph-color;

            &:hover {
              color: $light-green-color;
            }
          }

          i {
            color: $purple-color;
            margin-right: 2px;
            position: relative;
            top: 2px;
            width: 15px;
          }

          &::before {
            content: "";
            position: absolute;
            top: 12px;
            right: -15px;
            width: 6px;
            height: 1px;
            background: $light-green-color;
          }

          &:last-child {
            margin-right: 0;

            &::before {
              display: none;
            }
          }
        }
      }
    }

    h3 {
      margin: {
        bottom: 15px;
        top: 25px;
      }

      font: {
        size: 20px;
      }
    }

    .wp-block-gallery {
      &.columns-3 {
        padding-left: 0;
        list-style-type: none;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;

        margin: {
          right: -10px;
          left: -10px;
          bottom: 30px;
          top: 30px;
        }

        li {
          -ms-flex: 0 0 33.3333%;
          flex: 0 0 33.3333%;
          max-width: 33.3333%;

          padding: {
            right: 10px;
            left: 10px;
          }

          figure {
            margin-bottom: 0;
          }
        }
      }
    }

    .features-list {
      padding-left: 0;
      list-style-type: none;

      margin: {
        top: 25px;
        bottom: 30px;
      }

      li {
        margin-bottom: 15px;
        position: relative;
        padding-left: 25px;
        color: $paragraph-color;

        i {
          color: $light-green-color;
          display: inline-block;
          width: 20px;
          position: absolute;
          left: 0;
          top: 0;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .article-footer {
    margin: {
      top: 30px;
    }

    .article-tags {
      a {
        display: inline-block;
        color: $white-color;
        background-color: $purple-color;
        padding: 4px 12px;
        border-radius: 5px;
        margin-right: 5px;
        font-size: 14px;

        &:hover {
          color: $white-color;
          background-color: $light-green-color;
        }
      }
    }
  }
}

.blog-details-desc .article-content .entry-meta ul li a {
  display: inline-block;
  color: #6084a4;
}

.blog-details-desc .article-content .entry-meta ul li a:hover {
  color: #44ce6f;
}

.blog-details-desc .article-content .entry-meta ul li i {
  color: #c679e3;
  margin-right: 2px;
  position: relative;
  top: 2px;
  width: 15px;
}

.blog-details-desc .article-content .entry-meta ul li::before {
  content: "";
  position: absolute;
  top: 12px;
  right: -15px;
  width: 6px;
  height: 1px;
  background: #44ce6f;
}

.blog-details-desc .article-content .entry-meta ul li:last-child {
  margin-right: 0;
}

.blog-details-desc .article-content .entry-meta ul li:last-child::before {
  display: none;
}

@media (max-width: 480px) {
  /* Mobile nhỏ */
  .container {
    max-width: 100%;
  }
}
@media (min-width: 481px) and (max-width: 768px) {
  /* Mobile lớn */
  .container {
    max-width: 100%;
  }
}
@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet */
  .container {
    max-width: 100%;
  }
}
@media (min-width: 1025px) and (max-width: 1440px) {
  /* Laptop nhỏ */
  .container.quick-lap {
    max-width: 90%;

    .quick-lap-blog-details-desc {
      height: 600px;
      overflow-y: scroll;
    }
  }
}
@media (min-width: 1441px) and (max-width: 1920px) {
  /* Laptop lớn */
  .container.quick-lap {
    max-width: 90%;

    .quick-lap-blog-details-desc {
      height: 600px;
      overflow-y: scroll;
    }
  }
}
@media (min-width: 1921px) {
  /* Desktop */
  .container.quick-lap {
    max-width: 90%;

    .quick-lap-blog-details-desc {
      height: 600px;
      overflow-y: scroll;
    }
  }
}

.hover-greed:hover {
  background: #7ceea028;
}
</style>

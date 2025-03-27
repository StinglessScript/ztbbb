<template>
  <div style="position: relative">
    <div
      style="
        position: fixed;
        z-index: 98 !important;
        width: 100%;
        height: 100%;
        background-color: #fff;
      "
    ></div>
    <div
      v-if="loading"
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
    <div class="relative" style="position: relative; z-index: 98 !important">
      <div>
        <div class="blog-details-area py-4" v-if="quickLap?.length > 0">
          <div class="container" :class="{ 'quick-lap': quickLap?.length > 0 }">
            <div class="row">
              <div class="col-lg-8 col-md-12 px-2" v-if="quickLap?.length > 0">
                <div class="d-flex flex-column gap-1">
                  <div class="d-flex gap-2 align-items-center">
                    <div
                      class="custom-dropdown"
                      style="position: relative; width: 100%"
                    >
                      <div
                        class="dropdown-container"
                        style="
                          position: relative;
                          display: flex;
                          justify-content: space-between;
                          align-items: center;
                          flex-wrap: wrap;
                          gap: 0.5rem;
                        "
                      >
                        <div
                          class="d-flex justify-content-between align-items-center w100"
                        >
                          <h4
                            class="text-center m-0"
                            style="color: rgb(68, 206, 111)"
                          >
                            Thực hành Lab
                          </h4>
                          <div class="is-mobile">
                            <button
                              v-if="dataComputing?.state == 'ON'"
                              class="btn btn-primary m-0"
                              @click="handleStopComputing(dataComputing?.id)"
                            >
                              OFF
                            </button>
                            <button
                              v-else
                              @click="handleChooseOnLab()"
                              class="btn btn-primary"
                            >
                              ON
                            </button>
                          </div>
                        </div>
                        <!-- <div
                          class="dropdown-selected w100"
                          @click="toggleDropdown()"
                          style="
                            background-color: #fff;
                            padding: 10px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            cursor: pointer;
                            width: 300px;
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
                              <span>{{ chooseId?.title }}</span>
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
                            width: 300px;
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
                              style="
                                display: flex;
                                align-items: center;
                                gap: 5px;
                              "
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
                        </div> -->
                      </div>
                    </div>
                    <div class="is-pc">
                      <button
                        v-if="dataComputing?.state == 'ON'"
                        class="btn btn-primary"
                        @click="handleStopComputing(dataComputing?.id)"
                      >
                        OFF
                      </button>
                      <button
                        v-else
                        @click="handleChooseOnLab()"
                        class="btn btn-primary"
                      >
                        ON
                      </button>
                    </div>
                  </div>
                  <div
                    class="widget-area"
                    style="
                      border-bottom: 1px solid #ced4da;
                      background: #000;
                      padding: 5px;
                      border-radius: 5px;
                      margin-top: 7px !important;
                    "
                  >
                    <iframe
                      v-if="isSSH"
                      :src="isSSH"
                      style="height: calc(100vh - 218px); width: 100%"
                    />
                    <div
                      v-else
                      style="
                        height: calc(100vh - 214px);
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      "
                    >
                      <h4 style="color: white">Bài Lab chưa được khởi tạo</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-12 px-2">
                <div
                  class="blog-details-desc"
                  style="
                    border-bottom: 1px solid #ced4da;
                    padding: 10px;
                    height: calc(100vh - 134px);
                  "
                  :class="{ 'quick-lap-blog-details-desc': quickLap }"
                >
                  <h4 class="text-center pb-3" style="color: #44ce6f">
                    {{ article?.attributes?.title }}
                  </h4>
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

                  <div
                    class="article-footer"
                    v-if="article?.attributes?.tags.data"
                  >
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
            </div>
          </div>
        </div>
      </div>
      <div class="button-list-option" @click="handleOptionListOptionFunction()">
        <i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12M40 76h176a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m176 104H40a12 12 0 0 0 0 24h176a12 12 0 0 0 0-24"
            />
          </svg>
        </i>
      </div>
    </div>
    <ModalListOptionFunction
      @handleShowModal="handleOptionListOptionFunction"
      :categories="categories"
      :listTags="listTags"
      :listblog="listblog"
      :pageUrl="pageUrl"
      :article="article"
      :isOpen="isOpen"
    />
  </div>
</template>

<script>
var CryptoJS = require("crypto-js");
import { formatDate } from "../../utils/dateUtils";
import RelateToInfor from "../Relate/RelateToInfor.vue";
import ModalListOptionFunction from "../Modal/ModalListOptionFunction.vue";

export default {
  name: "BlogDetailsAndLabs",
  components: {
    ModalListOptionFunction,
  },
  props: [
    "article",
    "quickLap",
    "categories",
    "listTags",
    "listblog",
    "pageUrl",
    "articalID",
  ],

  computed: {
    isSSH() {
      if (this.dataComputing) {
        return `${process.env.SSH}/?hostname=${
          this.dataComputing?.ipConnect
        }&port=${this.dataComputing?.portConnect}&username=${
          this.dataComputing?.username
        }&password=${CryptoJS.enc.Base64.stringify(
          CryptoJS.enc.Utf8.parse(this.dataComputing?.password)
        )}&scrollback=50000`;
      } else {
        return null;
      }
    },
  },
  data() {
    return {
      // details: this.detailsContent,
      isOpen: false,
      dataComputing: null,
      dataDetailOS: [],
      chooseId: this.$route.query.lab,
      isOpenDrop: false,
      loading: false,
    };
  },

  mounted() {
    if (this.quickLap?.length > 0) {
      this.handleMapPromissData();
    }
  },

  methods: {
    async handleChooseOnLab() {
      const data = await this.handleStopComputing(this.dataComputing?.id);

      if (data) {
        this.handleGetLabInstance(this.chooseId);
      }
    },

    async handleUpdateOption(item) {
      //console.log("🚀 ~ handleUpdateOption ~ item:", item);
      if (item == this.chooseId) {
        return;
      } else {
        this.loading = true;
        this.chooseId = item;
        const response = await this.$sdk.computing.stopUseComputing(
          this.dataComputing?.id, // ID cụ thể của bạn
          this.$store.getters.getUser.partyId || this.$store.getters.getUser.id
        );
        if (response) {
          this.dataComputing = response;
          this.handleGetLabInstance(this.chooseId);
        }
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

    handleOptionListOptionFunction() {
      this.isOpen = !this.isOpen;
    },

    async handleMapPromissData() {
      // const results = await Promise.all(
      //   (this.quickLap || []).map((c) => this.handleGetProduct(c))
      // );
      // this.dataDetailOS.push(...results.filter(Boolean));
      //this.chooseId = this.dataDetailOS[0];
      this.handleGetLabInstance(this.chooseId);
    },

    // async handleGetProduct(id) {
    //   try {
    //     const response = await this.$sdk.product.getProductById(
    //       id,
    //       this.$route.query.store
    //     );
    //     if (response) {
    //       return response;
    //     } else {
    //       return null;
    //     }
    //   } catch (error) {
    //     console.log("🚀 ~ handleGetProduct ~ error:", error);
    //     this.$toast.error(error, {});
    //   }
    // },

    async handleGetLabInstance(id) {
      try {
        this.loading = true;
        const response = await this.$sdk.computing.getLabInstance(
          this.articalID,
          id,
          this.$store.getters.getUser.partyId || this.$store.getters.getUser.id
        );
        if (response) {
          this.dataComputing = response;
          this.loading = false;
        } else {
          this.dataComputing = null;
          this.loading = false;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetLabInstance ~ error:", error);
        this.$toast.error(error, {});
        this.loading = false;
      }
    },

    async handleStopComputing(id) {
      try {
        this.loading = true;
        const response = await this.$sdk.computing.stopUseComputing(
          id, // ID cụ thể của bạn
          this.$store.getters.getUser.partyId || this.$store.getters.getUser.id
        );
        if (response) {
          this.dataComputing = response;
          //return response;

          this.$router.push(`/${this.pageUrl}/${this.$route.params.lab}`);
        }
        // else {
        //   throw new Error("Không có phản hồi từ API");
        // }
      } catch (error) {
        console.error("🚀 ~ handleStopComputing ~ error:", error);
        this.$toast.error("Có lỗi xảy ra khi dừng quá trình", error);
        //throw error; // Ném lỗi để Promise bị reject
      }
    },
  },

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
      height: 620px;
      overflow-y: scroll;
    }
  }
}
@media (min-width: 1441px) and (max-width: 1920px) {
  /* Laptop lớn */
  .container.quick-lap {
    max-width: 80%;

    .quick-lap-blog-details-desc {
      height: 620px;
      overflow-y: scroll;
    }
  }
}
@media (min-width: 1921px) {
  /* Desktop */
  .container.quick-lap {
    max-width: 80%;

    .quick-lap-blog-details-desc {
      height: 620px;
      overflow-y: scroll;
    }
  }
}

.hover-greed:hover {
  background: #7ceea028;
}

.button-list-option {
  display: block;
  position: fixed;
  width: 3rem;
  height: 3rem;
  line-height: 3rem;
  background: #44ce70eb;
  border: 1px solid #44ce6f;
  color: #fff;
  text-align: center;
  top: 50%;
  right: 0;
  margin-top: -1.5rem;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  transition: background-color 0.2s;
  overflow: hidden;
  cursor: pointer;
  z-index: 999;
  box-shadow: -0.25rem 0 1rem #00000026;
}

.modal-lab {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-lab {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

button {
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
}
</style>

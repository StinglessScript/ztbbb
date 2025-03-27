<template>
  <div class="blog-area ptb-40">
    <div class="container">
      <div class="row">
        <!-- <template v-for="blog in block.child_categories.data">
          <div
            class="col-lg-4 col-md-6"
            v-for="item in blog.attributes.page_defaults.data"
            :key="item.id"
          >
            <div class="single-blog-post-item">
              <div class="post-image">
                <a   :href="item?.attributes?.slug">
                  <nuxt-img
                    v-if="item?.attributes?.image.data"
                    :src="item?.attributes?.image.data.attributes.url"
                    alt="image"
                    provider="strapi"
                  />
                </a>
              </div>
              <div class="post-content">
                <ul class="post-meta">
                  <li><a href="#">Admin</a></li>
                  <li>{{ item?.attributes?.publishedAt.split("T")[0] }}</li>
                </ul>
                <h3>
            a      <a  :href="item?.attributes?.slug" class="learn-more-btn"
                    >{{ item?.attributes?.name }}
                  </a>
                </h3>
                <a href="#" class="read-more-btn">Xem thêm<feather type="plus-circle"></feather></a>
                
              </div>
            </div></div
        ></template> -->

        <div class="col-12 col-lg-8 px-2">
          <div class="row" v-if="block?.length > 0">
            <template>
              <div
                v-for="item in block"
                class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-5 d-flex align-items-stretch"
                style="margin-bottom: 1.5rem"
                :key="item.id"
              >
                <div class="single-blog-post-item" style="cursor: pointer">
                  <div class="post-image h-full" style="width: 100%">
                    <!-- @click="handleClick(item)" -->
                    <a
                      :href="handleClick(item)"
                      class="h-full cursor-pointer"
                      style="height: 100%; width: 100%"
                    >
                      <img
                        style="
                          height: 100%;
                          width: 100%;
                          aspect-ratio: 1 / 1;
                          object-fit: cover;
                        "
                        v-if="item?.attributes?.imageUrl"
                        :src="item?.attributes?.imageUrl"
                      />
                      <nuxt-img
                        v-else-if="
                          !item?.attributes?.imageUrl &&
                          item?.attributes?.cover?.data
                        "
                        :src="item?.attributes?.cover?.data?.attributes?.url"
                        alt="image"
                        provider="strapi"
                        style="
                          min-height: 276px;
                          width: 100%;
                          aspect-ratio: 1 / 1;
                          object-fit: cover;
                        "
                      />
                      <img
                        v-else-if="
                          !item?.attributes?.imageUrl &&
                          !item?.attributes?.cover?.data
                        "
                        src="~/assets/img/blog-image/9.jpg"
                        style="
                          min-height: 276px;
                          width: 100%;
                          aspect-ratio: 1 / 1;
                          object-fit: cover;
                        "
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
                        <!--  @click="handleClick(item)" -->
                        <a
                          :href="handleClick(item)"
                          class="learn-more-btn cursor-pointer"
                        >
                          {{ item?.attributes?.title }}
                        </a>
                      </h5>
                      <div
                        class="d-flex flex-column justify-content-end h-full"
                      >
                        <!-- @click="
                            handlePagesAuthor(
                              item?.attributes?.author?.data?.attributes?.slug
                            )
                          " -->
                        <a
                          v-if="
                            item?.attributes?.author?.data?.attributes?.slug
                          "
                          :href="
                            handlePagesAuthor(
                              item?.attributes?.author?.data?.attributes?.slug
                            )
                          "
                          class="px-3"
                          style="padding-left: 1rem; padding-right: 1rem"
                        >
                          Tác giả
                          <span class="span-author">
                            {{
                              item?.attributes?.author?.data?.attributes?.name
                            }}
                          </span>
                        </a>
                        <span
                          v-else
                          class="px-3"
                          style="padding-left: 1rem; padding-right: 1rem"
                        >
                          <span class="span-author" style="padding-left: 0px"
                            >Chưa có tác giả</span
                          >
                        </span>
                        <!-- <span
                          style="
                            color: #6084a4;
                            line-height: 1.9;
                            padding-left: 1rem;
                            padding-right: 1rem;
                          "
                          >{{ item?.attributes?.description }}</span
                        > -->
                        <!-- @click="handleClick(item)" -->
                        <a
                          :href="handleClick(item)"
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
            <h4>Chưa có nội dung</h4>
          </div>
        </div>
        <div class="col-12 col-lg-4 px-2">
          <BlogSidebar
            :listTags="listTags"
            :categories="categories"
            :checkLayout="typeArticle"
          />
        </div>

        <!-- <div class="col-lg-12 col-md-12">
          <div class="pagination-area">
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-center">
                <li class="page-item">
                  <a class="page-link" href="#">Prev</a>
                </li>
                <li class="page-item active">
                  <a class="page-link" href="#">1</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import BlogSidebar from "../Common/BlogSidebar";
export default {
  name: "BlogGridThree",
  props: ["block", "typeArticle", "checkCategory", "categories", "listTags"],
  components: {
    BlogSidebar,
  },
  methods: {
    handlePagesAuthor(id) {
      this.$store.commit("setLoading", true);
      // this.$router.push(`/author/${id}`);
      return `/author/${id}`;
    },

    changeDate(time) {
      return moment(time).format("DD-MM-YYYY ");
    },

    handleClick(item) {
      this.$store.commit("setLoading", true);

      // Kiểm tra các điều kiện để xây dựng đường dẫn
      const baseUrl = this.typeArticle?.pageUrl || "";
      const categorySlug =
        this.checkCategory && this.checkCategory.length > 0
          ? this.checkCategory[0].attributes.slug
          : "";
      const articleSlug = item?.attributes?.slug;
      const mainCategory =
        item?.attributes?.mainCategory?.data?.attributes?.slug;
      const routePath =
        categorySlug || baseUrl == this.$route.params.slug
          ? `/${baseUrl}${
              categorySlug || mainCategory
                ? `/${mainCategory || categorySlug}`
                : ""
            }/${articleSlug}`
          : `${articleSlug}`;
      //console.log("🚀 ~ handleClick ~ routePath:", routePath);
      return routePath;
      //return (window.location.href = routePath);
    },
  },
};
</script>

<style lang="scss">
.single-blog-post-item {
  background: #f7fafd !important;
  // background: #f7fafd;
  transition: 0.5s;
  width: 98%;
  min-height: 470px;
  //#f7fafd
  &:hover {
    background: #fff !important;
    transition: all 0.5s;
    box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
    border-radius: 5px;
  }
}
.post-meta {
  border-radius: 50px;
  padding: 8px 16px;
  position: absolute;
  top: -17px;
  left: 30px;
  /* border: 1px solid linear-gradient(135deg, #23bdb8, #43e794); */
  background: linear-gradient(135deg, #23bdb8, #43e794) !important;
  color: white;
  margin: 0;
}

.post-meta-h5 {
  min-height: 90px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 20px;
}

.span-author {
  color: #6084a4;
  line-height: 1.9;
  padding-left: 5px;
}

@media only screen and (max-width: 767px) {
  .post-meta-mobile {
    top: -25px !important;
  }
}

.learn-more-btn {
  color: #0e314c !important;
  line-height: 30px;

  &:hover {
    color: #44ce6f !important;
    transition: all 0.5s;
  }
}

.font-a {
  display: flex;
  padding: 0 1rem 1rem 1rem;
  gap: 0.25rem;
}

.feather-plus-circle {
  width: 20px;
  height: 24px;
  //padding-left: 5px;
  display: block;
}
</style>

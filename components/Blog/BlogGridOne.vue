<template>
  <div class="blog-area ptb-80">
    <div class="container">
      <div class="row">
        <!-- <template v-for="blog in block.child_categories.data">
          <div
            class="col-lg-4 col-md-6"
            v-for="item in blog.attributes.page_defaults.data"
            :key="item.id"
          >
            <div class="single-blog-post-box">
              <div class="entry-thumbnail">
                <a 
                  :href="`/${blog.attributes.prefix}/${item.attributes.slug}`"
                >
                  <nuxt-img
                    v-if="item.attributes.image.data"
                    :src="
                      item.attributes.metaData.urlImage ||
                      item.attributes.cover.data?.attributes?.url
                    "
                    alt="image"
                    provider="strapi"
                  />
                </a>
              </div>
              <div class="entry-post-content">
                <h3>
                  <a 
                    :href="`/${blog.attributes.prefix}/${item.attributes.slug}`"
                    class="learn-more-btn"
                    >{{ item.attributes.name }}
                  </a>
                </h3>
                <p>
                  {{ item.attributes.description }}
                </p>
                <a 
                  :href="`/${blog.attributes.prefix}/${item.attributes.slug}`"
                  class="learn-more-btn"
                  >Xem thêm
                  <feather type="plus"></feather>
                </a>
              </div>
            </div>
          </div>
        </template> -->
        <template v-for="blog in block">
          <div
            class="col-lg-6"
            v-for="item in blog.attributes.articles.data"
            :key="item.id"
          >
            <div class="single-blog-post-item">
              <div class="post-image">
                <a  :href="item.attributes.slug">
                  <img
                    v-if="item.attributes.imageUrl"
                    :src="item.attributes.imageUrl"
                  />
                  <nuxt-img
                    v-else-if="
                      !item.attributes.imageUrl && item.attributes.cover.data
                    "
                    :src="item.attributes.cover.data.attributes.url"
                    alt="image"
                    provider="strapi"
                  />
                  <img v-else src="~/assets/img/blog-image/9.jpg" />
                </a>
              </div>
              <div class="post-content">
                <ul class="post-meta">
                  <li>
                    <a href="#">{{
                      item.attributes.author.data.attributes.name
                    }}</a>
                  </li>
                  <li>{{ item.attributes.publishedAt.split("T")[0] }}</li>
                </ul>
                <h3>
                  <a  :href="item.attributes.slug" class="learn-more-btn"
                    >{{ item.attributes.title }}
                  </a>
                </h3>
                <a href="#" class="read-more-btn"
                  >Xem thêm<feather type="plus-circle"></feather
                ></a>
              </div>
            </div>
          </div>
        </template>
        <div class="col-lg-12 col-md-12">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogGridOne",
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

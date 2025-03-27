<template>
  <div class="blog-area ptb-80">
    <div class="container">
      <div class="row">
        <template v-for="blog in block.child_categories.data">
          <div
            class="col-lg-4 col-md-6"
            v-for="item in blog?.attributes?.page_defaults.data"
            :key="item.id"
          >
            <div class="single-blog-post">
              <div class="blog-image">
                <a  :href="item.attributes.slug">
                  <img
                    v-if="item.attributes.imageUrl"
                    :src="item.attributes.imageUrl"
                  />
                  <nuxt-img
                    v-else-if="
                      !item.attributes.imageUrl && item.attributes.image.data
                    "
                    :src="item.attributes.image.data.attributes.url"
                    alt="image"
                    provider="strapi"
                  />
                </a>
                <div class="date">
                  <feather type="calendar"></feather>
                  {{ item?.attributes?.publishedAt.split("T")[0] }}
                </div>
              </div>
              <div class="blog-post-content">
                <h3>
                  <a  :href="item?.attributes?.slug" class="learn-more-btn"
                    >{{ item?.attributes?.name }}
                  </a>
                </h3>
                <span>by Admin</span>
                <p>
                  {{ item?.attributes?.description }}
                </p>
                <a href="#" class="read-more-btn"
                  >Xem thêm <feather type="arrow-right"></feather
                ></a>
              </div>
            </div></div
        ></template>

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
  name: "BlogGridTwo",
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

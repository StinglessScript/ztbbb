<template>
  <div class="blog-area ptb-80">
    <div class="container">
      <div class="row">
        <div
          class="col-lg-4 col-md-6 mb-4"
          v-for="item in block.category.data?.attributes?.articles.data"
          :key="item.id"
        >
          <div class="single-blog-post-box">
            <div class="entry-thumbnail">
              <a  :href="`/${item?.attributes?.slug}`">
                <img
                  v-if="item?.attributes?.imageUrl"
                  :src="item?.attributes?.imageUrl"
                />
                <nuxt-img
                  v-else
                  :src="
                    item?.attributes?.cover?.data?.attributes?.url ||
                    'http://beepeers.com/assets/images/commerces/default-image.jpg'
                  "
                  alt="image"
                  provider="strapi"
                />
              </a>
            </div>
            <div class="entry-post-content">
              <h3 style="height: 64px">
                <a 
                  :href="`/${item?.attributes?.slug}`"
                  class="learn-more-btn"
                  >{{ item?.attributes?.title }}
                </a>
              </h3>
              <p>
                {{ item?.attributes?.description }}
              </p>
              <a 
                :href="`/${item?.attributes?.slug}`"
                class="learn-more-btn"
                >Xem thêm
                <!-- <feather type="plus"></feather> -->
              </a>
            </div>
          </div>
        </div>

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
                <!-- <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li> -->
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
  name: "ListArticleByCategory",
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

<style scoped>
.entry-thumbnail a {
  width: 100%;
}
.entry-thumbnail {
  width: 100%;
  margin-bottom: -5px;
}
.entry-thumbnail a img {
  height: 200px;
  min-width: 100%;
  vertical-align: middle;
  border-radius: 5px 5px 0 0;
}
.entry-post-content a {
  color: #0e314c;
}

.entry-post-content h3 {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 18px;
}
.entry-post-content h3 a {
  color: #0e314c;
}
.entry-post-content p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  min-height: 67px;
  margin-top: 8px;
  margin-bottom: 0;
}
.entry-post-content {
  border: none;
  /* height: 100%; */
  background: -webkit-gradient(
    linear,
    left bottom,
    right top,
    from(#d5fefd),
    color-stop(#e0fdff),
    color-stop(#effbff),
    color-stop(#fbfaff),
    to(#fffcff)
  );
  background: linear-gradient(
    to right top,
    #d5fefd,
    #e0fdff,
    #effbff,
    #fbfaff,
    #fffcff
  );
  padding: 20px;
}
</style>

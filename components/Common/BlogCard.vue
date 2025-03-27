<template>
  <div class="row">
    <div
      class="col-lg-4 col-md-6 justify-content-center"
      v-for="blog in singleBlog"
      :key="blog.id"
    >
      <div class="single-blog-post-box bg-f4faff">
        <div class="entry-thumbnail">
          <a  :href="blog?.attributes?.slug">
            <nuxt-img
              :src="blog?.attributes?.img.data?.attributes?.url"
              alt="image"
              provider="strapi"
            />
          </a>
        </div>

        <div class="entry-post-content">
          <div class="entry-meta">
            <ul>
              <li><a href="#">Admin</a></li>
              <li>{{ blog?.attributes?.date }}</li>
            </ul>
          </div>

          <h3>
            <a  :href="blog?.attributes?.slug">
              {{ blog?.attributes?.title }}
            </a>
          </h3>
          <p>
            {{ blog?.attributes?.shortDesc }}
          </p>
          <a  :href="blog?.attributes?.slug" class="learn-more-btn">
            {{ blog?.attributes?.btnText }}
            <feather type="plus"></feather>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: ["singleBlog"],
};
</script>
<template>
  <div class="newsletter-area" v-if="block">
    <div class="container-fluid">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-12">
          <div class="newsletter-image">
            <img v-if="block?.imageUrl" :src="block?.imageUrl" />
            <nuxt-img
              :src="block.image.data?.attributes?.url"
              :atl="block.title"
              provider="strapi"
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-12 p-0">
          <div class="newsletter-content">
            <h2>{{ block.title }}</h2>
            <form class="newsletter-form">
              <button v-if="`${block.btnUrl}`.includes('http')">
                <a
                  :href="block.btnUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  >{{ block.btnText }}</a
                >
              </button>
              <button v-else>
                <a  :href="block.btnUrl">{{ block.btnText }}</a>
              </button>
            </form>
            <p>
              {{ block.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TrialTwo",
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

<template >
  <div class="main container">
    <a class="ads" :href="block.slug">
      <!-- <img src="https://www.ovhcloud.com/sites/default/files/styles/banner/public/2022-03/illu_banner_bmi.webp" /> -->
      <nuxt-img
        :src="block.icon?.data?.attributes?.url"
        alt="main-pic"
        provider="strapi"
      />
      <div class="content">
        <h3>{{ block.title }}</h3>
        <div v-html="block.description"></div>
        <!-- <a href="#">Button</a> -->
        <div class="button" v-if="block.nameButton">{{ block.nameButton }}</div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  props: ["block"],
};
</script>
<style lang="scss" scoped>
$bgPrimary: #ecfaf1;

.main {
  margin-top: 3rem;
}

.ads {
  transition: 0.5s;
}

.ads:hover {
  background: $bgPrimary;
}

.ads {
  cursor: pointer;
  display: flex;
  gap: 10px;
  padding: 30px;
  border: 1px solid #16b364;
  border-radius: 4px;
}

@media screen and (min-width: 760px) {
  .ads {
    // width: 80%;
    flex-wrap: nowrap;
    margin: auto;
    gap: 10px;
    align-items: center;

    img {
      width: 14rem;
      height: 10rem;
    }
  }
}

@media screen and (max-width: 760px) {
  .ads {
    width: 100%;
    flex-wrap: wrap;
  }
}

a {
  margin-top: 40px;
  padding: 5px;
  border: 2px solid #16b364;
  border-radius: 10px;
}
.button {
  border: 2px solid #16b364;
  border-radius: 10px;
  width: fit-content;
  padding: 5px 10px;
  color: #16b364;
  margin-top: 10px;
}
</style>
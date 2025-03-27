<template>
  <div class="contact-info-area ptb-80">
    <div class="container">
      <div class="row justify-content-center" v-if="contact">
        <div
          class="col-lg-6 col-md-12 col-sm-12"
          v-for="item in contact?.attributes?.info"
          :key="item.id"
        >
          <div class="contact-info-box" v-if="contact?.attributes?.item !== []">
            <div class="item-left">
              <div class="icon">
                <feather :type="item.icon"></feather>
              </div>
              <h3>{{ item.title }}</h3>
            </div>
            <div class="content">
              <ul>
                <li>
                  <feather type="phone"></feather>
                  <a :href="`tel:+${item.phone}`">{{ item.phone }}</a>
                </li>
                <li><feather type="printer"></feather> {{ item.fax }}</li>
                <li><feather type="map-pin"></feather> {{ item.address }}</li>
              </ul>
            </div>
            <div class="map_gg">
              <iframe
                width="100%"
                height="350"
                frameborder="0"
                style="border: 0"
                :src="item.urlGGmap"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12">
          <div class="contact-info-box" v-if="contact?.attributes?.item !== []">
            <div
              class="item"
              v-for="item in contact?.attributes?.department"
              :key="item.id"
            >
              <div class="item-left">
                <div class="icon">
                  <feather :type="item.icon"></feather>
                </div>
                <h3>{{ item.title }}</h3>
              </div>
              <div class="item-right">
                <ul>
                  <li v-for="a in item.item" :key="a.id">
                    <feather :type="a.icon"></feather>{{ a.name }}
                    <a v-if="a.icon === 'phone'" :href="`tel:${a.content}`">
                      {{ a.content }}</a
                    >
                    <a
                      v-else-if="a.icon === 'mail'"
                      :href="`mailto:${a.content}`"
                    >
                      {{ a.content }}</a
                    >
                    <a v-else>{{ a.content }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      info: {
        populate: "*",
      },
      department: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);

export default {
  name: "ContactOne",
  data() {
    return {
      contact: null,
    };
  },
  created: async function () {
    this.contact = await this.$strapi.find("contact", query);
    this.contact = this.contact.data;
  },
};
</script>
<style lang="scss" scoped>
.contact-info-box {
  margin-bottom: 50px;
}
</style>

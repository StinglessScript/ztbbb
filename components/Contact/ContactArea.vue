<template>
  <div class="contact-info-area ptb-80">
    <div class="container">
      <div class="row justify-content-center">
        <div
          class="col-lg-4 col-md-6 col-sm-6"
          v-for="contact in contacts"
          :key="contact.id"
        >
          <div class="contact-info-box" v-if="contact?.attributes?.item !== []">
            <div class="icon">
              <feather :type="contact?.attributes?.icon"></feather>
            </div>
            <h3>{{ contact?.attributes?.text }}</h3>
            <div v-for="item in contact?.attributes?.item" :key="item.id">
              <div v-if="`${item.content}`.includes('facebook' || 'fb')">
                <a :href="item.content"
                  ><feather type="facebook"></feather>Facebook</a
                >
              </div>

              <div v-else-if="`${item.content}`.includes('zalo')">
                <a :href="item.content"
                  ><img
                    width="24px"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBQrenAtp8-p9CSmLP9b4rFuy2zLVIMmqqKQ&usqp=CAU"
                    alt=""
                  />
                  Zalo</a
                >
              </div>
              <p v-else>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactInfo",
  data() {
    return {
      contacts: null,
    };
  },
  created: async function () {
    this.contacts = await this.$strapi.find("contacts", "?sort=id&populate=*");
    this.contacts = this.contacts.data;
  },
};
</script>
<style lang="scss" scoped>
.contact-info-box {
  min-height: 350px;
  margin-bottom: 50px;
}
</style>

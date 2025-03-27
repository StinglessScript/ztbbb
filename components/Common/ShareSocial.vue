<template>
  <div class="products-share-social">
    <span>Share:</span>
    <ul>
      <li v-for="network in networks" :key="network.network">
        <ShareNetwork
          :network="network.network"
          :url="`https://${host}${url}`"
          :title="title"
          :style="{ color: network.color }"
          :description="description.replace(/<(?:.|\n)*?>/gm, '')"
          :quote="sharing.quote"
          :hashtags="hashtags ? hashtags.toString().split(' ').join('') : ''"
          :twitterUser="sharing.twitterUser"
        >
          <feather :type="network.icon"></feather>
        </ShareNetwork>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["url", "title", "description", "hashtags"],
  data() {
    return {
      host: location.host,
      sharing: {
        quote: "Long Vân",
        hashtags: "vuejs,vite,javascript",
        twitterUser: "longvan",
      },
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "mail",
          color: "#333333",
        },

        {
          network: "facebook",
          name: "Facebook",
          icon: "facebook",
          color: "#1877f2",
        },

        {
          network: "linkedin",
          name: "LinkedIn",
          icon: "linkedin",
          color: "#007bb5",
        },

        {
          network: "twitter",
          name: "Twitter",
          icon: "twitter",
          color: "#1da1f2",
        },
      ],
    };
  },

};
</script>
<style lang="scss" scoped></style>

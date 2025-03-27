<!-- <template>
  <div>
    <Header></Header>
    <PreLoader v-if="isLoading" />
    <SideBar />
    <Nuxt />
    <div
      class="zalo-chat-widget"
      data-oaid="1365034174709453259"
      data-welcome-message="Rất vui khi được hỗ trợ bạn!"
      data-autopopup="0"
      data-width="350"
      data-height
    ></div>
  </div>
</template>

<script>
import Header from "./Header";
import PreLoader from "./PreLoader";

export default {
  name: "admin",
  components: {
    Header,
    PreLoader,
  },
  data() {
    return {
      isLoading: true,
      currentUrl: "",
    };
  },

  watch: {
    "$store.state.loader": function () {
      this.isLoading = this.$store.state.loader;
    },
    //   $route(pathUrl) {
    //     if (pathUrl.fullPath.indexOf("?") !== -1) {
    //       this.isLoading = false;
    //     } else {
    //       this.currentUrl = pathUrl.path;
    //       this.isLoading = true;
    //       setTimeout(() => {
    //         this.isLoading = false;
    //       }, 1200);
    //     }
    //   },
  },
  // mounted() {
  //   this.currentUrl = window.location.pathname;
  //   setTimeout(() => {
  //     this.isLoading = false;
  //   }, 1300);
  // },
};
</script> -->

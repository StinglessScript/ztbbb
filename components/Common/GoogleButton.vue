<template>
  <div id="googleButton"></div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  mounted() {
    google.accounts.id.initialize({
      client_id:
        `${this.$config.GG_CLIENT_ID}`,
      callback: this.handleCredentialResponse, //method to run after user clicks the Google sign in button
      context: "signin",
    });

    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      type: "standard",
      size: "medium",
      text: "Google",
      shape: "rectangular",
      logo_alignment: "center",
      width: 240,
      height: 50,
    });
  },

  methods: {
    handleCredentialResponse(response) {
      let loginRequest = {
        access_token: response.credential,
        type :"google",
        platform: "WEB"
      };
      this.$store
        .dispatch(
          "loginV2",loginRequest
        )
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {}),
                this.$store.commit("setToken", data.data.token);
              this.$store.commit("setLengthFavorite", -1);
              //Cookies.set("token", data.data.token);
              Cookies.set(process.env.ACCESSTOKEN_NAME, data.data.token, { domain: '.longvan.net', path:"/" });
              this.$router.push("/");
              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        });
    },
  },
};
</script>

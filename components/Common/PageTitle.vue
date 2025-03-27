<template>
  <div class="page-title-area" style="margin-top: 70px">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <h2>{{ pageTitle }}</h2>
          <ul class="breadcrumb" v-if="subPage">
            <li class="home">
              <a  href="/"
                ><span title="Trang chủ">Trang chủ</span></a
              >
            </li>
            <li class="breadcrumb" v-if="parent_id">
              <a  :href="`/cua-hang/danh-muc/${parent.handle}`"
                ><span>{{ parent.title }}</span></a
              >
            </li>
            <li>
              <span>{{ subPage }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="shape1"><img src="~/assets/img/shape1.png" alt="shape" /></div>
    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
    <div class="shape3">
      <img src="~/assets/img/shape3.svg" />
    </div>
    <div class="shape4">
      <img src="~/assets/img/shape4.svg" />
    </div>
    <div class="shape5">
      <img src="~/assets/img/shape5.png" alt="shape" />
    </div>
    <div class="shape6 rotateme">
      <img src="~/assets/img/shape4.svg" />
    </div>
    <div class="shape7">
      <img src="~/assets/img/shape4.svg" />
    </div>
    <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg" />
    </div>
  </div>
</template>

<script>
// import Shape2 from "~/assets/img/shape2.svg";
// import Shape3 from "~/assets/img/shape3.svg";
// import Shape4 from "~/assets/img/shape4.svg.svg";
export default {
  name: "PageTitle",
  props: ["pageTitle", "subPage", "parent_id"],
  // components: {
  //   Shape2,
  //   Shape3,
  //   Shape4,
  // },
  data() {
    return {
      parent: "",
    };
  },
  mounted() {
    if (this.parent_id) {
      this.getCategoryById(this.parent_id);
    }
  },
  methods: {
    getCategoryById(id) {
      this.$store
        .dispatch("getCategoryById", id)
        .then((data) => {
          this.parent = data.data;
        })
        .catch((e) => {
          error({ statusCode: 404, message: "Post not found" });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  text-align: center;
  background: initial;
  justify-content: center;
  margin-bottom: 0;

  li {
    font-size: 18px;
    position: relative;
    margin-left: 16px;
    padding-left: 12px;
    &::before {
      background: #44ce6f;
      height: 7px;
      width: 7px;
      content: "";
      left: -8px;
      top: 35%;
      position: absolute;
    }
    // &:last-child {
    //   position: relative;
    //   margin-left: 16px;
    //   padding-left: 12px;
    //   &::before {
    //     background: #44ce6f;
    //     height: 7px;
    //     width: 7px;
    //     content: "";
    //     left: -8px;
    //     top: 35%;
    //     position: absolute;
    //   }
    // }
  }
}
</style>

<template>
  <div class="page-title-area">
    <div class="d-table">
      <div class="d-table-cell">
        <h1>{{ block.title }}</h1>
      </div>
    </div>

    <div class="shape1"><img src="~/assets/img/shape1.png" alt="shape" /></div>
    <div class="shape2 rotateme">
      <img src="~/assets/img/shape2.svg"/>
    </div>
    <div class="shape3">
      <img src="~/assets/img/shape3.svg"/>
    </div>
    <div class="shape4">
      <img src="~/assets/img/shape4.svg"/>
    </div>
    <div class="shape5">
      <img src="~/assets/img/shape5.png" alt="shape" />
    </div>
    <div class="shape6 rotateme">
      <img src="~/assets/img/shape4.svg"/>
    </div>
    <div class="shape7">
      <img src="~/assets/img/shape4.svg"/>
    </div>
    <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg"/>
    </div>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";
export default {
  components: {
    Shape2,
    Shape3,
    Shape4,
  },
  name: "PageTitle",

  props: {
    block: {
      type: Object,
      default: {},
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
    margin: 12px;
    
    &:last-child {
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
    }
  }
}
</style>

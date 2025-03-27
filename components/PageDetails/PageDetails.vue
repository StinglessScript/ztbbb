<template>
  <div>
    <component
      v-for="(block, index) in details[0]?.attributes?.Blocks"
      :key="index"
      :is="
        `${block.__component}`.split('.')[1].charAt(0).toUpperCase() +
        `${block.__component}`.split('.')[1].slice(1)
      "
      :block="block"
    />
  </div>
</template>
<script>
export default {
  props: ["details"],
};
</script>
<style lang="scss" scoped>
.features-area-two:nth-of-type(2n-1) {
  background: #f7fafd;
  .row {
    flex-direction: row-reverse;
    .row {
      flex-direction: row;
    }
  }
}
p {
  line-height: 1.4rem;
  margin-bottom: 0.7rem;
}
.single-features .icon {
  position: absolute;
  text-align: center;
  width: 55px;
  height: 55px;
  line-height: 69px;
  background: transparent;
  border-radius: 50%;
  color: transparent;
  left: 20px;
  top: 30px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
}
.single-features:hover .icon {
  background: transparent;
  color: transparent;
}
@media only screen and (max-width: 767px) {
  .single-features {
    padding-left: 20px;
  }
  .single-features .icon {
    position: relative;
    left: 0;
    top: 0;
    margin-bottom: 25px;
  }
}
</style>

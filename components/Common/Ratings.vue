<template>
  <div class="rating">
    <div v-if="hasCounter" class="info counter">
      <span class="score-rating">Vui lòng chọn đánh giá</span>
    </div>
    <ul class="list">
      <li
        @click="rate(star)"
        v-for="star in maxStars"
        :class="{ active: star <= stars }"
        :key="star.stars"
        class="star"
      >
        <feather
          :type="star <= stars ? 'star' : 'star'"
        ></feather>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Rating",
  props: ["grade", "maxStars", "hasCounter"],
  data() {
    return {
      stars: this.grade,
    };
  },
  methods: {
    rate(star) {
      if (typeof star === "number" && star <= this.maxStars && star >= 0) {
        this.stars = this.stars === star ? star - 1 : star;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.rating {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  color: #b7b7b7;
  .list {
    padding: 0;
    margin: 0 20px 0 0;

    &:hover {
      .star {
        color: #ffe100;
      }
    }

    .star {
      display: inline-block;
      font-size: 42px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;

      &:hover {
        ~ .star:not(.active) {
          color: inherit;
        }
      }

      &:first-child {
        margin-left: 0;
      }

      &.active {
        color: #ffe100;
      }
    }
  }

  .info {
    margin-top: 15px;
    font-size: 40px;
    text-align: center;
    display: table;

    .divider {
      margin: 0 5px;
      font-size: 30px;
    }

    .score-max {
      font-size: 30px;
      vertical-align: sub;
    }
  }
}
</style>

<template>
  <div class="main container pt-4">
    <h3>{{ block.title }}</h3>
    <div class="grid-container">
      <div
        class="card grid-item"
        :class="item.isNew === true ? 'new' : ''"
        v-for="item in block.Items"
        :key="item.id"
      >
        <div class="status" v-show="item.isNew === true">New</div>
        <h5 class="title">{{ item.name }}</h5>

        <div class="data">
          <div class="content">
            <div v-html="item.content"></div>
          </div>
          <div class="row">
            <div class="price">
              <div class="oldPrice" v-if="item.oldPrice">
                Chỉ từ: <span>{{ convertPrice(item.oldPrice) }}</span>
              </div>
              <h2 class="newPrice" v-if="item.newPrice">
                {{ convertPrice(item.newPrice) }} <span>/ tháng</span>
              </h2>
            </div>
            <div class="action">
              <!-- <button class="btn" @click="handleClick(item)" v-if="item.nameButton1">{{ item.nameButton1 }}</button>
                        <router-link :href="item.slugButton2" class="view-more" v-if="item.nameButton2">{{ item.nameButton2 }} <svg xmlns="http://www.w3.org/2000/svg" width="32"
                                height="32" viewBox="0 0 20 20"> -->

              <!-- <button
                class="btn"
                @click="handleClick(item)"
                v-if="item.slugButton1"
              >
                {{ item.nameButton1 }}
              </button>
              <button class="btn" @click="handleClick(item)" v-else>
                {{ item.nameButton1 }}
              </button> -->
              <button
                @click="handleClick(item)"
                class="btn"
                v-if="item.slugButton1"
              >
                {{ item.nameButton1 }}
                <router-link
                  :to="item.slugButton2"
                  class="view-more"
                  v-if="item.slugButton2"
                  >{{ item.nameButton2 }}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M5 10a.75.75 0 0 1 .75-.75h6.638L10.23 7.29a.75.75 0 1 1 1.04-1.08l3.5 3.25a.75.75 0 0 1 0 1.08l-3.5 3.25a.75.75 0 1 1-1.04-1.08l2.158-1.96H5.75A.75.75 0 0 1 5 10Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </router-link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["block"],

  name: "BaremetalGroup",

  methods: {
    convertPrice(price) {
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      }
    },
    handleClick(data) {
      window.open(data.slugButton1, "_blank");
    },
  },

  mounted() {
    console.log("Prop block:", this.block);
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 768px) {
  .grid-container {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .card {
    margin: 50px 0 0 20px;

    padding: 2rem;
  }

  .btn {
    font-size: 16px;
  }

  .view-more {
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .grid-container {
    display: grid;
    grid-template-columns: 100%;
  }

  .card {
    margin: 20px 0;

    padding: 1rem;
  }

  .content {
    display: grid;
    grid-auto-flow: dense;
  }
}

.card {
  padding: 2rem;
}

.btn {
  font-size: 13px;
}

.view-more {
  font-size: 12px;
}

.main {
  margin-bottom: 50px;
}

button {
  padding: 8px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #16b364;
  color: #16b364;
  font-size: 16px;
}

a {
  font-size: 14px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
}

.new {
  border: 2px solid #16b364;
}

.action {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

::v-deep ul li:before {
  content: "✓ ";
  color: #16b364;
}

::v-deep ul {
  list-style: none;

  li {
    margin: 10px 0;
  }
}

.status {
  background-color: #16b364;
  color: #fff;
  text-transform: uppercase;
  position: absolute;
  top: -35px;
  left: 45%;
  padding: 5px 10px;
  border-top-left-radius: 40%;
  border-top-right-radius: 40%;
}

.btn {
  &:hover {
    background: #16b364;
    color: #fff;
    box-shadow: 0 13px 27px 0 rgba(68, 206, 111, 0.25);
  }
}

.oldPrice {
  span {
    text-decoration: line-through;
  }
}

.newPrice {
  color: #16b364;
  font-weight: bold;

  span {
    font-size: 16px;
    font-weight: normal;
  }
}

.title {
  font-weight: bold;
  font-size: 24px;
}

.data {
  display: grid;
  height: 100%;
}

.row {
  display: flex;
  align-content: flex-end;
}

.card:hover {
  background: #ecfaf1;
  border: 1px solid #16b364;
}
.card {
  transition: 0.5s;
}
</style>

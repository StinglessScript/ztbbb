<template>
  <div class="team-area ptb-80 bg-f9f6f6">
    <div class="container">
      <div class="section-title">
        <h2>Our Awesome Team</h2>
        <div class="bar"></div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>

    <div class="team-slides">
      <carousel
        :items="5"
        :autoplay="false"
        :loop="true"
        :autoplaySpeed="true"
        :autoplayTimeout="5000"
        :perPageCustom="[
          [0, 1],
          [576, 2],
          [768, 2],
          [1200, 4],
          [1500, 5],
        ]"
        v-if="teams !== []"
      >
        <slide v-for="team in teams.data" :key="team?.attributes?.id">
          <div class="single-team">
            <div class="team-image">
              <nuxt-img
                :src="team?.attributes?.img.data?.attributes?.url"
                alt="image"
                provider="strapi"
              />
            </div>

            <div class="team-content">
              <div class="team-info">
                <h3>{{ team?.attributes?.name }}</h3>
                <span>{{ team?.attributes?.position }}</span>
              </div>
              <ul>
                <li>
                  <a href="#" target="_blank"
                    ><feather type="facebook"></feather
                  ></a>
                </li>
                <li>
                  <a href="#" target="_blank"
                    ><feather type="twitter"></feather
                  ></a>
                </li>
                <li>
                  <a href="#" target="_blank"
                    ><feather type="linkedin"></feather
                  ></a>
                </li>
                <li>
                  <a href="#" target="_blank"
                    ><feather type="gitlab"></feather
                  ></a>
                </li>
              </ul>
              <p>{{ team?.attributes?.shortDesc }}</p>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",

  data() {
    return {
      teams: [],
    };
  },
  created: async function () {
    this.teams = await this.$strapi.find("team-cards" + "?populate=*");
  },
};
</script>
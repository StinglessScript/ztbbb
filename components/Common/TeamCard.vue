<template>
  <div class="row justify-content-center">
    <div
      class="col-lg-3 col-md-6 col-sm-6"
      v-for="team in singleTeam"
      :key="team.id"
    >
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
              <a href="#" target="_blank"><feather type="twitter"></feather></a>
            </li>
            <li>
              <a href="#" target="_blank"
                ><feather type="linkedin"></feather
              ></a>
            </li>
            <li>
              <a href="#" target="_blank"><feather type="gitlab"></feather></a>
            </li>
          </ul>
          <p>{{ team?.attributes?.shortDesc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TeamCard",
  props: ["singleTeam"],
};
</script>
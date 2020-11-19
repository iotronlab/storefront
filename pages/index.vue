<template>
  <section class="mb-1">
    <v-container fluid class="mt-n12 body-image">
      <v-row no-gutters class="mt-12" align="center" justify="center">
        <v-col lg="3">
          <h1 class="landing-title text-uppercase primary--text text-h3">
            Curated Store for Art
          </h1>

          <h2 class="subtitle-2 text--secondary mt-4">
            A citizen's initiative to revive the Indian economy post the covid
            pandemic 2020, by empowering artists, creator of crafts, and
            boutiques at the grassroot level, to showcase their creations on a
            platform crafted for them.
          </h2>

          <v-btn rounded class="mt-6">Shop</v-btn>
          <v-btn outlined rounded class="mt-6">Learn More</v-btn>
        </v-col>
        <v-col lg="6">
          <v-img cover src="landing-bg.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-row no-gutters class="pa-2 text-right">
      <h2
        class="landing-title text-uppercase primary--text text-h5 mx-auto mt-4"
      >
        Featured Artworks
        <p class="overline">This week</p>
      </h2>

      <v-container height="600"></v-container>
    </v-row>
    <v-row no-gutters class="pa-2 text-right">
      <h2
        class="landing-title text-uppercase primary--text text-h5 mx-auto mt-4"
      >
        Featured Artists
        <p class="overline">This week</p>
      </h2>

      <v-container height="600"></v-container>
    </v-row>
    <v-row no-gutters justify="center" align="center">
      <v-col class="text-center" lg="10">
        <h2 class="landing-title text-uppercase primary--text text-h5">
          Discover
        </h2>
        <Discover
      /></v-col>
    </v-row>
  </section>
</template>

<script>
import Discover from '~/components/landing/Discover.vue'
import Logo from '~/components/Logo.vue'
import DropDown from '~/components/nav/DropDown'

export default {
  components: {
    Logo,
    DropDown,
    Discover,
  },
  //layout: 'landing-page',
}
</script>
<style >
.landing-title {
  line-height: 95%;
  outline: none;
}
.body-image {
  background-image: url('/body.png');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
.v-application.theme--light .landing-title {
  transition: background 0.1s, color 0.1s;
  text-shadow: -5px -3px 8px rgb(163, 177, 198, 0.6),
    6px 2px 12px rgba(255, 255, 255, 0.5);
}
.v-application.theme--dark .landing-title {
  transition: background 0.1s, color 0.1s;
  text-shadow: -5px -3px 8px rgba(0, 0, 0, 0.7),
    6px 2px 12px rgba(255, 255, 255, 0.1) !important;
}
</style>

<template>
  <v-container fluid>
    <v-row>
      <v-col lg="4">
        <h1 class="landing-title text-uppercase primary--text text-h3">
          Curated Store for Art
        </h1>

        <h2 class="subtitle-2 text--secondary mt-4">
          A citizen's initiative to revive the Indian economy post the covid
          pandemic 2020, by empowering artists, creator of crafts, and boutiques
          at the grassroot level, to showcase their creations on a platform
          crafted for them.
        </h2>

   <v-btn  rounded class="mt-6">Shop</v-btn>
        <v-btn outlined rounded class="mt-6">Learn More</v-btn>
      </v-col>
      <v-col lg="8">
        <v-img cover src="landing-bg.png"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <h2 headline class="landing-title">Featured</h2>
      <DropDown />
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import DropDown from '~/components/nav/DropDown'

export default {
  components: {
    Logo,
    DropDown,
  },
  layout: 'landing-page',
}
</script>
<style >
.landing-title {
  line-height: 95%;
  opacity: 60%;
  outline: none;
}
.v-application.theme--light .landing-title {
  transition: background 0.1s, color 0.1s;
  text-shadow: -5px -3px 8px rgb(163, 177, 198, 0.6),
    6px 2px 12px rgba(255, 255, 255, 0.5);
}

.v-application.theme--dark .landing-title {
  transition: background 0.1s, color 0.1s;
  text-shadow: -5px -3px 8px rgba(0, 0, 0, 0.7),
    6px 2px 12px rgba(255, 255, 255, 0.1);
}
</style>

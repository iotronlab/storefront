<template>
  <v-container fluid>
    <v-row>
      <v-col lg="4">
        <h1
          class="landing-title text--primary font-weight-thin text-uppercase"
        >A Curated Store for Art</h1>

        <h2
          class="subtitle-1 landing-title text--secondary mt-6"
        >Empowering artists, creator of crafts, and boutiques to showcase their creations on a platform crafted for them.</h2>
        <v-btn outlined rounded class="mt-4">Learn More</v-btn>
      </v-col>
      <v-col lg="8">
        <v-img cover src="landing-bg.png"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <h2 headline class="landing-title">Featured</h2>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>
<style scoped>
.landing-title {
  font-family: 'Montserrat', sans-serif;
  line-height: 95%;
}
</style>
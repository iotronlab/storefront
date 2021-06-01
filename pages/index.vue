<template>
  <v-container fluid class="pa-0">
    <v-carousel class="mt-n16" height="700">
      <v-carousel-item
        src="landing.png"
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height mt-12" align="center" justify="center">
          <v-col cols="12" lg="3" class="text-center">
            <h1 class="landing-title pb-4">Curated Store for Art</h1>

            <h2 class="text-subtitle-2 text--secondary">
              A citizen's initiative to revive the Indian economy post the covid
              pandemic 2020, by empowering artists, creator of crafts, and
              boutiques at the grassroot level, to showcase their creations on a
              platform crafted for them.
            </h2>
            <v-row no-gutters class="mt-4" justify="center">
              <v-btn shaped class="mr-2" color="primary" outlined
                ><v-icon left>mdi-shopping</v-icon>Shop</v-btn
              >
              <v-btn shaped color="secondary">Learn More</v-btn></v-row
            >
          </v-col>
          <v-col cols="12" lg="8">
            <!-- <TrendingProducts /> -->
          </v-col>
        </v-row></v-carousel-item
      >
      <v-carousel-item
        reverse-transition="fade-transition"
        transition="fade-transition"
      >
        <v-row class="fill-height" align="start" justify="center">
          <video autoplay muted loop class="landing-video" width="100%">
            <source src="stomp.mp4" type="video/mp4" />
          </video> </v-row
      ></v-carousel-item>
    </v-carousel>

    <v-row no-gutters justify="center" align="center" class="body-image-invert">
      <v-col class="text-center mt-4" lg="10">
        <h2 class="landing-title">Discover</h2>

        <Discover />
      </v-col>
    </v-row>
    <!-- <v-row no-gutters class="pa-10" justify="center">
      <v-col cols="12" lg="6" md="8" sm="12">
        <Reviews :reviews="reviews" />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
import Discover from '~/components/landing/Discover.vue'
import Logo from '~/components/Logo.vue'
import DropDown from '~/components/nav/DropDown'
import Reviews from '~/components/reviews/Reviews'

export default {
  components: {
    Logo,
    DropDown,
    Reviews,
  },
  data() {
    return {
      reviews: [
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/522/892/carousel/892_a46fd52bec84f777f49a959a9ab3fa8e.jpeg',
          rating: 5,
          title: 'April',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
          name: 'Philip',
        },
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/206/1177/carousel/1177_9c1b46bcad4da7d0a817e8dd82add5c5.jpeg',
          rating: 4,
          title: 'LA FEMME AU BALCON DE SAIGON - VIETNAM',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          name: 'Alexander',
        },
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/4195/12125/carousel/serie_12125_c8613d5bbe38ce2543afb96205ef1d6a.jpeg',
          rating: 5,
          title: 'Late Evening Light Through Trees',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          name: 'John',
        },
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/63/148/carousel/148_ca275018367f4dd7a63a72a43899fc67.jpeg',
          rating: 5,
          title: 'La libre envolée... (2015)',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          name: 'Cario',
        },
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/522/892/carousel/892_a46fd52bec84f777f49a959a9ab3fa8e.jpeg',
          rating: 5,
          title: 'April',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          name: 'Philip',
        },
        {
          img:
            'https://cdn.singulart.com/artworks/pictures/cropped/86/56/carousel/serie_56_e53f4d145a958ef8c8e2a348dfccd99b.jpeg',
          rating: 5,
          title: 'April',
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
          name: 'Philip',
        },
      ],
    }
  },
  //layout: 'landing-page',
}
</script>

<style scoped>
.landing-video {
  position: absolute;
  right: 0;
  left: 0;
}
.landing-video::after {
  content: '';
  z-index: 1;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: absolute;
}
</style>

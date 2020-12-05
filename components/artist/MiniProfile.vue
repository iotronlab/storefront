<template>
  <v-container fluid>
    <v-sheet color="transparent" max-width="300">
      <v-row no-gutters>
        <v-col cols="5">
          <nuxt-link :to="link">
            <v-avatar class="profile mx-2" color="grey" size="80">
              <v-img
                src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
              ></v-img> </v-avatar
          ></nuxt-link>
        </v-col>
        <v-col cols="7">
          <h5 class="text-body-1">{{ vendor.name }}</h5>
          <p class="overline">1k subscribers</p>
          <v-btn color="secondary" @click.prevent="">Follow</v-btn></v-col
        >
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {
    vendor: {
      required: true,
      type: Object,
    },
  },
  computed: {
    link() {
      return `/artists/${this.vendor.slug}`
    },
  },
}
</script>

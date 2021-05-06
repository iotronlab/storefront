<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col class="flex-grow-0 flex-shrink-1">
        <nuxt-link :to="link">
          <v-avatar class="profile mx-4" size="80">
            <v-img
              :src="
                vendor.avatarimg
                  ? vendor.avatarimg
                  : require('@/assets/img/artist-dp.png')
              "
              :lazy-src="require('@/assets/img/artist-dp.png')"
            ></v-img> </v-avatar
        ></nuxt-link>
      </v-col>
      <v-col class="flex-grow-1 flex-shrink-0">
        <h5 class="text-body-1">{{ vendor.display_name }}</h5>

        <p class="caption mb-0">{{ vendor.views }} views</p>

        <p class="caption">1k subscribers</p>
        <v-btn small class="ml-2" color="secondary" @click.prevent=""
          >Follow</v-btn
        ></v-col
      >
    </v-row>
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
      return `/artists/${this.vendor.url}`
    },
  },
}
</script>

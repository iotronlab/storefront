<template>
  <v-row v-if="!vendor">
    <v-col>
      <v-card class="mx-auto" shaped height="320">
        <v-skeleton-loader
          class="mx-auto"
          type="card"
          max-height="250"
        ></v-skeleton-loader>
      </v-card>
    </v-col>

  </v-row>
  <v-row v-else>
    <ProfileCard :vendor="vendor" />
  </v-row>
</template>

<script>
import ProfileCard from '@/components/artist/ProfileCard'

export default {
  components: {
    ProfileCard,
  },
  data() {
    return {
      vendor: null,
      params: null,
      app: null,
    }
  },
  async mounted(){
    let response = await this.app.$axios.$get(`/vendors/${this.params.slug}`)
    setTimeout(() => {
      this.vendor = response.data
    }, 500)
  },
  asyncData({ params, app }){
    return {
      params: params,
      app: app
    }
  }
}
</script>
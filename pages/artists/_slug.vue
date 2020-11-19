<template>
  <v-container>
    <v-row v-if="!vendor">
      <v-col>
        <v-card class="mx-auto" shaped>
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <ProfileCard :vendor="vendor" />
    </v-row>
  </v-container>
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
    }
  },
  async mounted() {
    let response = await this.$axios.$get(`/vendors/${this.$route.params.slug}`)
    setTimeout(() => {
      this.vendor = response.data
    }, 500)
  },
  // asyncData({ params, app }) {
  //   return {
  //     params: params,
  //     app: app,
  //   }
  // },
}
</script>
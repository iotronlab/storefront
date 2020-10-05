<template>
  <v-container fluid class="pa-0">
    <h2 class="landing-title mt-4" align="center">Artists</h2>
    <ProfileCard />
  </v-container>
</template>
<script>
import ProfileCard from '@/components/artist/ProfileCard'
export default {
  components: { ProfileCard },
}
</script>

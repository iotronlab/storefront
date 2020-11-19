<template>
  <v-container>
    <Verify :pageName="getName" />
  </v-container>
</template>

<script>
export default {
  computed: {
    getName() {
      let name = this.$route.name.split('-')
      return name[name.length - 1]
    },
  },
}
</script>

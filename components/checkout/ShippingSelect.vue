<template>
  <v-container fluid>
    <v-row no-gutters v-if="!address"
      ><h4 class="mx-auto text-caption">
        Kindly select an shipping address first.
      </h4></v-row
    >
    <v-row no-gutters v-else
      ><h4 class="mx-auto text-caption">
        Shipping options based on your location.
      </h4></v-row
    >
  </v-container>
</template>
<script>
export default {
  props: {
    address: {
      required: true,
      type: Object,
    },
  },
  watch: {
    address: {},
  },
  async fetch() {
    await this.$axios.$get()
  },
}
</script>

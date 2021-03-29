<template>
  <v-row no-gutters style="flex-wrap: nowrap">
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="3"
      class="flex-grow-0 flex-shrink-1"
    >
      <v-img max-height="200" contain :src="product.base_image" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
}
</script>


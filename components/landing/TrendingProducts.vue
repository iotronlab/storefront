<template>
  <v-container fluid>
    <v-row no-gutters v-if="$fetchState.pending">
      <PageLoader :message="'fetching trending products...'" />
    </v-row>

    <v-row no-gutters v-if="!$fetchState.pending">
      <h4 class="text-overline mx-auto">#Top10 Trending</h4>
      <v-slide-group v-model="model" center-active>
        <v-row no-gutters class="mx-4">
          <v-slide-item v-for="(product, n) in products" :key="n">
            <v-col class="mx-2"> <Product :product="product" /></v-col>
          </v-slide-item>
        </v-row>
      </v-slide-group> </v-row
  ></v-container>
</template>
<script>
export default {
  data: () => ({
    model: null,
    products: [],
  }),
  async fetch() {
    await this.$axios
      .$get('trending')
      .then((res) => {
        this.products = res.products
        this.categories = res.categories
        this.vendors = res.vendors
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

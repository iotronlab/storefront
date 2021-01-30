<template>
  <v-container fluid>
    <v-window v-model="window" show-arrows>
      <v-window-item>
        <v-row class="fill-height" align="center" justify="center">
          <h4 class="overline">Trending artworks</h4>
          <v-container fluid>
            <v-row no-gutters justify="center">
              <v-col
                v-for="product in products"
                :key="product.sku"
                class="d-flex child-flex ma-1"
                cols="12"
                md="6"
                lg="3"
                sm="6"
                xs="12"
              >
                <Product :product="product" /> </v-col></v-row
          ></v-container>
        </v-row>
      </v-window-item>
      <v-window-item>
        <v-row class="fill-height" align="center" justify="center">
          <h4 class="overline">Trending categories</h4>
          <v-container fluid class="pa-0">
            <v-row no-gutters justify="center">
              <v-col
                v-for="category in categories"
                :key="category.url"
                cols="12"
                md="6"
                lg="6"
                sm="6"
                xs="12"
              >
                <CategoryCard :category="category" /> </v-col></v-row
          ></v-container>
        </v-row>
      </v-window-item>
      <v-window-item>
        <v-row class="fill-height" align="center" justify="center">
          <h4 class="overline">Trending artists</h4>
          <v-container fluid class="pa-0">
            <v-row no-gutters justify="center">
              <v-col
                v-for="vendor in vendors"
                :key="vendor.url"
                cols="12"
                md="6"
                lg="6"
                sm="6"
                xs="12"
              >
                <MiniProfile :vendor="vendor" /> </v-col></v-row
          ></v-container>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      window: null,
      trending: {
        artists: 'art',
        products: 'product',
        categories: 'categories',
      },
      products: Array,
      categories: Array,
      vendors: Array,
    }
  },
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

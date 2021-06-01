<template>
  <v-container fluid>
    <v-row no-gutters v-if="$fetchState.pending">
      <PageLoader :message="'fetching trending products...'" />
    </v-row>

    <v-row no-gutters v-if="!$fetchState.pending">
      <h4 class="text-overline mx-auto">#Top10 Trending</h4>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <template v-slot:prev="{ on, attrs }">
          <v-btn color="success" v-bind="attrs" v-on="on">Previous slide</v-btn>
        </template>
        <template v-slot:next="{ on, attrs }">
          <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
        </template>
        <section v-if="columns">
          <v-carousel-item v-for="i in Math.ceil(10 / columns)" :key="i">
            <v-row class="fill-height" align="center" justify="center"
              ><v-col
                v-for="product in products.slice(i, columns + i)"
                :key="product.id"
                class="d-flex child-flex pa-1"
                cols="12"
                lg="3"
                md="6"
                sm="6"
                xs="12"
              >
                <Product :product="product" />
              </v-col>
            </v-row>
          </v-carousel-item>
        </section>
      </v-carousel> </v-row
  ></v-container>
</template>
<script>
export default {
  data: () => ({
    products: [],
  }),
  computed: {
    columns() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return 1
        case 'sm':
          return 2
        case 'md':
          return 2
        case 'lg':
          return 3
        case 'xl':
          return 3
      }
    },
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

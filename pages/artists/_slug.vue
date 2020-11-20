<template>
  <v-container v-if="!$fetchState.pending">
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
    <v-row>
      <h2>All art by {{ vendor.name }}</h2>
      <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
        <v-carousel-item v-for="(n, i) in Math.ceil(total / columns)" :key="n">
          <v-row no-gutters class="fill-height" align="center" justify="center">
            <v-col
              v-for="product in products.slice(i, columns + i)"
              :key="product.id"
              class="d-flex child-flex"
              cols="12"
              md="6"
              lg="3"
              sm="6"
              xs="12"
            >
              <Product :product="product" />
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
    <v-row v-if="vendor.reviews">
      <Reviews :reviews="vendor.reviews" />
    </v-row>
  </v-container>
</template>

<script>
import ProfileCard from '@/components/artist/ProfileCard'
import Product from '@/components/products/Product'
import Reviews from '@/components/reviews/Reviews'

export default {
  components: {
    ProfileCard,
    Product,
    Reviews,
  },
  data() {
    return {
      vendor: null,
      total: null,
      products: null,
    }
  },
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
          return 4
        case 'xl':
          return 4
      }
    },
  },
  async fetch() {
    let response = await this.$axios.$get(`/vendors/${this.$route.params.slug}`)
    this.vendor = response.data
    this.products = this.vendor.products
    this.total = this.products.length
  },
  // asyncData({ params, app }) {
  //   return {
  //     params: params,
  //     app: app,
  //   }
  // },
}
</script>
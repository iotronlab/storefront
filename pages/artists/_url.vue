<template>
  <v-container fluid class="pa-0" v-if="!$fetchState.pending">
    <v-row no-gutters v-if="!vendor">
      <v-col>
        <v-card class="mx-auto" shaped>
          <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters v-else>
      <v-container fluid class="pa-0">
        <v-img
          :aspect-ratio="$vuetify.breakpoint.mdAndUp ? 16 / 2 : 16 / 9"
          :src="
            vendor.coverimg
              ? vendor.coverimg
              : require('@/assets/img/default-cover.png')
          "
          :lazy-src="require('@/assets/img/default-cover.png')"
        />

        <v-row no-gutters>
          <v-col class="mt-n10" cols="12" lg="3">
            <v-row no-gutters>
              <v-col class="flex-grow-0 flex-shrink-1"
                ><v-card
                  :img="
                    vendor.avatarimg
                      ? vendor.avatarimg
                      : require('@/assets/img/default-profile.png')
                  "
                  width="150"
                  height="150"
                  color="accent"
                  class="ml-lg-12 ml-4"
                ></v-card></v-col
              ><v-col class="flex-grow-1 flex-shrink-0">
                <v-btn small class="ml-2" color="secondary" @click.prevent=""
                  >Follow</v-btn
                >
                <v-container fluid>
                  <h5 class="overline">{{ vendor.display_name }}</h5>
                  <h4 class="overline">{{ vendor.views }} views</h4>

                  <h4 class="overline">{{ vendor.views }} subs</h4>
                </v-container></v-col
              ></v-row
            ></v-col
          ><v-col cols="12" lg="9">
            <v-container fluid>
              <h5 class="caption">
                About the Artist -
                {{
                  vendor.bio
                    ? vendor.bio
                    : 'This artist has not updated bio yet.'
                }}
              </h5>
            </v-container>
          </v-col>
        </v-row>
        <!-- <MiniProfile :vendor="vendor" /> --></v-container
      >
    </v-row>
    <v-container fluid>
      <v-row no-gutters>
        <h2 class="text-h6 text--primary">All art by {{ vendor.name }}</h2>
        <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
          <v-carousel-item
            v-for="(n, i) in Math.ceil(total / columns)"
            :key="n"
          >
            <v-row
              no-gutters
              class="fill-height"
              align="center"
              justify="center"
            >
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
        </v-carousel> </v-row
    ></v-container>
    <v-row no-gutters v-if="vendor.reviews">
      <Reviews :reviews="vendor.reviews" />
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/products/Product'
import Reviews from '@/components/reviews/Reviews'

export default {
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
    let response = await this.$axios.$get(`/vendors/${this.$route.params.url}`)
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

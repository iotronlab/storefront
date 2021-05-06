<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending" class="text-center">
      <PageLoader :message="'fetching artist portfolio...'" />
      <v-container>
        <v-card class="mx-auto" shaped>
          <v-skeleton-loader
            class="mx-auto"
            type="card"
          ></v-skeleton-loader> </v-card
      ></v-container>
    </section>
    <section v-if="$fetchState.error">
      There was some error fetching artist portfolio. Kindly contact support.
    </section>
    <section v-if="!$fetchState.pending">
      <v-container fluid class="pa-0">
        <v-img
          :aspect-ratio="$vuetify.breakpoint.smAndUp ? 16 / 2.5 : 16 / 9"
          :src="
            vendor.coverimg
              ? vendor.coverimg
              : require('@/assets/img/default-cover.png')
          "
          :lazy-src="require('@/assets/img/default-cover.png')"
        />

        <v-row no-gutters>
          <v-col cols="12" lg="4" md="4">
            <v-container fluid class="d-flex justify-center">
              <v-avatar size="200" class="mt-n16">
                <v-img
                  :src="
                    vendor.avatarimg
                      ? vendor.avatarimg
                      : require('@/assets/img/default-profile.png')
                  "
                ></v-img
              ></v-avatar>
            </v-container>

            <!-- <v-row no-gutters>
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
                    <h5 class="subtitle-1">{{ vendor.display_name }}</h5>
                    <h4 class="subtitle-2">{{ vendor.views }} views</h4>

                    <h4 class="subtitle-2">{{ vendor.views }} subs</h4>
                  </v-container></v-col
                ></v-row
              > -->
          </v-col>
          <v-col cols="12" lg="4" md="4" order-md="first">
            <v-container fluid class="text-center text-lg-right">
              <h1 class="title">
                <!-- {{ vendor.display_name }} -->

                Artify Creator
              </h1>
              <h4 class="caption mb-2">
                {{ vendor.views }}10K subs | 10K views
              </h4>
              <v-row
                no-gutters
                align="center"
                justify="center"
                justify-lg="end"
                class="mb-4"
              >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    class="ml-2"
                    color="primary"
                    @click.prevent=""
                    :outlined="hover ? false : true"
                  >
                    <v-icon left>mdi-bell-plus-outline</v-icon> Subscribe</v-btn
                  ></v-hover
                >
              </v-row>

              <v-row
                no-gutters
                align="center"
                justify="center"
                justify-lg="end"
              >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn></v-hover
                >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>mdi-whatsapp</v-icon>
                  </v-btn></v-hover
                >
                <v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn> </v-hover
                ><v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="mx-1"
                  >
                    <v-icon>mdi-pinterest</v-icon>
                  </v-btn> </v-hover
                ><v-hover v-slot="{ hover }">
                  <v-btn
                    fab
                    dark
                    small
                    color="primary"
                    :outlined="hover ? false : true"
                    class="ml-1"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </v-hover>
              </v-row>
            </v-container>
          </v-col>

          <v-col cols="12" lg="4" md="4">
            <v-container fluid class="px-3">
              <h5 class="caption text--secondary">About the Artist</h5>
              <h4 class="caption">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                quo dolores, earum maiores dolorem quod velit voluptas accusamus
                nostrum minus quaerat dolor totam illum voluptate itaque
                laboriosam distinctio! Asperiores, hic?
                {{
                  vendor.bio
                    ? vendor.bio
                    : 'This artist has not updated bio yet.'
                }}
              </h4>
            </v-container>
          </v-col>
        </v-row>
        <!-- <MiniProfile :vendor="vendor" /> --></v-container
      >

      <v-container fluid>
        <v-col cols="12" lg="10" class="mx-auto">
          <v-row no-gutters>
            <h2 class="text-overline text--primary text-center">
              All artworks by {{ vendor.display_name }}
            </h2>
            <v-spacer />
            <v-btn-toggle v-model="toggle_one" shaped mandatory borderless>
              <v-btn>
                <v-icon left class="ml-2">mdi-view-grid-outline</v-icon>most
                viewed</v-btn
              >
              <v-btn>
                <v-icon left class="ml-2">mdi-format-align-left</v-icon
                >latest</v-btn
              >
            </v-btn-toggle></v-row
          ></v-col
        >

        <!-- <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
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
        </v-carousel>
         -->
        <v-row no-gutters class="fill-height" align="center" justify="center">
          <v-col
            v-for="product in products"
            :key="product.id"
            cols="12"
            md="4"
            lg="2"
            sm="6"
            xs="12"
          >
            <Product :product="product" />
          </v-col>
        </v-row>
      </v-container>
      <!-- <v-row no-gutters v-if="vendor.reviews">
        <Reviews :reviews="vendor.reviews" />
      </v-row> -->
    </section>
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
      fab: false,
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
    await this.$axios
      .$get(`/vendors/${this.$route.params.url}`)
      .then((response) => {
        this.vendor = response.vendor
        this.products = response.data
      })
      .catch((err) => {})

    // this.total = this.products.length
  },
  // asyncData({ params, app }) {
  //   return {
  //     params: params,
  //     app: app,
  //   }
  // },
}
</script>

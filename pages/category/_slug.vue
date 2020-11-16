<template>
  <v-container fluid class="pa-0">
    <v-img height="200px" :src="require('@/assets/img/dress.jpg')"></v-img>
    <v-divider class="my-2" />
    <v-row no-gutters justify="center">
      <v-col cols="12" md="3" lg="3">
        <span class="title">{{ slug }}</span>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, cum
          iusto. A temporibus quas at eius vero iusto incidunt eos dolorum
          minima illo ea quis veniam, repellendus deleniti culpa sunt.
        </p>
        <h1 class="overline">Sub categories</h1>
        <div v-if="category">
          <v-expansion-panels
            popout
            class="mt-4"
            style="border-radius: 0 20px 0 20px"
          >
            <v-expansion-panel
              v-for="subcategory in category.children"
              :key="subcategory.id"
            >
              <v-expansion-panel-header class="primary--text">{{
                subcategory.name
              }}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list dense rounded class="mt-n4 px-0 py-0">
                  <v-list-item
                    v-for="subchildren in subcategory.children"
                    :key="subchildren.id"
                    :to="{
                      name: 'category-slug',
                      params: { slug: subcategory.slug },
                    }"
                    class="accent--text body-2 mt-n2 py-0"
                    >{{ subchildren.name }}</v-list-item
                  >
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div>
          <h2 class="title mt-2">Featured Artists</h2>
        </div>
      </v-col>

      <v-col cols="12" md="8" lg="8">
        <v-row no-gutters align="center" justify="center">
          <h3 class="text-h4 mx-auto mb-2">#top5 featured</h3>

          <v-btn outlined small>see all results</v-btn></v-row
        >
        <v-row no-gutters>
          <v-carousel cycle hide-delimiters show-arrows-on-hover height="100%">
            <v-carousel-item>
              <v-row
                no-gutters
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-col
                  v-for="product in products"
                  :key="product.id"
                  class="d-flex child-flex"
                  cols="12"
                  md="6"
                  lg="3"
                  sm="6"
                >
                  <Product :product="product" />
                </v-col>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Product from '@/components/products/Product'

export default {
  async asyncData({ params, app, store }) {
    let response = await app.$axios.$get(`/products?category=${params.slug}`)

    console.log(params.slug)

    // this.title = params.slug
    return {
      products: response.data,
      slug: params.slug,
    }
  },
  data() {
    return {
      cardTitle: 'Casual Wear',
      desp: '70% - 80%',
      products: [],
      slides: 3,
    }
  },
  components: {
    Product,
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
    category() {
      return this.categories.find((el) => el.slug === this.slug)
    },
  },
}
</script>

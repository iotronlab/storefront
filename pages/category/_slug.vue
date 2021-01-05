<template>
  <v-container fluid class="pa-0" v-if="!$fetchState.pending">
    <v-img
      :src="require('@/assets/img/dress.jpg')"
      max-height="200"
      dark
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      class="pa-4 align-end"
    >
      <h3 class="text-h6" style="text-shadow: 2px 2px purple">
        {{ category.name }}
      </h3>
    </v-img>
    <v-divider class="my-2" />
    <v-row no-gutters justify="center">
      <v-col cols="12" md="3" lg="3" class="px-4">
        <p class="text--secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, cum
          iusto. A temporibus quas at eius vero iusto incidunt eos dolorum
          minima illo ea quis veniam, repellendus deleniti culpa sunt.
        </p>
        <h4 class="overline" v-if="category.children">Sub categories</h4>

        <div v-if="category.children" class="mb-2">
          <v-expansion-panels
            popout
            class="mt-4"
            style="border-radius: 0 20px 0 20px"
          >
            <v-expansion-panel
              v-for="subcategory in category.children"
              :key="subcategory.id"
              :readonly="subcategory.children == null"
            >
              <v-expansion-panel-header
                class="primary--text"
                :hide-actions="subcategory.children == null"
              >
                <h5>
                  <nuxt-link
                    class="text-decoration-none text-subtitle-2"
                    :to="{
                      name: 'category-slug',
                      params: { slug: subcategory.slug },
                    }"
                    >{{ subcategory.name }}</nuxt-link
                  >
                </h5></v-expansion-panel-header
              >
              <v-expansion-panel-content>
                <v-list dense rounded class="mt-n4 px-0 py-0">
                  <v-list-item
                    v-for="subchildren in subcategory.children"
                    :key="subchildren.id"
                    :to="{
                      name: 'category-slug',
                      params: { slug: subchildren.slug },
                    }"
                    class="accent--text text-body-2 mt-n2 py-0"
                    >{{ subchildren.name }}</v-list-item
                  >
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>

      <v-col cols="12" md="8" lg="8">
        <v-row no-gutters align="center" justify="space-between" class="px-4">
          <h3 class="text-h6 my-2 landing-title secondary--text text-uppercase">
            #featured
          </h3>

          <v-btn
            outlined
            small
            rounded
            :to="{
              name: 'products',
              query: { category: category.slug },
            }"
            >see all results</v-btn
          ></v-row
        >
        <v-row no-gutters>
          <!-- <v-carousel-item
              v-for="(n, i) in Math.ceil(totalProducts / columns)"
              :key="n"
            > -->
          <v-col
            cols="12"
            class="fill-height"
            v-for="(products, artists) in productData"
            :key="artists"
            ><v-row no-gutters>
              <MiniProfile :vendor="products[0].vendor"
            /></v-row>
            <v-divider />
            <!-- v-for="product in products.slice(i, columns + i)" -->
            <v-row no-gutters>
              <v-col
                v-for="product in products"
                :key="product.sku"
                class="d-flex child-flex"
                cols="12"
                md="6"
                lg="3"
                sm="6"
                xs="12"
              >
                <Product :product="product" /> </v-col
            ></v-row>
          </v-col>
        </v-row>
        <v-divider dark class="py-5"></v-divider>

        <v-row no-gutters>
          <!-- <v-carousel-item
              v-for="(n, i) in Math.ceil(totalVendors / columns)"
              :key="n"
            > -->
          <v-row no-gutters class="fill-height" align="center" justify="center">
            <!-- v-for="vendor in vendors.slice(i, columns + i)" -->
            <!-- <v-col
              v-for="vendor in vendors"
              :key="vendor.id"
              class="d-flex child-flex"
              cols="12"
              md="6"
              lg="3"
              sm="6"
              xs="12"
            >

            </v-col> -->
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch() {
    await this.$axios
      .$get(`/categories/${this.$route.params.slug}`)
      .then((res) => {
        console.log(res)
        this.category = res.data
        this.productData = this.category.products
        // this.totalProducts = this.products.length
        // this.vendors = res.data.artists
        // this.totalVendors = this.vendors.length
      })
      .catch((err) => {
        console.log(err)
      })

    this.slug = this.$route.params.slug
  },
  data() {
    return {
      cardTitle: 'Casual Wear',
      desp: '70% - 80%',
      productData: {},
      category: {},
      totalProducts: null,
      slug: null,
      totalVendors: null,
      vendors: null,
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
}
</script>

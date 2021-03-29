<template>
  <v-container fluid class="pa-0" v-if="!$fetchState.pending">
    <!-- <v-img
      :src="
        category.image_path
          ? category.image_path
          : require('@/assets/img/default-cover.png')
      "
      max-height="200"
      dark
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      class="pa-4 align-end"
    >
      <h3 class="text-h6" style="text-shadow: 2px 2px purple">
        {{ category.name }}
      </h3>
    </v-img>
    <v-divider class="my-2" /> -->
    <v-container>
      <CategoryCard :category="category" />
      <SubCategoryList :category="category" />
    </v-container>
    <v-row no-gutters justify="center">
      <!-- <v-col cols="12" md="3" lg="3" class="px-4">
        <h4 class="overline" v-if="category.children.length > 0">
          Sub categories
        </h4>

        <div v-if="category.children" class="mb-2">
          <v-expansion-panels
            popout
            class="mt-4"
            style="border-radius: 0 20px 0 20px"
          >
            <v-expansion-panel
              v-for="subcategory in category.children"
              :key="subcategory.id"
              :readonly="subcategory.children.length == 0"
            >
              <v-expansion-panel-header
                class="primary--text"
                :hide-actions="subcategory.children.length == 0"
              >
                <h5>
                  <nuxt-link
                    class="text-decoration-none text-subtitle-2"
                    :to="{
                      name: 'category-url',
                      params: { url: subcategory.url },
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
                      name: 'category-url',
                      params: { url: subchildren.url },
                    }"
                    class="accent--text text-body-2 mt-n2 py-0"
                    >{{ subchildren.name }}</v-list-item
                  >
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col> -->

      <v-col cols="12" md="12" lg="10">
        <!-- <v-row no-gutters align="center" justify="space-between" class="px-4">
          <h3 class="text-h6 my-2 landing-title secondary--text text-uppercase">
            #featured
          </h3>

          <v-btn
            outlined
            small
            rounded
            :to="{
              name: 'products',
              query: { category: category.url },
            }"
            >see all results</v-btn
          ></v-row
        > -->

        <v-divider />
        <h5 v-if="productData.length < 1" class="caption text-center ma-4">
          There are no products in this category.
        </h5>
        <section v-else>
          <h5 class="caption text-center my-2">
            showing ({{ pageData.from }} - {{ pageData.to }}) of
            {{ pageData.total }} result<span v-if="pageData.total > 1">s</span>
          </h5>
          <v-container
            fluid
            v-for="(products, artists) in productData"
            :key="artists.url"
          >
            <!-- <v-carousel-item
              v-for="(n, i) in Math.ceil(totalProducts / columns)"
              :key="n"
            > -->

            <!-- v-for="product in products.slice(i, columns + i)" -->

            <v-row no-gutters style="flex-wrap: wrap">
              <v-col cols="12" lg="3">
                <MiniProfile :vendor="products[0].vendor"
              /></v-col>
              <v-col
                v-for="(product, n) in products"
                :key="n"
                cols="12"
                md="6"
                lg="3"
                sm="6"
                xs="12"
                class="pa-1 flex-grow-0 flex-shrink-1"
              >
                <Product :product="product" />
              </v-col>
            </v-row>
            <v-divider class="mt-2" />
            <!-- <ProductList :products="products" /> -->

            <!-- <v-row no-gutters style="flex-wrap: nowrap">
            <v-col cols="2" class="flex-grow-0 flex-shrink-0">
              <v-card class="pa-2" outlined tile> I'm 2 column wide </v-card>
            </v-col>
            <v-col
              cols="1"
              style="min-width: 100px; max-width: 100%"
              class="flex-grow-1 flex-shrink-0"
            >
              <v-card class="pa-2" outlined tile>
                I'm 1 column wide and I grow to take all the space
              </v-card>
            </v-col>
            <v-col
              cols="5"
              style="min-width: 100px"
              class="flex-grow-0 flex-shrink-1"
            >
              <v-card class="pa-2" outlined tile>
                I'm 5 column wide and I shrink if there's not enough space
              </v-card>
            </v-col>
          </v-row> -->
          </v-container>
          <v-row no-gutters align="center" justify="center">
            <v-pagination
              :value="pageData.current_page"
              :length="pageData.last_page"
              @input="fetchPage"
              circle
              class="mb-4"
            />
          </v-row>
        </section>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  async fetch() {
    await this.$axios
      .$get(`/categories/${this.$route.params.url}`, {
        params: { page: this.pageData.current_page },
      })
      .then((res) => {
        console.log(res)
        this.category = res.category
        this.productData = res.data
        this.pageData = res.meta
        // this.vendors = res.data.artists
        // this.totalVendors = this.vendors.length
      })
      .catch((err) => {
        console.log(err)
      })

    ///this.url = this.$route.params.url
  },
  data() {
    return {
      productData: {},
      category: {},
      pageData: { current_page: 1 },
      selectedPage: null,
    }
  },
  // watch: {
  //   pageData(val) {
  //     console.log(val)
  //   },
  // },
  methods: {
    fetchPage(data) {
      if (data != this.pageData.current_page) {
        this.pageData.current_page = data
        this.$fetch()
      }
    },
  },
  computed: {
    // columns() {
    //   switch (this.$vuetify.breakpoint.name) {
    //     case 'xs':
    //       return 1
    //     case 'sm':
    //       return 2
    //     case 'md':
    //       return 2
    //     case 'lg':
    //       return 4
    //     case 'xl':
    //       return 4
    //   }
    // },
  },
}
</script>

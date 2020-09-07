<template>
  <v-container>
    <!-- toolbar -->

    <v-row no-gutters>
      <v-col>
        <span class="title">{{ $route.params.slug }}</span>
        <span>
          - {{products.length}} item
          <span class="ml-n1" v-if="products.length>1">s</span>
        </span>
      </v-col>

      <div class="flex-grow-1"></div>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-col>
          <div class="flex-grow-1"></div>

          <!-- sort by -->
          <v-select
            v-model="sortBy"
            text
            prefix="Sort by:"
            outlined
            dense
            hide-details
            :items="keys"
          ></v-select>
        </v-col>
      </template>
    </v-row>

    <v-row class="mt-n1">
      <!-- filters -->
      <v-col md="3" lg="3" class="hidden-sm-and-down">
        <v-card class="fill-height" shaped>
          <v-list flat>
            <v-subheader>Filters</v-subheader>
            <v-list-item-group v-model="item" color="primary">
              <v-list-item v-for="(filter, i) in filters" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="filter.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>

      <!-- products -->
      <v-col cols="12" md="9" lg="9">
        <v-data-iterator
          :items="products"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:default="props">
            <v-row>
              <!-- product -->
              <v-col
                v-for="product in products"
                :key="product.slug"
                cols="6"
                sm="6"
                md="3"
                lg="3"
                class="px-1 py-1"
              >
                <Product :product="product" />
              </v-col>
            </v-row>
          </template>

          <!-- footer of table -->
          <template v-slot:footer>
            <v-row class="mt-2 mx-2" align="center" justify="center">
              <span class="mr-4 grey--text" align="left">Page {{ page }} of {{ numberOfPages }}</span>
              <v-btn fab small dark color="blue darken-3" class="mr-1" @click="formerPage">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab small dark color="blue darken-3" class="ml-1" @click="nextPage">
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
    <v-app-bar bottom fixed app class="hidden-md-and-up">
      <v-container class="px-0 py-0">
        <v-row no-gutters>
          <v-col>
            <v-menu class="text-center">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" class="mr-1" v-on="on" block>Filter</v-btn>
              </template>

              <v-list>
                <v-list-item v-for="(item, index) in filters" :key="index">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <v-col>
            <v-select
              v-model="sortBy"
              class="ml-1"
              dense
              placeholder="Sort by"
              hide-details
              :items="keys"
              outlined
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-container>
</template>




<script>
import Product from '@/components/products/Product'

export default {
  data() {
    return {
      category: this.$route.params.category, // doesn't work, check this
      products: [],
      title: '',
      itemsPerPageArray: [3, 6, 9, 12, 15, 18],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 9,
      sortBy: 'name',
      filters: [
        { title: 'Category' },
        { title: 'Price' },
        { title: 'Colors' },
        { title: 'Material' },
      ],
      keys: ['price', 'title'],
      items: [],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
  },
  components: {
    Product,
  },

  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`/products?category=${params.slug}`)
    // this.title = params.slug
    console.log(params.slug)
    return {
      products: response.data,
    }
  },
}
</script>

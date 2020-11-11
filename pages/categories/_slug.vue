<template>
  <v-container fluid>
    <v-navigation-drawer absolute right :value="NavState">
      <FilterProducts :products="products" :min="min" :max="max" />
    </v-navigation-drawer>
    <v-row>
      <v-col cols="2" class="hidden-md-and-down">
        <span class="title">{{ params.slug }}</span>
        <span>
          - {{ items.length }} item
          <span class="ml-n1" v-if="items.length > 1">s</span>
        </span>
        <FilterProducts :products="products" :min="min" :max="max" /></v-col
      ><v-col cols="10">
        <v-row v-if="items.length == 0">
          <v-col
            v-for="n in item_count"
            :key="n"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="mx-auto" shaped height="320">
              <v-skeleton-loader
                class="mx-auto"
                type="card"
                max-height="250"
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>
        <v-data-iterator
          v-else
          :items="items"
          :items-per-page.sync="itemsPerPage"
          :page="page"
          :search="search"
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          hide-default-footer
        >
          <template v-slot:header>
            <v-toolbar dark color="blue darken-3" class="mb-1">
              <!-- <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field> -->
              <v-select
                v-model="sortBy"
                flat
                solo-inverted
                hide-details
                :items="keys"
                label="Sort by"
              ></v-select>
              <v-spacer></v-spacer>
              <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn-toggle v-model="sortDesc" mandatory>
                  <v-btn large depressed color="blue" :value="false">
                    <v-icon>mdi-arrow-up</v-icon>
                  </v-btn>
                  <v-btn large depressed color="blue" :value="true">
                    <v-icon>mdi-arrow-down</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:default="props">
            <v-virtual-scroller height="100" item-height="500">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <Product :product="item" />
                </v-col>
              </v-row>
            </v-virtual-scroller>
          </template> </v-data-iterator></v-col
    ></v-row>

    <v-app-bar bottom fixed app class="hidden-md-and-up">
      <v-container class="px-0 py-0">
        <v-row no-gutters>
          <v-col><v-btn @click="ChangeState">Filter</v-btn> </v-col>
          <v-col>
            <v-select
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
import FilterProducts from '@/components/filter/FilterProducts'

export default {
  components: {
    Product,
    FilterProducts,
  },
  data() {
    console.log('loading data')
    return {
      state: null,
      params: {},
      app: {},
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'name',
      keys: ['name', 'slug', 'price'],
      items: [],
      item_count: 4,
      products: null,
      min: Infinity,
      max: -1 * Infinity,
      checkbox: {},
      NavState: false,
    }
  },
  methods: {
    ChangeState() {
      this.NavState = this.NavState ? false : true
      return this.NavState
    },
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`)
    },
  },
  async mounted() {
    console.log('Mounting data')
    let response = await this.app.$axios.$get(
      `/products?category=${this.params.slug}`
    )
    console.log(response)
    this.item_count = response.data.length
    setTimeout(() => {
      this.items = response.data
    }, 500)
  },
  asyncData({ params, app }) {
    console.log('async func runing')
    let min = Infinity
    let max = -Infinity
    let products = []
    for (let i = 0; i < 10; i++) {
      let obj = {}
      obj.category = `Category ${i}`
      obj.product = `Product ${i}`
      obj.price = Math.random() * 100
      // obj.key = i
      min = Math.min(min, obj.price)
      max = Math.max(max, obj.price)
      products.push(obj)
    }
    return {
      params: params,
      app: app,
      min: min,
      max: max,
      products: products,
    }
  },
}
</script>

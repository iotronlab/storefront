<template>
  <v-container fluid class="overflow-hidden pa-0" style="position: relative">
    <v-container v-if="$fetchState.pending">
      <v-row no-gutters>
        <v-col v-for="n in item_count" :key="n" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader
            class="pa-2"
            type="card"
          ></v-skeleton-loader> </v-col
      ></v-row>
    </v-container>
    <v-container v-if="$fetchState.error"
      >There was an error fetching data. Go
      <nuxt-link to="/">Home</nuxt-link></v-container
    >
    <section v-if="!$fetchState.pending">
      <v-row no-gutters align="center" justify="center">
        <v-col cols="4">
          showing ({{ pageData.from }} - {{ pageData.to }}) of
          {{ pageData.total }} result<span v-if="pageData.total > 1"
            >s</span
          ></v-col
        >
        <v-col cols="6">
          <!--  filters  -->
          <v-app-bar
            flat
            :fixed="$vuetify.breakpoint.mdAndDown"
            :bottom="$vuetify.breakpoint.mdAndDown"
          >
            <v-row no-gutters>
              <v-col cols="5">
                <v-btn
                  color="secondary"
                  dark
                  block
                  @click.stop="showFilter = !showFilter"
                >
                  Filters
                </v-btn>
              </v-col>
              <v-col cols="7">
                <v-select
                  class="ml-1"
                  dense
                  placeholder="Sort by"
                  hide-details
                  outlined
                ></v-select>
              </v-col>
            </v-row> </v-app-bar
        ></v-col>
      </v-row>
      <v-row no-gutters justify="center">
        <v-col cols="12" lg="10">
          <template>
            <div>
              <v-container fluid>
                <v-row no-gutters>
                  <!-- {{ 'page: ' + page + 'total pages: ' + pages }} -->

                  <v-col
                    v-for="item in products"
                    :key="item.name"
                    cols="12"
                    sm="6"
                    md="4"
                    lg="3"
                  >
                    <Product :product="item" />
                  </v-col>
                </v-row>
                <v-pagination
                  v-model="pageData.current_page"
                  class="my-4"
                  :length="pageData.last_page"
                  circle
                  :value="page"
                  @next="updateQuery()"
                  @previous="updateQuery()"
                  @input="updateQuery()"
                ></v-pagination>
              </v-container>
            </div>
          </template> </v-col
      ></v-row>
      <!-- Right filter nav -->
      <v-navigation-drawer temporary absolute right v-model="showFilter">
        <v-col>
          <p>0 filters selected</p>
          <v-row no-gutters
            ><v-btn>Apply</v-btn><v-btn>Reset</v-btn></v-row
          ></v-col
        >
        <FilterProducts
          :categories="categories"
          :maxPrice="maxPrice"
          :filterOptions="filterOptions"
          @input="filter_products"
        />
        <!-- {{ 'filtered below' }}
      {{ filtered }} -->
      </v-navigation-drawer>
    </section>
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'

export default {
  // watchQuery: ['page'],

  data() {
    return {
      categories: [],
      pageData: null,
      products: [],
      item_count: 4,

      maxPrice: 2000,
      priceRange: [0, 100],
      currentPage: 1,
      totalPages: Number,
      checkbox: {},

      filterOptions: [],
      filter_options: null,

      // next: null,
      // scrolling: false,
      page: null,
      showFilter: true,
    }
  },
  methods: {
    ChangeState() {
      this.NavState = this.NavState ? false : true
      return this.NavState
    },
    async updateQuery() {
      console.log('in Update Query')
      console.log(this.$route)
      this.$router.push({ query: { page: this.page } })
      this.$route.query.page = this.page
      console.log(this.$route.query)
    },

    filter_products(filtered) {
      this.filtered = filtered
      let query = ''
      if (filtered.length != 0) {
        for (let i = 0; i < filtered.length; i++) {
          query = query + filtered[i] + ','
        }
        query = query.slice(0, query.length - 1)
      }
      this.$router.push({ path: this.$route.path, query: { category: query } })
    },
    // async intersected() {
    //   if (!this.next) return
    //   // console.log(`next: ${this.next}`)
    //   const res = await fetch(this.next)
    //   this.page++
    //   const response = await res.json()
    //   const items = response.data
    //   this.next = response.links.next
    //   // console.log(`old: ${this.items.length} new`)
    //   // console.log(items)
    //   console.log(items.length)
    //   this.item_count = items.length
    //   this.scrolling = true
    //   setTimeout(() => {
    //     this.scrolling = false
    //     this.items = [...this.items, ...items]
    //   }, 2000)
    //   this.$router.push({ path: this.$route.path, query: { page: this.page } })
    //   // this.$route.query.page = String(this.page)
    //   console.log('route below')
    //   console.log(this.$route)
    //   // this.items = [...this.items, ...items]
    //   console.log(`total: ${this.items.length}`)
    // },
  },
  computed: {
    // ...mapGetters({
    //   categories: 'categories',
    // }),
  },
  watch: {
    // '$route.query': '$fetch',
  },
  mounted() {
    // if (this.$route.query.page === undefined) {
    //   this.$route.query.page = 1
    // }
  },
  async fetch() {
    console.log(this.$route)
    let key = Object.keys(this.$route.query)[0]
    let value = Object.values(this.$route.query)[0]
    console.log(key + ' ' + value)
    await this.$axios
      .$get(`/products?` + key + '=' + value)
      .then((response) => {
        console.log(response)
        this.categories = response.category_children
        this.pageData = response.meta
        this.maxPrice = Math.ceil(response.max_price / 100)
        this.filterOptions = response.filterable_attributes
        this.item_count = response.data.length

        setTimeout(() => {
          this.products = response.data
        }, 500)
      })
  },
}
</script>

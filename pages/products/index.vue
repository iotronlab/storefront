<template>
  <v-container fluid>
    <!-- Right filter nav -->
    <v-navigation-drawer absolute right :value="NavState">
      <FilterProducts
        :options="categories"
        :min="min"
        :max="max"
        @input="filter_products"
      />
      <!-- {{ 'filtered below' }}
      {{ filtered }} -->
    </v-navigation-drawer>
    <!-- Left filter nav -->
    <v-row no-gutters>
      <v-col cols="2" class="hidden-md-and-down">
        <!-- <span class="title">{{ params.slug }}</span>
        <span>
          - {{ items.length }} item
          <span class="ml-n1" v-if="items.length > 1">s</span>
        </span> -->
        <FilterProducts
          :options="categories"
          :min="min"
          :max="max"
          @input="filter_products"
        />
        <!-- {{ 'filtered below' }}
        {{ filtered }} -->
      </v-col>
      <v-col cols="10">
        <!-- <v-data-iterator
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
              <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            label="Search"
          ></v-text-field>
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
          </template> -->
        <template>
          <div>
            <v-container class="max-width" fluid>
              <v-row no-gutters>
                <!-- {{ 'page: ' + page + 'total pages: ' + pages }} -->

                <v-col
                  v-for="n in item_count"
                  :key="n"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <div v-if="items.length == 0">
                    <v-card
                      class="mx-auto px-3 py-2 my-2"
                      rounded
                      height="350"
                      width="300"
                      max-width="250"
                    >
                      <v-skeleton-loader
                        width="240"
                        max-width="300"
                        class="pr-2"
                        type="card"
                        height="350"
                      ></v-skeleton-loader>
                    </v-card>
                  </div>
                </v-col>
                <v-col
                  v-for="item in items"
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
                v-model="page"
                class="my-4"
                :length="pages"
                circle
                :value="page"
                @next="updateQuery()"
                @previous="updateQuery()"
                @input="updateQuery()"
              ></v-pagination>
            </v-container>
          </div>
        </template>
        <!-- <template>
          <v-virtual-scroller height="100" item-height="500">
            <v-row>
              <v-col
                v-for="item in items"
                :key="item.name"
                cols="12"
                sm="6"
                md="4"
                lg="3"
              >
                <Product :product="item" />
              </v-col>
              <v-col
                v-for="n in item_count"
                v-if="items.length == 0 || scrolling"
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
              <Observer @intersect="intersected" />
            </v-row>
          </v-virtual-scroller>
        </template> -->
        <!-- </v-data-iterator> -->
      </v-col></v-row
    >

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
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Product from '@/components/products/Product'
import FilterProducts from '@/components/filter/FilterProducts'
// import Observer from '~/components/Observe/Observe'

export default {
  // watchQuery: ['page'],
  components: {
    Product,
    FilterProducts,
    // Observer,
  },
  data() {
    return {
      state: null,
      params: {},
      app: {},
      // itemsPerPageArray: [4, 8, 12],
      // search: '',
      // filter: {},
      // sortDesc: false,
      // page: 1,
      // itemsPerPage: 10,
      // sortBy: 'name',
      // keys: ['name', 'slug', 'price'],
      items: [],
      item_count: 4,
      min: Infinity,
      max: -1 * Infinity,
      checkbox: {},
      NavState: false,
      filtered: [],
      filter_options: null,
      page: 1,
      // next: null,
      // scrolling: false,
      pages: null,
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
    ...mapGetters({
      categories: 'categories',
    }),
  },
  watch: {
    '$route.query': '$fetch',
  },
  mounted() {
    if (this.$route.query.page === undefined) {
      this.$route.query.page = 1
    }
  },
  async fetch() {
    let response = null
    console.log('in fetch and route: ')
    console.log(this.$route)
    let key = Object.keys(this.$route.query)[0]
    let value = Object.values(this.$route.query)[0]
    console.log(key + ' ' + value)
    response = await this.app.$axios.$get(`/products?` + key + '=' + value)
    console.log(response.data)
    this.item_count = response.data.length
    this.pages = Math.ceil(response.meta.total / response.meta.per_page)
    setTimeout(() => {
      this.items = response.data
    }, 500)
  },
  asyncData({ params, app }) {
    return {
      params: params,
      app: app,
    }
  },
}
</script>

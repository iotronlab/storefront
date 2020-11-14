<template>
  <v-container fluid>
    <!-- Right filter nav -->
    <v-navigation-drawer
      absolute
      right
      :value="NavState"
      class="hidden-md-and-up"
    >
      <FilterProducts
        :options="categories"
        :min="min"
        :max="max"
        @input="filter_products"
      />
      {{ 'filtered below' }}
      {{ filtered }}
    </v-navigation-drawer>
    <!-- Left filter nav -->
    <v-row>
      <v-col cols="2" class="hidden-md-and-down">
        <span class="title">{{ params.slug }}</span>
        <span>
          - {{ items.length }} item
          <span class="ml-n1" v-if="items.length > 1">s</span>
        </span>
        <FilterProducts
          :options="categories"
          :min="min"
          :max="max"
          @input="filter_products"
        />
        {{ 'filtered below' }}
        {{ filtered }}
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
        </template>
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
import Observer from '~/components/Observe/Observe'

export default {
  components: {
    Product,
    FilterProducts,
    Observer,
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
      next: null,
      scrolling: false,
    }
  },
  methods: {
    ChangeState() {
      console.log('in change state')
      console.log(this.NavState)

      this.NavState = this.NavState ? false : true
      console.log(this.NavState)
      return this.NavState
    },
    async fetech_products(query = '') {
      let response = null
      // console.log('query below')
      // console.log(query)
      response = await this.app.$axios.$get(`/products` + query)
      this.item_count = response.data.length
      // console.log('Data')
      // console.log(response)
      this.next = response.links.next
      setTimeout(() => {
        this.items = response.data
      }, 500)
      this.$router.push({ path: this.$route.path, query: { page: this.page } })
      console.log('in fetch data ')
      console.log(this.$route)
    },
    filter_products(filtered) {
      this.filtered = filtered
      let query = ''
      if (filtered.length != 0) {
        for (let i = 0; i < filtered.length; i++) {
          query = query + filtered[i] + ','
        }
        query = '?category=' + query.slice(0, query.length - 1)
      }
      this.fetech_products(query)
    },
    async intersected() {
      if (!this.next) return
      // console.log(`next: ${this.next}`)
      const res = await fetch(this.next)
      this.page++
      const response = await res.json()
      const items = response.data
      this.next = response.links.next
      // console.log(`old: ${this.items.length} new`)
      // console.log(items)
      console.log(items.length)
      this.item_count = items.length
      this.scrolling = true
      setTimeout(() => {
        this.scrolling = false
        this.items = [...this.items, ...items]
      }, 2000)
      this.$router.push({ path: this.$route.path, query: { page: this.page } })
      // this.$route.query.page = String(this.page)
      console.log('route below')
      console.log(this.$route)
      // this.items = [...this.items, ...items]
      console.log(`total: ${this.items.length}`)
    },
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
    // filteredKeys() {
    //   return this.keys.filter((key) => key !== `Name`)
    // },
  },
  created() {
    // this.page = this.$route.query.page != undefined ? this.$route.query.page : 1
    // console.log('in computed and page: ' + this.page)
    this.fetech_products('?page=' + this.page)
  },
  asyncData({ params, app, query }) {
    let page = null
    page = query.page != undefined ? query.page : 1
    console.log('qsyncData: ' + page)
    return {
      params: params,
      app: app,
      page: page,
    }
  },
}
</script>

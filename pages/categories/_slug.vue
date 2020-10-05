<template>
  <v-container fluid>
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
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import Product from '@/components/products/Product'

export default {
  components: {
    Product,
  },
  data() {
    return {
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
      item_count: null,
    }
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`)
    },
  },
  async mounted(){
    let response = await this.app.$axios.$get(`/products?category=${this.params.slug}`)
    this.item_count = response.data.length
    setTimeout(() => {
      this.items = response.data
    }, 500)
  },
  asyncData({ params, app }){
    return {
      params: params,
      app: app
    }
  }
}
</script>

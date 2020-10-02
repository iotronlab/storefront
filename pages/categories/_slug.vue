<template>
  <v-container fluid>
    <v-data-iterator
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
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 10,
      sortBy: 'name',
      keys: ['name', 'slug', 'price'],
      items: [],
    }
  },
  computed: {
    filteredKeys() {
      return this.keys.filter((key) => key !== `Name`)
    },
  },
  async asyncData({ params, app }) {
    let response = await app.$axios.$get(`/products?category=${params.slug}`)
    // this.title = params.slug
    // console.log(params.slug)
    return {
      items: response.data,
    }
  },
}
</script>

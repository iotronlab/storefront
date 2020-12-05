<template>
  <v-container fluid class="pa-0">
    <!-- featured and new filter -->
    <v-row no-gutters justify="space-around" class="mb-2">
      <v-checkbox
        v-model="filters"
        label="Featured"
        value="featured"
        hide-details=""
      ></v-checkbox>
      <v-checkbox
        hide-details=""
        v-model="filters"
        label="Newest"
        value="new"
      ></v-checkbox
    ></v-row>
    <!-- price filter -->
    <v-row no-gutters class="px-4 mb-2">
      <v-range-slider
        :hint="'price range: ( ' + priceRange[0] + ' - ' + priceRange[1] + ' )'"
        v-model="priceRange"
        thumb-label
        persistent-hint
        :max="maxPrice"
        min="0"
      ></v-range-slider>
    </v-row>
    <v-expansion-panels accordion>
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-2"
          >Categories
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0 mt-n4">
          <v-checkbox
            v-model="checkbox"
            v-for="option in categories"
            :key="option.id"
            class="py-0"
            :value="option.slug"
            :label="option.name"
            type="checkbox"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- <v-list-item>
      <v-slider :min="min" :max="max"></v-slider>
    </v-list-item> -->
      <!-- {{ checkbox }} -->
    </v-expansion-panels>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="option in filterOptions" :key="option.id">
        <v-expansion-panel-header class="pa-2"
          >{{ option.admin_name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="pa-0 mt-n4">
          <v-checkbox
            v-model="checkbox"
            v-for="option in option.options"
            :key="option.id"
            class="py-0"
            :value="option"
            :label="option.admin_name"
            type="checkbox"
            hide-details
          ></v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- <v-list-item>
      <v-slider :min="min" :max="max"></v-slider>
    </v-list-item> -->
      <!-- {{ checkbox }} -->
    </v-expansion-panels></v-container
  >
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    categories: {
      required: true,
      type: Array,
    },
    maxPrice: {
      required: true,
      type: undefined,
    },
    filterOptions: {
      required: false,
      type: Array,
    },

    // max: {
    //   required: true,
    // },
  },
  data() {
    return {
      checkbox: [],
      priceRange: [0, this.maxPrice],
      filters: [],
    }
  },
  methods: {
    clicked() {
      setTimeout(() => {
        console.log('Emitting')
        this.$emit('input', this.checkbox)
      }, 1000)
    },
  },
}
</script>

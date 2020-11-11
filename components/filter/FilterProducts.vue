<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="key in Object.keys(products[0])" :key="key">
      <v-expansion-panel-header>{{ key }}</v-expansion-panel-header>
      <v-expansion-panel-content v-for="(product, i) in products" :key="i">
        <v-list-item dense>
          <v-checkbox
            v-model="checkbox[`${product.key}`]"
            :error-messages="errors"
            value="1"
            :label="product[key]"
            type="checkbox"
            required
          ></v-checkbox>
        </v-list-item>
      </v-expansion-panel-content> </v-expansion-panel
    ><v-list-item>
      <v-slider :min="min" :max="max"></v-slider>
    </v-list-item>
  </v-expansion-panels>
</template>

<script>
import { max } from 'vee-validate/dist/rules'
export default {
  props: {
    products: {
      required: true,
      type: Array,
    },
    min: {
      required: true,
    },
    max: {
      required: true,
    },
  },
  data() {
    return {
      checkbox: {},
    }
  },
}
</script>
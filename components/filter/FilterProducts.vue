<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>Categories</v-expansion-panel-header>
      <v-expansion-panel-content v-for="option in options" :key="option.id">
        <v-list-item dense @click="clicked()">
          <v-checkbox
            v-model="checkbox"
            :value="option.slug"
            :label="option.name"
            type="checkbox"
            required
          ></v-checkbox>
        </v-list-item>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <!-- <v-list-item>
      <v-slider :min="min" :max="max"></v-slider>
    </v-list-item> -->
    <!-- {{ checkbox }} -->
  </v-expansion-panels>
</template>

<script>
import { max } from 'vee-validate/dist/rules'
export default {
  props: {
    options: {
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
      checkbox: [],
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
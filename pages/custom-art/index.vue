<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col lg="10">
        <h2 class="text-h6 text--primary">Customize your Art</h2>
        <v-combobox
          v-model="chips"
          :items="categories"
          chips
          clearable
          label="Your selected Categories"
          multiple
          prepend-icon="mdi-filter-variant"
          solo
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              @click="select"
              @click:close="remove(item)"
            >
              <strong>{{ item }}</strong
              >&nbsp;
              <span>(interest)</span>
            </v-chip>
          </template>
        </v-combobox></v-col
      ></v-row
    >
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      chips: [
        'Programming',
        'Playing video games',
        'Watching movies',
        'Sleeping',
      ],
      items: ['Streaming', 'Eating'],
    }
  },

  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
      this.chips = [...this.chips]
    },
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
  },
}
</script>

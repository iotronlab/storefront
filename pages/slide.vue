<template>
  <v-sheet class="mx-auto" max-width="700">
    <template>
      <v-slide-group show-arrows>
        <template v-slot:next="{ on, key }">
          <v-btn color="primary" dark v-bind="key" v-on="on"> </v-btn>
        </template>
        <v-slide-item
          v-for="n in 25"
          :key="n"
          v-slot:default="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="purple white--text"
            depressed
            rounded
            @click="toggle"
          >
            Options {{ n }}
          </v-btn>
        </v-slide-item>
      </v-slide-group></template
    >
  </v-sheet>
</template><script>
export default {
  data: () => ({
    model: null,
  }),
}
</script>

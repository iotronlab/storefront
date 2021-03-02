<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="secondary" small rounded dark v-bind="attrs" v-on="on"
        ><v-icon left small>mdi-eye</v-icon>Preview</v-btn
      >
    </template>
    <ProductImage />
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
      model: 0,
    }
  },
}
</script>

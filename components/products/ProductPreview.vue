<template>
  <v-dialog v-model="dialog" max-width="290">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" small rounded dark v-bind="attrs" v-on="on"
        ><v-icon left small>mdi-eye</v-icon>Preview</v-btn
      >
    </template>
    <v-card>
      <v-carousel v-model="model">
        <v-carousel-item v-for="(color, i) in colors" :key="color">
          <v-sheet :color="color" height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">Slide {{ i + 1 }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
      <v-btn color="green darken-1" text @click="dialog = false"> Close </v-btn>
    </v-card>
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

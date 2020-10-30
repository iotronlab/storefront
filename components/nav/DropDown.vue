<template>
  <v-sheet rounded width="600" height="200" class="ma-1">
    <v-row align="center" no-gutters>
      <v-item-group
        v-model="window"
        class="shrink mr-6 ml-2"
        mandatory
        tag="v-flex"
      >
        <v-item
          v-for="item in navMenu"
          :key="item.url"
          v-slot="{ active, toggle }"
        >
          <div>
            <v-btn :input-value="active" @click="toggle" text small>
              {{ item.name }}
            </v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-col height="100%">
        <v-window v-model="window" class="elevation-1" vertical>
          <v-window-item v-for="item in navMenu" :key="item.url">
            <v-card flat height="100%">
              <v-card-text>
                <v-row class="ma-1" align="center">
                  <v-avatar color="grey" class="mr-4"></v-avatar>
                  <strong class="title">{{ item.name }}</strong>
                  <v-spacer></v-spacer>
                  <v-btn outlined rounded x-small> see more... </v-btn>
                </v-row>

                <p>
                  {{ navMenu }}
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row></v-sheet
  >
</template>
<script>
export default {
  props: {
    navMenu: {
      required: true,
      type: Array,
    },
  },

  data: () => ({
    length: 3,
    window: 0,
  }),
}
</script>

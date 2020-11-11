<template>
  <v-sheet rounded width="800" class="ma-1">
    <v-row align="top" no-gutters>
      <v-item-group v-model="window" class="my-2 mr-6 ml-2" mandatory>
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

      <v-col>
        <v-window v-model="window" vertical>
          <v-window-item v-for="item in navMenu" :key="item.url">
            <v-card flat>
              <v-card-text>
                <v-row class="ma-1">
                  <v-avatar color="grey" class="mr-4"></v-avatar>
                  <strong class="title">{{ item.name }}</strong>
                  <v-spacer></v-spacer>
                  <v-btn outlined rounded x-small> see more... </v-btn>
                </v-row>
                <v-list dense>
                  <v-list-item-group>
                    <v-row>
                      <v-col
                        cols="4"
                        v-for="child in item.children"
                        :key="child.id"
                      >
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title
                              v-text="child.name"
                            ></v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </v-col> </v-row
  ></v-sheet>
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

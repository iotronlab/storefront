<template>
  <v-container fluid class="mx-auto">
    <v-slide-group v-model="selectedCategory" class="pa-1" mandatory>
      <v-row no-gutters class="fill-height" align="center" justify="center">
        <v-slide-item
          v-for="category in categories"
          :key="category.slug"
          v-slot="{ active, toggle }"
          :value="category.children"
        >
          <v-card outlined class="ma-1" height="150" @click="toggle">
            <v-img :src="category.slug + `.jpg`" height="100%" width="200">
              <v-card-title class="overline">{{ category.name }}</v-card-title>
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="48"
                  v-text="'mdi-eye'"
                ></v-icon> </v-scale-transition
            ></v-img>
          </v-card>
        </v-slide-item>
      </v-row>
    </v-slide-group>

    <v-expand-transition>
      <v-container fluid class="pa-0" v-if="selectedCategory != null">
        <v-row
          v-for="children in selectedCategory"
          :key="children.slug"
          no-gutters
          class="fill-height"
          align="center"
          justify="center"
          ><v-col lg="10">
            <h3 class="text-button mb-2">{{ children.name }}</h3>
            <v-divider />
            <v-row no-gutters class="my-2">
              <v-col
                v-for="subchild in children.children"
                :key="subchild.slug"
                class="d-flex child-flex pa-1"
                cols="6"
                lg="3"
                sm="6"
                md="4"
              >
                <v-img
                  :src="`https://picsum.photos/500/300`"
                  :lazy-src="`https://picsum.photos/10/6`"
                  aspect-ratio="1"
                  dark
                  class="rounded"
                  gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
                  ><v-row
                    class="fill-height ma-0"
                    no-gutters
                    align="center"
                    justify="center"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                        no-gutters
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                    <h4 class="overline">{{ subchild.name }}</h4></v-row
                  >
                  <p>p text</p>
                </v-img>
              </v-col></v-row
            ></v-col
          >
        </v-row>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    selectedCategory: null,
  }),
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
  },
}
</script>

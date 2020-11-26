<template>
  <v-container fluid class="mx-auto">
    <v-slide-group
      v-model="selectedCategory"
      class="pa-1"
      mandatory
      active-class="primary"
      @change="resetChildren"
    >
      <v-row no-gutters class="fill-height" align="center" justify="center">
        <v-slide-item
          v-for="category in categories"
          :key="category.slug"
          v-slot="{ active, toggle }"
          :value="category.children"
        >
          <v-card
            outlined
            class="ma-1"
            height="150"
            max-width="120"
            @click="toggle"
            dark
          >
            <v-img
              :src="category.slug + `.jpg`"
              height="100%"
              gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            >
              <h5 class="overline pa-2" style="line-height: 100%">
                {{ category.name }}
              </h5>
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
        <v-tabs
          show-arrows
          v-model="selectedSubCategory"
          color="secondary"
          :vertical="$vuetify.breakpoint.mdAndUp"
          background-color="transparent"
        >
          <v-tabs-slider color="secondary"></v-tabs-slider>
          <v-tab
            v-for="children in selectedCategory"
            :key="children.slug"
            class="px-2"
          >
            {{ children.name }}
          </v-tab>

          <v-tab-item
            v-for="children in selectedCategory"
            :key="children.slug"
            transition="fade-transition"
            reverse-transition="fade-transition"
          >
            <v-row
              no-gutters
              class="fill-height"
              align="center"
              justify="center"
              ><v-col>
                <v-row no-gutters>
                  <v-col
                    v-for="subchild in children.children"
                    :key="subchild.slug"
                    class="d-flex child-flex pa-1"
                    cols="6"
                    lg="3"
                    sm="6"
                    md="4"
                  >
                    <v-lazy
                      v-model="isLazyLoading"
                      :options="{
                        threshold: 0.5,
                      }"
                      transition="scale-transition"
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
                      </v-img></v-lazy
                    >
                  </v-col></v-row
                ></v-col
              >
            </v-row></v-tab-item
          >
        </v-tabs>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    isLazyLoading: false,
    selectedCategory: null,
    selectedSubCategory: null,
  }),
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
  },
  methods: {
    resetChildren() {
      this.selectedSubCategory = 0
    },
  },
}
</script>

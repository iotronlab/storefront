<template>
  <v-container fluid>
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
          :key="category.url"
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
              :src="category.image_path ? category.image_path : defaultImageSrc"
              :lazy-src="defaultImageSrc"
              height="100%"
              gradient="to top, rgba(0,0,0,.1), rgba(0,0,0,.6)"
            >
              <h5
                class="overline pa-2"
                style="text-shadow: 2px 2px purple; line-height: 100%"
              >
                {{ category.name }}
              </h5>
              <v-btn outlined x-small rounded :to="'/category/' + category.url"
                >view all</v-btn
              >
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
          color="primary"
          :vertical="$vuetify.breakpoint.mdAndUp"
          background-color="transparent"
        >
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab
            v-for="children in selectedCategory"
            :key="children.url"
            class="px-2"
          >
            {{ children.name }}
          </v-tab>

          <v-tab-item
            v-for="children in selectedCategory"
            :key="children.url"
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
                  <v-col cols="12" lg="3" sm="12" md="4" class="pa-2">
                    <h6 class="text-caption">
                      {{ children.meta_desc }}
                    </h6>
                    <v-btn
                      outlined
                      x-small
                      class="mt-2"
                      rounded
                      :to="'/category/' + children.url"
                      >view all</v-btn
                    ></v-col
                  >
                  <v-col
                    v-for="subchild in children.children"
                    :key="subchild.url"
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
                      ><nuxt-link link :to="'/category/' + subchild.url">
                        <v-img
                          :src="
                            subchild.image_path
                              ? subchild.image_path
                              : defaultImageSrc
                          "
                          :lazy-src="defaultImageSrc"
                          aspect-ratio="1"
                          dark
                          class="rounded"
                          gradient="to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 72px"
                          ><v-row
                            class="fill-height"
                            no-gutters
                            align="start"
                            justify="center"
                          >
                            <h4 class="text-button">{{ subchild.name }}</h4>
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
                          </v-row> </v-img></nuxt-link
                    ></v-lazy> </v-col></v-row
              ></v-col> </v-row
          ></v-tab-item>
        </v-tabs>
      </v-container>
    </v-expand-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import VueMasonryWall from 'vue-masonry-wall'
export default {
  data: () => ({
    isLazyLoading: false,
    selectedCategory: null,
    selectedSubCategory: null,
  }),
  components: { VueMasonryWall },
  computed: {
    ...mapGetters({
      categories: 'categories',
    }),
    defaultImageSrc() {
      return require('@/assets/img/default-profile.png')
    },
  },
  methods: {
    resetChildren() {
      this.selectedSubCategory = 0
    },
  },
}
</script>

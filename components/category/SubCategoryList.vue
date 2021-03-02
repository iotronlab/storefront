<template>
  <v-container fluid class="mx-auto">
    <section v-if="category.children < 1">
      <h6 class="text-caption">There are no subcategories in this category.</h6>
    </section>
    <section v-else>
      <v-slide-group v-model="model" class="pa-4">
        <v-slide-item
          v-for="subcategory in category.children"
          :key="subcategory.id"
          v-slot="{ active, toggle }"
          :value="subcategory"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="secondary white--text"
            depressed
            rounded
            @click="toggle"
          >
            {{ subcategory.name }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>

      <v-expand-transition>
        <v-sheet v-if="model != null" elevation="4" rounded="lg">
          <h5 class="text-overline text-center">
            view all <nuxt-link :to="model.url">{{ model.name }}</nuxt-link>
          </h5>
          <v-list dense nav>
            <v-list-item-group>
              <v-row no-gutters>
                <v-col
                  cols="6"
                  lg="4"
                  v-for="child in model.children"
                  :key="child.id"
                >
                  <v-list-item :to="'/category/' + child.url">
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
        </v-sheet>
      </v-expand-transition>
    </section>
  </v-container>
</template>
<script>
export default {
  props: {
    category: {
      required: true,
      type: Object,
    },
  },
  data: () => ({
    model: null,
  }),
}
</script>

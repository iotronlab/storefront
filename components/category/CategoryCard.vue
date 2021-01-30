<template>
  <v-row no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <v-avatar class="ma-3" size="125" tile>
        <v-img
          :src="
            category.image_path
              ? category.image_path
              : require('@/assets/img/default-profile.png')
          "
          :lazy-src="require('@/assets/img/default-profile.png')"
        ></v-img> </v-avatar
    ></v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <h4 class="overline">{{ category.name }}</h4>

      <h5 class="caption">
        {{
          category.meta_desc
            ? category.meta_desc
            : 'There is no description available for this category.'
        }}
      </h5>

      <v-btn class="mt-4 mb-2" outlined rounded small> view all </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    category: {
      required: true,
      type: Object,
    },
  },
}
</script>


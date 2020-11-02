<template>
  <v-badge
    color="deep-purple accent-4"
    bordered
    content="Featured"
    :left="false"
    :value="product.featured"
    offset-x="65"
    offset-y="25"
  >
    <v-card :to="link" class="mx-auto rounded-lg" max-width="210">
      <v-img
        height="240px"
        src="https://bulma.io/images/placeholders/320x480.png"
      >
        <v-btn icon color="primary" large>
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-img>

      <v-card-title class="subtitle-2">{{ product.name }}</v-card-title>
      <v-card-subtitle class="pb-1">Artist Name</v-card-subtitle>

      <v-card-subtitle class="subtitle-2 pt-0">{{
        product.price
      }}</v-card-subtitle>
    </v-card>
  </v-badge>
</template>

<script>
export default {
  props: {
    product: {
      required: true,
      type: Object,
    },
  },

  computed: {
    link() {
      return {
        name: 'products-slug',
        params: {
          slug: this.product.slug,
        },
      }
    },
  },
}
</script>


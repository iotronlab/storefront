<template>
  <v-card :to="link" class="mx-auto" shaped>
    <v-img height="240px" src="https://bulma.io/images/placeholders/320x480.png">
      <v-btn icon color="primary" large>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
    </v-img>

    <v-card-title class="subtitle-2">{{ product.name }}</v-card-title>
    <v-card-subtitle>{{ product.price }}</v-card-subtitle>
  </v-card>
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


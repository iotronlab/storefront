<template>
  <v-container fluid>
    <nuxt-link :to="link">
      <v-img
        class="mx-auto rounded-lg"
        src="https://bulma.io/images/placeholders/320x480.png"
        :aspect-ratio="3 / 4"
      >
        <v-row no-gutters>
          <v-btn icon color="primary" large>
            <v-icon>mdi-bookmark</v-icon> </v-btn
          ><v-spacer />
          <v-badge
            color="deep-purple accent-4"
            content="Featured"
            :value="product.featured"
            offset-y="30"
            offset-x="70"
          >
          </v-badge>
        </v-row>
      </v-img>
    </nuxt-link>
    <v-card-title class="text-subtitle-2">{{ product.name }}</v-card-title>
    <v-card-subtitle class="pb-1">Artist Name</v-card-subtitle>

    <v-card-subtitle class="subtitle-2 pt-0">{{
      product.price
    }}</v-card-subtitle>
    <v-card-actions class="pa-1">
      <ProductPreview />
      <v-btn small outlined>
        Add to cart <v-icon right> mdi-cart-plus</v-icon></v-btn
      ></v-card-actions
    >
  </v-container>
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
      let slug = this.product.sku
      // let slug =
      //   this.product.variants.length > 0
      //     ? this.product.variants[0].sku
      //     : this.product.sku
      // console.log(slug)
      // console.log('slug above')
      // return '#'
      return {
        name: 'products-slug',
        params: {
          slug: slug,
        },
      }
    },
  },
}
</script>
<style scoped>
.v-application.theme--light .nucard {
  transition: background 0.1s, color 0.1s;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
}
.v-application.theme--dark .nucard {
  transition: background 0.1s, color 0.1s;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7),
    -5px -5px 10px rgba(255, 255, 255, 0.1);
}
</style>


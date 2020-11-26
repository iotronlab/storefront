<template>
  <v-container fluid>
    <nuxt-link :to="link">
      <v-img
        class="mx-auto rounded-lg"
        src="https://bulma.io/images/placeholders/320x480.png"
        :aspect-ratio="3 / 4"
      >
        <v-row no-gutters>
          <v-btn icon color="primary" large> <v-icon>mdi-heart</v-icon> </v-btn
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
    <v-row>
      <v-col>
        <h4 class="text-subtitle-2">{{ product.name }}</h4>
        <h5 class="text-caption py-0">
          by
          <nuxt-link :to="vendorLink" class="secondary--text">{{
            product.vendor.name
          }}</nuxt-link>
        </h5>
        <h4 class="text-subtitle-2">{{ product.price }}</h4></v-col
      ><v-col align="end">
        <v-chip small class="mb-2 caption">{{
          product.in_stock ? 'in stock' : 'sold'
        }}</v-chip
        ><ProductPreview /> </v-col
    ></v-row>
    <!-- <v-row no-gutters>
      <v-btn small outlined
        >Add to cart<v-icon right small>mdi-cart-plus</v-icon></v-btn
      ></v-row
    > -->
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
    vendorLink() {
      let slug = this.product.vendor.slug
      // let slug =
      //   this.product.variants.length > 0
      //     ? this.product.variants[0].sku
      //     : this.product.sku
      // console.log(slug)
      // console.log('slug above')
      // return '#'
      return {
        name: 'artists-slug',
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


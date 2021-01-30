<template>
  <v-container fluid class="pa-0">
    <nuxt-link :to="link">
      <v-container fluid class="woodframe">
        <v-img src="/landing.jpg" class="img" contain>
          <v-row no-gutters>
            <v-btn icon color="primary"> <v-icon>mdi-heart</v-icon> </v-btn
            ><v-spacer />
            <v-badge
              color="deep-purple accent-4"
              content="Featured"
              :value="product.featured"
              offset-y="30"
              offset-x="70"
            >
            </v-badge>
          </v-row> </v-img
      ></v-container>
    </nuxt-link>
    <v-row no-gutters class="mt-2" style="flex-wrap: nowrap">
      <v-col class="flex-grow-1 flex-shrink-0">
        <h4 class="text-subtitle-2">{{ product.name }}</h4>
        <h5 class="text-caption py-0">
          by
          <nuxt-link :to="vendorLink" class="primary--text">{{
            product.vendor.display_name
          }}</nuxt-link>
        </h5>
        <h4 class="text-subtitle-2">{{ product.price }}</h4></v-col
      ><v-col class="flex-grow-0 flex-shrink-1" align="end">
        <v-chip
          small
          :color="product.in_stock ? 'success' : ''"
          class="mb-2 caption"
          >{{ product.in_stock ? 'in stock' : 'sold' }}</v-chip
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
      let url = this.product.vendor.url
      // let slug =
      //   this.product.variants.length > 0
      //     ? this.product.variants[0].sku
      //     : this.product.sku
      // console.log(slug)
      // console.log('slug above')
      // return '#'
      return {
        name: 'artists-url',
        params: {
          url: url,
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
.woodframe {
  background-color: #ddc;
  border: solid 8px #eee;
  border-bottom-color: #fff;
  border-left-color: #eee;
  border-radius: 2px;
  border-right-color: #eee;
  border-top-color: #ddd;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset,
    0 5px 10px 5px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  display: inline-block;

  padding: 5px;
  position: relative;
  text-align: center;
}
.img {
  border: solid 2px;
  border-bottom-color: #ffe;
  border-left-color: #eed;
  border-right-color: #eed;
  border-top-color: #ccb;
  max-height: 100%;
  max-width: 100%;
}
/* .frame:before {
  border-radius: 2px;
  bottom: -2vmin;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25) inset;
  content: '';
  left: -2vmin;
  position: absolute;
  right: -2vmin;
  top: -2vmin;
}
.frame:after {
  border-radius: 2px;
  bottom: -2.5vmin;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.25);
  content: '';
  left: -2.5vmin;
  position: absolute;
  right: -2.5vmin;
  top: -2.5vmin;
} */
</style>


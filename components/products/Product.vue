<template>
  <v-container fluid>
    <nuxt-link :to="link">
      <v-img :src="product.base_image ? product.base_image : defaultImageSrc">
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
        </v-row>
      </v-img>
    </nuxt-link>

    <v-row no-gutters class="mt-2" style="flex-wrap: nowrap">
      <v-col class="flex-grow-1 flex-shrink-0">
        <h4 class="text-subtitle-2">{{ product.name }}</h4>
        <!-- <h5 class="text-caption py-0" v-if="vendorLink">
          by
          <nuxt-link :to="vendorLink" class="primary--text">{{
            product.vendor.display_name
          }}</nuxt-link>
        </h5> -->
        <h4 class="text-subtitle-2" v-if="product.special_price > 0">
          <span class="text-decoration-line-through text-caption">
            {{ product.formatted_price }}</span
          >
          {{ product.formatted_special_price }}
        </h4>
        <h4 class="text-subtitle-2" v-else>
          {{ product.formatted_price }}
        </h4></v-col
      ><v-col class="flex-grow-0 flex-shrink-1" align="end">
        <v-chip
          small
          :color="product.in_stock ? 'success' : ''"
          class="mb-2 caption"
          >{{ product.in_stock ? 'in stock' : 'sold' }}</v-chip
        >
        <v-dialog
          v-model="previewModal"
          :max-width="$vuetify.breakpoint.lgAndUp ? '50%' : '90%'"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary" small rounded dark v-bind="attrs" v-on="on"
              ><v-icon left small>mdi-eye</v-icon>Preview</v-btn
            >
          </template>
          <v-container fluid>
            <ProductImage :images="product.images" />
            <v-btn rounded small top right fixed @click="previewModal = false"
              >close<v-icon right>mdi-close</v-icon></v-btn
            ></v-container
          >
        </v-dialog>
      </v-col></v-row
    >
    <!-- <v-row no-gutters>
      <v-btn small outlined
        >Add to cart<v-icon right small>mdi-cart-plus</v-icon></v-btn
      ></v-row
    >-->
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
  data() {
    return {
      previewModal: false,
    }
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
      // if (this.product.vendor.url != null) {
      //   return {
      //     name: 'artists-url',
      //     params: {
      //       url: this.product.vendor.url,
      //     },
      //   }
      // } else {
      //   return null
      // }
      // let slug =
      //   this.product.variants.length > 0
      //     ? this.product.variants[0].sku
      //     : this.product.sku
      // console.log(slug)
      // console.log('slug above')
      // return '#'
    },
    defaultImageSrc() {
      return require('@/assets/img/default-product.png')
    },
  },
}
</script>
<style >
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
}
.close-button {
  top: 0;
  position: absolute;
  margin: 0 0 16px 16px;
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


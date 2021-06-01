<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters justify="center"
      ><v-col cols="12" lg="8" xl="8">
        <v-row no-gutters v-for="product in products" :key="product.id">
          <v-col>
            <CartOverviewProduct
              :product="product"
              :deliveryAddress="deliveryAddress"
          /></v-col>
        </v-row>
        <!-- <v-col cols="12" sm="12" md="4">Product image</v-col>
          <v-col cols="12" sm="12" md="4">{{product.name}}</v-col>
          <v-col cols="12" sm="12" md="2">Product Price</v-col>
          <v-col cols="12" sm="12" md="2">
            <v-btn rounded @click.prevent="destroy(product.id)">Remove</v-btn>
    </v-col>-->
      </v-col>
      <v-divider vertical />
      <v-col cols="12" lg="2" xl="2">
        <v-container fluid>
          <h4 class="body-1 my-1">
            subtotal: {{ subtotal }} <br /><span class="caption font-italic"
              >(prices inclusive of GST)</span
            >
          </h4>
          <v-divider />

          <section v-if="cartShipping.length > 0">
            <h4 class="caption my-1">shipping charges</h4>
            <h5 class="body-2" v-for="(product, i) in cartShipping" :key="i">
              + ₹ {{ product.shipping_rate }}
            </h5>
          </section>

          <slot name="rows" />
          <!-- <v-text-field filled dense label="Promo Code" />
          <v-btn>Apply</v-btn> -->
        </v-container>
      </v-col></v-row
    >
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
//import CartOverviewProduct from '@/components/cart/CartOverviewProduct'
export default {
  // components: {
  //   CartOverviewProduct,
  // },
  props: {
    deliveryAddress: {
      required: false,
      type: Object,
    },
    pickupAddress: {
      required: false,
      type: Object,
    },
  },
  computed: {
    ...mapGetters({
      products: 'cart/products',
      cartShipping: 'cart/productShipping',
      subtotal: 'cart/subtotal',
    }),
  },
}
</script>


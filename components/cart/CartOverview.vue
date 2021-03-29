<template>
  <v-container fluid>
    <v-row no-gutters
      ><v-col cols="12" lg="9">
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
      <v-col cols="12" lg="2" class="pa-2">
        <p class="title my-1">Order total: {{ subtotal }}</p>
        <slot name="rows" />
        <!-- <v-text-field filled dense label="Promo Code" />
          <v-btn>Apply</v-btn> -->

        {{ deliveryAddress }}
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
      subtotal: 'cart/subtotal',
    }),
  },
}
</script>


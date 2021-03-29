<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12" sm="12" md="6">
        <Product :product="product.product" />
      </v-col>
      <v-col cols="12" sm="12" md="6" class="pa-2">
        <h5>Quantity: {{ product.quantity }}</h5>
        <!-- <select v-model="quantity">
        <option value="0">0</option>
        <option
          :value="x"
          v-for="x in product.stock_count"
          :key="x"
          :selected="x == product.quantity"
        >
          {{ x }}
        </option>
      </select> -->
        <!-- <v-select
          filled
          dense
          label="quantity"
          hint="update quantity"
          persistent-hint
          class="mx-2"
      /> -->

        <v-btn
          rounded
          class="my-2"
          small
          @click.prevent="destroyProduct(product.product.sku)"
        >
          Remove
          <v-icon>mdi-cart-remove</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <CheckDeliveryService :product="product" :deliveryAddress="deliveryAddress"
  /></v-container>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      quantity: this.product.quantity,
    }
  },
  watch: {
    quantity(quantity) {
      this.update({ productId: this.product.id, quantity })
    },
  },

  props: {
    product: {
      required: true,
      type: Object,
    },
    deliveryAddress: {
      type: Object,
      required: false,
    },
  },

  methods: {
    ...mapActions({
      destroy: 'cart/destroy',
      update: 'cart/update',
    }),

    destroyProduct(sku) {
      if (confirm('Are you sure?')) {
        this.destroy(sku)
      }
    },
  },
}
</script>

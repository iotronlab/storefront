<template>
  <v-container fluid class="pa-0">
    <v-row no-gutters>
      <v-col cols="12" sm="6" md="6" lg="3" xl="3">
        <Product :product="product.product" />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="9" xl="9">
        <v-container fluid>
          <h5 class="subtitle-2 mb-2">Price: {{ product.total }}</h5>
          <v-row no-gutters align="center">
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
              class="ml-2"
              small
              @click.prevent="destroyProduct(product.product.sku)"
            >
              Remove
              <v-icon>mdi-cart-remove</v-icon>
            </v-btn></v-row
          >
        </v-container>
        <section v-if="deliveryAddress">
          <CheckDeliveryService
            :product="product"
            :deliveryAddress="deliveryAddress"
          />
        </section>
        <section v-else class="text-caption">
          Select an address to display available courier services.
        </section>
      </v-col>
    </v-row>
  </v-container>
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

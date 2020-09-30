<template>
  <v-row>
    <v-col cols="12" sm="12" md="2">
      <v-img src="/women.jpg" height="80" width="60" />
    </v-col>
    <v-col cols="12" sm="12" md="4">
      {{ product.product.name }} | {{ product.type }} |
      {{ product.name }}
    </v-col>
    <v-col cols="12" sm="12" md="2">
      Quantity:
      <select v-model="quantity">
        <option value="0">0</option>
        <option
          :value="x"
          v-for="x in product.stock_count"
          :key="x"
          :selected="x == product.quantity"
        >{{ x }}</option>
      </select>
    </v-col>
    <v-col cols="12" sm="12" md="2">{{ product.price }}</v-col>
    <v-col cols="12" sm="12" md="2">
      <v-btn rounded href @click.prevent="destroyProduct(product.id)">
        Remove
        <v-icon>mdi-cart-remove</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      quantity: this.product.quantity
    };
  },
  watch: {
    quantity(quantity) {
      this.update({ productId: this.product.id, quantity });
    }
  },

  props: {
    product: {
      required: true,
      type: Object
    }
  },

  methods: {
    ...mapActions({
      destroy: "cart/destroy",
      update: "cart/update"
    }),

    destroyProduct(productId) {
      if (confirm("Are you sure?")) {
        this.destroy(productId);
      }
    }
  }
};
</script>

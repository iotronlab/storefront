<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-stepper vertical non-linear>
          <v-stepper-step step="1" editable>
            Select an address
            <small>shipping charges may vary accordingly</small>
          </v-stepper-step>

          <v-stepper-content step="1">
            <UserAddress :addresses="addresses" />
          </v-stepper-content>

          <v-stepper-step step="2" editable>Configure analytics for this app</v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step step="3" editable>Select an ad format and name ad unit</v-stepper-step>

          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4" editable>View setup instructions</v-stepper-step>
          <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
    <v-row v-if="product.length">
      <h6 class="subtitle-1 my-2">Cart Overview</h6>
      <CartOverview>
        <template slot="rows">
          <p class="title my-0">Shipping: xxxx</p>
          <p class="title my-0">total: {{total}}</p>
        </template>
      </CartOverview>
    </v-row>
    <v-btn block color="primary" :disabled="empty">Place order</v-btn>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import UserAddress from "@/components/checkout/UserAddress";
import CartOverview from "@/components/cart/CartOverview";
export default {
  data() {
    return {
      addresses: []
    };
  },
  components: {
    CartOverview,
    UserAddress
  },
  computed: {
    ...mapGetters({
      total: "cart/total",
      product: "cart/products",
      empty: "cart/empty"
    })
  },
  async asyncData({ app }) {
    let addresses = await app.$axios.$get("addresses");
    return {
      addresses: addresses.data
    };
  }
};
</script>
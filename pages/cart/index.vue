<template>
  <v-container fluid>
    <v-card class="pa-2">
      <h1 class="text-body-1 ml-2">
        Your Cart
        <span v-if="cartProducts.length > 0">({{ cartProducts.length }})</span>
      </h1>

      <h5 class="ml-2 body-2" v-if="changed">
        Some products stocks may have changed
      </h5>
      <v-divider />
      <section style="height: 200px" v-if="cartProducts.length == 0">
        <h3 class="text-h6 text-center accent--text mt-6">
          <v-icon>mdi-cart-outline</v-icon> Alas, Your Cart is empty.
          <v-icon>mdi-emoticon-sad-outline</v-icon>
        </h3>
      </section>
      <section v-if="cartProducts.length > 0">
        <CartOverview />
      </section>

      <v-divider />
      <v-btn
        block
        color="secondary"
        :disabled="empty"
        :to="{ name: 'checkout' }"
        >CheckOut</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CartOverview from '@/components/cart/CartOverview'

export default {
  middleware: ['auth'],
  components: {
    CartOverview,
  },
  created() {
    if (this.$auth.loggedIn == false) {
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cart/products',
      empty: 'cart/empty',
      changed: 'cart/changed',
    }),
  },
}
</script>


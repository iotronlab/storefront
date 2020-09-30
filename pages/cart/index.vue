<template>
  <v-container>
    <v-card>
      <h1 class="body-1 ml-2 pt-1">Your Cart</h1>

      <h5 class="ml-2 mb-0 body-2" v-if="changed">
        Some products stocks may have changed
      </h5>
      <div v-if="cartProducts.length">
        <CartOverview />
      </div>
      <div class="headline text-center accent--text" v-else>
        Alas, Your Cart is empty.
        <v-img src="icons/cart.svg" width="128" class="mx-auto my-4" />
      </div>

      <v-btn block color="primary" :disabled="empty" :to="{ name: 'checkout' }"
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


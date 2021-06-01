<template>
  <v-container fluid>
    <section v-if="$fetchState.pending" class="text-center">
      <PageLoader :message="'fetching your cart...'" />
    </section>
    <section v-if="$fetchState.error">
      There was some error fetching your cart.
    </section>
    <v-card class="pa-2" v-if="!$fetchState.pending">
      <v-banner v-if="addresses.length == 0">
        <v-icon slot="icon" color="warning" size="36">
          mdi-map-marker-alert-outline
        </v-icon>
        <span>Kindly add a delivery address</span>

        <template v-slot:actions>
          <v-btn color="primary" text> Add Address </v-btn>
        </template>
      </v-banner>
      <v-banner v-else-if="addresses.length > 0">
        <v-icon slot="icon" color="success" size="36">
          mdi-map-marker-check-outline
        </v-icon>

        <span>
          <span class="text-caption">Addresses ({{ addresses.length }})</span
          ><br />
          <h5 class="text-subtitle-2">
            Delivering to -
            <span v-if="shippingAddress">
              {{ shippingAddress.name }}, {{ shippingAddress.contact }},
              {{ shippingAddress.postal_code }},
              {{ shippingAddress.country_code }}</span
            >
            <span v-else>please select a default address</span>
          </h5>
        </span>

        <template v-slot:actions>
          <v-btn color="primary" outlined @click="addressSheet = !addressSheet">
            Change address
          </v-btn>
        </template>
      </v-banner>
      <v-banner v-else>
        <v-icon slot="icon" color="warning" size="36">
          mdi-map-marker-alert-outline
        </v-icon>
        <span
          >There was some error fetching addresses. Kindly contact
          support.</span
        >
        <template v-slot:actions>
          <v-btn color="primary" text> report issue </v-btn>
        </template>
      </v-banner>
      <h1 class="text-overline ml-2">
        Your Cart
        <span v-if="cartProducts.length > 0">({{ cartProducts.length }})</span>
      </h1>

      <h5 class="ma-2 body-2" v-if="changed">
        Some products stocks may have changed
      </h5>
      <h5 class="ma-2 body-2" v-if="!shippingAvailable">
        <v-icon color="error">mdi-sync-alert</v-icon> A product cannot be
        shipped to the selected location.
      </h5>
      <v-divider />
      <section
        style="height: 200px"
        v-if="cartProducts.length && cartProducts.length == 0"
      >
        <h3 class="text-h6 text-center accent--text mt-6">
          <v-icon>mdi-cart-outline</v-icon> Alas, Your Cart is empty.
          <v-icon>mdi-emoticon-sad-outline</v-icon>
        </h3>
      </section>
      <section v-if="cartProducts.length > 0">
        <CartOverview :deliveryAddress="shippingAddress" />
      </section>

      <v-divider />
    </v-card>

    <v-bottom-sheet v-model="addressSheet" inset>
      <v-sheet class="text-center">
        <v-btn
          class="mt-6"
          text
          color="red"
          @click="addressSheet = !addressSheet"
        >
          close
        </v-btn>
        <AddressSheet :addresses="addresses" />
      </v-sheet>
    </v-bottom-sheet>
    <v-app-bar bottom fixed>
      <h5 class="text-caption text-center" style="width: 60%">
        subtotal&nbsp;<span class="body-2"> {{ subtotal }}</span>
        <span class="" v-if="cartShipping.length > 0">
          + ₹ {{ shippingCost }}</span
        >
      </h5>
      <v-btn
        width="40%"
        color="secondary"
        :disabled="empty || !shippingAvailable"
        @click="checkOut"
        >CheckOut</v-btn
      ></v-app-bar
    >
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CartOverview from '@/components/cart/CartOverview'

export default {
  middleware: ['auth'],
  components: {
    CartOverview,
  },
  data() {
    return { addressSheet: false }
  },

  async fetch() {
    await this.$store.dispatch('getUserAddress')
    await this.$store.dispatch('getShippingToken')
    // await this.$axios
    //   .$get('address')
    //   .then((res) => {
    //     this.addresses = res.data
    //     this.selectedAddress = this.addresses.find(
    //       (address) => address.default == true
    //     )
    //     this.billingAddress.value = this.selectedAddress
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  },
  computed: {
    ...mapGetters({
      cartProducts: 'cart/products',
      empty: 'cart/empty',
      changed: 'cart/changed',
      subtotal: 'cart/subtotal',
      addresses: 'userAddresses',
      // defaultAddress: 'defaultAddress',
      shippingAddress: 'shippingAddress',
      cartShipping: 'cart/productShipping',
      // shippingAvailable: 'cart/shippingAvailable',
    }),
    shippingAvailable() {
      if (
        this.cartProducts.some(function checkShipping(product) {
          return product.courier_id == null
        })
      ) {
        return false
      } else {
        return true
      }
    },
    shippingCost() {
      let shippingCost = 0
      this.cartShipping.forEach((el) => {
        shippingCost += el.shipping_rate
      })
      return shippingCost
    },
  },
  methods: {
    async checkOut() {
      await this.$axios
        .$post('cart/shipping', { products: this.cartShipping })
        .then((result) => {
          this.$router.push('checkout')
        })
        .catch((err) => {})
    },
  },
}
</script>


<template>
  <v-container fluid>
    <v-stepper non-linear :alt-labels="$vuetify.breakpoint.xs">
      <v-row no-gutters justify="center" align="center" class="text-caption">
        <v-col cols="4">
          <v-stepper-step step="1" editable color="secondary">
            Address
          </v-stepper-step></v-col
        ><v-col cols="4">
          <v-stepper-step step="2" editable>Shipping</v-stepper-step></v-col
        >
        <v-col cols="4">
          <v-stepper-step step="3" editable>Payment</v-stepper-step></v-col
        >
      </v-row>
      <v-divider class="mb-2" />
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <h4 class="text-subtitle-2 ml-4">1. Choose a delivery address</h4>
          <Address @selected:address="checkService" />

          <!-- <UserAddress
                :addresses="addresses"
                v-model="selectedAddress"
                type="shipping"
              /> -->
          <!-- <CheckService :address="selectedAddress" /> -->

          <v-row no-gutters class="mb-4" align="center">
            <h4 class="text-subtitle-2 ml-4">2. Choose a billing address</h4>
            <v-checkbox
              v-model="billingAddress.status"
              label="same address as shipping"
              class="mt-0 ml-2"
              hide-details
          /></v-row>

          <section v-if="billingAddress.status == false">
            <v-fade-transition>
              <UserAddress
                :addresses="addresses"
                v-model="billingAddress.value"
            /></v-fade-transition>
          </section>
          <v-app-bar bottom fixed
            ><v-btn color="secondary" block :disabled="empty"
              >To Shipping</v-btn
            ></v-app-bar
          >
        </v-stepper-content>

        <v-stepper-content step="2">
          <CartOverview :deliveryAddress="selectedAddress">
            <template slot="rows">
              <p class="title my-0">Shipping: xxxx</p>
              <p class="title my-0">total: {{ total }}</p>
            </template>
          </CartOverview>
          <!-- <ShippingSelect :address="selectedAddress" /> -->
          <v-app-bar bottom fixed
            ><v-btn color="primary" outlined width="50%" :disabled="empty"
              >Change Address</v-btn
            ><v-btn color="secondary" :disabled="empty" width="50%"
              >To Payment</v-btn
            ></v-app-bar
          >
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
          <v-btn text>Cancel</v-btn>
        </v-stepper-content></v-stepper-items
      >
    </v-stepper>

    <v-row no-gutters v-if="product.length">
      <h6 class="subtitle-1 my-2">Cart Overview</h6>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import UserAddress from '@/components/checkout/UserAddress'
import CartOverview from '@/components/cart/CartOverview'
export default {
  data() {
    return {
      // addresses: [],
      selectedAddress: {},
      billingAddress: { status: true, value: {} },
    }
  },
  components: {
    CartOverview,
    UserAddress,
  },
  computed: {
    ...mapGetters({
      total: 'cart/total',
      product: 'cart/products',
      empty: 'cart/empty',
      addresses: 'userAddress',
    }),
  },
  methods: {
    checkService(val) {
      this.selectedAddress = val
    },
  },

  async fetch({ store }) {
    await store.dispatch('getUserAddress')
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
}
</script>
<style>
@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__label {
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box; /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Chrome */
    display: flex !important; /* NEW, Spec - Opera 12.1, Firefox 20+ */
  }
}
@media only screen and (max-width: 959px) {
  .v-stepper:not(.v-stepper--vertical) .v-stepper__step__step {
    margin: 4px 12px !important;
  }
}
</style>

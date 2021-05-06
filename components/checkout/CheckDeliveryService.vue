<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending" class="text-center">
      <PageLoader :message="'fetching courier serviceability...'" />
    </section>
    <section v-if="$fetchState.error">
      There was some error fetching addresses.
    </section>
    <section v-if="!$fetchState.pending">
      <v-container class="pa-0" fluid v-if="shippingAvailable">
        <v-radio-group v-model="selectedShipping" row disabled>
          <template v-slot:label>
            <div>available <strong>shipping</strong></div>
          </template>
          <v-radio
            v-for="(option, n) in shippingOptions"
            :key="n"
            :value="option"
          >
            <template v-slot:label>
              <div>
                <strong class="success--text">{{ option.code }}</strong> | etd -
                {{ option.etd }}
              </div>
            </template>
          </v-radio>
        </v-radio-group>
      </v-container>
      <v-container fluid class="pa-0" v-else>
        <v-alert border="right" colored-border type="error" elevation="2">
          Sorry, this product cannot be shipped to the selected location. :'(
        </v-alert></v-container
      >
    </section>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    deliveryAddress: {
      required: true,
      type: Object,
    },
    product: {
      required: true,
      type: Object,
    },
    selectedable: {
      required: false,
      type: Boolean,
    },
  },
  data() {
    return {
      shippingAvailable: false,
      selectedShipping: null,

      errorMessage: null,

      // pickupPin: null,
      // deliveryPin: null,
      // weight: null,

      // pinRules: [
      //   (v) => !!v || 'Name is required',
      //   (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      // ],
      cod: 0,
      services: null,
      couriers: null,
      shippingOptions: {
        free: { code: 'free', etd: null, price: 0 },
        standard: { code: 'standard', etd: null, price: null },
        express: { code: 'express', etd: null, price: null },
      },
    }
  },
  watch: {
    deliveryAddress(val) {
      if (val.postal_code) {
        this.checkService(val)
      }
    },
  },

  computed: {
    ...mapGetters({
      token: 'shippingToken',
    }),
  },
  async fetch() {
    if (this.deliveryAddress.country_code == 'IN') {
      await this.getLocalDetails()
    }
  },
  methods: {
    ...mapMutations({
      setShippingAvailability: 'cart/SET_SHIPPING_AVAILABLE',
    }),
    checkService(val) {
      if (val.country_code == 'IN') {
        // this.deliveryPin = val.postal_code
        // this.pickupPin = this.product.pickup_address.postal_code
        // this.weight = this.product.weight
        this.getLocalDetails()
      }
    },
    async getLocalDetails() {
      await this.$axios
        .$get(
          'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            params: {
              pickup_postcode: this.product.pickup_address.postal_code,
              delivery_postcode: this.deliveryAddress.postal_code,
              weight: this.product.weight,
              cod: this.cod,
            },
          }
        )
        .then((res) => {
          if (res.status == 200) {
            this.services = res.data
            this.couriers = res.data.available_courier_companies
            this.availableServices()
            this.submitted = true
            this.shippingAvailable = true
          } else {
            this.shippingAvailable = false
            this.setShippingAvailability(false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorMessage = 'service not available, kindly contact support.'
          this.shippingAvailable = false
          this.setShippingAvailability(false)
        })
    },
    // fastestCourier() {
    //   this.couriers.sort((a, b) => a.etd_hours - b.etd_hours)
    //   this.selectedCourier = this.couriers[0]
    // },
    // cheapestCourier() {
    //   this.couriers.sort((a, b) => a.rate - b.rate)
    //   this.selectedCourier = this.couriers[0]
    // },
    availableServices() {
      if (this.couriers) {
        this.couriers.sort((a, b) => a.etd_hours - b.etd_hours)
        let fastest = this.couriers[0]
        this.couriers.sort((a, b) => a.rate - b.rate)
        let cheapest = this.couriers[0]
        if (cheapest.rate > 120) {
          delete this.shippingOptions.free
          this.shippingOptions.standard.etd = cheapest.estimated_delivery_days
          this.shippingOptions.standard.price = cheapest.estimated_delivery_days
        } else {
          delete this.shippingOptions.standard
          this.shippingOptions.free.etd = cheapest.estimated_delivery_days
        }
        if (
          fastest.estimated_delivery_days < cheapest.estimated_delivery_days
        ) {
          this.shippingOptions.express.etd = fastest.estimated_delivery_days
          this.shippingOptions.express.price = fastest.rates
        } else {
          delete this.shippingOptions.express
        }
      }
    },
    // recommendedCourier() {
    //   this.selectedCourier = this.couriers.find(
    //     (courier) =>
    //       courier.courier_company_id ===
    //       this.services.recommended_courier_company_id
    //   )
    // },
  },
}
</script>


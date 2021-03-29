<template>
  <v-container fluid>
    {{ deliveryAddress }} and {{ product.stocks }}
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

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
  },
  data() {
    return {
      selectedCourier: null,
      courierSort: undefined,
      errorMessage: null,
      loadingState: false,
      sheet: false,
      submitted: false,
      valid: true,
      pickupPin: 700074,
      deliveryPin: 700074,
      endPoint: null,
      pinRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      cod: 0,
      services: {},
      couriers: [],
    }
  },
  watch: {
    address(val) {
      if (val.postal_code) {
        this.checkService(val)
      }
    },
  },
  created() {
    //this.$store.dispatch('getShippingToken')
  },
  computed: {
    ...mapGetters({
      token: 'shippingToken',
    }),
  },
  methods: {
    checkService(val) {
      this.deliveryPin = val.postal_code
      this.getDetails()
    },
    async getDetails() {
      this.loadingState = true
      await this.$axios
        .$get(
          'https://apiv2.shiprocket.in/v1/external/courier/serviceability/',
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
            params: {
              pickup_postcode: this.pickupPin,
              delivery_postcode: this.deliveryPin,
              weight: 1,
              cod: this.cod,
            },
          }
        )
        .then((res) => {
          this.services = res.data
          this.couriers = res.data.available_courier_companies
          this.recommendedCourier()
          this.submitted = true
          this.loadingState = false
        })
        .catch((err) => {
          console.log(err)
          this.errorMessage = 'service not available, try later'
          this.loadingState = false
        })
    },
    fastestCourier() {
      this.couriers.sort((a, b) => a.etd_hours - b.etd_hours)
      this.selectedCourier = this.couriers[0]
    },
    cheapestCourier() {
      this.couriers.sort((a, b) => a.rate - b.rate)
      this.selectedCourier = this.couriers[0]
    },
    recommendedCourier() {
      this.selectedCourier = this.couriers.find(
        (courier) =>
          courier.courier_company_id ===
          this.services.recommended_courier_company_id
      )
    },
  },
}
</script>


<template>
  <v-container fluid class="pa-0">
    <section v-if="$fetchState.pending" class="text-center">
      <PageLoader :message="'fetching courier serviceability...'" />
    </section>
    <section v-if="$fetchState.error">
      <h4 class="text-center body-1">
        There was some error fetching courier details.
      </h4>
    </section>
    <section v-if="!$fetchState.pending">
      <v-container class="pa-0" fluid v-if="shippingAvailable">
        <v-row no-gutters align="center">
          <h5 class="text-subtitle-2 text--secondary ma-2">
            available couriers({{ couriers.length }})
          </h5>
          <v-btn-toggle mandatory rounded>
            <v-btn small @click.prevent="cheapestCourier">
              <v-icon left>mdi-currency-usd</v-icon>cheapest
            </v-btn>
            <v-btn small @click.prevent="fastestCourier">
              <v-icon left>mdi-bike-fast</v-icon>fastest
            </v-btn>
          </v-btn-toggle></v-row
        >
        <v-slide-group v-model="selectedCourier" mandatory>
          <v-slide-item
            class="ma-2"
            v-for="(service, i) in couriers"
            :key="i"
            v-slot:default="{ active, toggle }"
            :value="service"
          >
            <v-row
              no-gutters
              class="fill-height mb-8"
              align="center"
              justify="center"
            >
              <v-card
                width="100%"
                class="nucard text-center text-caption px-2 py-4"
                @click="toggle"
                :color="active ? 'secondary' : null"
                :dark="active ? true : false"
                rounded="lg"
              >
                <p class="mb-1">
                  {{ service.courier_name }}<br />
                  Rate: ₹ {{ service.rate }}<br />
                  ETD: {{ service.etd }}<br />
                  Estimated: {{ service.estimated_delivery_days }}
                  days
                </p>

                <v-row no-gutters justify="center" align="center">
                  ({{ service.rating }})<v-rating
                    :value="service.rating"
                    color="yellow accent-4"
                    dense
                    half-increments
                    readonly
                    size="16"
                  ></v-rating
                ></v-row>
              </v-card>
            </v-row>
          </v-slide-item>
        </v-slide-group>
      </v-container>
      <v-container fluid v-else>
        {{ token }}
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
      selectedCourier: null,

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
      shipping: {},
    }
  },
  watch: {
    deliveryAddress() {
      this.fetch()
    },
    selectedCourier() {
      this.updateShipping()
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
      // setShippingAvailability: 'cart/SET_SHIPPING_AVAILABLE',
      setShipping: 'cart/SET_PRODUCT_SHIPPING',
    }),
    updateShipping() {
      if (this.selectedCourier != null) {
        this.shipping.id = this.product.id
        this.shipping.courier_id = this.selectedCourier.courier_company_id
        this.shipping.courier_name = this.selectedCourier.courier_name
        this.shipping.shipping_rate = this.selectedCourier.rate
        this.shipping.etd = this.selectedCourier.estimated_delivery_days
        this.shipping.address_id = this.deliveryAddress.id
        this.setShipping(this.shipping)
      }
    },
    async getLocalDetails() {
      // this.$shipping.setHeader('Authorization', this.$token) not working
      await this.$shipping.setToken(this.$token, 'Bearer')
      // console.log(this.$shipping)
      await this.$shipping
        .$get('courier/serviceability', {
          // withCredentials: false,
          headers: {
            common: {
              Authorization: `Bearer ${this.token}`,
              // 'Content-Type': 'application/json',
            },
          },
          params: {
            pickup_postcode: this.product.pickup_address.postal_code,
            delivery_postcode: this.deliveryAddress.postal_code,
            weight: this.product.weight,
            cod: this.cod,
          },
        })
        .then((res) => {
          if (res.status == 200) {
            this.services = res.data
            this.couriers = res.data.available_courier_companies
            //  this.availableServices()
            this.cheapestCourier()
            this.shippingAvailable = true
          } else {
            this.shippingAvailable = false
            // this.setShippingAvailability(false)
          }
        })
        .catch((err) => {
          console.log(err)
          this.errorMessage = 'service not available, kindly contact support.'
          this.shippingAvailable = false
          //this.setShippingAvailability(false)
        })
    },
    fastestCourier() {
      this.couriers.sort(
        (a, b) => a.estimated_delivery_days - b.estimated_delivery_days
      )
      this.selectedCourier = this.couriers[0]
    },
    cheapestCourier() {
      this.couriers.sort((a, b) => a.rate - b.rate)
      this.selectedCourier = this.couriers[0]
    },
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

<style scoped>
.v-application.theme--light .nucard {
  transition: background 0.1s, color 0.1s;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
}
.v-application.theme--dark .nucard {
  transition: background 0.1s, color 0.1s;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7),
    -5px -5px 10px rgba(255, 255, 255, 0.1);
}
</style>

<template>
  <v-container fluid class="px-0">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row no-gutters align="center" class="mb-2">
        <v-text-field
          v-model="pincode1"
          label="Pincode"
          :rules="pinRules"
          counter="6"
          required
          :error-messages="errorMessage"
        ></v-text-field>
        <v-checkbox
          v-model="cod"
          false-value="0"
          true-value="1"
          required
          class="mx-2"
        >
          <template v-slot:label>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span class="text-caption" v-on="on">
                  Cash On<br />
                  Delivery
                </span>
              </template>
              <span class="text-caption">
                check if cash on delivery is available at your pincode.</span
              >
            </v-tooltip>
          </template></v-checkbox
        >
        <v-btn @click="getDetails" :loading="loadingState" small
          >Check Delivery</v-btn
        >
        <v-btn outlined @click="sheet = !sheet" small>saved address</v-btn>
        <v-bottom-sheet v-model="sheet">
          <v-sheet class="text-center" height="200px">
            <v-btn class="mt-6" text @click="sheet = !sheet"> close </v-btn>
            <div class="py-3">Saved Address</div>
          </v-sheet>
        </v-bottom-sheet>
      </v-row> </v-form
    ><v-slide-y-transition>
      <v-sheet v-if="submitted" class="pa-0" elevation="4" rounded>
        <v-row no-gutters justify="center">
          <v-btn-toggle v-model="courierSort" mandatory rounded class="mt-2">
            <v-btn small text @click="recommendedCourier">recommended</v-btn>
            <v-btn small text @click="fastestCourier">fastest</v-btn>
            <v-btn small text @click="cheapestCourier">cheapest</v-btn>
          </v-btn-toggle></v-row
        >
        <v-slide-group v-model="selectedCourier" class="pa-0" show-arrows>
          <v-slide-item
            class="ma-1"
            v-for="(service, i) in couriers"
            :key="i"
            v-slot:default="{ active, toggle }"
            :value="service"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              height="140"
              width="170"
              @click="toggle"
            >
              <v-row
                no-gutters
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-card
                  width="100%"
                  outlined
                  class="text-center text-caption py-1"
                >
                  <p class="mb-1">
                    {{ service.courier_name }}<br />
                    Rate: ₹ {{ service.rate }}<br />
                    ETD: {{ service.etd }}<br />
                    Estimated: {{ service.estimated_delivery_days }}
                    days
                  </p>

                  <v-row no-gutters justify="center">
                    ({{ service.rating }})<v-rating
                      :value="service.rating"
                      color="yellow accent-4"
                      dense
                      half-increments
                      readonly
                      size="18"
                    ></v-rating
                  ></v-row>
                </v-card>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group> </v-sheet
    ></v-slide-y-transition>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      selectedCourier: null,
      courierSort: undefined,
      errorMessage: null,
      loadingState: false,
      sheet: false,
      submitted: false,
      valid: true,
      pincode1: 700074,
      pincode2: 700074,
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
  created() {
    this.$store.dispatch('getShippingToken')
  },
  computed: {
    ...mapGetters({
      token: 'shippingToken',
    }),
  },
  methods: {
    async getDetails() {
      this.loadingState = true
      await this.$axios
        .$get(
          `https://apiv2.shiprocket.in/v1/external/courier/serviceability/?pickup_postcode=${this.pincode1}&delivery_postcode=${this.pincode2}&weight=1&cod=${this.cod}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
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

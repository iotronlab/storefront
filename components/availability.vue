<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="pincode1"
        label="Pincode"
        :rules="pinRules"
        counter="10"
        required
      ></v-text-field>
      <v-checkbox
        v-model="cod"
        false-value="0"
        true-value="1"
        label="COD"
        required
      ></v-checkbox>
      <v-btn :disabled="!valid" primary @click="getDetails"
        >Available services
      </v-btn>
      <v-btn primary @click="generateOrder"> Place Order </v-btn>
      <v-btn :disabled="!successOrders" primary @click="generateOrder">
        Cancel order
      </v-btn>
    </v-form>
    <v-sheet v-if="submitted" class="mx-auto" elevation="8" max-width="800">
      <v-slide-group v-model="model" class="pa-4" mandatory show-arrows>
        <v-slide-item
          v-for="(service, i) in services.data.available_courier_companies"
          :key="i"
          v-slot:default="{ active, toggle }"
        >
          <v-card
            :color="active ? 'primary' : 'grey lighten-1'"
            class="ma-4"
            height="160"
            width="170"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-card class="mx-auto" max-width="145" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="headline mb-1">
                        {{ service.courier_name }}
                      </v-list-item-title>
                      <v-list-item-subtitle
                        >Rate: {{ service.rate }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >ETD: {{ service.etd }}</v-list-item-subtitle
                      >
                      <v-list-item-subtitle
                        >Estimated:
                        {{ service.estimated_delivery_days }}
                        days</v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  props: {
    token: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      model: null,
      submitted: false,
      valid: true,
      pincode1: 281001,
      pincode2: 281001,
      endPoint: null,
      pinRules: [
        (v) => !!v || 'Name is required',
        (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      cod: 0,
      services: {},
      successfulOrders: [],
      canceledOrders: [],
    }
  },
  methods: {
    generateOrder() {
      this.$axios
        .post(
          `https://apiv2.shiprocket.in/v1/external/orders/create/adhoc/?order_id=224-477&order_date=2020-12-26 12:01&pickup_location=Jammu&billing_customer_name=Naruto&billing_last_name=Uzumaki&billing_city=New Delhi&billing_pincode=110002&billing_state=Delhi&billing_country=India&billing_email=naruto@uzumaki.com&billing_phone=9876543210&shipping_is_billing=true&shipping_customer_name=Vegita&shipping_address=Planet Vegeta&shipping_city=Mumbai&shipping_pincode=200912&shipping_country=India&shipping_state=Maharashtra&shipping_email=vegeta@saiyyan.com&shipping_phone=987654322&order_items=[{name:Kunai,sku:chakra123,units:10,selling_price:900,hsn:441122}]&payment_method=Prepaid&shipping_charges=0&giftwrap_charges=0&transaction_charges=0&total_discount=0&sub_total=9000&length=10&breadth=15&height=20&weight=2.5`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          console.log(response.data)
          console.log(JSON.stringify(response.data))
          this.successOrders.push(response.data)
          this.canceledOrders.push(response.data)
        })
        .catch(function (error) {
          console.log('error in component')
          console.log(error)
        })
    },
    cancelOrder() {
      this.$axios
        .post(
          `https://apiv2.shiprocket.in/v1/external/orders/cancel/?ids=${[
            this.successOrders[this.successOrders.length],
          ]}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        .then(function (response) {
          console.log(response.data)
          console.log(JSON.stringify(response.data))
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    validate() {
      this.$refs.form.validate()
    },
    getDetails() {
      this.$axios
        .get(
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
          this.submitted = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
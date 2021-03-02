<template>
  <v-container fluid>
    <v-item-group :value="selectedAddress" mandatory>
      <v-row no-gutters>
        <v-col v-for="address in addresses" :key="address.id" cols="12" md="4">
          <v-item
            v-slot="{ active, toggle }"
            :value="address"
            @change="addressSelected(address)"
          >
            <v-card class="nucard ma-1" @click="toggle">
              <v-row no-gutters class="fill-height">
                <v-col class="ma-4">
                  <v-row no-gutters>
                    <h5 class="text-subtitle-2">
                      {{ address.name }}
                      <v-chip small outlined color="primary">
                        {{ address.type }}</v-chip
                      >
                    </h5>
                    <v-spacer />
                    <v-scroll-y-transition>
                      <v-chip small outlined color="success" v-if="active"
                        >Selected<v-icon small
                          >mdi-map-marker-check</v-icon
                        ></v-chip
                      >
                    </v-scroll-y-transition></v-row
                  >
                  <v-divider class="my-2" />

                  <h6 class="text--secondary text-caption">
                    {{ address.contact }}<br />
                    {{ address.address_1 }}
                    {{ address.address_2 || null }}, <br />
                    {{ address.landmark }}<br />
                    {{ address.city }}.<br />
                    Pin {{ address.postal_code }} <br />
                    State {{ address.state }}<br />
                    Country {{ address.country_code }} Default:
                    {{ address.default }}
                  </h6></v-col
                >
              </v-row>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
  </v-container>
</template>

<script>
import UserAddressCreate from './UserAddressCreate'
export default {
  model: {
    prop: 'selectedAddress',
    event: 'selected-address',
  },
  props: {
    addresses: {
      required: true,
      type: Array,
    },
    selectedAddress: {
      required: true,
      type: Object,
    },
    type: {
      required: false,
      type: String,
    },
  },

  data() {
    return {
      // selecting: false,
      // creating: false,
      // addresses: null,
      //selectedAddress: null,
    }
  },

  // mounted() {
  //   console.log(this.addresses)
  //   this.selectedAddress = this.addresses.find(
  //     (address) => address.default == true
  //   )
  // },
  methods: {
    addressSelected(address) {
      this.$emit('selected-address', address)
    },
    // switchAddress(address) {
    //   this.selectedAddress = address
    // },
    // created(address) {
    //   this.localAddresses.push(address)
    //   this.creating = false
    //   this.switchAddress(address)
    // },
  },
}
</script>

<template>
  <v-container fluid class="pa-2">
    <p>Addresses below</p>
    <template v-if="selecting">
      <UserAddressSelect
        :addresses="addresses"
        :selectedAddress="selectedAddress"
        @click="addressSelected"
      />
    </template>
    <template v-else-if="creating">
      <UserAddressCreate @cancel="creating = false" @created="created" />
    </template>
    <template v-else>
      <template v-if="selectedAddress">
        <p>
          {{ selectedAddress.name }}
          <br />
          {{ selectedAddress.address_1 }}
          <br />
          {{ selectedAddress.city }}
          <br />
          {{ selectedAddress.postal_code }}
          <br />
          {{ selectedAddress.state.name }}
        </p>
        <v-btn
          class="ma-1"
          color="purple darken-1"
          @click.prevent="selecting = true"
          >Change</v-btn
        >
        <v-btn
          class="ma-1"
          color="green darken-3"
          @click.prevent="creating = true"
          >Add</v-btn
        >
      </template>
    </template>
  </v-container>
</template>

<script>
import UserAddressSelect from './UserAddressSelect'
import UserAddressCreate from './UserAddressCreate'
export default {
  data() {
    return {
      selecting: false,
      creating: false,
      localAddresses: this.addresses,
      selectedAddress: null,
    }
  },
  props: {
    addresses: {
      required: true,
      type: Array,
    },
  },
  components: {
    UserAddressSelect,
    UserAddressCreate,
  },

  computed: {
    defaultAddress() {
      return this.localAddresses.find((address) => address.default === true)
    },
  },
  methods: {
    addressSelected(address) {
      this.switchAddress(address)
      this.selecting = false
    },
    switchAddress(address) {
      this.selectedAddress = address
    },
    created(address) {
      this.localAddresses.push(address)
      this.creating = false
      this.switchAddress(address)
    },
  },
  created() {
    console.log('in created')
    console.log(this.addresses.length)
    if (this.addresses.length) {
      this.switchAddress(this.defaultAddress)
    }
  },
}
</script>
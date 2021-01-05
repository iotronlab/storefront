<template>
  <v-container fluid>
    <p>Addresses below</p>
    {{ selectedAddress }}
  
    <template v-if="creating">
      <UserAddressCreate @cancel="creating = false" @created="created" />
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

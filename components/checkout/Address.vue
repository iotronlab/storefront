<template>
  <v-container fluid>
    <section>
      <v-row no-gutters align="center">
        <h4 class="text-caption" v-if="addresses.length > 1">
          Saved Addresses
          <span>({{ addresses.length }})</span>
        </h4>
        <h4 class="text-caption" v-if="addresses.length == 0">
          There are no addresses at the moment.
        </h4>
        <v-btn class="mx-2" color="secondary" small rounded @click="newAddress">
          Add Address
        </v-btn>

        <v-dialog
          v-model="addressForm"
          persistent
          fullscreen
          transition="scale-transition"
          origin="center center"
        >
          <v-card>
            <v-toolbar fixed dense dark color="secondary">
              <v-toolbar-title class="text-subtitle-2">{{
                editMode ? 'Edit Address' : 'Add Address'
              }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="reset">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <UserAddressCreate
              :addressData="addressFormData"
              :edit="editMode"
              @update:address="updateAddress"
              @reset:address="reset"
            />
          </v-card> </v-dialog
      ></v-row>
      <v-divider class="my-2" />
      <UserAddress :addresses="addresses" v-model="selectedAddress" />
      <!-- <v-row no-gutters>
        <v-col
          v-for="(address, n) in addresses"
          :key="n"
          cols="12"
          md="4"
          class="pa-2"
        >
          <v-card class="nucard" rounded="lg">
            <v-row no-gutters class="fill-height">
              <v-col class="ma-4">
                <h5 class="text-subtitle-2">
                  {{ address.name }}
                  <v-chip x-small outlined color="primary">
                    {{ address.type }}</v-chip
                  >
                </h5>
                <v-divider class="my-1" />

                <h6 class="text--secondary text-caption">
                  {{ address.contact }}<br />
                  {{ address.address_1 }}
                  {{ address.address_2 || null }}, <br />
                  {{ address.landmark }}<br />
                  {{ address.city }}.<br />
                  Pin {{ address.postal_code }} <br />
                  State {{ address.state }}<br />
                  Country {{ address.country_code }}
                </h6></v-col
              >
            </v-row>
            <v-divider />
            <v-card-actions>
              <v-scroll-y-transition>
                <v-row no-gutters align="center" class="text--secondary">
                  <v-btn
                    v-if="address != defaultAddress"
                    x-small
                    rounded
                    @click="setDefault(address)"
                    >Set Default<v-icon small color="success"
                      >mdi-map-marker-check-outline</v-icon
                    ></v-btn
                  >

                  <h6 class="caption" v-if="address == defaultAddress">
                    <v-icon color="success">mdi-map-marker-check-outline</v-icon
                    >Default
                  </h6>
                  <v-btn
                    x-small
                    rounded
                    class="mx-2"
                    @click.prevent="editAddress(address)"
                  >
                    edit
                    <v-icon small>mdi-file-document-edit-outline</v-icon></v-btn
                  >
                  <v-btn
                    icon
                    x-small
                    outlined
                    color="error"
                    @click.prevent="deleteAddress(address)"
                  >
                    <v-icon small>mdi-delete</v-icon></v-btn
                  ></v-row
                >
              </v-scroll-y-transition>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row> -->
    </section>
  </v-container>
</template>

<script>
import UserAddressCreate from '~/components/checkout/UserAddressCreate.vue'
import { mapGetters } from 'vuex'
export default {
  components: { UserAddressCreate },
  data() {
    return {
      //addresses: [],
      //address form dialog
      addressForm: false,
      //if address form is edited
      editMode: false,
      addressFormData: null,
      selectedAddress: {},
    }
  },

  computed: {
    defaultAddress: {
      get() {
        return this.addresses.find((address) => address.default == true)
      },
      set(value) {
        if (value.default == true) {
          //
          this.addresses.forEach((address) => {
            if (address.id != value.id) {
              address.default = false
            } else address.default = true
          })
          // this.defaultAddress = value
        }
      },
    },
  },
  // async fetch() {
  //   await this.$axios
  //     .$get('address')
  //     .then((res) => {
  //       this.addresses = res.data
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // },
  computed: {
    ...mapGetters({
      addresses: 'userAddress',
    }),
  },
  watch: {
    selectedAddress(val) {
      this.checkService(val)
    },
  },
  methods: {
    checkService(val) {
      this.$emit('selected:address', val)
    },
    updateAddress(data) {
      //returns -1 if not found
      let existingAddress = this.addresses.findIndex(
        (address) => address.id == data.id
      )
      if (existingAddress != -1) {
        this.addresses.splice(existingAddress, 1, data)
      } else {
        this.addresses.unshift(data)
      }
      this.defaultAddress = data
      this.editMode = false
      this.addressForm = false
      this.$toast.success('Address saved successfully!')
      // this.setDefault(address)
      //this.$fetch()
    },
    async setDefault(address) {
      await this.$axios
        .$put(`address/${address.id}`, { default: true })
        .then((res) => {
          this.defaultAddress = res.data
          this.$toast.success('Default address updated!')
        })
        .catch((err) => {
          console.log(err)
        })
    },
    reset() {
      this.editMode = false
      this.addressForm = false
    },
    newAddress() {
      this.editMode = false
      this.addressForm = true
    },
    editAddress(address) {
      this.editMode = true
      this.addressForm = true
      this.addressFormData = address

      //this.$refs.addr.editAddress(address)
    },
    async deleteAddress(data) {
      await this.$axios
        .$delete(`address/${data.id}`)
        .then((res) => {
          this.$toast.success(res.message)
          let existingAddress = this.addresses.findIndex(
            (address) => address.id == data.id
          )

          this.addresses.splice(existingAddress, 1)
        })
        .catch((err) => {
          console.log(err)
          this.$toast.error(err.message)
        })
    },
  },
}
</script>

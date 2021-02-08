<template>
  <v-container fluid>
    <section v-if="$fetchState.pending" class="text-center">
      <PageLoader :message="'fetching your saved locations...'" />
    </section>
    <section v-if="$fetchState.error">
      There was some error fetching addresses.
    </section>
    <section v-if="!$fetchState.pending">
      <v-row no-gutters>
        <v-btn color="secondary" @click="newAddress"> Add Address </v-btn>

        <v-dialog
          v-model="addressForm"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="secondary">
              <v-btn icon dark @click="reset">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>Add Address</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <UserAddressCreate
              :address="addressFormData"
              :edit="editMode"
              @update:address="updateAddress"
            />
          </v-card> </v-dialog
      ></v-row>
      <v-item-group v-model="selectedAddress" mandatory ref="check">
        <v-row no-gutters>
          <v-col
            v-for="(address, n) in addresses"
            :key="n"
            cols="12"
            md="4"
            class="pa-1"
          >
            <v-item v-slot="{ active, toggle }" :value="address">
              <v-card @click="toggle" class="nucard">
                <v-row no-gutters class="fill-height pa-2">
                  <h6 class="text-caption">
                    {{ address }}
                    {{ address.name }}<br />
                    {{ address.address_1 }}
                    {{ address.address_2 || null }}, <br />
                    {{ address.city }}<br />
                    Pin {{ address.postal_code }} <br />
                    State {{ address.state }}<br />
                    Country {{ address.country }}
                  </h6>
                </v-row>
                <v-card-actions>
                  <v-scroll-y-transition>
                    <v-row no-gutters v-if="active" align="center">
                      <v-btn
                        v-if="address.default === 0"
                        x-small
                        outlined
                        rounded
                        @click.self="a"
                        >Set Default<v-icon small
                          >mdi-map-marker-check-outline</v-icon
                        ></v-btn
                      >

                      <h6 class="caption" v-if="address.default === 1">
                        <v-icon color="success"
                          >mdi-map-marker-check-outline</v-icon
                        >Default
                      </h6>
                      <v-btn
                        x-small
                        outlined
                        rounded
                        class="mx-2"
                        @click.prevent="editAddress(address)"
                      >
                        edit
                        <v-icon small
                          >mdi-file-document-edit-outline</v-icon
                        ></v-btn
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
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </section>
  </v-container>
</template>

<script>
import UserAddressCreate from '~/components/checkout/UserAddressCreate.vue'
export default {
  components: { UserAddressCreate },
  data() {
    return {
      addresses: [],
      selectedAddress: null,
      addressForm: false,
      editMode: false,
      addressFormData: null,
    }
  },

  computed: {
    // defaultAddress() {
    //   return this.addresses.find((address) => address.default === 1)
    // },
  },
  async fetch() {
    await this.$axios
      .$get('address')
      .then((res) => {
        this.addresses = res.data

        this.setDefault()
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    updateAddress(address) {
      // let existingAddress = this.addresses.indexOf(address)
      // if (existingAddress) {
      //   this.addresses.splice(existingAddress, 1, address)
      //   this.editMode = false
      // } else {
      //   this.addresses.push(address)
      // }

      this.addressForm = false
      // this.setDefault(address)
      this.$fetch()
    },
    setDefault() {
      // if (address.default) {
      //   this.selectedAddress = address
      // } else {
      this.selectedAddress = this.addresses.find(
        (address) => address.default === 1
      )
      //  }
    },
    reset() {
      this.editMode = false
      this.addressForm = false
    },
    newAddress() {
      ;(this.addressFormData = {
        name: '',
        contact: '',
        type: 'Home',
        address_1: '',
        address_2: '',
        landmark: '',
        city: '',
        postal_code: '',
        state: '',
        country: '',
        default: true,
      }),
        (this.editMode = false),
        (this.addressForm = true)
    },
    editAddress(address) {
      this.editMode = true
      this.addressForm = true
      this.addressFormData = this.selectedAddress

      //this.$refs.addr.editAddress(address)
    },
    async deleteAddress(address) {
      await this.$axios
        .$delete(`address/${address.id}`)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {})
    },
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

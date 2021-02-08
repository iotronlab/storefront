<template>
  <v-container fluid>
    <ValidationObserver ref="observer" v-slot="{}">
      <form action="#" @submit.prevent="store">
        <ValidationProvider
          v-slot="{ errors }"
          name="Name"
          rules="required|max:20"
        >
          <v-text-field
            label="Name"
            filled
            dense
            :counter="20"
            :error-messages="errors"
            v-model="address.name"
          ></v-text-field>
        </ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Contact"
          rules="required|digits:10"
        >
          <v-text-field
            label="Contact"
            v-model="address.contact"
            :counter="10"
            filled
            dense
            :error-messages="errors"
          ></v-text-field
        ></ValidationProvider>

        <v-radio-group mandatory row v-model="address.type">
          <v-radio
            v-for="type in addressType"
            :key="type"
            :label="type"
            :value="type"
          ></v-radio>
        </v-radio-group>
        <ValidationProvider
          v-slot="{ errors }"
          name="Address"
          rules="required|max:120"
        >
          <v-textarea
            label="Address"
            placeholder="Building and Street Number"
            filled
            dense
            rows="3"
            row-height="10"
            no-resize
            :error-messages="errors"
            v-model="address.address_1"
          ></v-textarea
        ></ValidationProvider>
        <v-textarea
          label="Address (optional)"
          filled
          dense
          rows="3"
          row-height="10"
          no-resize
          v-model="address.address_2"
        ></v-textarea>

        <v-text-field
          label="Landmark (optional)"
          filled
          dense
          v-model="address.landmark"
        ></v-text-field>
        <ValidationProvider
          v-slot="{ errors }"
          name="City"
          rules="required|max:100"
        >
          <v-text-field
            label="City"
            filled
            dense
            :error-messages="errors"
            v-model="address.city"
          ></v-text-field
        ></ValidationProvider>

        <ValidationProvider
          v-slot="{ errors }"
          name="Pin code"
          rules="required|digits:6"
        >
          <v-text-field
            label="Pin Code"
            :counter="6"
            filled
            dense
            :error-messages="errors"
            v-model="address.postal_code"
          ></v-text-field
        ></ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="State"
          rules="required|max:100"
        >
          <v-text-field
            label="State"
            filled
            dense
            :error-messages="errors"
            v-model="address.state"
          ></v-text-field
        ></ValidationProvider>
        <ValidationProvider
          v-slot="{ errors }"
          name="Country"
          rules="required|max:100"
        >
          <v-text-field
            label="Country"
            filled
            dense
            :error-messages="errors"
            v-model="address.country"
          ></v-text-field
        ></ValidationProvider>
        <!-- <StateSelector v-model="address.state_id" /> -->
        <v-checkbox v-model="address.default" label="Default"></v-checkbox>

        <v-btn class="mb-1 mr-1" color="secondary" type="submit"
          >Add Address</v-btn
        >
        <!-- <v-btn class="mb-1 ml-1" color="red" dark @click.prevent="$emit('cancel')"
        >cancel</v-btn
      > -->
      </form></ValidationObserver
    >{{ edit }}
  </v-container>
</template>
<script>
import StateSelector from './StateSelector'
import { ValidationObserver } from 'vee-validate'
export default {
  props: {
    address: { type: Object, required: false },
    edit: { type: Boolean, required: true },
  },
  data() {
    return {
      addressType: ['Home', 'Work', 'Other'],
      // form: {
      //   name: '',
      //   contact: '',

      //   type: null,
      //   address_1: '',
      //   address_2: '',
      //   landmark: '',
      //   city: '',
      //   postal_code: '',
      //   state: '',
      //   country: '',
      //   default: true,
      // },
    }
  },
  components: {
    StateSelector,
    ValidationObserver,
  },
  // mounted: function () {
  //   this.form = this.address
  // },
  // watch: {
  //   edit: function (val, oldVal) {
  //     console.log('new: %s, old: %s', val, oldVal)
  //     if (val == true) {
  //       this.form = this.address
  //     }
  //   },
  // },
  methods: {
    async store() {
      if (this.edit == false) {
        if (this.$refs.observer.validate()) {
          await this.$axios
            .$post('address', this.address)
            .then((res) => {
              this.$emit('update:address', res.data)
            })
            .catch((err) => {})
        }
      } else {
        if (this.$refs.observer.validate()) {
          await this.$axios
            .$put(`address/${this.address.id}`, this.address)
            .then((res) => {
              this.$emit('update:address', res.data)
            })
            .catch((err) => {})
        }
      }
      // this.$emit('created', response.data)
    },
    editAddress(address) {
      this.edit = true
      this.form = address
    },
  },
}
</script>

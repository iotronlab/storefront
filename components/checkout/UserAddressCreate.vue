<template>
  <form action="#" @submit.prevent="store">
    <v-container fluid class="pa-0 mt-1">
      <v-text-field label="Name" outlined v-model="form.name"></v-text-field>

      <v-textarea label="Address" outlined rows="3" row-height="10" v-model="form.address_1"></v-textarea>

      <v-text-field label="City" outlined v-model="form.city"></v-text-field>
      <v-row no-gutters>
        <v-text-field label="Pin Code" outlined class="mx-2" v-model="form.postal_code"></v-text-field>
        <StateSelector v-model="form.state_id" />
        {{form}}
      </v-row>
      <v-btn class="mb-1 mr-1" color="primary" type="submit">Add Address</v-btn>
      <v-btn class="mb-1 ml-1" color="red" dark @click.prevent="$emit('cancel')">cancel</v-btn>
    </v-container>
  </form>
</template>
<script>
import StateSelector from "./StateSelector";
export default {
  data() {
    return {
      form: {
        name: "",
        address_1: "",
        city: "",
        postal_code: "",
        state_id: "",
        default: true
      }
    };
  },
  components: {
    StateSelector
  },
  methods: {
    async store() {
      let response = await this.$axios.$post("addresses", this.form);
      this.$emit("created", response.data);
    }
  }
};
</script>
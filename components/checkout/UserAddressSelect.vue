<template>
  <v-row no-gutters class="mx-auto">
    <v-col
      class="mb-2"
      cols="12"
      lg="4"
      md="4"
      sm="12"
      xs="12"
      v-for="address in addresses"
      :key="address.id"
    >
      <p :class="{ 'font-weight-medium': address.id === selectedAddress.id }">
        {{ address.name }}
        <br />
        {{ address.address_1 }}
        <br />
        {{ address.city }}
        <br />
        {{ address.postal_code }}
        <br />
        {{ address.state.name }}
      </p>
      <v-btn class="mb-4" @click.prevent="$emit('click', address)"
        >select</v-btn
      >
      <v-divider />
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    addresses: {
      required: true,
      type: Array,
    },
    selectedAddress: {
      required: true,
      type: Object,
    },
  },
}
</script>
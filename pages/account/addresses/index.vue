<template>
  <v-container>
    <v-row>
      <v-card outlined>
        <UserAddress :addresses="addresses" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import UserAddress from '@/components/checkout/UserAddress'
export default {
  components: {
    UserAddress,
  },
  data() {
    return {
      addresses: [
        {
          id: 1,
          name: 'Alex',
          city: 'London',
          postal_code: 123,
          default: false,
          state: {
            name: '',
          },
          address_1: 'London Street',
        },
        {
          id: 2,
          name: 'Alex',
          city: 'London',
          postal_code: 1234,
          default: false,
          state: {
            name: '',
          },
          address_1: 'London Street',
        },
        {
          id: 3,
          name: 'Alex',
          city: 'Madrid',
          postal_code: 132,
          default: false,
          state: {
            name: '',
          },
          address_1: 'Madrid Street',
        },
        {
          id: 4,
          name: 'Alex',
          city: 'Barcelona',
          postal_code: 1287,
          default: true,
          state: {
            name: '',
          },
          address_1: 'Barcelona Street',
        },
        {
          id: 5,
          name: 'Alex',
          city: 'Paris',
          postal_code: 17823,
          default: false,
          state: {
            name: '',
          },
          address_1: 'Paris Street',
        },
      ],
    }
  },
}
</script>

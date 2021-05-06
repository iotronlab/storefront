<template>
  <v-container fluid>
    <v-slide-group :value="selectedAddress" mandatory>
      <v-row no-gutters>
        <v-slide-item
          v-for="address in addresses"
          :key="address.id"
          v-slot="{ active, toggle }"
          :value="address"
          @change="addressSelected(address)"
        >
          <v-card
            class="ma-1"
            :elevation="active ? 10 : 2"
            @click="toggle"
            rounded
          >
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
                    <v-chip small color="success" v-if="active"
                      ><v-icon small>mdi-map-marker-check</v-icon
                      >selected</v-chip
                    >
                  </v-scroll-y-transition></v-row
                >
                <v-divider class="my-2" />

                <h6 class="text--secondary text-caption">
                  {{ address.contact }}<br />
                  {{ address.address_1 }},<br />
                  {{ address.address_2 }}&nbsp; {{ address.landmark }}<br />
                  City - {{ address.city }}.<br />
                  Pin - {{ address.postal_code }} <br />
                  State - {{ address.state }}<br />
                  Country - {{ address.country_code }}<br />
                  Default - {{ address.default ? 'yes' : 'no' }}
                </h6></v-col
              >
            </v-row>
          </v-card>
        </v-slide-item>
      </v-row>
    </v-slide-group>
  </v-container>
</template>
<script>
export default {
  props: {
    addresses: {
      required: true,
      type: Array,
    },
  },
}
</script>

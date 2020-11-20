<template>
  <v-container>
    <v-card :to="link" class="mx-auto">
      <v-img
        class="white--text align-end"
        height="120px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      </v-img>
      <v-row class="justify-end" no-gutters>
        <v-col cols="7">
          <v-avatar class="profile mx-2 mt-n10" color="grey" size="80">
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="5" class="pt-1 pr-1 text-right"
          ><v-btn color="primary">Follow</v-btn></v-col
        >
        <v-col class="ml-1 py-0"
          ><p>{{ vendor.name }}</p>
        </v-col>
      </v-row>

      <v-card-subtitle class="pb-0">{{ vendor.number }}</v-card-subtitle>

      <v-card-text class="text--primary">
        <div>Whitsunday Island, Whitsunday Islands</div>
      </v-card-text>

      <v-card-actions>
        <v-btn color="orange" text> Share </v-btn>

        <v-btn color="orange" text> Explore </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default {
  props: {
    vendor: {
      required: true,
      type: Object,
    },
  },
  computed: {
    link() {
      return `/artists/${this.vendor.slug}`
    },
  },
}
</script>

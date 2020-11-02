<template>
  <v-container>
    <!--  <v-card class="mx-auto" dark tile height="150">
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-row no-gutters class="fill-height" justify="end" align="end">
          <div>
            <v-btn class="ma-2" color="primary"
              ><v-icon>mdi-hearts-outline</v-icon>Follow</v-btn
            >
          </div>
        </v-row>
      </v-img>
    </v-card>

    <v-card class="pa-2">
      <v-avatar rounded class="profile mt-n12" color="grey" size="164">
        <v-img
          src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
        ></v-img>
      </v-avatar>
      <v-card-title>vendor title</v-card-title>
      <v-card-subtitle
        >I am majorly a freelance portrait vendor. I have a small venture called
        Get A Portrait. I like to play with all kinds of mediums - watercolor,
        acrylic,oil,charcoal.Realism mixed with abstract is what I like to
        do.
      </v-card-subtitle>
    </v-card>-->

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

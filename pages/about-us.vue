<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-img src="/aboutus.png" />
        <h2 headline class="landing-title mt-4" align="center">About Us</h2>
      </v-col>
    </v-row>
    <h2 headline class="landing-title mt-4" align="center">Join Our Network</h2>
    <v-row no-gutters>
      <v-col md="6">
        <v-img src="/contactus.png" />
      </v-col>
      <v-col md="6">
        <v-card class="ma-4">
          <v-card-text>
            {{ name}}
            <v-text-field v-model="name" :counter="20" label="Name" required></v-text-field>

            <v-text-field v-model="email" label="E-mail" required></v-text-field>
            <v-text-field v-model="contact" :counter="20" label="Contact" required></v-text-field>
            <v-textarea v-model="address" label="Address" required></v-textarea>
            <v-text-field v-model="portfolio" label="Portfolio Link" required></v-text-field>
          </v-card-text>
          <v-btn @click="submitForm">Submit</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      contact: '',
      address: '',
      portfolio: '',
    }
  },
  methods: {
    async submitForm() {
      await this.$axios
        .$post('contactform', {
          name: this.name,
          email: this.email,
          contact: this.contact,
          address: this.address,
          portfolio: this.portfolio,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

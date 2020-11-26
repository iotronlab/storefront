<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="title font-weight-regular justify-space-between">
      <span>{{ pageName }}</span>
      <v-avatar
        color="primary lighten-1"
        class="subheading white--text"
        size="24"
        v-text="step"
      ></v-avatar>
    </v-card-title>

    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <v-text-field
            prepend-inner-icon="mdi-email"
            label="Enter your email"
            name="email"
            type="email"
            v-model="email"
            :rules="[rules.required, rules.email]"
            :error-messages="error"
            :loading="isLoading"
          ></v-text-field>
          <span class="caption grey--text text--darken-1">
            You will be recieving an OTP on this email for verification.
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="2">
        <v-card-text>
          <v-text-field label="Password" type="password"></v-text-field>
          <v-text-field label="Confirm Password" type="password"></v-text-field>
          <span class="caption grey--text text--darken-1">
            Please enter a password for your account
          </span>
        </v-card-text>
      </v-window-item>

      <v-window-item :value="3">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="title font-weight-light mb-2">Welcome to Vuetify</h3>
          <span class="caption grey--text">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="step === 3" color="primary" depressed @click="step++">
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    step: 1,
    show: false,
    isLoading: false,
    email: null,

    otp: '',
    name: null,
    password: '',
    confirm_password: '',
    message: '',
    error: null,
    rules: {
      required: (value) => !!value || 'Required.',
      counter: (value) => value.length <= 30 || 'Max 30 characters',
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
      },
    },
  }),
  props: {
    pageName: { required: true, type: String },
  },
  computed: {
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up'
        case 2:
          return 'Create a password'
        default:
          return 'Account created'
      }
    },
  },
  methods: {
    async getOtp() {
      this.isLoading = true
      this.error = null
      this.message = ''
      await this.$axios
        .$post('/otprequest', {
          email: this.email,
          type: this.accountType,
        })
        .then((response) => {
          if (response.success) {
            ;(this.message = response.message),
              (this.name = response.user),
              (this.active = 2),
              (this.error = null)
            this.$store.commit('SET_SNACKBAR', {
              color: 'success',
              text: response.message,
            })
          } else {
            ;(this.error = response.message),
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                text: response.message,
              })
          }
        })
        .catch((e) => {
          console.log(e)
          this.error = "Couldn't send OTP."
          //this.$router.push('/register-reset')
        })
      this.isLoading = false
    },
    async validateOtp() {
      this.isLoading = true
      await this.$axios
        .$post('/otpvalidate', {
          email: this.email,
          otp: this.otp,
        })
        .then((response) => {
          if (response.success) {
            this.message = response.message
            this.error = null
            ;(this.active = 3),
              this.$store.commit('SET_SNACKBAR', {
                color: 'success',
                text: response.message,
              })
          } else {
            ;(this.error = response.message),
              this.$store.commit('SET_SNACKBAR', {
                color: 'warning',
                text: response.message,
              })
          }
        })
        .catch((e) => {
          console.log(e)
          this.error = "Couldn't validate otp."
          //this.$router.push('/register-reset')
        })
      this.isLoading = false
    },

    async register() {
      if (this.password == this.confirm_password) {
        await this.$axios
          .$post('/register', {
            type: this.accountType,
            email: this.email,
            password: this.password,
            name: this.name,
            c_password: this.confirm_password,
          })
          .then((response) => {
            console.log(response.message)
            if (response.success) {
              this.$router.push({
                path: '/auth/social-callback',
                query: { token: response.token },
              })
            } else {
              ;(this.error = response.message),
                this.$store.commit('SET_SNACKBAR', {
                  color: 'warning',
                  text: response.message,
                })
            }
          })
          .catch((e) => {
            console.log(e), (this.error = 'Registration failed.')
          })
      } else {
        this.error = 'Passwords not matching.'
      }
    },
  },
}
</script>

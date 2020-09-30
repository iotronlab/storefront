<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn rounded color="primary" dark v-on="on">Login</v-btn>
    </template>
    <template>
      <v-card width="100%">
        <v-row no-gutters>
          <v-col class="d-flex justify-center" md="8" offset-md="2">
            <v-form @submit.prevent="login" id="login-form" method="post">
              <v-img
                src="/butiq.png"
                contain
                height="120"
                width="120"
                max-width="120"
                class="mx-auto"
              />

              <v-text-field
                prepend-icon="mdi-email"
                label="Email ID"
                placeholder=" "
                name="email"
                type="email"
                v-model="email"
                autocomplete="off"
                required
              ></v-text-field>
              <v-text-field
                id="password"
                prepend-icon="mdi-lock"
                v-model="password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                label="Password"
                name="password"
                placeholder=" "
                hint="At least 8 characters"
                autocomplete="off"
                @click:append="show = !show"
              ></v-text-field>
              {{ message }}
              <div class="d-flex justify-center">
                <v-btn
                  color="primary"
                  rounded
                  outlined
                  type="submit"
                  class="mt-4"
                  >LogIn</v-btn
                >
              </div>

              <br />
              <hr />
              <br />
              <p class="text-center grey--text subtitle-2">LOG IN VIA</p>

              <div>
                <v-btn
                  color="blue"
                  class="white--text mr-1"
                  @click.prevent="loginWithFacebook"
                >
                  facebook
                  <v-icon right>mdi-facebook</v-icon>
                </v-btn>

                <v-btn
                  color="red"
                  class="white--text ml-1"
                  @click.prevent="loginWithGoogle"
                >
                  google
                  <v-icon right>mdi-google</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-col>
        </v-row>

        <br />
        <hr />

        <v-card-actions>
          <v-row justify="space-around">
            <v-btn
              text
              small
              rounded
              to="#"
              class="font-weight-light text-xs-center"
              >Create an account</v-btn
            >

            <v-btn
              text
              small
              rounded
              to="#"
              class="font-weight-light text-xs-center"
              >Forgot Password?</v-btn
            >
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      email: '',
      password: '',
      show: false,
      rules: {
        required: (v) => !!v || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailValid: (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      },
      checkbox: false,

      message: '',
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
      this.checkLogin()
    },
    async loginWithFacebook() {
      window.location.href = `https://api.butiq.co.in/public/api/login/facebook`
      this.checkLogin()
    },
    async loginWithGoogle() {
      window.location.href = `https://api.butiq.co.in/public/api/login/google`
      this.checkLogin()
    },
    checkLogin() {
      console.log(this.$auth.user)
      if (this.$auth.loggedIn) {
        this.dialog = false
      } else {
        this.message = 'Invalid email or password'
      }
    },
  },
}
</script>


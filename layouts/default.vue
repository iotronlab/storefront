<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <!-- {{ categories }} -->
      <LazyNavDrawer :items="categories" v-if="categories.length > 0" />
    </v-navigation-drawer>
    <v-app-bar id="nav" fixed app flat class="nav-transparent">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="{ name: 'index' }">
        <v-img src="/logo.png" alt="artistic logo" width="85" />
      </nuxt-link>
      <v-container fluid class="pa-0">
        <v-row no-gutters class="pa-0" align="center">
          <v-col class="hidden-md-and-down">
            <v-col class="d-flex align-center">
              <!-- nav categories -->

              <v-col v-for="category in categories" :key="category.slug">
                <v-menu
                  open-on-hover
                  :close-on-content-click="false"
                  class="hidden-sm-and-down"
                  bottom
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <!--slug in name:'category-slug' is taking the value of slug defined in "params: { slug: category.slug, name: category}" -->
                    <v-btn
                      :to="{
                        name: 'category-slug',
                        params: { slug: category.slug },
                      }"
                      text
                      small
                      rounded
                      v-on="on"
                      color="primary"
                      class="font-weight-bold"
                    >
                      {{ category.name }}
                    </v-btn>
                  </template>
                  <DropDown :navMenu="category.children" />
                </v-menu>
              </v-col>
              <v-col
                ><v-btn text small color="primary" class="font-weight-bold"
                  >Custom Art</v-btn
                ></v-col
              >
            </v-col>
          </v-col>

          <v-col class="d-flex justify-end align-center">
            <v-col class="hidden-sm-and-down mx-2">
              <v-text-field
                append-icon="mdi-magnify"
                placeholder="find artworks, artists, art forms..."
                filled
                color="primary"
                hide-details
                rounded
                dense
              />
            </v-col>

            <!-- Account button -->
            <span class="mx-2" v-if="$auth.loggedIn == false">
              <!-- <Login /> -->
              <v-btn rounded color="secondary" to="/auth/login">Sign in</v-btn>
            </span>

            <!-- Account button -->
            <div v-if="$auth.loggedIn" class="hidden-sm-and-down mr-2">
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn color="secondary" dark v-on="on" icon>
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </template>
                <ProfileList />
              </v-menu>
            </div>

            <!-- Cart button -->
            <div v-if="$auth.loggedIn == true">
              <v-badge overlap color="secondary">
                <span slot="badge">{{ cartCount }}</span>
                <v-btn :to="{ name: 'cart' }" rounded outlined color="primary">
                  Cart
                  <v-icon right>mdi-cart</v-icon>
                </v-btn>
              </v-badge>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <LazyFooter />
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Login from '@/components/auth/Login'
import DropDown from '~/components/nav/DropDown'
import NavDrawer from '@/components/nav/NavDrawer'
export default {
  components: { Login, NavDrawer },

  data() {
    return {
      drawer: false,
      avatar: '/butiq.png',
      selectedItem: null,
    }
  },
  created() {
    this.initialize()
  },
  mounted() {
    let myNav = document.getElementById('nav')
    window.onscroll = function () {
      'use strict'
      if (document.body.scrollTop >= 200) {
        myNav.classList.add('nav-transparent')
      } else {
        myNav.classList.remove('nav-transparent')
      }
    }
  },

  computed: {
    ...mapGetters({
      categories: 'categories',
      //cartProducts: "cart/products",
      cartCount: 'cart/cartCount',
      // authenticated: "user/getAuthentication"
    }),
    ...mapState({
      // user: state => state.auth.user
    }),
  },

  methods: {
    ...mapActions(['updateNavMenu']),
    async initialize() {
      await this.updateNavMenu()
    },
    selected(item) {
      this.selectedItem = item
    },
  },
}
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <!-- {{ categories }} -->
      <LazyNavDrawer :items="categories" v-if="categories.length > 0" />
      <ProfileList />
    </v-navigation-drawer>
    <v-app-bar id="nav" fixed app flat class="nav-transparent">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="{ name: 'index' }">
        <v-img
          src="/logo.png"
          alt="artify logo"
          class="fill-height"
          :width="$vuetify.breakpoint.mdAndDown ? 90 : 110"
          contain
        />
      </nuxt-link>
      <v-container fluid class="pa-0">
        <v-row no-gutters align="center">
          <!-- nav categories -->
          <v-col cols="7" class="hidden-md-and-down font-weight-bold ml-4">
            <v-menu
              v-for="category in categories"
              :key="category.url"
              open-on-hover
              :close-on-content-click="false"
              bottom
              offset-y
            >
              <template v-slot:activator="{ on }">
                <!--url in name:'category-url' is taking the value of url defined in "params: { url: category.url, name: category}" -->
                <v-btn
                  :to="{
                    name: 'category-url',
                    params: { url: category.url },
                  }"
                  text
                  small
                  rounded
                  v-on="on"
                  color="primary"
                >
                  {{ category.name }}
                </v-btn>
              </template>
              <DropDown :navMenu="category.children" />
            </v-menu>

            <v-btn text small color="primary">Custom Art</v-btn>

            <v-btn text small color="primary">Contact US</v-btn>

            <v-btn small color="primary" outlined rounded>
              <v-icon left>mdi-download</v-icon> Download App</v-btn
            >
          </v-col>
          <v-spacer />
          <v-text-field
            append-icon="mdi-magnify"
            class="hidden-md-and-down mr-2"
            placeholder="find artworks, artists, art forms..."
            filled
            color="primary"
            hide-details
            rounded
            dense
          />

          <section v-if="$auth.loggedIn == false">
            <!-- <Login /> -->
            <v-btn rounded color="secondary" to="/auth/login">Sign in</v-btn>
          </section>
          <section v-if="$auth.loggedIn == true">
            <!-- Account button -->
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on }">
                <v-btn color="secondary" dark v-on="on" icon>
                  <v-icon>mdi-account</v-icon>
                </v-btn>
              </template>
              <ProfileList />
            </v-menu>
            <!-- Cart button -->
            <v-badge overlap color="secondary">
              <span slot="badge">{{ cartCount }}</span>
              <v-btn :to="{ name: 'cart' }" rounded outlined color="primary">
                Cart
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
            </v-badge>
          </section>
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

<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <!-- {{ categories }} -->
      <NavDrawer :items="categories" v-if="categories.length > 0" />

      <!-- {{ categories }}
      <v-list flat>
        <v-subheader>REPORTS</v-subheader>
        {{ selectedItem }}

        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            :value="category"
            v-for="(category, i) in categories"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon src="/icon.png"></v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="selected()">
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </v-list-item-group>
      </v-list> -->
      <!-- <v-list avatar shaped>
        <v-list-group v-for="category in categories" :key="category.id">
          {{ category }}
          <v-list-item>
            <v-list-item-avatar>
              <v-img src="/icon.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-title></v-list-item-title>
          </v-list-item>
          <v-list-item
            no-action
            sub-group
            v-for="subcategory in category.children"
            :key="subcategory.id"
            @click="selected(subcategory)"
          >
            {{ selectedItem }}
            <NavDrawer :items="selectedItem" v-if="selectedItem" />
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ subcategory.name }}</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              link
              v-for="subchildren in subcategory.children"
              :key="subchildren.id"
              :to="{
                name: 'categories-slug',
                params: { slug: subchildren.slug },
              }"
            >
              <v-list-item-title>{{ subchildren.name }}</v-list-item-title>
              <v-list-item-icon>
                <v-icon></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item>
        </v-list-group>
        <v-divider />

        <v-list-item>
          <v-switch
            v-model="$vuetify.theme.dark"
            color="primary"
            label="Dark"
          ></v-switch>
        </v-list-item>
      </v-list> -->
    </v-navigation-drawer>
    <v-app-bar fixed dense app flat style="background: transparent">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="{ name: 'index' }">
        <v-img src="/butiq.png" width="60" />
      </nuxt-link>

      <v-container fluid>
        <v-row no-gutters>
          <v-col class="d-flex align-center">
            <!-- nav categories -->
            <v-col class="hidden-sm-and-down">
              <v-col class="d-flex align-center">
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
                        >{{ category.name }}</v-btn
                      >
                    </template>
                    <DropDown :navMenu="category.children" />
                    <!-- <v-card width="600px" height="300px">
                      <v-row class="mx-2">
                        <v-col
                          cols="4"
                          v-for="subcategory in category.children"
                          :key="subcategory.id"
                        >
                          <v-row>
                            <v-list flat dense height="30px" rounded>
                              <v-list-item
                                :to="{
                                  name: 'categories-slug',
                                  params: { slug: subcategory.slug },
                                }"
                              >
                                <v-list-item-title
                                  class="primary--text overline"
                                  >{{ subcategory.name }}</v-list-item-title
                                >
                              </v-list-item>
                            </v-list>
                          </v-row>

                          <v-row
                            v-for="subchildren in subcategory.children"
                            :key="subchildren.id"
                          >
                            <v-list flat dense height="30px" rounded>
                              <v-list-item
                                :to="{
                                  name: 'categories-slug',
                                  params: { slug: subchildren.slug },
                                }"
                              >
                                <v-list-item-subtitle class="overline">{{
                                  subchildren.name
                                }}</v-list-item-subtitle>
                              </v-list-item>
                            </v-list>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card> -->
                  </v-menu>
                </v-col>
              </v-col>
            </v-col>
          </v-col>

          <v-col class="d-flex justify-end align-center">
            <v-col class="hidden-sm-and-down mx-2">
              <v-text-field
                append-icon="mdi-magnify"
                placeholder="Search"
                hide-details
                style="background-color: white"
                rounded
                dense
              />
            </v-col>

            <!-- Account button -->
            <span class="mx-2" v-if="$auth.loggedIn == false">
              <Login />
            </span>

            <!-- Account button -->
            <div v-if="$auth.loggedIn" class="hidden-sm-and-down mr-2">
              <v-menu bottom offset-y>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on" icon>
                    <v-icon>mdi-account</v-icon>
                  </v-btn>
                </template>
                <ProfileList />
              </v-menu>
            </div>

            <!-- Cart button -->
            <div v-if="$auth.loggedIn == true">
              <v-badge overlap>
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
      <v-spacer />
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app absolute padless>
      <!-- <span>&copy; {{ new Date().getFullYear() }}</span> -->
      <v-container fluid class="footer-image pa-1">
        <v-row no-gutters align="center">
          <v-col>
            <v-icon>mdi-youtube</v-icon>
            <v-icon>mdi-email</v-icon>
            <v-icon>mdi-cellphone</v-icon>
            <v-icon>mdi-instagram</v-icon>
            <v-icon>mdi-facebook</v-icon>
            <v-icon>mdi-linkedin</v-icon>
          </v-col>
          <v-col>
            <a href="#">About Us</a><br />
            <a href="#">Career</a>
            <!-- <a href="#"></a>
          <a href="#"></a>
          <a href="#"></a> -->
          </v-col> </v-row
        ><v-row no-gutters
          ><span>&copy; {{ new Date().getFullYear() }}</span></v-row
        ></v-container
      >
    </v-footer>
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
  mounted() {
    this.initialize()
  },
  computed: {
    ...mapGetters({
      categories: 'categories',
      //cartProducts: "cart/products",
      // cartCount: "cart/cartCount"
      // authenticated: "user/getAuthentication"
    }),
    ...mapState({
      // user: state => state.auth.user
    }),
  },

  methods: {
    ...mapActions(['updateNavMenu']),
    async initialize() {
      console.log('initial')
      await this.updateNavMenu()
    },
    selected(item) {
      this.selectedItem = item
    },
  },
}
</script>

<style>
.nav-transparent {
  background-color: transparent !important;
}

.footer-image {
  background-image: url('/footer.png');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}
</style>

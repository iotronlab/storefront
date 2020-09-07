<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed app>
      <v-list avatar shaped>
        <v-list-group v-for="category in categories" :key="category.id">
          <template v-slot:activator>
            <v-list-item-avatar>
              <v-img src="/icon.png"></v-img>
            </v-list-item-avatar>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </template>

          <v-list-group
            no-action
            sub-group
            v-for="subcategory in category.children"
            :key="subcategory.id"
          >
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
          </v-list-group>
        </v-list-group>
        <v-divider />

        <v-list-item>
          <v-switch v-model="$vuetify.theme.dark" color="primary" label="Dark"></v-switch>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed dense app flat>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <nuxt-link :to="{ name: 'index' }">
        <v-img src="/butiq.png" contain width="80" />
      </nuxt-link>

      <v-container fluid px-0>
        <v-row no-gutters>
          <v-col class="d-flex align-center">
            <!-- nav categories -->
            <v-col class="hidden-sm-and-down">
              <v-col class="d-flex align-center">
                <v-col v-for="category in categories" :key="category.id">
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
                          params: { slug: category.slug, category: category },
                        }"
                        text
                        small
                        rounded
                        v-on="on"
                        color="primary"
                      >{{ category.name }}</v-btn>
                    </template>

                    <v-card width="600px" height="300px">
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
                                >{{ subcategory.name }}</v-list-item-title>
                              </v-list-item>
                            </v-list>
                          </v-row>

                          <v-row v-for="subchildren in subcategory.children" :key="subchildren.id">
                            <v-list flat dense height="30px" rounded>
                              <v-list-item
                                :to="{
                                  name: 'categories-slug',
                                  params: { slug: subchildren.slug },
                                }"
                              >
                                <v-list-item-subtitle class="overline">
                                  {{
                                  subchildren.name
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item>
                            </v-list>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
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
                style="background-color: white;"
                rounded
                dense
              />
            </v-col>

            <!-- Account button -->
            <span class="hidden-sm-and-down mx-2" v-if="$auth.loggedIn==false">
              <Login />
            </span>
            <!-- Cart button -->
          </v-col>
        </v-row>
      </v-container>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Login from '@/components/auth/Login'
export default {
  components: { Login },

  data() {
    return {
      drawer: false,
      avatar: '/butiq.png',
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
      await this.updateNavMenu()
    },
  },
}
</script>

<style>
.nav-transparent {
  background-color: transparent !important;
}
</style>

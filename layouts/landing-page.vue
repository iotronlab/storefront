<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" temporary fixed app hidden-md-and-up>
      <NavDrawer :items="categories" v-if="categories.length > 0" />
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
                <v-col v-for="category in categories" :key="category.url">
                  <v-menu
                    open-on-hover
                    :close-on-content-click="false"
                    class="hidden-sm-and-down"
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on }">
                      <v-btn
                        :to="category.url"
                        text
                        small
                        rounded
                        v-on="on"
                        color="primary"
                        >{{ category.name }}</v-btn
                      >
                    </template>
                    <DropDown :navMenu="category.children" />
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
import DropDown from '~/components/nav/DropDown'
export default {
  data() {
    return {
      drawer: false,
      avatar: '/butiq.png',
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
      categories: [
        {
          name: 'Learn',
          url: 'academy',
          children: [
            { name: 'Online Live Courses', url: 'academy' },
            {
              name: 'Workshops',
              url: 'academy',
            },
          ],
        },
        {
          name: 'Shop',
          url: 'academy',
          children: [{ name: 'Online Live Courses', url: 'academy' }],
        },
        {
          name: 'About US',
          url: 'academy',
          children: [
            { name: 'Blogs', url: 'academy' },
            { name: 'Our Network', url: 'academy' },
          ],
        },
        {
          name: 'Events',
          url: 'academy',
          children: [
            { name: 'Exhibitions', url: 'academy' },
            { name: 'Competitions', url: 'academy' },
          ],
        },
        {
          name: 'Customised Art',
          url: 'academy',
        },
      ],
    }
  },
  components: {
    DropDown,
  },
}
</script>

<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col>
        <!-- <v-toolbar flat>
          <v-toolbar-title v-if="$auth.loggedIn == true"
            >Name {{ user.name }}</v-toolbar-title
          >

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider /> -->

        <!-- nuxt-child routes here -->
        <v-card flat>
          <v-card-title class="overline">Profile Details</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProfileList from '@/components/profile/ProfileList'
import DropDrawer from '@/components/nav/DropDown'
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],
  components: { ProfileList, DropDrawer },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
}
</script>

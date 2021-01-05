<template>
  <v-container fluid>
    <v-row no-gutters justify="center">
      <v-col lg="10">
        <v-toolbar flat dense>
          <v-toolbar-title v-if="$auth.loggedIn == true"
            >Hi, {{ user.name }}</v-toolbar-title
          >

          <v-spacer></v-spacer>
        </v-toolbar>
        <v-divider />

        <v-sheet>
          <v-row no-gutters>
            <v-col cols="2">
              <ProfileList />
            </v-col>
            <v-col cols="10">
              <!-- nuxt-child routes here -->
              <v-card flat>
                <nuxt-child />
              </v-card>
            </v-col>
          </v-row>
        </v-sheet>
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

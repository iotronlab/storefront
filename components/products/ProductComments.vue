<template>
  <v-container fluid>
    <v-row no-gutters v-if="!$auth.loggedIn"
      ><p class="text-overline">
        <nuxt-link to="">Sign In</nuxt-link> to upvote
        <v-icon>mdi-thumb-up-outline</v-icon>
      </p></v-row
    >
    <v-row no-gutters v-if="$auth.loggedIn">
      <v-col
        ><v-row no-gutters
          ><v-btn>upvote &nbsp;<v-icon>mdi-thumb-up-outline</v-icon></v-btn
          ><v-btn>comment &nbsp;<v-icon>mdi-comment-text</v-icon></v-btn
          ><v-btn
            >edit comment &nbsp;<v-icon>mdi-comment-edit</v-icon></v-btn
          ></v-row
        >
        <v-textarea
          no-resize
          label="leave a comment..."
          hide-details=""
        ></v-textarea
      ></v-col> </v-row
  ></v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
}
</script>

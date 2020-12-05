<template>
  <v-container>
    <v-row>
      <v-item-group
        v-model="window"
        class="shrink mr-6 hidden-md-and-down"
        mandatory
        tag="v-flex"
      >
        <!-- {{ window }}
        {{ $route.hash }} -->
        <v-item
          v-for="(link, key) in helpLinks"
          :key="key"
          v-slot="{ active, toggle }"
        >
          <div>
            <v-btn
              :input-value="active"
              @click="toggle"
              text
              small
              :to="'#' + link"
            >
              {{ link }}
            </v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-col>
        <v-window v-model="window" class="elevation-1" vertical>
          <v-window-item :id="link" v-for="(link, key) in helpLinks" :key="key">
            <v-card flat>
              <v-card-text>
                <v-row class="mb-4" align="center">
                  <v-avatar color="grey" class="mr-4"></v-avatar>
                  <strong class="title">{{ link }}</strong>
                  <v-spacer></v-spacer>
                </v-row>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
        <v-card>
          <v-card-actions class="justify-space-between hidden-md-and-up">
            <v-item-group v-model="window" class="justify-center" mandatory>
              <v-item
                v-for="(link, key) in helpLinks"
                :key="`${key}`"
                v-slot="{ active, toggle }"
              >
                <v-btn :input-value="active" icon @click="toggle">
                  <nuxt-link :to="'#' + link"
                    ><v-icon>mdi-record</v-icon></nuxt-link
                  >
                </v-btn>
              </v-item>
            </v-item-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      helpLinks: {
        0: 'FAQ',
        1: 'Payment',
        2: 'Shipping',
        3: 'Cancellation and Return',
        4: 'Report Infringement',
      },
      hash_to_key: {
        '#FAQ': 0,
        '#Payment': 1,
        '#Shipping': 2,
        '#Cancellation%20and%20Return': 3,
        '#Report%20Infringement': 4,
      },
      window: 0,
    }
  },
  watch: {
    '$route.hash': 'updateTab',
  },
  methods: {
    updateTab() {
      let hash = this.$route.hash
      if (hash != '#' + this.helpLinks[this.window]) {
        this.window = this.hash_to_key[hash]
      }
    },
  },
}
</script>

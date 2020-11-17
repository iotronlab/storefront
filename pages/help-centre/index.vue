<template>
  <v-container>
    <v-row>
      <v-item-group v-model="window" class="shrink mr-6" mandatory tag="v-flex">
        <v-item v-for="(link, i) in helpLinks" :key="i">
          <div>
            <v-btn
              :input-value="window == i"
              @click="updateRouter()"
              text
              small
            >
              {{ link }}
            </v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-col>
        <v-window v-model="window" class="elevation-1" vertical>
          <v-window-item :id="link" v-for="(link, i) in helpLinks" :key="i">
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
          <v-card-actions class="justify-space-between">
            <v-btn text @click="prev">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="window" class="text-center" mandatory>
              <v-item v-for="(n, i) in length" :key="`btn-${i}`">
                <v-btn :input-value="window == i" icon @click="updateRouter()">
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </v-item>
            </v-item-group>
            <v-btn text @click="next">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
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
      length: 5,
      window: 0,
    }
  },
  watch: {
    '$route.hash': '',
  },
  methods: {
    next() {
      this.window = this.window + 1 === this.length ? 0 : this.window + 1
      this.updateRouter()
    },
    prev() {
      this.window = this.window - 1 < 0 ? this.length - 1 : this.window - 1
      this.updateRouter()
    },
    updateRouter() {
      console.log('button clicked: ' + this.window)
      this.$router.push({
        name: this.$route.name,
        hash: `#${this.helpLinks[this.window]}`,
      })
      console.log(this.$route.hash)
    },
  },
}
</script>

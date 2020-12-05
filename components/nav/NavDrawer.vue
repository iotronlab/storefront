<template>
  <v-container fluid class="px-0">
    <v-row no-gutters
      ><v-col cols="4">
        <v-slide-x-transition>
          <v-btn small text v-if="stack.length > 1" @click="back">
            <v-icon> mdi-chevron-left </v-icon> back
          </v-btn>
        </v-slide-x-transition>
      </v-col>

      <v-col cols="8">
        <p class="text-subtitle-2">Welcome, {{ 'User' || auth.user }}</p>
        <nuxt-link to="/" class="text-subtitle-2">Sign in</nuxt-link>
      </v-col></v-row
    >

    <v-list shaped dense nav>
      <v-list-item
        v-for="category in stack[stack.length - 1]"
        :key="category.id"
        @click="clickedItem(category)"
      >
        <!-- <v-list-item-avatar>
          <v-img src="/icon.png"></v-img>
        </v-list-item-avatar> -->

        <v-slide-x-transition>
          <v-list-item-title>{{ category.name }}</v-list-item-title>
        </v-slide-x-transition>
      </v-list-item>
      <v-divider />
    </v-list>
    <v-list-item>
      <v-switch
        v-model="$vuetify.theme.dark"
        color="primary"
        label="Dark"
      ></v-switch>
    </v-list-item>
  </v-container>

  <!-- <div>
    <v-card width="256" class="overflow-hidden">
      <v-navigation-drawer permanent>
        <v-container class="mx-auto" fluid>
          <v-row>
            <v-col sm="1" v-if="stack.length > 1">
              <v-btn icon small>
                <v-icon @click="back"> mdi-chevron-left </v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    {{ stack[stack.length - 1].title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in this.stack[this.stack.length - 1].children"
            :key="item.title"
            link
            :disabled="!item.children"
            @click="clickedItem(item)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div> -->
</template>
<script>
export default {
  props: {
    items: { required: true, type: Array },
  },
  data() {
    return {
      top: null,
      right: null,
      selectedItem: null,
      stack: [this.items],
    }
  },
  methods: {
    clickedItem(item) {
      if (!item.children || !item.children.length > 0) {
        this.$router.push(`/category/${item.slug}`)
      } else {
        this.stack.push(item.children)
      }
    },
    back() {
      this.stack.pop()
    },
  },
}
</script>

<template>
  <v-list avatar shaped>
    <v-btn icon small v-if="stack.length > 1">
      <v-icon @click="back"> mdi-chevron-left </v-icon>
    </v-btn>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="/icon.png"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">
          {{ stack[stack.length - 1].name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list avatar shaped>
      <v-list-item
        v-for="category in stack[stack.length - 1]"
        :key="category.id"
        @click="clickedItem(category)"
        :disabled="!category.children || !category.children.length > 0"
      >
        <!-- <v-list-item-avatar>
          <v-img src="/icon.png"></v-img>
        </v-list-item-avatar> -->
        <v-list-item-title>{{ category.name }}</v-list-item-title>
      </v-list-item>
      <v-divider />

      <v-list-item>
        <v-switch
          v-model="$vuetify.theme.dark"
          color="primary"
          label="Dark"
        ></v-switch>
      </v-list-item>
    </v-list>
  </v-list>

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
      this.stack.push(item.children)
    },
    back() {
      this.stack.pop()
    },
  },
}
</script>
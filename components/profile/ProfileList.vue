<template>
  <v-list shaped dense nav>
    <v-list-item-group v-model="item" color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        @click.prevent="item.title == 'Logout' ? logoutUser() : ''"
        :to="item.to != undefined ? item.to : ''"
        exact
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  data() {
    return {
      item: 0,
      hover: false,
      items: [
        {
          icon: 'mdi-home-account',
          title: 'Profile',
          to: '/account',
          click: '',
        },
        {
          icon: 'mdi-clipboard-list',
          title: 'Orders',
          to: '/account/orders',
          click: '',
        },
        {
          icon: 'mdi-bookmark-multiple',
          title: 'Wishlist',
          to: '/account/wishlist',
          click: '',
        },
        {
          icon: 'mdi-map-marker',
          title: 'Saved Addresses',
          to: '/account/addresses',
          click: '',
        },

        { icon: 'mdi-logout', title: 'Logout', click: 'logoutUser' },
      ],
    }
  },
  methods: {
    async logoutUser() {
      await this.$auth.logout().then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>

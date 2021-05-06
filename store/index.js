export const state = () => ({
  categories: [],
  snackbars: [],
  shippingToken: null,
  userAddresses: [],
  shippingAddress: null,
})

export const getters = {
  categories(state) {
    return state.categories
  },
  shippingToken(state) {
    return state.shippingToken
  },
  userAddresses(state) {
    return state.userAddresses
  },
  defaultAddress: (state) => {
    return state.userAddresses.find((address) => address.default == 1)
  },
  shippingAddress(state) {
    return state.shippingAddress
  },
  // getDefaultAddress: (state) => (slug) => {
  //   return state.categories.find((category) => category.slug === slug)
  // },
  snackbar(state) {
    return state.snackbar
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },
  SET_SHIPPING_TOKEN(state, shippingToken) {
    state.shippingToken = shippingToken
  },
  SET_USER_ADDRESS(state, userAddresses) {
    state.userAddresses = userAddresses
  },
  SET_SHIPPING_ADDRESS(state, shippingAddress) {
    state.shippingAddress = shippingAddress
  },
  SET_SNACKBAR(state, snackbar) {
    snackbar.showing = true
    snackbar.icon = snackbar.icon || 'mdi-alert-circle-outline'
    snackbar.color = snackbar.color || 'success'
    state.snackbars = state.snackbars.concat(snackbar)
    //  this.$toast.show('Please Log in')
  },
}

export const actions = {
  async updateNavMenu({ commit, dispatch }) {
    await this.$axios
      .$get('/categories')
      .then((res) => {
        commit('SET_CATEGORIES', res.data)
        if (this.$auth.loggedIn) {
          dispatch('cart/getCart')
        }
        //  commit('SET_SHIPPING_TOKEN', res.shipping_token)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getShippingToken({ commit }) {
    await this.$axios
      .$get('/shipping')
      .then((res) => {
        commit('SET_SHIPPING_TOKEN', res.token)
        console.log(res.token)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  async getUserAddress({ commit }) {
    await this.$axios
      .$get('/address')
      .then((res) => {
        commit('SET_USER_ADDRESS', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  setShippingAddress({ commit, address }) {
    if (address) {
      commit('SET_SHIPPING_ADDRESS', address)
    }
  },
  setSnackbar({ commit, snackbar }) {
    snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
    console.log(snackbar)
  },
}

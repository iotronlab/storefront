export const state = () => ({
  categories: [],
  snackbars: [],
})

export const getters = {
  categories(state) {
    return state.categories
  },
  getCategory: (state) => (slug) => {
    return state.categories.find((category) => category.slug === slug)
  },
  snackbar(state) {
    return state.snackbar
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
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
  async updateNavMenu({ commit }) {
    await this.$axios
      .$get('/categories')
      .then((res) => {
        commit('SET_CATEGORIES', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  setSnackbar({ commit, snackbar }) {
    snackbar.showing = true
    commit('SET_SNACKBAR', snackbar)
    console.log(snackbar)
  },
}

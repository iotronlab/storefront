export const state = () => ({
  categories: [],
})

export const getters = {
  categories(state) {
    return state.categories
  },
}

export const mutations = {
  SET_CATEGORIES(state, categories) {
    state.categories = categories
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
}

import Vue from 'vue'
export const state = () => ({
  products: [],
  productShipping: [],
  empty: true,
  subtotal: null,
  total: null,
  changed: false,
  //set by courier availability of product
  // shippingAvailable: false,
})

export const getters = {
  products(state) {
    return state.products
  },
  cartCount(state) {
    return state.products.length
  },
  empty(state) {
    return state.empty
  },
  subtotal(state) {
    return state.subtotal
  },
  total(state) {
    return state.total
  },
  changed(state) {
    return state.changed
  },
  productShipping(state) {
    return state.productShipping
  },
  shippingAvailable(state) {
    if (
      state.products.some(function checkShipping(product) {
        return product.courier_id == null
      })
    ) {
      return false
    } else {
      return true
    }
  },
}

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products
  },
  SET_EMPTY(state, empty) {
    state.empty = empty
  },
  SET_SUBTOTAL(state, subtotal) {
    state.subtotal = subtotal
  },
  SET_TOTAL(state, total) {
    state.total = total
  },
  SET_CHANGED(state, changed) {
    state.changed = changed
  },
  // SET_SHIPPING_AVAILABLE(state, shippingAvailable) {
  //   state.shippingAvailable = shippingAvailable
  // },
  SET_PRODUCT_SHIPPING(state, payload) {
    let productIndex = state.products.findIndex((el) => el.id == payload.id)
    console.log(productIndex)
    if (productIndex >= 0) {
      state.products[productIndex].courier_id = payload.courier_id
      state.products[productIndex].courier_name = payload.courier_name
      state.products[productIndex].shipping_rate = payload.shipping_rate
      state.products[productIndex].etd = payload.etd
      state.products[productIndex].address_id = payload.address_id
    }
    let shippingIndex = state.productShipping.findIndex(
      (el) => el.id == payload.id
    )
    if (shippingIndex == -1) {
      state.productShipping.push(payload)
    } else {
      state.productShipping.splice(shippingIndex, 1, payload)
    }
    // state.shippingAvailable = true
  },
}

export const actions = {
  async getCart({ commit }) {
    await this.$axios
      .$get('cart')
      .then((response) => {
        commit('SET_PRODUCTS', response.data.products)
        commit('SET_EMPTY', response.meta.empty)
        commit('SET_SUBTOTAL', response.meta.subtotal)
        commit('SET_TOTAL', response.meta.total)
        commit('SET_CHANGED', response.meta.changed)
      })
      .catch((err) => {
        this.$toast.error('Error fetching cart. Kindly contact support!')
      })
  },

  async destroy({ dispatch }, sku) {
    await this.$axios
      .$delete(`cart/${sku}`)
      .then((res) => {
        this.$toast.success(res.message)
      })
      .catch((err) => {
        console.log(err)
      })

    dispatch('getCart')
  },

  async update({ dispatch }, { productId, quantity }) {
    let response = await this.$axios.$patch(`cart/${productId}`, {
      quantity,
    })

    dispatch('getCart')
  },

  async store({ dispatch }, products) {
    let response = await this.$axios.$post('cart', {
      products,
    })

    dispatch('getCart')
  },
}

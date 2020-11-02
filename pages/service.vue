<template>
  <div v-if="auth">
    <h1>Service page</h1>
    <available :token="auth.token" />
  </div>
</template>

<script>
import available from '@/components/availability.vue'
export default {
  components: {
    available,
  },
  data() {
    return {
      auth: {},
    }
  },
  async asyncData({ params, app }) {
    let auth = null
    await app.$axios
      .post('https://apiv2.shiprocket.in/v1/external/auth/login', {
        email: 'sarthak.k7189@gmail.com',
        password: 'Anik@9046',
      })
      .then((res) => {
        auth = res.data
        console.log('Success')
        console.log(auth)
      })
      .catch((err) => {
        console.log('error')
        console.log(err)
      })
    return {
      auth: auth,
    }
  },
}
</script>

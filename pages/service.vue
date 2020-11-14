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
    var myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    var raw = JSON.stringify({
      email: 'sarthakkhandelwal_ch@srmuniv.edu.in',
      password: '9046632101',
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    }

    await fetch(
      'https://apiv2.shiprocket.in/v1/external/auth/login',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        auth = result
      })
      .catch((error) => console.log('error', error))
    return {
      auth: auth,
    }
  },
}
</script>

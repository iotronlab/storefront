export default function ({ $axios }, inject) {
  // Create a custom axios instance
  const shipping = $axios.create({
    headers: {
      common: {
        // Accept: 'text/plain, */*',
      },
    },
  })

  // Set baseURL to something different
  shipping.setBaseURL('https://apiv2.shiprocket.in/v1/external')

  // Inject to context as $shipping
  inject('shipping', shipping)
}

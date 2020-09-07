import axios from 'axios'
const dynamicRoutes = async () => {
  const routesForCategories = axios
    .get('http://localhost:8000/api/categories')
    .then((res) => {
      return res.data.map((category) => {
        return {
          route: `/category/${category.slug}`,
          payload: category,
        }
      })
    })

  const routesForProducts = axios
    .get('http://localhost:8000/api/products')
    .then((res) => {
      return res.data.map((product) => {
        return {
          route: `/products/${product.slug}`,
          payload: product,
        }
      })
    })
  const routes = routesForCategories.concat(routesForProducts)
  return routes
}

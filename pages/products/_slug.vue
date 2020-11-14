<template>
  <v-card class="mx-auto">
    <v-container fluid>
      <v-row>
        <v-col cols="12" md="6" lg="6">
          <v-img height="500" src="/man.jpg"></v-img>
        </v-col>
        <v-col cols="12" md="6" lg="6">
          <p class="title">{{ product.name }}</p>
          <v-divider class="mt-n3 mb-1"></v-divider>
          <p class="headline">{{ product.price }}</p>
          <p v-if="!product.in_stock">Out of Stock</p>
          <v-row>
            <!-- <form action> -->
            <ProductVariation
              v-for="attribute in product.configurable_attributes.attributes"
              :type="attribute.label"
              :options="attribute.options"
              :default="product.product[attribute.code]"
              :key="attribute.id"
              :code="attribute.code"
              :root_attribute="root_attribute"
              @selectType="setType"
              :disabled="type != form.type && form.type != null"
              :active="form.type != type ? false : true"
              v-model="form"
            />
            <!-- </form> -->
            <!-- <div v-if="form.variation">
              Quantity:
              <select name id v-model="form.quantity">
                <option
                  :value="x"
                  v-for="x in parseInt(form.variation.stock_count)"
                  :key="x"
                >
                  {{ x }}
                </option>
              </select>
            </div> -->
          </v-row>
          {{ 'type Below' }}
          {{ type }}
          <br /><br />
          {{ '=========' }}
          <br />
          {{ 'Form below' }}
          <br /><br />

          {{ form }}
          <p>{{ product.description }}</p>
          <v-row no-gutters class="hidden-sm-and-down">
            <v-col>
              <v-btn block class="mr-1" color="primary" @click.prevent="add">
                Add To Cart
                <v-icon right>mdi-cart</v-icon>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block color="primary" outlined class="ml-1">
                Wishlist
                <v-icon right>mdi-bookmark</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-rating
                v-model="rating"
                color="primary"
                dense
                half-increments
                hover
                size="25"
              ></v-rating>
            </v-col>
          </v-row>
          <v-app-bar bottom fixed class="hidden-md-and-up">
            <v-container class="px-0 py-0">
              <v-row>
                <availablility :token="auth.token" />
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <v-btn
                    block
                    class="mr-1"
                    color="primary"
                    @click.prevent="add"
                  >
                    Add To Cart
                    <v-icon right>mdi-cart</v-icon>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block color="primary" outlined class="ml-1">
                    Wishlist
                    <v-icon right>mdi-bookmark</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-app-bar>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
import ProductVariation from '@/components/products/ProductVariation'
import availablility from '@/components/availability'
export default {
  data() {
    return {
      product: null,
      form: {
        variation: null,
        type: null,
        quantity: 1,
      },
      root_attribute: null,
      auth: null,
    }
  },
  // watch: {
  //   'form.variation'() {
  //     this.form.quantity = 1
  //   },
  // },
  components: {
    ProductVariation,
    availablility,
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

    let response = await app.$axios.$get(`products/${params.slug}`)
    let attributes = response.configurable_attributes.attributes
    let root_attribute = null
    if (attributes.length > 0) {
      root_attribute = {}
      root_attribute.code = attributes[0].code
      root_attribute.id = response.product[attributes[0].code]
      root_attribute.available_variations = attributes[0].options[0].products
    }
    console.log('root_attribute below')
    console.log(root_attribute)
    return {
      product: response,
      root_attribute: root_attribute,
      auth: auth,
    }
  },
  methods: {
    ...mapActions('cart', ['addToCart']),
    setType(type) {
      this.form.type = type != undefined ? type : null
      // console.log(this.form.type)
    },
    // setVariationId(payload) {
    //   console.log('in set attribute')
    //   console.log(payload)
    //   this.form.type = payload.type
    //   this.form.variation = payload.variation
    //   if (payload.variation.slug == undefined) {
    //     this.form.slug = ''
    //   } else {
    //     this.form.slug = payload.variation.slug
    //   }
    //   console.log('form type and slug below')
    //   console.log(this.form)
    // },
    store: 'cart/store',
    add() {
      this.store([
        {
          slug: this.form.variation.slug,
          quantity: this.form.quantity,
        },
      ])
      this.form = {
        variation: '',
        quantity: 1,
      }
    },
  },
}
</script>

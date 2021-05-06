<template>
  <v-container fluid v-if="!$fetchState.pending">
    <v-row justify="center">
      <v-col cols="12" md="6" lg="6">
        <ProductImage :images="product.images" />
      </v-col>
      <v-col cols="12" md="5" lg="5">
        <h4 class="text-h6 text--primary">{{ product.name }}</h4>
        <v-divider class="mb-1"></v-divider>
        <v-row no-gutters>
          <span class="text-overline">price</span>&nbsp;

          <h4 class="text-h5 accent--text" v-if="product.special_price > 0">
            <span class="text-decoration-line-through text-caption">
              {{ product.formatted_price }}</span
            >
            {{ product.formatted_special_price }}
          </h4>
          <h4 class="text-h5 accent--text" v-else>
            {{ product.formatted_price }}
          </h4></v-row
        >
        <!-- <h5 class="text-body-1">
          by
          <nuxt-link
            class="secondary--text"
            :to="'/artists/' + product.vendor.slug"
          >
            {{ product.vendor.name }}</nuxt-link
          >
        </h5> -->
        <MiniProfile :vendor="product.vendor" />

        <p v-if="!product.in_stock">Out of Stock</p>
        <h6 class="text-overline">Description</h6>
        <p class="text-body-2">{{ product.short_description }}</p>
        <!-- <v-rating
          :value="product.vendor.rating"
          color="primary"
          dense
          half-increments
          hover
          small
          size="25"
          readonly
        ></v-rating> -->
        <v-row v-if="configurations">
          <!-- <form action> -->
          <!--   <ProductVariation
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
            />-->
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
        <v-row v-else no-gutters>
          <v-row
            class="px-5 py-5"
            v-for="[attribute, val] in Object.entries(product.attributes)"
            :key="attribute"
            no-gutters
          >
            <h6 class="text-overline" v-if="val">{{ attribute }}</h6>
            &nbsp;
            <v-chip v-if="val" outlined color="primary">{{ val }}</v-chip>
          </v-row>
        </v-row>
        <!-- {{ 'type Below' }}
          {{ type }}
          <br /><br />
          {{ '=========' }}
          <br />
          {{ 'Form below' }}
          <br /><br />
          {{ form }}
          <p>{{ product.description }}</p> -->
        <v-row no-gutters class="hidden-sm-and-down">
          <v-col>
            <v-btn
              block
              class="mr-1"
              color="secondary"
              @click.prevent="addToCart"
              v-if="product.in_stock"
            >
              Add To Cart
              <v-icon right>mdi-cart</v-icon>
            </v-btn>
            <v-btn block class="mr-1" color="secondary" v-else>
              Place Custom Order
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
        <LazyDeliveryChecker />

        <LazyProductComments />
        <v-app-bar bottom fixed class="hidden-md-and-up">
          <v-container class="px-0 py-0">
            <v-row no-gutters>
              <v-col>
                <v-btn
                  block
                  class="mr-1"
                  color="primary"
                  @click.prevent="addToCart"
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
</template>

<script>
import { mapActions } from 'vuex'
import ProductVariation from '@/components/products/ProductVariation'
// import availablility from '@/components/availability'
export default {
  data() {
    return {
      product: {},
      form: {
        variation: null,
        type: null,
        quantity: 1,
      },
      configurations: null,
      auth: null,
      rating: null,
    }
  },
  // watch: {
  //   'form.variation'() {
  //     this.form.quantity = 1
  //   },
  // },
  components: {
    ProductVariation,
    // availablility,
  },
  async fetch() {
    await this.$axios
      .$get(`products/${this.$route.params.slug}`)
      .then((response) => {
        console.log(response)
        this.product = response.product
        let configurable = response.attributes
        let configurations = null
        if (configurable && configurable.length > 0) {
          configurations = {}
          configurations.code = attributes[0].code
          configurations.id = response.product[attributes[0].code]
          configurations.available_variations =
            attributes[0].options[0].products
        }

        this.configurations = configurations
        this.auth = auth
      })
      .catch((err) => {
        console.log(err)
      })

    // let auth = null
    // var myHeaders = new Headers()
    // myHeaders.append('Content-Type', 'application/json')

    // var raw = JSON.stringify({
    //   email: 'sarthakkhandelwal_ch@srmuniv.edu.in',
    //   password: '9046632101',
    // })

    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // }

    // await fetch(
    //   'https://apiv2.shiprocket.in/v1/external/auth/login',
    //   requestOptions
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     auth = result
    //   })
    //   .catch((error) => console.log('error', error))
  },
  methods: {
    ...mapActions({ store: 'cart/store' }),
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

    addToCart() {
      if (this.$auth.loggedIn) {
        this.store([
          {
            id: this.product.id,
            quantity: 1,
          },
        ])
      } else {
        this.$toast.error('You must log in first!')
      }
      this.form = {
        variation: '',
        quantity: 1,
      }
    },
  },
}
</script>

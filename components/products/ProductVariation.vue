<template>
  <v-container>
    <h3>{{ type }}</h3>
    <v-chip-group v-model="selection" @change="changed($event, type)">
      <v-chip
        v-for="option in product_options"
        :key="option.id"
        :value="option.id"
        :filter="active"
        active-class="primary--text"
        >{{ option.label }}</v-chip
      >
    </v-chip-group>
    <!--<template v-if="!attribute.in_stock">Out of Stock</template>-->
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      selection: this.default,
      product_options: this.options,
    }
  },
  props: {
    type: {
      required: true,
      type: String,
    },
    options: {
      required: true,
      type: Array,
    },
    value: {
      required: false,
      default: '',
    },
    disabled: {
      required: true,
      type: Boolean,
    },
    active: {
      required: true,
      type: Boolean,
    },
    default: {
      required: true,
      type: Number,
    },
    root_attribute: {
      required: true,
    },
    code: {
      required: true,
      type: String,
    },
  },

  // computed: {
  //   selectedattributeId() {
  //     console.log('in selected attribute')
  //     console.log(this.value)
  //     if (!this.findattribute(this.value.id)) {
  //       return ''
  //     }
  //     console.log(this.value)

  //     return this.value.id
  //   },
  // },

  methods: {
    changed(event, type) {
      // console.log('in changed event')
      // console.log(type)
      // console.log('=======')
      // console.log(event)
      // console.log(this.selection)
      // console.log('=======')
      this.$emit('input', {
        option: this.selection != undefined ? this.findoption(event) : '',
        type: this.selection != undefined ? type : '',
      })
    },

    findoption(id) {
      let option = this.options.find((v) => v.id == id)

      if (typeof option === 'undefined') {
        return null
      }

      console.log('finding option')
      console.log(option)
      return option
    },
    // selectType(event) {
    //   this.$emit('selectType', event)
    // },
    checkSelection(event) {
      return event != undefined ? true : false
    },
    checkAvailability(id) {},
  },
}
</script>
<template>
  <v-container>
    <h3>{{ type }}</h3>
    <v-chip-group v-model="selection" @change="changed($event, type)">
      <v-chip
        v-for="attribute in productattributes"
        :key="attribute.id"
        :value="attribute.id"
        :filter="active"
        active-class="primary--text"
        >{{ attribute.label }}</v-chip
      >
    </v-chip-group>
    <!--<template v-if="!attribute.in_stock">Out of Stock</template>-->
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      selection: null,
      productattributes: this.attributes,
    }
  },
  props: {
    type: {
      required: true,
      type: String,
    },
    attributes: {
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
      console.log('in changed event')
      console.log(type)
      console.log('=======')
      console.log(event)
      console.log(this.selection)
      console.log('=======')

      this.$emit('input', {
        attribute: this.selection != undefined ? this.findattribute(event) : '',
        type: this.selection != undefined ? type : '',
      })
    },

    findattribute(id) {
      console.log(this.attributes)
      let attribute = this.attributes.find((v) => v.id == id)

      if (typeof attribute === 'undefined') {
        return null
      }

      console.log('finding attribute')
      console.log(attribute)
      return attribute
    },
    selectType(event) {
      this.$emit('selectType', event)
    },
    checkSelection(event) {
      return event != undefined ? true : false
    },
  },
}
</script>
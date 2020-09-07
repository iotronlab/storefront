<template>
  <v-container>
    <v-chip-group active-class="primary--text">
      <v-chip :value="type" disabled>{{ type }}</v-chip>
    </v-chip-group>

    <v-chip-group v-model="selection" @change="changed($event, type)">
      <v-chip
        v-for="variation in productVariation"
        :key="variation.id"
        :value="variation.id"
        :disabled="!variation.in_stock "
        :filter="active"
        active-class="primary--text"
      >{{ variation.name }}</v-chip>
    </v-chip-group>
    <!--<template v-if="!variation.in_stock">Out of Stock</template>-->
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      selection: null,
      productVariation: this.variations
    };
  },
  props: {
    type: {
      required: true,
      type: String
    },
    variations: {
      required: true,
      type: Array
    },
    value: {
      required: false,
      default: ""
    },
    disabled: {
      required: true,
      type: Boolean
    },
    active: {
      required: true,
      type: Boolean
    }
  },

  computed: {
    selectedVariationId() {
      if (!this.findVariation(this.value.id)) {
        return "";
      }

      return this.value.id;
    }
  },

  methods: {
    changed(event, type) {
      this.$emit("input", {
        variation: this.selection != undefined ? this.findVariation(event) : "",
        type: this.selection != undefined ? type : ""
      });
    },

    findVariation(id) {
      let variation = this.variations.find(v => v.id == id);

      if (typeof variation === "undefined") {
        return null;
      }

      return variation;
    },
    selectType(event) {
      this.$emit("selectType", event);
    },
    checkSelection(event) {
      return event != undefined ? true : false;
    }
  }
};
</script>
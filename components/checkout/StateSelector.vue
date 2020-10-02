<template>
  <v-select
    label="Select State"
    outlined
    class="mx-2"
    :items="states"
    item-value="id"
    item-text="name"
    return-object
    @change="changed"
  ></v-select>
</template>
<script>
export default {
  data() {
    return {
      states: []
    };
  },
  methods: {
    async getStates() {
      let response = await this.$axios.$get("states");
      this.states = response.data;
    }
  },
  created() {
    this.getStates();
  },
  changed($event) {
    this.$emit("input", $event.target.value);
  }
};
</script>
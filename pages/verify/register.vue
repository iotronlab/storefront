<template>
  <div>
    {{ get_path }}
    <Verify :pageName="getName" />
  </div>
</template>

<script>
export default {
  computed: {
    getName() {
      let name = this.$route.name.split('-')
      return name[name.length - 1]
    },
  },
}
</script>



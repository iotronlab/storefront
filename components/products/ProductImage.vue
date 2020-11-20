<template>
  <v-carousel v-model="model">
    <v-carousel-item v-for="(image, i) in imageList" :key="i" :src="image">
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
    },
  },
  computed: {
    imageList() {
      if (!this.images || this.images.length == 0) {
        this.images = ['/art.jpg']
      }
      return this.images
    },
  },
  data() {
    return {
      model: 0,
    }
  },
}
</script>

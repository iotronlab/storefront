<template>
  <v-card rounded>
    <v-window v-model="activeImage">
      <v-window-item v-for="(image, i) in imageList" :key="i">
        <v-img max-height="700" contain :src="image.url" />
      </v-window-item>
    </v-window>
    <v-card-actions>
      <!-- <v-item-group v-model="onboarding" class="text-center" mandatory>
        <v-row no-gutters>
          <v-col v-for="(image, i) in imageList" :key="i">
            <v-item v-slot="{ active, toggle }">
              <v-img
                width="100"
                :input-value="active"
                @click="toggle"
                :src="image.url"
              >
              </v-img> </v-item></v-col
        ></v-row>
      </v-item-group> -->
      <v-slide-group v-model="activeImage">
        <v-slide-item
          v-for="(image, i) in imageList"
          :key="i"
          v-slot="{ active, toggle }"
        >
          <v-card
            :img="image.url"
            class="ma-2"
            height="200"
            width="100"
            @click="toggle"
          >
            <v-row class="fill-height" align="center" justify="center">
              <v-scale-transition>
                <v-icon
                  v-if="active"
                  color="white"
                  size="24"
                  v-text="'mdi-eye-outline'"
                ></v-icon>
              </v-scale-transition>
            </v-row>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-card-actions>
  </v-card>
</template>



<script>
export default {
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  computed: {
    imageList() {
      if (!this.images || this.images.length == 0) {
        this.images.push({ url: require('@/assets/img/default-product.png') })
      }
      return this.images
    },
  },
  data() {
    return {
      activeImage: 0,
    }
  },
}
</script>

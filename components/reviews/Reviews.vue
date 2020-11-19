<template>
  <v-carousel
    v-model="model"
    :next-icon="false"
    :prev-icon="false"
    :interval="3000"
    cycle
  >
    <v-carousel-item v-for="(review, i) in reviews" :key="i">
      <v-container>
        <v-row>
          <v-col cols="5">
            <v-img height="250" :src="review.img"></v-img>
          </v-col>
          <v-col cols="7">
            <v-card-title>{{ review.title }}</v-card-title>

            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="review.rating"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">{{ review.rating }}</div>
              </v-row>
              <div>
                {{ review.content }}
              </div>
            </v-card-text>
            <v-card-text> {{ review.name }}</v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    reviews: {
      required: true,
      type: Array,
    },
  },
  data: () => ({
    model: 0,
    colors: ['primary', 'secondary', 'yellow darken-2', 'red', 'orange'],
  }),
}
</script>
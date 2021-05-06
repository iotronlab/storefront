<template>
  <v-container fluid class="pa-0">
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="about-us"
    >
      <v-img src="flag.png">
        <h2 headline class="landing-title mt-4" align="center">About Us</h2>
        <v-img
          class="mx-auto mt-2"
          width="210"
          :src="require('@/assets/img/highlight.png')" />
        <v-row no-gutters class="fill-height" justify="center">
          <v-col cols="12" lg="4" class="px-2">
            <h4 class="text-center text-body-2 mt-4">
              We are an organization of Artists, Creators, Craftsmen, and
              Entrepreneurs dedicated to preserving India’s vast and rich
              cultural heritage. We have more than 100 indigenous art forms and
              crafts in this great country. But the people who keep these
              traditional art forms alive are also one of the most vulnerable
              sections of our society. Post the Covid-19 pandemic and the
              resulting economic devastation, many of our indigenous art forms
              are feared to become extinct.<br /><br />
              Our organization aims to empower artists & craftsmen at the
              grassroots level by providing them with a platform where they can
              showcase as well as sell their artworks. We take care of all the
              required procedures from content management to legal and
              logistics, so that the artist can focus on what they do best.
            </h4>
            <v-img class="mt-6" :src="require('@/assets/img/aboutus.png')" />
          </v-col>
          <v-col cols="12" lg="6">
            <v-img src="india.png" />
          </v-col> </v-row
      ></v-img>
    </section>
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="contact-us"
    >
      <v-row no-gutters>
        <v-col md="6">
          <v-img src="/contactus.png" />
        </v-col>
        <v-col md="6">
          <v-card class="ma-4">
            <v-card-text>
              {{ name }}
              <v-text-field
                v-model="name"
                :counter="20"
                label="Name"
                required
              ></v-text-field>

              <v-text-field
                v-model="email"
                label="E-mail"
                required
              ></v-text-field>
              <v-text-field
                v-model="contact"
                :counter="20"
                label="Contact"
                required
              ></v-text-field>
              <v-textarea
                v-model="address"
                label="Address"
                required
              ></v-textarea>
              <v-text-field
                v-model="portfolio"
                label="Portfolio Link"
                required
              ></v-text-field>
            </v-card-text>
            <v-btn @click="submitForm">Submit</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </section>
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="network"
    >
      <v-row no-gutters>
        <h1>Network</h1>
      </v-row>
    </section>
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="careers"
    >
      <v-row no-gutters>
        <h1>Careers</h1>
      </v-row>
    </section>
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="blog"
    >
      <v-row no-gutters>
        <h1>Blog</h1>
      </v-row>
    </section>
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="programs"
    >
      <v-row no-gutters>
        <h1>Partnership Program</h1>
      </v-row>
    </section>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      contact: '',
      address: '',
      portfolio: '',
      sectionObserver: null,
      test:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!',
    }
  },
  methods: {
    // onIntersect(entries, observer) {
    //   console.log(entries[0].target.id)
    //   console.log(entries[0].intersectionRatio >= 0.5)
    //   if (entries[0].intersectionRatio >= 0.5) {
    //     this.$router.push({
    //       hash: `#${entries[0].target.id}`,
    //     })
    //   }
    // },
  },
}
</script>

<template>
  <v-container fluid>
    <v-img src="/aboutus.png" />
    <section
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="about-us"
    >
      <v-row no-gutters>
        <v-col>
          <h2 headline class="landing-title mt-4" align="center">About Us</h2>
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

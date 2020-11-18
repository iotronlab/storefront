<template>
  <v-container>
    <v-row no-gutters class="section" id="about-us">
      <v-col>
        <v-img src="/aboutus.png" />
        <h2 headline class="landing-title mt-4" align="center">About Us</h2>
      </v-col>
    </v-row>
    <!-- <v-row no-gutters class="section" id="join-us">
      <h2 headline class="landing-title mt-4" align="center">
        Join Our Network
      </h2>
    </v-row> -->
    <v-row no-gutters class="section" id="contack-us">
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
            <v-textarea v-model="address" label="Address" required></v-textarea>
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
    <!-- <v-row no-gutters class="section" id="about-us">
      <h1>About us</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row> -->
    <v-row no-gutters class="section" id="network">
      <h1>Network</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row>
    <v-row no-gutters class="section" id="careers">
      <h1>Careers</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row>
    <v-row no-gutters class="section" id="blog">
      <h1>Blog</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row>
    <v-row no-gutters class="section" id="program">
      <h1>Program</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row>
    <!-- <v-row no-gutters class="section" id="contact-us">
      <h1>Contact us</h1>
      <textarea class="section" cols="100" rows="50" v-model="test"></textarea>
    </v-row> -->
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
  mounted() {
    this.observeSections()
  },
  methods: {
    async submitForm() {
      await this.$axios
        .$post('contactform', {
          name: this.name,
          email: this.email,
          contact: this.contact,
          address: this.address,
          portfolio: this.portfolio,
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    observeSections() {
      try {
        this.sectionObserver.disconnect()
      } catch (error) {}

      const options = {
        rootMargin: '0px 0px',
        threshold: 0,
      }
      this.sectionObserver = new IntersectionObserver(
        this.sectionObserverHandler,
        options
      )

      // Observe each section
      const sections = document.querySelectorAll('.section')
      sections.forEach((section) => {
        this.sectionObserver.observe(section)
      })
    },
    sectionObserverHandler(entries) {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          // Push sectionId to router here
          this.$router.push({ name: this.$route.name, hash: `#${sectionId}` })
          console.log(window.history)
          console.log(this.$route.hash)
        }
      }
    },
  },
}
</script>

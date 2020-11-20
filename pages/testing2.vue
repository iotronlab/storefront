<template>
  <v-container>
    <a href="#4" v-smooth-scroll="{ duration: 1000, offset: -50 }">Section 4</a>
    <div
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="1"
    >
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis modi
        eaque temporibus omnis enim exercitationem beatae totam impedit deleniti
        distinctio ducimus adipisci repellendus placeat nam eos, doloribus id
        tempora fugit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! v Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur!
      </p>
    </div>
    <div
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="2"
    >
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam est
        dolore dolorum nulla facilis asperiores. Quam voluptatum consequuntur
        quos? Dolore eum necessitatibus ab adipisci dolorem quos, asperiores
        excepturi! Consectetur! Lorem ipsum dolor sit amet consectetur,
        adipisicing elit. Porro nam est dolore dolorum nulla facilis asperiores.
        Quam voluptatum consequuntur quos? Dolore eum necessitatibus ab adipisci
        dolorem quos, asperiores excepturi! Consectetur! Lorem ipsum dolor sit
        amet consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! v Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur! Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum
        consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos,
        asperiores excepturi! Consectetur! Lorem ipsum dolor sit amet
        consectetur, adipisicing elit. Porro nam est dolore dolorum nulla
        facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum
        necessitatibus ab adipisci dolorem quos, asperiores excepturi!
        Consectetur!
      </p>
    </div>
    <textarea
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="3"
      cols="100"
      rows="50"
      v-model="test"
    ></textarea>
    <div
      v-intersect="{
        handler: onIntersect,
        options: {
          threshold: [0, 0.5, 1.0],
        },
      }"
      id="4"
    >
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima
      fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero
      voluptate officiis iste quisquam omnis, iure maxime voluptatibus
      accusantium!
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      test:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!',
      sectionObserver: null,
    }
  },
  // mounted() {
  //   this.observeSections()
  // },
  methods: {
    onIntersect(entries, observer) {
      console.log(entries[0].target.id)
      console.log(entries[0].intersectionRatio >= 0.5)
      if (entries[0].intersectionRatio >= 0.5) {
        this.$router.push({
          hash: `#${entries[0].target.id}`,
        })
      }
    },
    // observeSections() {
    //   console.log('sectionObserver below')
    //   console.log(this.sectionObserver)
    //   try {
    //     this.sectionObserver.disconnect()
    //   } catch (error) {}

    //   const options = {
    //     rootMargin: '0px 0px',
    //     threshold: 0,
    //   }
    //   console.log('in observe  section')
    //   this.sectionObserver = new IntersectionObserver(
    //     this.sectionObserverHandler,
    //     options
    //   )

    //   // Observe each section
    //   const sections = document.querySelectorAll('.section')
    //   sections.forEach((section) => {
    //     this.sectionObserver.observe(section)
    //   })
    // },
    // sectionObserverHandler(entries) {
    //   console.log(entries)
    //   for (const entry of entries) {
    //     if (entry.isIntersecting) {
    //       const sectionId = entry.target.id
    //       // Push sectionId to router here
    //       this.$router.push({ name: this.$route.name, hash: `#${sectionId}` })
    //       console.log(this.$route.hash)
    //     }
    //   }
    // },
  },
}
</script>

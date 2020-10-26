<template>
    <v-container>
        <a href="#4"  v-smooth-scroll="{ duration: 1000, offset: -50}">Section 4</a> 
        <div class="section" id="1">
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis modi eaque temporibus omnis enim exercitationem beatae totam impedit deleniti distinctio ducimus adipisci repellendus placeat nam eos, doloribus id tempora fugit.</p>
        </div>
        <div class="section" id="2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos, asperiores excepturi! Consectetur!</div>
        <textarea class="section" id="3" cols="100" rows="50" v-model="test"></textarea>
        <div class="section" id="4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!</div>
    </v-container>    
</template>

<script>
export default {
    data(){
        return {
            test: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!",
            sectionObserver: null
        }
    },
    mounted () {
        this.observeSections()
    },
    methods: {
        observeSections() {
            try {
            this.sectionObserver.disconnect()
            } catch (error) {}

            const options = {
            rootMargin: '0px 0px',
            threshold: 0
            }
            this.sectionObserver = new IntersectionObserver(this.sectionObserverHandler, options)

            // Observe each section
            const sections = document.querySelectorAll('.section')
            sections.forEach(section => {
            this.sectionObserver.observe(section)
            })
    },
    sectionObserverHandler (entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id
                // Push sectionId to router here 
                this.$router.push({ name: this.$route.name, hash: `#${sectionId}` })
                console.log(window.history)
            }
        }
    }
    }
}
</script>

<template>
  <v-container fluid class="body-image">
    <v-row no-gutters justify="center">
      <v-col lg="3" cols="12" class="text-center pa-2">
        <v-img src="/logo.png" contain height="80" class="mb-4" />
        <v-btn small rounded>Join our network</v-btn>

        <section>
          <v-divider class="my-2" />
          <p class="caption">find us on</p>
          <v-row no-gutters justify="space-around" class="my-4">
            <v-btn
              v-for="(social, i) in socialLinks"
              :key="i"
              icon
              class="nufab"
              ><v-icon>{{ social.icon }}</v-icon></v-btn
            >
          </v-row>
          <v-divider class="my-2" />
          <v-row no-gutters justify="space-around">
            <p class="caption">
              <v-icon>mdi-phone </v-icon>&nbsp;+91 7980 665 957
            </p>
            <p class="caption">
              <v-icon>mdi-email</v-icon>&nbsp;info@urartistic.com
            </p>
          </v-row>
        </section>
      </v-col>
      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">About</p>

        <p
          class="subtitle-2 mb-1"
          v-for="(internalLink, i) in internalLinks"
          :key="i"
        >
          <nuxt-link :to="internalLink.url"
            >{{ internalLink.name }}<br
          /></nuxt-link>
        </p>
      </v-col>

      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">Help and Support</p>
        <p class="subtitle-2 mb-1" v-for="(helpLink, i) in helpLinks" :key="i">
          <nuxt-link :to="helpLink.url">{{ helpLink.name }}<br /> </nuxt-link>
        </p>
      </v-col>
      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">Policies</p>
        <p class="subtitle-2 mb-1" v-for="(policy, i) in policies" :key="i">
          <nuxt-link :to="policy.url">{{ policy.name }}<br /> </nuxt-link>
        </p>
      </v-col>
      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">Payment Methods</p>

        <v-img
          referrerpolicy="origin"
          src="https://badges.razorpay.com/badge-dark.png "
          style="height: 45px; width: 113px"
          alt="Razorpay | Payment Gateway | Neobank"
          class="rounded-lg"
        /><v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>Cash on Delivery
        </v-chip>
        <v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>UPI
        </v-chip>
        <v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>Online Payment
        </v-chip>
        <v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>Mobile Banking
        </v-chip>
        <v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>Debit Card
        </v-chip>
        <v-chip small outlined class="mt-2">
          <v-icon left> mdi-check </v-icon>Credit Card
        </v-chip>
        <p class="caption mt-4">Shipping Methods</p>
        <v-chip small outlined>
          <v-icon left> mdi-check </v-icon>Flat Rate
        </v-chip>
      </v-col>
    </v-row>
    <v-row no-gutters
      ><span>&copy; {{ new Date().getFullYear() }}</span></v-row
    >
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      internalLinks: [
        { name: 'About US', url: '/about-us' },
        { name: 'Artistic Network', url: '/about-us#network' },
        { name: 'Careers', url: '/about-us#careers' },
        { name: 'Blog', url: '/about-us#blog' },
        { name: 'Partnership Program', url: '/about-us#programs' },
        { name: 'Contact US', url: '/about-us#contact-us' },
      ],
      policies: [
        { name: 'Cancellation and Return Policy', url: '' },
        { name: 'Payment Policy', url: '' },
        { name: 'Shipping Policy', url: '' },
        { name: 'Privacy Policy', url: 'Privacy Policy' },
        { name: 'Sitemap', url: '' },
      ],
      helpLinks: [
        { name: 'FAQ', url: '/help-centre#FAQ' },
        { name: 'Payment', url: '/help-centre#Payment' },
        { name: 'Shipping', url: '/help-centre#Shipping' },
        {
          name: 'Cancellation and Return',
          url: '/help-centre#Cancellation%20and%20Return',
        },
        {
          name: 'Report Infringement',
          url: '/help-centre#Report%20Infringement',
        },
      ],
      socialLinks: [
        { icon: 'mdi-facebook', url: '' },
        { icon: 'mdi-youtube', url: '' },
        { icon: 'mdi-instagram', url: '' },
        { icon: 'mdi-linkedin', url: 'Privacy Policy' },
      ],
    }
  },
}
</script>
<style scoped>
.v-application.theme--light .nufab {
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5) !important;
}

.v-application.theme--dark .nufab {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.7),
    -5px -5px 10px rgba(255, 255, 255, 0.1);
}
</style>

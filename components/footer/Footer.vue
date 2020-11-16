<template>
  <v-container fluid class="footer-image">
    <v-row no-gutters justify="center">
      <v-col lg="3" cols="12" class="text-center pa-2">
        <v-img src="/butiq.png" contain height="80" class="mb-4" />
        <v-btn small rounded>Join our network</v-btn>

        <section>
          <v-divider class="my-2" />
          <p class="caption">find us on</p>
          <v-row no-gutters justify="space-around" class="my-4"
            ><v-icon>mdi-youtube</v-icon>
            <v-icon>mdi-instagram</v-icon>
            <v-icon>mdi-facebook</v-icon>
            <v-icon>mdi-linkedin</v-icon></v-row
          >
          <v-divider class="my-2" />
          <v-row no-gutters justify="space-around">
            <p class="caption">
              <v-icon>mdi-phone </v-icon>&nbsp;+91-8770695893
            </p>
            <p class="caption">
              <v-icon>mdi-email</v-icon>&nbsp;info@urartistic.com
            </p>
          </v-row>
        </section>
      </v-col>
      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">About</p>

        <nuxt-link
          class="text-decoration-none subtitle-2"
          v-for="(internalLink, i) in internalLinks"
          :key="i"
          :to="internalLink.url"
          >{{ internalLink.name }}<br />
        </nuxt-link>
      </v-col>

      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">Help and Support</p>
        <nuxt-link
          class="text-decoration-none subtitle-2"
          v-for="(helpLink, i) in helpLinks"
          :key="i"
          :to="helpLink.url"
          >{{ helpLink.name }}<br />
        </nuxt-link>
      </v-col>
      <v-col lg="2" cols="6" md="3" class="pa-2">
        <p class="caption">Policies</p>

        <nuxt-link
          class="text-decoration-none subtitle-2"
          v-for="(policy, i) in policies"
          :key="i"
          :to="policy.url"
          >{{ policy.name }}<br />
        </nuxt-link>
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
        { name: 'About US', url: '' },
        { name: 'Artistic Network', url: 'Privacy Policy' },
        { name: 'Careers', url: '' },
        { name: 'Blog', url: '' },
        { name: 'Partnership Program', url: '' },
        { name: 'Contact US', url: '' },
      ],
      policies: [
        { name: 'Cancellation and Return Policy', url: '' },
        { name: 'Payment Policy', url: '' },
        { name: 'Shipping Policy', url: '' },
        { name: 'Privacy Policy', url: 'Privacy Policy' },
        { name: 'Sitemap', url: '' },
      ],
      helpLinks: [
        { name: 'FAQ', url: '' },
        { name: 'Payment', url: '' },
        { name: 'Shipping', url: '' },
        { name: 'Cancellation and Return', url: 'Privacy Policy' },
        { name: 'Report Infringement', url: '' },
      ],
    }
  },
}
</script>

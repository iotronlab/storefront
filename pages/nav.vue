<template>
  <div>
    <ND :items="items" />
    <!-- {{ items }} -->
  </div>
</template>
<script>
import ND from '@/components/nav/NavDrawer'
export default {
  components: {
    ND,
  },
  data() {
    return {
      items: [
        {
          name: 'Butiq',
          children: [
            {
              name: 'Dashboard',
              icon: 'mdi-view-dashboard',
              children: [
                { name: 'D1', icon: 'mdi-view-dashboard' },
                { name: 'D2', icon: 'mdi-view-dashboard' },
              ],
            },
            {
              name: 'Photos',
              icon: 'mdi-image',
              children: [
                { name: 'P1', icon: 'mdi-image' },
                { name: 'P2', icon: 'mdi-image' },
              ],
            },
            {
              name: 'About',
              icon: 'mdi-help-box',
              children: [
                { name: 'A1', icon: 'mdi-help-box' },
                { name: 'A2', icon: 'mdi-help-box' },
              ],
            },
          ],
        },
      ],
    }
  },
}
</script>
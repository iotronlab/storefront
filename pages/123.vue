<template>
  <v-container class="fill-height pa-0">
    <v-row class="no-gutters">
      <v-col cols="12" lg="3" class="flex-grow-1 flex-shrink-0">
        <v-responsive class="overflow-y-auto fill-height"> </v-responsive>
      </v-col>
      <v-col cols="auto" class="flex-grow-1 flex-shrink-0">
        <v-responsive v-if="activeChat" class="overflow-y-hidden fill-height">
        </v-responsive>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    activeChat: 1,
    parents: [
      {
        id: 1,
        title: 'john doe',
        active: true,
      },
      {
        id: 3,
        title: 'scarlett',
        active: false,
      },
      {
        id: 4,
        title: 'scarlett',
        active: false,
      },
      {
        id: 5,
        title: 'scarlett',
        active: false,
      },
      {
        id: 6,
        title: 'scarlett',
        active: false,
      },
      {
        id: 7,
        title: 'scarlett',
        active: false,
      },
      {
        id: 8,
        title: 'scarlett',
        active: false,
      },
      {
        id: 9,
        title: 'scarlett',
        active: false,
      },
      {
        id: 10,
        title: 'scarlett',
        active: false,
      },
      {
        id: 11,
        title: 'scarlett',
        active: false,
      },
      {
        id: 12,
        title: 'scarlett',
        active: false,
      },
      {
        id: 13,
        title: 'scarlett',
        active: false,
      },
      {
        id: 14,
        title: 'scarlett',
        active: false,
      },
    ],
    messages: [
      {
        content: 'lorem ipsum',
        me: true,
        created_at: '11:11am',
      },
      {
        content: 'dolor',
        me: false,
        created_at: '11:11am',
      },
      {
        content: 'dolor',
        me: false,
        created_at: '11:11am',
      },
      {
        content: 'dolor',
        me: false,
        created_at: '11:11am',
      },
      {
        content: 'dolor',
        me: true,
        created_at: '11:11am',
      },
      {
        content: 'dolor',
        me: false,
        created_at: '11:12am',
      },
      {
        content: 'dolor',
        me: false,
        created_at: '11:14am',
      },
    ],
    messageForm: {
      content: '',
      me: true,
      created_at: '11:11am',
    },
  }),
}
</script>

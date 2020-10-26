<template>
  <v-container>
    <v-btn @click='order'>Oredr</v-btn>
    <v-row>
      <v-col cols="12">
        <h3
          ref="radio"
          class="headline"
        >
          Target
        </h3>

        <v-radio-group
          v-model="type"
          row
        >

          <v-radio
            label="Selector"
            value="selector"
          ></v-radio>
        </v-radio-group>
        <v-select
          v-if="type === 'selector'"
          v-model="selector"
          label="Selector"
          :items="selections"
        ></v-select>

      </v-col>

      <v-col cols="12">
        <h3 class="headline">Options</h3>

        <v-select
          v-model="easing"
          :items="easings"
          label="Easing"
        ></v-select>

        <v-slider
          v-model="duration"
          min="0"
          max="1000"
          label="Duration"
          thumb-label
        ></v-slider>

        <v-slider
          v-model="offset"
          min="-500"
          max="500"
          label="Offset"
          thumb-label
        ></v-slider>
      </v-col>

      <v-col>
        <v-btn
          ref="button"
          block
          color="primary"
          @click="$vuetify.goTo(target, options)"
        >
          scroll
        </v-btn>
      </v-col>
    </v-row>
    <v-btn @click='order'>Oreder</v-btn>
    <div id="name1">
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis modi eaque temporibus omnis enim exercitationem beatae totam impedit deleniti distinctio ducimus adipisci repellendus placeat nam eos, doloribus id tempora fugit.</p>
    </div>
    <div id="name2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro nam est dolore dolorum nulla facilis asperiores. Quam voluptatum consequuntur quos? Dolore eum necessitatibus ab adipisci dolorem quos, asperiores excepturi! Consectetur!</div>
    <textarea id="name3" cols="100" rows="50" v-model="test"></textarea>
    <div id="name4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!</div>
  </v-container>
</template>

<script>
import * as easings from 'vuetify/es5/services/goto/easing-patterns'
export default {
    data() {
    return {
      payment_id: null,
      est: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt minima fugit ex tempora? Eius id pariatur porro cupiditate beatae est vero voluptate officiis iste quisquam omnis, iure maxime voluptatibus accusantium!",
      selector: '#name1',
      selections: ['#name1', '#name2', '#name3', '#name4'],
      duration: 700,
      offset: 0,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings),
    };
  },
  computed: {
    target () {
        const value = this[this.type]
        if (!isNaN(value)) return Number(value)
        else return value
      },
  },
  methods: {
    order() {
      const self = this;
      const rzp_options = {
        key: "rzp_test_Dv0Xgjtx61qqXZ",
        amount: 10 * 100,
        name: "The Bollywood Store",
        description: "Item",
        handler: function(response) {
          self.$toast.success(`Payment Succesful`, {
            position: "bottom-center",
            theme: "outline",
            duration: 5000
          });
          self.payment_id = response.razorpay_payment_id;
        },
        modal: {
          ondismiss: function() {
            self.$toast.error(`Payment Failed`, {
              position: "bottom-center",
              theme: "outline",
              duration: 5000
            });
          }
        },
        prefill: {
          email: "test@email.com",
          contact: +914455667788
        },
        notes: {
          name: "Customer Name",
          item: "Item"
        },
        theme: {
          color: "#667eea"
        }
      };
      const rzp1 = new Razorpay(rzp_options);
      rzp1.open();
    }
    }
}
</script>

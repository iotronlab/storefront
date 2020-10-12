<template>
  <v-btn @click='order'>Oredr</v-btn>
</template>

<script>
export default {
    data() {
    return {
      payment_id: null
    };
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
z
<template>
  <div class="second-page-content">
    <first></first>
    <negative></negative>
  </div>
</template>

<script>
  import First from '../components/doubleOpportunity-first.vue'
  import Negative from '../components/doubleOpportunity-negative.vue'

  export default {
    data() {
      return {
        odds: {}
      }
    },
    components: {
      first: First,
      negative: Negative,
    }
  }
</script>

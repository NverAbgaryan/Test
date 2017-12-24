<template>
  <div class="all-content-wrapper">
    <double></double>
    <div class="second-column-wrapper">
      <div class="left-item-numbers">
        <div>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">1</i>
        </span>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">2</i>
        </span>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">3</i>
        </span>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">4</i>
        </span>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">5</i>
        </span>
        </div>
        <div>
         <span class="fa-stack fa-lg red-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">6</i>
        </span>
        </div>
      </div>
      <positive></positive>
      <negative></negative>
      <div></div>
    </div>
  </div>
</template>

<script>
  import Double from '../components/double-odds-wrapper.vue'
  import Negative from '../components/singl-odds-negative.vue'
  import Positive from '../components/singl-odds-positiove.vue'

  export default {
    data() {
      return {
        odds: {}
      }
    },
    components: {
      double: Double,
      negative: Negative,
      positive: Positive
    }
  }
</script>

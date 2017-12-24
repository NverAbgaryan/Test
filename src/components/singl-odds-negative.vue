<template>
  <div class="second-column">
    <div>
         <span class="fa-stack fa-lg orange-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">5x</i>
        </span>
    </div>
    <div>
         <span class="fa-stack fa-lg orange-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">5x</i>
        </span>
    </div>
    <div>
         <span class="fa-stack fa-lg orange-number">
          <i class="fa fa-circle fa-stack-2x"></i>
          <i class="fa fa-inverse fa-stack-1x ">5x</i>
        </span>
    </div>

    <div v-for="odd in getNegativeOdds.oddsForFirstPlaceNegative">
      <div class="col-border">{{odd}}
        <span>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div v-for="odd in getNegativeOdds.oddsForSecondPlaceNegative">
      <div class="col-border">{{odd}}
        <span>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div v-for="odd in getNegativeOdds.oddsForThirdPlaceNegative">
      <div class="col-border">{{odd}}
        <span>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    computed: {
      getNegativeOdds: function () {
        return this.$store.getters.getNegativeOdds
      }
    }
  }
</script>

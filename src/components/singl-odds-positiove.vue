<template>
  <div class="third-column">
    <div>
                  <span class="fa-stack fa-lg orange-number">
                    <i class="fa fa-circle fa-stack-2x"></i>
                    <i class="fa fa-inverse fa-stack-1x ">5</i>
                  </span>
    </div>
    <div>
                     <span class="fa-stack fa-lg orange-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x ">5</i>
                    </span>
    </div>
    <div>
                     <span class="fa-stack fa-lg orange-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x ">5</i>
                    </span>
    </div>
    <div v-for="odd in getPositiveOdds.oddsForFirstPlace">
      <div class="col-border">{{odd}}
        <span>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div v-for="odd in getPositiveOdds.oddsForSecondPlace">
      <div class="col-border">{{odd}}
        <span>
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div v-for="odd in getPositiveOdds.oddsForThirdPlace">
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
      getPositiveOdds: function () {
        return this.$store.getters.getPositiveOdds
      }
    }
  }
</script>


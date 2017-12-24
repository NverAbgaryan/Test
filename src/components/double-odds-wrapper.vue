<template>
  <div class="first-column-wrapper">
    <div></div>
    <div class="first-column">
      <div>
        <div>1.2</div>
      </div>
      <div>
                    <span class="fa-stack fa-lg red-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x">1</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg blue-numbers">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x">2</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg white-numbers">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">3</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg grey-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">4</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg orange-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">5</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg white-black-numbers">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">6</i>
                    </span>
      </div>
      <div>
                    <span class="fa-stack fa-lg red-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">1</i>
                    </span>
      </div>

      <div v-for="odd in getDoubleOdds.odds_1">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </span>
        </div>
      </div>

      <div>
                    <span class="fa-stack fa-lg blue-numbers">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x ">2</i>
                    </span>
      </div>
      <div v-for="odd in getDoubleOdds.odds_2">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </span>
        </div>
      </div>
      <div>
                    <span class="fa-stack fa-lg white-numbers">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x black-number">3</i>
                    </span>
      </div>
      <div v-for="odd in getDoubleOdds.odds_3">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </span>
        </div>
      </div>

      <!--line 4-->
      <div>
                    <span class="fa-stack fa-lg grey-number">
                      <i class="fa fa-circle fa-stack-2x"></i>
                      <i class="fa fa-inverse fa-stack-1x ">4</i>
                    </span>
      </div>
      <div v-for="odd in getDoubleOdds.odds_4">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </span>
        </div>
      </div>

      <!--line 5-->
      <div>
            <span class="fa-stack fa-lg orange-number">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa fa-inverse fa-stack-1x ">5</i>
            </span>
      </div>

      <div v-for="odd in getDoubleOdds.odds_5">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
              <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </span>
        </div>
      </div>

      <div>
            <span class="fa-stack fa-lg white-black-numbers">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa fa-inverse fa-stack-1x black-number">6</i>
            </span>
      </div>

      <div v-for="odd in getDoubleOdds.odds_6">
        <div class="col-border" v-if="odd">{{odd}}
          <span>
                        <i class="fa fa-arrow-up" aria-hidden="true"></i>
                    </span>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
    <div></div>
  </div>
</template>
<script>
  export default {
    props: ['double'],
    computed: {
      getDoubleOdds: function () {
        return this.$store.getters.getDoubleOdds
      }
    }
  }
</script>

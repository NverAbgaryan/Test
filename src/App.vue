<template>
  <div class="wrapper">
    <router-view/>
  </div>

</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    created() {
      this.$socket.emit('join', "aasxasxaxasxas")
    },
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      odds: function (val) {
        if (val.odds && val.page === 'first') {
          if(this.$route.name !== 'first'){
            window.location.href = '#/'
          }
          let odds = JSON.parse(val.odds)
          this.$store.commit('doubleOdds', odds.doubleOdds)
          this.$store.commit('positiveOdds', odds.singleOdds.positiveOdds)
          this.$store.commit('negativeOdds', odds.singleOdds.negativeOdds)
        }else if(val.odds && val.page === 'second'){
          if(this.$route.name !== 'second'){
            window.location.href = '#/second'
          }
        }else if(val.status === 'video' && val.page === 'third'){
          window.location.href = '#/video'

        }
      }
    },
  }
</script>

<style>
  body {
    background: #21282e;
  }

  .wrapper {
    display: grid;
    margin: 3em 1em 3em 1em;
  }

  .all-content-wrapper {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 4fr 4fr;
    grid-template-rows: 90vh;

  }

  .first-column-wrapper {
    display: grid;
    background: #171e24;

  }

  /*.all-content-wrapper div:nth-child(2) {*/
  /*background: yellow;*/
  /*}*/
  /*.all-content-wrapper div:nth-child(3) {*/
  /*background: green;*/
  /*}*/
  .first-column-wrapper {
    display: grid;
    grid-template-rows: 90vh;
    grid-template-columns: 1fr 6fr 0.5fr;
    background: #171e24;
  }

  .first-column {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    background: #171e24;
  }

  .first-column div {
    display: grid;
    align-content: center;
    width: 100%;
    justify-content: center;
  }

  .second-column-wrapper {
    display: grid;
    grid-template-rows: 90vh;
    grid-template-columns: 1fr 3fr 3fr 1fr;
    background: #171e24;
  }

  .second-column {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;

  }

  .second-column div {
    display: grid;
    align-content: center;
    width: 100%;
    justify-content: center;

  }

  .left-item-numbers {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(1, 1fr);
    justify-items: center;
  }

  .left-item-numbers div {
    display: grid;
    align-content: center;
    width: 100%;
    justify-content: center;
  }

  .third-column {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }

  .third-column div {
    display: grid;
    align-content: center;
    width: 100%;
    justify-content: center;
  }

  .first-column div:nth-child(1) {
    color: #fff;
    font-size: 18px;
  }

  .first-column div div span {
    color: #fff;
    font-size: 14px;
    text-align: center;
  }

  .red-number {
    color: red;
  }

  .col-border {
    width: 70px;
    height: 50px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #343a42;
    color: #fff;
    text-align: center;
  }

  .blue-numbers {
    color: #136cb0;

  }

  .white-numbers {
    color: #fff;
    font-weight: bold;

  }

  .black-number {
    color: #000000;
  }

  .grey-number {
    color: #403f3f;
    font-weight: bold;
  }

  .orange-number {
    color: #f7ae02;
    font-weight: bold;
  }

  .white-black-numbers {
    color: #ffffff;
    font-weight: bold;
  }

  /*.all-content-wrapper div:nth-child(3) {*/
  /*background: green;*/
  /*}*/
</style>

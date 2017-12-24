import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    doubleOdds: [],
    positiveOdds: {},
    negativeOdds: {},
    doubleOpportunity: {
      positive: [],
      negative: []
    }
  },
  getters: {
    getNegativeOdds(state) {
      return state.negativeOdds
    },
    getPositiveOdds(state) {
      return state.positiveOdds
    },
    getDoubleOdds(state) {
      return state.doubleOdds
    },
    getDoubleOpportunity(state) {
      return state.doubleOpportunity
    }
  },
  mutations: {
    doubleOdds(state, doubleOdds) {
      doubleOdds.odds_1.splice(0, 0, null)
      doubleOdds.odds_2.splice(1, 0, null)
      doubleOdds.odds_3.splice(2, 0, null)
      doubleOdds.odds_4.splice(3, 0, null)
      doubleOdds.odds_5.splice(4, 0, null)
      doubleOdds.odds_6.splice(6, 0, null)
      state.doubleOdds = doubleOdds
    },
    positiveOdds(state, positiveOdds) {
      state.positiveOdds = positiveOdds
    },
    negativeOdds(state, negativeOdds) {
      state.negativeOdds = negativeOdds
    },
    doubleOpportunityPositive(state, positive) {
      state.doubleOpportunity.positive = positive
    },
    doubleOpportunityNegative(state, negative) {
      state.doubleOpportunity.positive = negative
    }
  },
  actions: {
    getOdds({commit}) {
      axios.get('/v1/odds?gameID=1', {headers: {'Access-Control-Allow-Origin': true}}).then(function (res) {
        commit('setbet', res.data)
      })
    }
  }


})

export default store

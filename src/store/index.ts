import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentCity:'',
  },
  mutations: {
    setCity(state,city){
      state.currentCity=city;
    }
  },
  modules: {
  },
  getters:{
    getCity: state => state.currentCity
  }
})

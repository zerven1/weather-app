<template>
  <div class="home  d-inline-flex mt-5 ">
    <MainPage />
    <Cities />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router'
import Cities from '../components/Cities.vue'
import MainPage from '../components/MainPage.vue'
Vue.use(VueRouter)
@Component({
  name:"Home",
  components: {
     Cities,
     MainPage
   }
  
})
export default class Home extends Vue {
   @Prop() private msg!: string;
}
</script>

<style>

body{
  background-color: white;
}

.home{
  margin-left:0px;
  min-height:70vh;
  border-radius:30px;
  border:1px solid black;
 
  background-color: white;
}
</style>
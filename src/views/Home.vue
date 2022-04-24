<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld />
    <h1>Hello {{name}}</h1>
    <h1>your email is {{email}}</h1>
    <button @click="logout">Logout</button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import axios from 'axios'
Vue.use(VueRouter)
@Component({
  name:"Home",
  components: {
     HelloWorld 
   }
  
})
export default class Home extends Vue {
   @Prop() private msg!: string;
  name!: '';
  email!:'';
  created(){
    if(localStorage.getItem('token') === null){
      this.$router.push('/login');
    }
  }
  mounted(){
    const currentToken:string|null = localStorage.getItem('token');
    if(!currentToken){
      console.log("Unauthorized");
      return;
    }  
    axios.get('http://localhost:5000/user', {headers:{ token: currentToken}})
    .then(res =>{
      this.name = res.data.user.name;
      this.email = res.data.user.email;
    })
  }
  data(){
    return{
      name:'',
      email:''
    }
  }
  public logout() {
     localStorage.clear();
     this.$router.push('/login');
   }
}
</script>


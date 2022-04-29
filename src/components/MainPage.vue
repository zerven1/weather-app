<template>
  <div class="main-container" :class="typeof weather.main != 'undefined' && weather.main.temp-273.15 > 16 ? 'warm' : ''">
    <div class="bg min-vw-30 d-flex flex-column">
    <div class="user-panel">
      <button class="btn btn-signin text-light" @click="logout">Logout</button>
          <div class="username-box">Welcome {{name}}!</div>
    </div>
    <div class="weather-wrap d-flex justify-content-center align-items-center flex-column" v-if="typeof weather.main !== 'undefined'">
      <div class="location-container" >
          <div class="location">{{weather.name}}, {{weather.sys.country}}</div>
      </div>      
      <div class="weather-container">
          <div class="weather">{{weather.weather[0].main}}</div>  
          <div class="temp">{{Math.round(weather.main.temp -273.15)}}°C</div>
          <div class="date">{{dateBuilder()}}</div>
      </div>
    </div>
    <div>
      
    </div> 
</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueRouter from 'vue-router'
import axios from 'axios'
import BarChart from '../components/BarChart.vue'
import 'chart.js';``
Vue.use(VueRouter)
@Component({
  components:{
    BarChart
  }
})
export default class MainPage extends Vue {
   @Prop() private msg!: string;
   
  name!: '';
  email!:'';
  isLogout!:true;
  api_key!:'606f3177e45f9912108ed39fae39c2c6'
  cityName!:''
  weather!:{}
  url_base!:'https://api.openweathermap.org/data/2.5/'
  chartData!:{
        '2000':1,
        '2001':2,
        '2002':3
      }
  @Watch('getCity')
  onPropertyChanged() {
        console.log("test");
        this.fetchWeather();
  }
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
      email:'',
      api_key:'606f3177e45f9912108ed39fae39c2c6',
      url_base:'https://api.openweathermap.org/data/2.5/',
      cityName:'',
      weather:{},
      chartData:{
        '2000':1,
        '2001':2,
        '2002':3
      }
    }
  }
  public logout() {
     localStorage.clear();
     this.$router.push('/login');
   }
  public fetchWeather(){
      fetch(`${this.url_base}weather?q=${this.getCity}&&appid=${this.api_key}`)
      .then(res =>{
        return res.json();
      }).then(this.setResult);
  }
  public setResult(results: {}){
    this.weather = results;
    console.log(this.cityName);
  }
  public dateBuilder(){
    let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
  }
  get getCity(){
    return this.$store.state.currentCity;
  }
}
</script>

<style>

.main-container{
  min-width:20vw;
  background:url('../assets/cold-bg.jpg');
  border-radius:30px 0px 0px 30px;
  -webkit-background-size: cover;
  background-size:cover;
  display:flex;
  transition: 0.4s;
}
.main-container.warm{
  background:url('../assets/warm-bg.jpg');
  -webkit-background-size: cover;
  background-size:cover;
}
.user-panel{
  margin:10px;
  float:left;
  width:100%;
  
}
button{
  float:left;
  width:20%;
}
.username-box{
  display: flex;
  align-items: center;
  justify-content: center;
  height:100%;
  color:white;
  font-size:20px;
}
.weather-wrap{
  height:100%;
  transition:0.4s;
}
.bg{
background-image: linear-gradient(to bottom, rgba(0,0,0,0.25),rgba(0,0,0,0.75));
width:100%;
border-radius:30px 0px 0px 30px;
}
.location-container .location{
  color:white;
  font-size:32px;
  font-weight: 500;
  text-shadow:1px 3px rgba(0,0,0,0.25);

}
.weather-container .date{
  color:white;
  font-size:20px;
  font-weight: 300;
  font-style:italic;
}
.weather-container .temp{
  color:white;
  font-size:80px;
  font-weight: 700;
}
.weather-container .weather,.today{
  color:white;
  font-size:30px;
  font-weight: 300;
}
.weather-container .weather{
  color:white;
  font-size:20px;
  font-weight: 200;
}
button{
  color:white;
}
</style>



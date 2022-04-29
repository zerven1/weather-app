<template>
  <div class="hello">
      <div class="input-group">
        <input type="text" class="form-control " placeholder="Search City..." v-model="cityName" @keypress="viewSearching()">
      </div>
      <div class="city-dropdown-menu">
          <ul class="mb-0" v-if="!isSearching">
            <li v-for="city in showList()" :key="city" @click="checkCity(city)">
            {{city}}
            </li>
          </ul>
        </div>
      <div class="city-list w-100 p-4 min-vh-50 row">
          <div class="add-block border row" @click="addCity()">
              <div class="icon-border border">
                <font-awesome-icon icon="fa-solid fa-plus" />
              </div>
              <p>Add city</p>
          </div>
          <div v-for="city in cityList" v-bind:key="city" class="city-generated-list">
            <div class="city-block border row d-flex align-items-start"  :class="{}">
            <div class="delete-city-box d-flex justify-content-end p-2 w-100">
              <font-awesome-icon icon="fa-solid fa-x" @click="deleteCity(city)"/>
            </div>
            <div class="city-name-box h-75 w-100 d-flex align-items-center justify-content-center pb-4" @click="setCity(city)">
              {{city}}
            </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
@Component({
})
export default class Cities extends Vue {
   @Prop() private msg!: string;
   cityName!:'';
   jsonList!:[
     "London",
     "Berlin",
     "Warsaw"
   ];
   cityList!:[];
   isSearching!:boolean;
   activeList!:[]
    data(){
      return{
        cityName:'',
        cityList:[],
        isSearching:false,
        jsonList!:[
          "London",
          "Berlin",
          "Warsaw"
        ],
      }
    }
    public showList(){
      return this.jsonList.filter((city:any) => city === this.cityName);
    }
    public setCity(city:any){
      if(city !==''){
        this.$store.commit('setCity',city);
        console.log(city);
      }
    }
    public addCity(){
      if(this.cityName !=='' && this.cityList.indexOf(this.cityName) ===-1 && this.cityList.length< 4){
      this.cityList.push(this.cityName);
      console.log(this.cityList);
      }
    }
    public deleteCity(city:any){
      for(let i=0; i<this.cityList.length; i++){
        if(city === this.cityList[i]){
          this.cityList.splice(i,1);
        }
      }
    }
    public checkCity(city:any){
      this.cityName=city;
      this.isSearching = true;
      console.log(this.isSearching);
    }
    public viewSearching(){
      this.isSearching = false;
    }
}
</script>


<style >
.hello{
    min-width:35vw;
    padding:20px;
}
.form-control{
  width:25%;
}
.city-list{
  display: flex;
  flex-direction: row;
}
.add-block{
  display:flex;
  justify-content: center;
  align-items: center;
  border-radius:20px;
  display:flex;
  flex-direction: column;
  padding-top:30px;
  width:20%;
  height:200px;
  margin-right: 20px;
  margin-top:10px;
}
.add-block:hover, .city-block:hover{
  background-image: linear-gradient(rgba(255,255,255,1) 0%, rgba(210,210,210,1) 100%);
}
.city-generated-list{
  width:18%;
  margin:10px 0px 0px 10px;
  min-height:200px;
}
.city-block{
  height:100%;
  border-radius:20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width:100%;
}
.city-block:active{
  background-image: linear-gradient(rgba(255,255,255,1) 0%, rgba(210,210,210,1) 100%);
  border:2px solid black;
}
.icon-border{
  border-radius: 50%;
  width:30px;
  height:30px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin:20px;
}
.city-dropdown-menu{
  border:1px solid #ced4da;
  padding:0px;
}
ul{
  list-style: none;
  text-align: left;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 150px;
  padding:0px;
}
li{
  width:100%;;
  border-bottom: 1px solid lightgray;
  padding:7px;
}
li:hover{
  background-image: linear-gradient(rgba(255,255,255,1) 0%, rgba(210,210,210,1) 100%);
}
</style>

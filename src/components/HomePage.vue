<template>
<div class="container">
  <div class="search-element">
    <input class="search-box" type="text" @keypress.enter="searchAShow()" v-model="searchedShow" placeholder="Search for a show">
    <button class="search-button btn btn-dark" @click="searchAShow()">
      <img src="../assets/search.svg" width="20px" height="20px">
    </button>
  </div>
      <div class="row">
        <p class="genre-text">Popular Shows</p>
        <div class = "scroll">
          <div v-for="show in popularShows" :key="show.id">
            <div class="card">
              <img class="show-img" :src="show.image.medium" @click="redirectToShowDetailsPage(show)">
              <p class="show-name" @click="redirectToPage(show.url)">{{show.name}}</p>
              <p class="show-rating">Rating: {{show.rating.average}}<span class="star"> &starf; </span></p>
            </div>
          </div>
        </div>
    </div>
    <div class="shows" v-for="showsFiltered in filteredShows" :key="showsFiltered.shows.id">
      <div class="row">
        <p class="genre-text">{{showsFiltered.name}}</p>
        <div class = "scroll">
          <div v-for="show in showsFiltered.shows" :key="show.id">
            <div class="card">
              <img class="show-img" :src="show.image.medium" @click="redirectToShowDetailsPage(show)">
              <p class="show-name" @click="redirectToPage(show.url)">{{show.name}}</p>
              <p class="show-rating">Rating: {{show.rating.average}}<span class="star"> &starf; </span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import {getAllTVShows} from '../../services/TvShowService'

export default {
  name: 'HomePage',
  data(){
    return{
      shows: [],
      genres : ["Action","Anime","Adventure","Comedy","Crime","Drama","Fantasy",
              "Espionage","Horror","Mystery","Romance","Science-Fiction"
              ,"Supernatural","Thriller","War","Western"],
      filteredShows: [],
      popularShows: [],
      searchedShow : "",
    };
  },
  mounted(){
    this.getAllShows();
    this.getPopularShows();
  },
  methods:{
    getAllShows(){
      getAllTVShows().then(result=>{
        this.shows = result.data 
        for(let j=0;j<this.genres.length;j++){
          let showsInGenre = []
          for(let i of this.shows){
            if(i.genres.includes(this.genres[j])){
                showsInGenre.push(i);
              }
            }
            const computedShows = {
              name:this.genres[j],
              shows:showsInGenre
            }
          this.filteredShows.push(computedShows)
        }
      }
      ).catch((err)=>console.log(err))
    },
    searchAShow(){
      this.$router.push({
          name:'Search',
          params:{
            searchShowName:this.searchedShow
          }
      }); 
    },
    async getPopularShows(){
      await getAllTVShows();
      this.popularShows = this.shows.sort(function(showOne,showTwo){return showTwo.rating.average-showOne.rating.average}).splice(0,15)
    }, 
    redirectToPage(url){
      window.open(url);
    },
    redirectToShowDetailsPage(showDetails){
       this.$router.push({
          name:'ShowDetails',
          params:{
            show:showDetails
          }
      }); 
    }
  }
}
</script>

<style scoped>

.search-element{
  padding: 10px;
  display: flex;
  justify-content: flex-end;
}
input{
  margin-right: 5px;
  border-radius: 5px;
  font-size: 20px;
  height: 50px;
}
.btn{
  height: 50px;
}
.star{
  color:#ffbf00;
}
.scroll{
    display: flex;
    overflow-x: auto;
}
.row{
  margin: 10px;
  padding: 15px;
  background: white;
  border-radius: 10px;
}
.card{
  margin: 10px;
}
p{
  text-align: center;
  width: 100%;
}
::-webkit-scrollbar {
  width: 1em;
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  background: black; 
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: grey; 
}
.movie-list{
  margin-top: 10px;
}
.show-img{
  margin: 15px;
  transition: 0.3s;
}
.genre-list{
  margin-top: 10px;
  display: flex;
}
.genre-text{
  text-align: left;
  margin: 15px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 30px;
}
.row{
  margin-bottom: 40px;
}
.show-img:hover{
  cursor: pointer;
  transform: scale(1.05);
  border-radius: 5%;
}
.show-name{
  font-weight: bold;
}
.show-name:hover{
  cursor: pointer;
  color: blue;
  transition: 0.3s;
}
@media only screen and (max-width: 350px){
  
}
</style>

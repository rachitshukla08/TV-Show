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
              <img class="show-img" :src="show.image.medium" @click="redirectToPage(show.url)">
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
              <img class="show-img" :src="show.image.medium" @click="redirectToPage(show.url)">
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
      genres : ["Anime","Action","Adventure","Comedy","Crime","Drama","Fantasy",
              "Espionage","Horror","Mystery","Romance","Science-Fiction"
              ,"Supernatural","Thriller"],
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
      const response = getAllTVShows()
      response.then(result=>{
        this.shows = result.data 
        //console.log(this.shows)
        for(let j=0;j<this.genres.length;j++){
            let shw = []
        for(let i of this.shows){
                if(i.genres.includes(this.genres[j])){
                    shw.push(i);
                }
            }
            const computedShows = {
                name:this.genres[j],
                shows:shw
            }
            this.filteredShows.push(computedShows)
        }
      }
      )
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
      //let allShows = this.shows
      //console.log(allShows.length)
      this.popularShows = this.shows.sort(function(showOne,showTwo){return showTwo.rating.average-showOne.rating.average}).splice(0,15)
      //console.log(this.popularShows)
    }, 
    redirectToPage(url){
      window.open(url);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
  color:yellow;
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
}
.genre-list{
  margin-top: 10px;
  display: flex;
}
.genre-text{
  text-align: left;
  margin: 15px;
  font-family: monospace;
  font-size: 30px;
}
.row{
  margin-bottom: 40px;
}
img:hover{
  cursor: pointer;
  transform: scale(1.05);
}
.show-name:hover{
  cursor: pointer;
}
</style>

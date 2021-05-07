<template>
  <div>
    <h2>Search results for "{{searchShowName}}"</h2>
      <div class = "row" v-if="checkIfShowExists">
        <div class="card" v-for="shows in filteredShows" :key="shows.id">
          <img class="show-img" @click="redirectToPage(shows.show.url)" :src="shows.show.image.medium" width="210" height="295" >
          <p class="show-name" @click="redirectToPage(shows.show.url)">{{shows.show.name}}</p>
        </div>
      </div>
      <div v-if="!checkIfShowExists">
        <h2>No result found</h2>
      </div>
  </div>
</template>

<script>
import {searchTVShow} from '../../services/TvShowService'

export default {
  data(){
    return{
      searchedShow : [],
      checkIfShowExists: true,
      filteredShows : [],
    }
  },
    name: "SearchPage",
    props: ["searchShowName"],
    methods:{
      getSearchedShows(){
        let response = searchTVShow(this.searchShowName);
        response.then(result =>{ 
        this.searchedShow = result.data
        if(this.searchedShow.length==0){
            this.checkIfShowExists=false
          }
        }).catch((err)=>console.log(err))
      },
      async filterTVShows(){
        await searchTVShow(this.searchShowName);
        this.filteredShows = this.searchedShow.filter((result)=>
          result.show.image!=null
        )},
      redirectToPage(url){
        window.open(url)
      }
    },
    mounted(){
      this.getSearchedShows();
      this.filterTVShows();
    },
}
</script>

<style scoped>
.row{
  margin: auto;
}
.card{
  margin: 15px;
  padding: 15px;
  width: 242px;
}
.show-name{
  text-align: center;
  word-break: break-all;
}
.show-img{
  transition: 0.3s;
  margin-bottom: 10px;
}
.show-img:hover{
  cursor: pointer;
  transform: scale(1.05);
  border-radius: 5%;
}
.show-name:hover{
  cursor: pointer;
  color: blue;
  transition: 0.3s;
}
</style>
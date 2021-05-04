<template>
    <div>
        <h2>Search results for "{{searchShowName}}"</h2>
        <div class = "row" v-if="checkIfShowExists">
          <div class="card" v-for="shows in filteredShows" :key="shows.id">
              <img :src="shows.show.image.medium" width="210" height="295">
              <p class="show-name">{{shows.show.name}}</p>
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
            console.log(this.searchedShow)
            })
        console.log(this.searchShowName)
        },
        async filterTVShows(){
            await searchTVShow(this.searchShowName);
            console.log(this.searchedShow)
            this.filteredShows = this.searchedShow.filter((result)=>result.show.image.medium!=null)
            console.log(this.filteredShows)
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
    margin: 15px;
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
</style>
<template>
  <div>
    <div class="card image-card">
      <div class="card-header ">
        <img :src="show.image.medium">
        <p class="card-title">{{show.name}}</p>
        <p class="show-rating">Rating: {{show.rating.average}}<span class="star"> &starf; </span></p>
        <div class="row">
          <p class="genre">Genres: </p> 
          <li class="genre" v-for="genre in show.genres" :key="genre">{{genre}} </li>
        </div>
      </div>
    </div>
    <div v-html="show.summary" class="summary">
    </div>
    <a class="link" @click="redirectToPage(show.url)">Click here for more details</a>
  </div>
</template>

<script>
export default {
  name:'ShowDetailsPage',
  props: ["show"],
  methods:{
    redirectToPage(url){
      window.open(url);
    },
  }
}
</script>

<style scoped>
.image-card{
  position: relative;
  margin: 10px;
  width: 20%;
  margin:auto;
  border: 1px solid black;
}
.card-title{
  font-size:2vw;
}
.show-rating{
  font-size: 1vw;
}
img{
  width: 80%;
  margin: 5px;
  border-radius: 1%;
}
.row{
  justify-content: space-evenly;
}
.star{
  color:#ffbf00;
}
.genre{
  font-size: 0.8vw
}
.summary{
  width: 80%;
  margin: auto;
  margin-top: 0.8vw;
  font-size: 1vw;
}
.link{
  color: rgb(0, 0, 187);
  font-size: 0.8vw;
}
.link:hover{
  cursor: pointer;
}

</style>
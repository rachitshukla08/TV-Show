<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="background-color: #041747">
    <a class="navbar-brand" href="#">
      <router-link class="nav-link" :to="{name:'HomePage'}">
        <img src="../../public/tv-white.svg"> Home
        </router-link>
    </a>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
.navbar-brand{
  text-decoration: none;
  vertical-align: text-bottom;
}
.nav-link{
  color: white;
  vertical-align: text-bottom;
}
.nav-link:hover{
  color:#d4d3d3;
}
.navbar{
  margin-bottom: 10px;
}
</style>
import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage.vue'
import ErrorPage from '../components/ErrorPage.vue'
import SearchPage from '../components/SearchPage.vue'
import ShowDetailsPage from '../components/ShowDetailsPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    props: true,
    component: SearchPage
  },
  {
    path: '/details',
    name: 'ShowDetails',
    props:true,
    component: ShowDetailsPage
  },
  {
    path: '*',
    name: 'Error',
    component: ErrorPage
  }
]

const router = new VueRouter({
  routes
})

export default router

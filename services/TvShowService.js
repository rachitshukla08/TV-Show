import axios from 'axios'

let baseURL = "http://api.tvmaze.com/"

export function getAllTVShows(){
    return axios.get(baseURL+"shows")
}

export function searchTVShow(showName){
    return axios.get(baseURL+"search/shows?q="+showName)
}
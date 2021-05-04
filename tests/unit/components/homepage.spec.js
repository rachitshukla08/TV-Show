import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomePage from '../../../src/components/HomePage.vue'
import VueRouter from 'vue-router'
import {routes} from '../../../src/router/index.js'
import {getAllTVShows,searchTVShow} from '../../../services/TvShowService'

jest.mock('../../../services/TvShowService', () => ({
    getAllTVShows: ()=>{return Promise.resolve( {data:[{"id":1,"name":"Under the Dome","rating":{"average":6.6},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}}]} )},
  }));

describe('Testing homepage component',()=>{
    let homeWrapper;
    const router = new VueRouter({routes});

    beforeEach(()=>{
        const localVue = createLocalVue();
        homeWrapper = shallowMount(HomePage,{
            localVue,
            router,
            data(){
                return{
                    popularShows :[{"id":1,"name":"Under the Dome","rating":{"average":6.6},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}}],
                    allShows :[{"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","name":"Under the Dome","type":"Scripted","language":"English","genres":["Drama","Science-Fiction","Thriller"],"status":"Ended","runtime":60,"premiered":"2013-06-24","officialSite":"http://www.cbs.com/shows/under-the-dome/","schedule":{"time":"22:00","days":["Thursday"]},"rating":{"average":6.6},"weight":96,"network":{"id":2,"name":"CBS","country":{"name":"United States","code":"US","timezone":"America/New_York"}},"webChannel":null,"dvdCountry":null,"externals":{"tvrage":25988,"thetvdb":264492,"imdb":"tt1553656"},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg","original":"https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"},"summary":"<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>","updated":1617697381,"_links":{"self":{"href":"https://api.tvmaze.com/shows/1"},"previousepisode":{"href":"https://api.tvmaze.com/episodes/185054"}}}],
                    shows: [{"id":1,"name":"Under the Dome","rating":{"average":6.6},"image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"}}],
                }
            }
        });
    });

    it('Is a vue instance',()=>{
        expect(homeWrapper.isVueInstance).toBeTruthy();
    })

    it('Should contain search box in html',()=>{
        expect(homeWrapper.html()).toContain("search-box");
    })

    it('Calls searchAShow function when search-button is clicked',()=>{
        homeWrapper.vm.searchAShow=jest.fn();
        homeWrapper.find('button').trigger('click');
        expect(homeWrapper.vm.searchAShow).toHaveBeenCalled();
    })

    it('Calls redirectToPage function when image is clicked',()=>{
        //homeWrapper.setData({popularShows : [{name:"Show 1", medium:"url1"},{name:"Show 2", medium :"url2"}]})
        console.log(homeWrapper.html())
        homeWrapper.vm.redirectToPage = jest.fn();
        homeWrapper.find('.show-img').trigger('click')
        expect(homeWrapper.vm.redirectToPage).toHaveBeenCalled(); 
    })

    it('Should call getAllShows when mounted',()=>{
        homeWrapper.vm.getAllShows().then((response)=>{expect(homeWrapper.vm.shows).toEqual(response)});
        //const mockedResponse = Promise.resolve([{name:"Show 1", medium:"url1"},{name:"Show 2", medium :"url2"}])
        //getAllTVShows.mockResolvedValue(mockedResponse).then((response)=>{expect(homeWrapper.vm.shows).toEqual(response)});
    })
    
   /*  it('Should call getAllShows() when mounted',()=>{
        homeWrapper.vm.$options.mounted.call(homeWrapper.vm);
        expect(homeWrapper.vm.getAllShows).toBeCalled();
    }) */
   /*  it('',()=>{
        let url = "url"
        homeWrapper.vm.redirectToPage(url)
    }) */
    afterEach(()=>{
        homeWrapper.destroy();
    })
})

/* describe('Testing lifecycle methods',()=>{
    let homeWrapper;
    it('should call getAllShows() when created', () => {
        const localVue = createLocalVue();
        const getAllShows = jest.fn()
        homeWrapper = shallowMount(HomePage, {
          localVue,
          methods: { getAllShows }
        });
        expect(getAllShows).toHaveBeenCalled();
      });
}) */
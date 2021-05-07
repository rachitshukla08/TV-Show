import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomePage from '../../../src/components/HomePage.vue'
import VueRouter from 'vue-router'
import {routes} from '../../../src/router/index.js'

jest.mock('../../../services/TvShowService', () => ({
  getAllTVShows: ()=>{return Promise.resolve( {data:[{"id":2,"name":"Under the Dome","rating":{"average":6.6},
  "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}]} )},
}));

describe('Testing homepage component',()=>{
  let homeWrapper;
  const router = new VueRouter({routes});
    
  beforeEach(()=>{
    const localVue = createLocalVue();
    homeWrapper = shallowMount(HomePage,{
      localVue,
      router,
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

  it('Calls redirectToPage function when show name is clicked',()=>{
    homeWrapper.vm.redirectToPage = jest.fn();
    homeWrapper.find('.show-name').trigger('click')
    expect(homeWrapper.vm.redirectToPage).toHaveBeenCalled(); 
  })

  it('Should open results in a new tab when show name is clicked', () => {
    window.open = jest.fn();
    homeWrapper.find('.show-name').trigger('click')
    expect(window.open).toBeCalled();
  });

  it('Should call redirectToShowDetailsPage when image is clicked',()=>{
    homeWrapper.vm.redirectToShowDetailsPage = jest.fn();
    homeWrapper.find('.show-img').trigger('click')
    expect(homeWrapper.vm.redirectToShowDetailsPage).toHaveBeenCalled();
  })

  it('Should load the shows data properly when mounted',async ()=>{
    let mockedResponse = [{"id":2,"name":"Under the Dome","rating":{"average":6.6},
    "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}]
    await homeWrapper.vm.getAllShows()
    expect(homeWrapper.vm.shows).toEqual(mockedResponse);
  })
    
  afterEach(()=>{
    homeWrapper.destroy();
  })
})

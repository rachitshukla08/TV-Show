import { shallowMount, createLocalVue } from '@vue/test-utils'
import SearchPage from '../../../src/components/SearchPage.vue'

jest.mock('../../../services/TvShowService', () => ({
  searchTVShow: ()=>{return Promise.resolve( {data:[{"score":27.562412,"show":{"id":2,"name":"Under the Dome","rating":{"average":6.6},
  "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}}]} )},
}));

describe('Testing search component',()=>{
  let searchWrapper;

  beforeEach(()=>{
    const localVue = createLocalVue();
    searchWrapper = shallowMount(SearchPage,{
      localVue,
      data(){
        return{
          filteredShows :[{"score":27.562412,"show":{"id":2,"name":"Under the Dome","rating":{"average":6.6},
          "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}}],
        }
      }
    })
  })

  it('Is a vue instance',()=>{
    expect(searchWrapper.isVueInstance).toBeTruthy();
  })

  it('Calls redirectToPage function when image is clicked',()=>{
    searchWrapper.vm.redirectToPage = jest.fn();
    searchWrapper.find('.show-img').trigger('click');
    expect(searchWrapper.vm.redirectToPage).toHaveBeenCalled(); 
  })

  it('Should open results in a new tab when image for a show is clicked', () => {
    window.open = jest.fn();
    searchWrapper.find('.show-img').trigger('click')
    expect(window.open).toBeCalled();
  });

  it('Should search the shows properly when mounted',async ()=>{
    let mockedResponse = [{"score":27.562412,"show":{"id":2,"name":"Under the Dome","rating":{"average":6.6},
    "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},"genres":["Drama","Science-Fiction","Thriller"]}}]
    await searchWrapper.vm.getSearchedShows();
    expect(searchWrapper.vm.filteredShows).toEqual(mockedResponse);
  }) 

})
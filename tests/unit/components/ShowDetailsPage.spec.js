import { shallowMount, createLocalVue } from '@vue/test-utils'
import ShowDetailsPage from '../../../src/components/ShowDetailsPage.vue'

describe('Testing ShowDetailsPage component',()=>{
  let showWrapper;

  beforeEach(()=>{
    const localVue = createLocalVue();
      showWrapper = shallowMount(ShowDetailsPage,{
          localVue,
          propsData: {
            show: {"id":1,"url":"https://www.tvmaze.com/shows/1/under-the-dome","genres":
            ["Drama","Science-Fiction","Thriller"],"rating":{"average":6.6},
            "image":{"medium":"https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg"},
            "summary":"<p><b>Under the Dome</b></p>",
            }
          }
      }
    )
  })
  
  it('Is a vue instance',()=>{
    expect(showWrapper.isVueInstance).toBeTruthy();
  })

  it('Should call redirectToPage method when url is clicked',()=>{
    showWrapper.vm.redirectToPage = jest.fn();
    showWrapper.find('.link').trigger('click')
    expect(showWrapper.vm.redirectToPage).toHaveBeenCalled();
  })

  it('Should open details in a new window when url is clicked',()=>{
    window.open = jest.fn();
    showWrapper.find('.link').trigger('click')
    expect(window.open).toHaveBeenCalled();
  })
})
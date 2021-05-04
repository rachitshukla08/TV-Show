import { shallowMount, createLocalVue } from '@vue/test-utils'
import HomePage from '../../../src/components/HomePage.vue'
import VueRouter from 'vue-router'
import {routes} from '../../../src/router/index.js'

describe('',()=>{
    let homeWrapper;
    const router = new VueRouter({routes});

    beforeEach(()=>{
        const localVue = createLocalVue();
        homeWrapper = shallowMount(HomePage,{
            localVue,
            router,
            /* data(){
                return{
                    popularShows : [{name:"Show 1", medium:"url1"},{name:"Show 2", medium :"url2"}],
                    allShows :[{name:"Show 1", medium:"url1"},{name:"Show 2", medium :"url2"}],
                }
            } */
        })
    })

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
        homeWrapper.setData({popularShows : [{name:"Show 1", medium:"url1"},{name:"Show 2", medium :"url2"}]})
        console.log(homeWrapper.html())
        homeWrapper.vm.redirectToPage = jest.fn();
        homeWrapper.find('.show-img').trigger('click')
        expect(homeWrapper.vm.redirectToPage).toHaveBeenCalled(); 
    })
    
    it('',()=>{
        let url = "url"
        homeWrapper.vm.redirectToPage(url)
    })
    afterEach(()=>{
        homeWrapper.destroy();
    })
})
import NavBar from '../../src/components/NavBar.vue'
import { shallowMount, createLocalVue  } from '@vue/test-utils'
import VueRouter from 'vue-router';
import app from '../../src/App.vue'

describe('In App Component', () => {
    let appWrapper;
    const router = new VueRouter({path : '/', name: 'Home'});

    beforeEach(()=> {
        const localVue = createLocalVue();
        localVue.use(VueRouter);

        appWrapper = shallowMount(app, {
            localVue,
            router,
        });
    });

    afterEach(()=>{
        appWrapper.destroy();
    });

    it('is a vue instance',() =>{
        expect(appWrapper.isVueInstance).toBeTruthy();
    })

    it('it should render the correct markup', ()=> {
        expect(appWrapper.html()).toContain('<div id="app">');
    })

    it('it should have a div element with id="app"',()=>{
        expect(appWrapper.attributes('id')).toBe('app');
    })

    describe('it should load NavBar component',()=>{
        it('it should load navbar', ()=> {
            expect(NavBar).toBeTruthy();
        });

        it('it should have navbar-stub', ()=>{
            expect(appWrapper.html()).toContain('<navbar-stub>');
        })
    })
});
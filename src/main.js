import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Username from './components/Username'
import Mainpage from './components/Mainpage'
import Final from './components/Final'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('Username', Username);
Vue.component('Mainpage', Mainpage);
Vue.component('Final', Final)

export const root_url = '';

const router = new VueRouter({
  routes: [{
    path: '/',
    name:"username",
    component: Username,
    props: {
      root_url
    }
  }, {
    path: '/play',
    name:"mainpage",
    component: Mainpage,
    props: {
      root_url
    }
  },{
    path: '/thankyou',
    name:'thankyou',
    component: Final,
    props:{
      root_url
    }
  }
  ]
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

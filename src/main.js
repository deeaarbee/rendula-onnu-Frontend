import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Username from './components/Username'
import Mainpage from './components/Mainpage'
import Final from './components/Final'
import LeaderBoard from './components/LeaderBoard'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('Username', Username);
Vue.component('Mainpage', Mainpage);
Vue.component('Final', Final);
Vue.component('LeaderBoard', LeaderBoard);


const router = new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    name:"username",
    component: Username,
  },{
    path: '/:userid',
    name:"username1",
    component: Username,
  },
    {
    path: '/play',
    name:"mainpage",
    component: Mainpage,
  },{
    path: '/thankyou',
    name:'thankyou',
    component: Final,
  },
    {
      path: '/leaderboard',
      name:'leaderboard',
      component: LeaderBoard,
  }]
});


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

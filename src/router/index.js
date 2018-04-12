import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import kaoshi from '@/components/kaoshi'
import view from '@/components/view'
import result from '@/components/result'
import kaoshied from '@/components/kaoshied'

import kaoshiedInfo from '@/components/kaoshiedInfo'
import daanInfo from '@/components/daanInfo'



Vue.use(Router)

var router= new Router({
  routes: [
    {
      path: '/',
      component: Main
    },
     {
          path: '/login',
          component: Login
     },
      {
          path:"/kaoshi",
          component:kaoshi
      },
      {
          path:"/view",
          component:view
      },
      {
          path:"/result",
          component:result
      },
      {
          path:"/kaoshied",
          component:kaoshied
      },
      {
          path:"/kaoshiedInfo/:zutiid",
          component:kaoshiedInfo
      },
      {
          path:"/daanInfo/:id",
          component:daanInfo
      }
  ]
})

router.beforeEach(function (to,from,next) {
    if(to.path=="/login"){
        if(sessionStorage.stuLogin&&JSON.parse(sessionStorage.stuLogin).message=="yes") {
            next("/");
        }else{
            next();
        }


    }else{
        if(sessionStorage.stuLogin&&JSON.parse(sessionStorage.stuLogin).message=="yes"){
            next();
        }else{
            next("/login");
        }
    }
})


export default router;

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      title:'乳品到家主页',
    }
  },
  {
    path:'/goods',
    name:'goods',
    component: ()=>import('../views/content/goods'),
    meta:{
      title:'商品详情'
    }
  },
  {
    path:'/catelist',
    name:'catelist',
    component: ()=>import('../views/content/catelist'),
    meta:{
      title:'分类商品'
    }
  },
  {
    path:'/category',
    name:'category',
    component: ()=>import('../views/content/category')
    ,meta:{
     title:'分类详情'
    }
  },
  {
    path:'/reg',
    name:'reg',
    component:()=>import('../views/my/reg'),
    meta:{
      title:'注册页面'
    }
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/my/login'),
    meta:{
      title:'登陆页面'
    }
  },
  {
    path:'/myPage',
    name:'myPage',
    component:()=>import('../views/content/myPage'),
    meta:{
      title:'个人中心',
      auth:true
    }
  },
  {
    path:'/cart',
    name:'cart',
    component:()=>import('../views/content/cart'),
    meta:{
      title:'购物车',
      auth:true
    }
  },
  {
    path:'/edit',
    name:'edit',
    component:()=>import('../views/my/edit'),
    meta:{
      title:'修改个人信息',
      auth:true
    }
  },
  {
    path:'/orders/:onum',
    name:'orders',
    component:()=>import('../views/orders/orders'),
    meta:{
      title:'订单页面',
      auth:true
    }
  },
  {
    path:'/payresult',
    name:'payresult',
    component:()=>import('../views/orders/payresult'),
    meta:{
      title:'支付结果',
      auth:true
    }
  },
  {
    path:'/typeinfo',
    name:'typeinfo',
    component:()=>import('../views/my/typeinfo'),
    meta:{
      title:'订单查看',
      auth:true
    }
  },
]

const router = new VueRouter({
  routes
});
router.beforeEach((to,from,next)=>{
  document.title=to.meta.title ||'乳品到家';
  if(to.meta.auth){
    let token = sessionStorage.getItem('token') && sessionStorage.getItem('token').trim();
    if(!token){
      next({name:'login',query:{redirect:to.name}})
    }else {
      next()
    }
  }else {
    next();
  }
})
export default router

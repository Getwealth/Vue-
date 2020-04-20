import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import {queryCart} from "../api/cart";

Vue.use(Vuex);
const vuexLocal = new VuexPersist({
    storage: window.sessionStorage //可选，sessionStorage/indexDB
});
const store = new Vuex.Store({
    state:{
        isShow:false,
        cart:null,
    },
    getters:{
        getGoodsNumber(state){
           return function (id) {
               if(!state.cart){
                   return 0;
               }
              let nowGoods= state.cart.goods.find(ele=>ele.gid==id);
               return  nowGoods?nowGoods.number:0;
           }
        },
        isAll(state){
           if(!state.cart){
               return 0;
           }
          let flag= state.cart.goods.every(ele=>ele.state==1);
          return flag;
       },
        count(state){
            if(!state.cart){
                return 0;
            }
            return  state.cart.count;
        }
    },
    mutations:{
        change(state,n){
            state.isShow=n;
        },
        setCart(state,cart){
            state.cart=cart;
        },
        setOrders(state,orders){
            state.orders=orders;
        }
    },
    actions:{
        setCart(context){
            queryCart().then(res=>{
                if(res.code==200){
                    context.commit('setCart',res.data)
                }
            })
        },
    },
    plugins: [vuexLocal.plugin]
});
export default store;
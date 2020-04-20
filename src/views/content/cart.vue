<template>
    <div>
        <div class="cart">
            <div class="shop-header">
                <van-nav-bar
                        title="购物车"
                        left-text="返回"
                        right-text="编辑"
                        left-arrow
                        @click-left="onClickLeft"
                        @click-right="onClickRight"
                />
            </div>

            <div>
                <div v-if="cart">
                    <div class="comdy" v-for="item in cart.goods" :key="item.gid" @doubleTap="toshopInfo(item.gid)">
                        <i style="color: red" :class="['iconfont','ctl',item.state==1?'iconfuxuankuang_xuanzhong':'iconxuanxiang']" @click="changeState(item)"></i>
                        <div class="bl-ch">
                            <img :src="IMGURL+item.gthumb" alt="">
                        </div>
                        <div class="comdy-r">
                            <p class="c-text1">{{item.gname}}</p>
                            <p class="c-text2">{{item.gdiscount}}￥</p>
                            <div class="num">
                                <i class="minus iconfont iconprune" @click="minus(item.gid)" ></i>
                                <span>{{item.number}}</span>
                                <i class="aug iconfont icontianjia" @click="addOne(item)"></i>
                            </div>
                        </div>
                    </div>
                    <div class="check">
                        <div class="check-left">
                            <i style="color: red" class="iconfont ctl1" :class="allState?'iconfuxuankuang_xuanzhong':'iconxuanxiang'" @click="changeAstate"></i>
                            <span>全选</span>
                            <span>合计:</span>
                            <span><b>{{cart.total}}</b></span>
                            <span>总数:</span>
                            <span><b>{{cart.count}}</b></span>
                        </div>
                        <div class="check-right" :class="{active:isorder}" @click="orderCreate">
                            <a  href="javascript:">
                                <span>结算</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div v-else class="nogoods">
                    <router-link tag="div" :to="{name:'home'}">没有商品，去逛逛吧</router-link>
                </div>
            </div>
        </div>

        <my-footer :index="3"></my-footer>
    </div>
</template>

<script>
    import myFooter from  '../../components/my-footer/my-footer';
    import {IMGURL} from "../../config/base";
    import {oneDel,oneAdd,stateChange,allStatechange} from "../../api/cart";
    import {carateOrders} from "../../api/orders";
    export default {
        name: "cart",
        data(){
            return{
                IMGURL,
            }
        },
        computed:{
            cart(){
                return this.$store.state.cart;
            },
            allState(){
                return this.$store.getters.isAll;
            },
            isorder(){
                return this.$store.getters.count;
            }
        },
        components:{
            myFooter
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            onClickRight(){},
            toshopInfo(id){
                this.$router.push({name:'goods',query:{gid:id}})
            },
            async minus(gid){
                let res= await oneDel(gid);
                if(res.code==200){
                    this.$store.dispatch('setCart');
                }
            },
            async addOne(item){
                let data = {gid:item.gid,gdiscount:item.gdiscount}
                let res= await oneAdd(data);
                if(res.code==200){
                    this.$store.dispatch('setCart');
                }
            },
            async changeState(item){
                let obj = {gid:item.gid,gdiscount:item.gdiscount};
                let res = await stateChange(obj);
                if (res.code==200){
                    item.state=res.state;
                    this.$store.dispatch('setCart');
                }
            },
            async changeAstate(){
                let obj = {flag:this.allState};
                let res= await allStatechange(obj);
                if(res.code==200){
                    // let result = await queryCart();
                    // result.data && this.$store.commit('setCart',result.data);
                    this.$store.dispatch('setCart');
                }
            },
            async orderCreate(){
                if(!this.isorder){
                    return this.$toast('请至少选择一件商品');
                }
                let result = await carateOrders();
                if(result.code==200){
                    this.$store.dispatch('setCart');
                    this.$router.push({name:'orders',params:{onum:result.data}})
                }
            },
        },
        mounted(){
           this.$store.dispatch('setCart');
        }
    }
</script>

<style scoped>
    @import "../../css/cart.css";
    .none{
        width: 100%;
        height: 3rem;
        text-align: center;
        position: absolute;
        top: 2rem;
        left: 0;
    }
    .nogoods{
        width: 100%;
        height: 3rem;
        background: #EA4D13;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .nogoods a{
        width: 1rem;
        text-align: center;
        height: 2rem;
        line-height: 2rem;
        border: 0.1rem solid ;
        box-sizing: border-box;
        border-radius: 5%;
        color: #9BCBB5;
    }
</style>
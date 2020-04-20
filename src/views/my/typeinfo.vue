<template>
    <div>
        <div class="payment">
            <div class="payment-index">
                <a href="javascript:history.back()">
                    <i class="iconfont iconfanhui"></i></a>
                <span>我的订单</span>
            </div>
        </div>
        <div class="payment-topA">
                <van-tabs v-model="active" title-active-color="orange" color="orange" sticky :offset-top="49">
                    <van-tab  v-for="item in statelist" :key="item.state" :info="item.count" >
                        <div class="tab-title" slot="title"  @click="onClick(item.state)">{{ item.statetext }}</div>
                        <div class="tab-content">
                            <div class="Eleven" v-for="(item1,index) in ordersInfo" :key="index">
                                <div class="DR">
                                    <div class="DR-1">
                                        <span class="DR-2">{{item1.ctime}}</span>
                                        <span class="DR-3">{{item1.statetext}}</span>
                                        <p>订单编号:{{item1.onum}}</p>
                                    </div>
                                    <router-link tag="div" :to="{name:'goods',query:{gid:item2.gid}}" class="DR-4" v-for="(item2,index1) in item1.goods" :key="index1">
                                        <img :src="IMGURL+item2.gthumb" />
                                        <div class="DR-5">
                                            <span class="DR-6">{{item2.gname}}</span>
                                            <span class="DR-7">
                                                <p class="DR-8">￥{{item2.gdiscount}}</p>
                                                <p class="DR-9">x{{item2.number}}</p>
                                            </span>
                                        </div>
                                    </router-link>
                                    <span class="one">
                                     <a class="one-1">共{{item1.count}}件</a>
                                     <a>应付总额：<a class="one-2">￥{{item1.total}}</a></a>
                                    </span>
                                    <div class="one-3">
                                    <router-link :to="{name:'orders',params:{onum:item1.onum}}" class="one-4" v-if="item1.state==1">去付款</router-link>
                                        <ul v-if="item1.state==2" class="box">
                                            <li class="box-1">确认收货</li>
                                            <a href="./information.css.html">
                                                <li class="box-1">查看物流</li></a>
                                            <li class="box-1">催物流</li>
                                        </ul>
                                        <ul v-if="item1.state==3" class="box">
                                            <a href="information.css.html">
                                                <li class="box-1">查看物流</li>
                                            </a>
                                            <li class="box-1">确认收货</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </van-tab>
                </van-tabs>
        </div>
    </div>
</template>

<script>
    import {listGet} from "../../api/my";
    import {stateOnefind} from "../../api/orders";
    import {IMGURL} from "../../config/base";

    export default {
        name: "typeinfo",
        data(){
            return{
                statelist:[],
                active:0,
                limit: 5,
                page:1,
                ordersInfo:[],
                IMGURL
            }
        },
        methods:{
            getstateList(){
                listGet().then(res=>{
                    if(res.code==200){
                        this.statelist=res.data;
                    }
                })

            },
            async onClick(state){
                let obj={limit:this.limit,page:this.page}
                let res=await stateOnefind(state,obj);
                if(res.code==200){
                    this.ordersInfo=res.data;
                    this.total=res.total;
                }else {
                    this.ordersInfo=[]
                }
            }
        },
        mounted() {
            this.active=this.$route.query.state;
            this.getstateList();
            stateOnefind(this.active).then(res=>{
                if(res.code==200){
                    this.ordersInfo=res.data;
                    this.total=res.total;
                }else {
                    this.ordersInfo=[];
                }
            })
        }
    }
</script>

<style scoped>
    @import "../../css/typeinfo.css";
</style>
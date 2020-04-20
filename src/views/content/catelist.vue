<template>
    <div>
        <div class="head">
            <div class="header">
                <a href="javascript:history.back();"><i class="iconfont iconfanhui"></i></a>
                {{cname}}
            </div>
        </div>
        <van-pull-refresh :head-height="88" v-model="isLoading" @refresh="pullDownRefresh">
            <div class="banner">
                <img src="../../assets/catelist/bannr.jpg" alt="">
            </div>
            <van-list  v-model="loading" :finished="finished" @load="pullUp">
                <van-cell v-for="item in goods" :key="item.gid">
                    <router-link tag="div" class="head1" :to="{name:'goods',query:{gid:item.gid}}">
                        <div class="list">
                            <img :src="IMGURL+item.gthumb" :alt="item.gname">
                            <div class="list-right">
                                <span>{{item.gname}}</span>
                                <span>￥{{item.gdiscount}} </span>
                                <span>原价{{item.gprice}}</span>
                            </div>
                        </div>
                    </router-link>
                </van-cell>
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
    import {gsomeQuery} from "../../api/catelist";
    import {SUCCESS,IMGURL} from "../../config/base";
    export default {
        name: "catelist",
        data(){
            return{
                goods:[],
                isLoading:false,
                loading:false,
                finished:false,
                IMGURL,
                cname:'',
                page:0
            }
        },
        methods:{
            pullDownRefresh(){
                this.page=1;
                gsomeQuery({cid:this.cid,limit:5,page:this.page}).then(res=>{
                    if(res.code==SUCCESS ){
                        if(res.data){
                            this.goods=res.data;
                        }
                        if (this.goods.length>=res.total){
                            this.finished=true;
                        }
                    }
                }).finally(()=>{
                    this.isLoading=false;
                    this.finished=false;
                })
            },
            pullUp(){
                this.page++;
                gsomeQuery({cid:this.cid,limit:5,page:this.page}).then(res=>{
                    if(res.code==SUCCESS ){
                        if(res.data){
                            this.goods=this.goods.concat(res.data);
                        }
                        if (this.goods.length>=res.total){
                            this.finished=true;
                        }
                    }
                }).finally(()=>{
                    this.loading=false;
                })
            },
        },
        mounted() {
            this.cid = this.$route.query.cid;
            this.cname=this.$route.query.cname;
    }
    }
</script>

<style scoped>
    @import "../../css/catelist.css";
</style>
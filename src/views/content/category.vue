<template>
    <div>
        <div class="head">
            <a  href="javascript:history.back()" style="color: #8A8D93;float: left; line-height: 47.4px; margin-left: 10px; font-size: 24px;">
                <i class="iconfont iconfanhui"></i>
            </a>
            <span class="head-text">分类</span>
            <span class="head-icon">
            <i class="iconfont iconxiala"></i>
        </span>
            <span class="head-icon-two">
            <i class="iconfont iconsousuo"></i>
        </span>
        </div>
        <div class="middle">
            <div class="left-box">
                <ul class="left">
                    <li :class="item.cid==cateId?'active':''" v-for="item in catelist" :key="item.cid" @click="choose(item.cid)">{{item.cname}}</li>
                </ul>
            </div>
            <li class="li">
                <p>综合排序</p>
                <p>按价格
                    <i class="iconfont iconshangxia"></i>
                </p>
                <p>分类</p>
            </li>
            <div class="right-box">
                <ul class="right">
                    <van-pull-refresh :head-height="88" v-model="isLoading" @refresh="pullDownRefresh">
                        <van-list v-model="loading" :finished="finished" @load="pullUp" :immediate-check="false">
                            <van-cell v-for="item in goods" :key="item.gid">
                                <li>
                                    <router-link :to="{name:'goods',query:{gid:item.gid}}" >
                                        <div class="box">
                                            <img :src="IMGURL+item.gthumb" alt="">
                                        </div>
                                        <div class="box-one">
                                            <p class="b-1">
                                                {{item.gname}}
                                            </p>
                                            <div class="money">
                                                ￥{{item.gdiscount}}
                                            </div>
                                            <div class="input">
                                                <i class="iconfont iconprune" @click="minus(item.gid)"></i>
                                                <span class="dian" style="color:rgb(0,0,0);">{{goodsinCart(item.gid)}}</span>
                                                <i class="iconfont icontianjia" @click="cgoodsInsert(item)"></i>
                                            </div>
                                        </div>
                                    </router-link>
                                </li>
                            </van-cell>
                        </van-list>
                    </van-pull-refresh>
                </ul>
            </div>
        </div>

        <my-footer :index="2"></my-footer>
    </div>
</template>

<script>
    import myFooter from '../../components/my-footer/my-footer'
    import {getAll,gsomeQuery} from "../../api/catelist";
    import {SUCCESS,IMGURL} from "../../config/base";
    import {goodsMinus,queryCart,insertCgoods} from "../../api/cart";
    export default {
        name: "category",
        components:{
            myFooter
        },
        data(){
            return {
                catelist:[],
                cateId:0,
                goods:[],
                IMGURL,
                isLoading:false,
                loading:false,
                finished:false,
                page:0
            }
        },
        methods:{
            getCategory(){
                getAll().then((res)=>{
                    if(res.code==SUCCESS){
                        this.catelist = res.data;
                        this.cateId=this.catelist[0].cid;
                        this.pullUp();
                    }
                })
            },
            pullDownRefresh(){
                this.page=1;
                gsomeQuery({cid:this.cateId,limit:6,page:this.page}).then(res=>{
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
                gsomeQuery({cid:this.cateId,limit:6,page:this.page}).then(res=>{
                    if(res.code==SUCCESS ){
                        if(res.data){
                            this.goods.push(...res.data);
                        }
                        if (this.goods.length>=res.total){
                            this.finished=true;
                        }
                    }else {
                        this.finished=true;
                    }
                }).finally(()=>{
                    this.loading=false;
                })
            },
            choose(id){
                if(this.cateId==id){
                    return
                }
                this.cateId=id;
                gsomeQuery({cid:this.cateId,limit:6,page:1}).then(res1=>{
                    if(res1.code==SUCCESS){
                        this.goods=res1.data;
                    }
                })
            },
            async minus(gid){
                let obj = {gid:gid}
                let res= await goodsMinus(obj);
                if(res.code==200){
                    let result = await queryCart();
                    this.$store.commit('setCart',result.data);
                }
            },
            async cgoodsInsert(item){
                let data = {gid:item.gid,gdiscount:item.gdiscount}
                let res= await insertCgoods(data);
                if(res.code==200){
                    let result = await queryCart();
                    this.$store.commit('setCart',result.data);
                }
            },
        },
        computed:{
            goodsinCart(){
                return function (id) {
                    return this.$store.getters.getGoodsNumber(id)
                };
            }
        },
        mounted() {
            this.getCategory();
        }
    }
</script>

<style scoped>
@import "../../css/category.css";
</style>
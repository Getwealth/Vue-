<template>
    <div class="home-page">
        <!-- home-header -->
        <div class="home-header">
            <div class="header-1">
                <span>
                    <img src="../assets/homepage/scan.png" alt="">
                </span>
                <p>地址</p>
            </div>
            <div class="header-2">
                <span>北京石景山</span>
                <i></i>
            </div>
            <a href="serach.html" class="header-1">
                <span>
                    <img src="../assets/homepage/search3.png" alt="">
                </span>
                <p>搜索</p>
            </a>

        </div>
        <!-- home-banner -->
        <div class="home-content" v-if="banner.length">
            <van-swipe :autoplay="3000" indicator-color="blue" >
                <van-swipe-item v-for="item in banner" :key="item.gid">
                    <router-link :to="{name:'goods',query:{gid:item.gid}}">
                        <div class="b-img">
                            <img :src="imgUrl+item.gthumb" :alt="item.gname" :title="item.gname">
                        </div>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
        <ul class="home-choose" v-if="active.length">
                <li v-for="item1 in active" :key="'cate'+item1.cid" >
                    <router-link :to="{name:'catelist',query:{cid:item1.cid,cname:item1.cname}}">
                        <div class="choose-icon">
                            <img src="../assets/homepage/trophy.png" alt="">
                        </div>
                        <p>{{item1.cname}}</p>
                    </router-link>
                </li>

        </ul>
        <div v-if="cateGoods">
            <div v-for="item2 in cateGoods" :key="item2.cid">
                <div class="home-division"></div>
                <!-- 优选水果 -->
                <div class="home-information">
                    <router-link :to="{name:'catelist',query:{cid:item2.cid}}">
                        <div class="title">
                        <span class="text">{{item2.cname}}
                            <i class="iconfont iconcontrol100"></i>
                        </span>
                    </div>
                    </router-link>
                    <div class="shop-banner">
                        <img src="../assets/homepage/optimization-img2.jpg" alt="">
                    </div>
                    <div class="shop-display">
                        <router-link tag="div" v-for="item3 in item2.goods" :key="item3.gid" :to="{name:'goods',query:{gid:item3.gid}}" >
                            <span class="photo-span"><img :src="imgUrl+item3.gthumb" alt=""></span>
                            <p>{{item3.gname}}
                            </p>
                            <b class="price">￥{{item3.gdiscount}}
                                <del>￥{{item3.gprice}}</del>
                            </b>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <my-footer :index="1"></my-footer>
    </div>
</template>

<script>
    import {querygoods} from "../api/index";
    import {SUCCESS} from "../config/base";
    import  myFooter from '../components/my-footer/my-footer'
    export default {
        name: "Home",
        data() {
            return {
                banner:[],
                active:[],
                cateGoods:[],
                imgUrl:"http://39.105.204.134/mshop/public"
            };
        },
        components:{
            myFooter
        },
        methods:{
            goodsQuery(){
                querygoods().then(res=>{
                    if(res.code==SUCCESS){
                        this.banner=res.banner;
                        this.active=res.active;
                        this.cateGoods=res.cateGoods;
                    }
                })
            }
        },
       mounted() {
            this.goodsQuery();
       }

    }
</script>

<style scoped>
    @import "../css/homepage.css";
</style>

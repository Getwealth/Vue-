<template>
    <div>
        <div class="personal-top">
            <img src="../../assets/homepage/01.jpg" alt="" class="personal-img" >
            <div class="personal-top-con">
                <img :src="user.avatar" @click="setInfo">
                <div class="personal-top-box2">
                <span class="personal-top-text1">
                    {{user.username}}
                </span>
                </div>
            </div>
        </div>
        <div class="list">
            <ul>
                <li v-for="(item,index) in statelist" :key="index">
                    <router-link :to="{name:'typeinfo',query:{state:item.state}}">
                        <i class="iconfont icondaifukuan  img1"></i>
                        <p>{{item.statetext}}</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <!--收发地址结束-->
        <div class="aaaa"></div>
        <!--我的优惠卷开始 -->
        <div class="coupon">
            <a href="#" style="   color: #797778;">

                <div class="coupon1">
                    <i class="iconfont  iconyouhuijuan"></i>
                </div>

                我的优惠卷
            </a>
        </div>
        <a href="#" style="    color: #797778;">
            <div class="coupon">
                <div class="coupon1">
                    <i class="iconfont  iconditu"></i>
                </div>
                收货地址
            </div></a>
        <div class="coupon ">
            <a href="#" style="    color: #797778;">
                <div class="coupon1">
                    <i class="iconfont  iconshouhoufuwu"></i>
                </div>
                售后服务
            </a>
        </div>
        <!--我的优惠卷结束-->
        <!--推出登录开始-->
        <div class="exit" @click="exit">退出登录</div>
        <my-footer :index="4"></my-footer>
    </div>
</template>

<script>
    import myFooter from '../../components/my-footer/my-footer';
    import {userInfoGet,listGet} from "../../api/my";

    export default {
        name: "myPage",
        data(){
            return{
               user:{},
                baseUrl:'http://39.105.204.134/mshop',
                statelist:[]
            }
        },
        methods:{
            getUserInfo(){
                userInfoGet().then(res=>{
                    if(res.code==200){
                        this.user=res.data;
                        this.user.avatar=this.baseUrl+this.user.avatar;
                    }
                })
            },
            exit(){
                sessionStorage.clear();
                this.$router.push({name:'login'})
            },
            setInfo(){
                this.$router.push({name:'edit'})
            },
            getstateList(){
                listGet().then(res=>{
                   if(res.code==200){
                       this.statelist=res.data;
                   }
                })
            }
        },
        components:{
            myFooter
        },
       mounted(){
            this.getUserInfo();
            this.getstateList();
        }
    }
</script>

<style scoped>
 @import "../../css/myPage.css";
</style>
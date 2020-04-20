<template>
    <div v-if="goods">
        <div class="header">
            <a href="javascript:history.back()">
                <li class="header-left">
                    <i class="iconfont iconfanhui"></i>
                </li>
            </a>
            <span>{{goods.gname}}</span>
            <li class="header-right">
                <i class="iconfont iconfenxiang"></i>
            </li>
        </div>
        <div class="middle">
            <van-swipe :autoplay="3000" indicator-color="#fff">
                <van-swipe-item v-for="(gbanner,index) in goods.gbanner1" :key="'banner'+index">
                    <img :src="baseurl+gbanner" alt="">
                </van-swipe-item>
            </van-swipe>
            <div class="middle-two">
                <span class="middle-two-one">￥{{goods.gdiscount}}</span>
                <del class="middle-two-two">原价￥{{goods.gprice}}</del>
                <span class="middle-two-three">特价</span>
            </div>
            <div class="middle-bottom">
                {{goods.gdesc}}
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-one">
                商品详情
            </div>
            <div class="bottom-two">
            <span class="bottom-two-one">
                <span>品牌： </span>
                {{goods.gbrand}}
            </span>
                <span class="bottom-two-two">
                <span>产品规格： </span>
                {{goods.gspecs}}
            </span>
            </div>
            <div class="bottom-three">
                图文详情
            </div>
            <ul class="detail">
               <li v-for="(items,index) in goods.gdetail1" :key="'items'+index">
                   <img :src="baseurl+items" :alt="goods.gname">
               </li>
            </ul>
        </div>
        <ul class="footer">
            <van-goods-action>
                <van-goods-action-icon icon="chat-o" text="客服" />
                <van-goods-action-icon  icon="cart-o" text="购物车" :info="numCartGoods"  @click="gotoCart"/>
                <van-goods-action-button @click="cgoodsInsert" type="warning" text="加入购物车" />
                <van-goods-action-button type="danger" text="立即购买" />
            </van-goods-action>
        </ul>
    </div>
</template>

<script>
    import {queryOneGoods} from "../../api";
    import {SUCCESS} from "../../config/base";
    import {queryCart,insertCgoods} from "../../api/cart";
    import {historyStore} from "../../api";

    export default {
        name: "goods",
        data(){
            return {
                goods:{},
                gid:0,
                baseurl:'http://39.105.204.134/mshop/public'
            }
        },
        methods:{
            goodsQueryOne(){
                queryOneGoods(this.gid).then(res=>{
                    if(res.code==SUCCESS){
                        this.goods=res.data;
                        this.$toast(res.msg)
                    }else {
                        this.$toast(res.msg)
                    }
                })
            },
            async cgoodsInsert(){
                let data = {gid:this.gid,gdiscount:this.goods.gdiscount}
                let res= await insertCgoods(data);
                if(res.code==200){
                    let result = await queryCart();
                    this.$store.commit('setCart',result.data);
                }
            },
            gotoCart(){
                this.$router.push({name:'cart'})
            },
            storeHistory(){
                historyStore({gid:this.gid}).then(res=>{
                    window.console.log(res);
                })
            }
        },
        mounted() {
            this.gid=this.$route.query.gid;
            this.goodsQueryOne();
           sessionStorage.getItem('token')&& this.storeHistory();
        },
        computed:{
            numCartGoods(){
                return this.$store.getters.getGoodsNumber(this.gid);
            }
        }
    }
</script>

<style scoped>
    @import "../../css/goodsinfo.css";
</style>
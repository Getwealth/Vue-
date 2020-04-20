<template>
    <div class="orders">
        <div class="shop-header">
            <div class="ctt1">
                <div>
                    <a href="javascript:history.back()" style="text-decoration:none">
                        <i class="iconfont iconfanhui"></i>
                    </a>
                </div>
                <a href="shipments.html" style="text-decoration:none">
                    <span class="shop-i1">
                        订单详情
                    </span>
                </a>
            </div>
        </div>
            <div class="deliver">
                <div class="yet">
                    <i class="iconfont iconweimingmingwenjianjia_liebiao"></i>
                    {{orders.state}}
                </div>
            </div>
            <div class="ept"></div>
            <div class="shop-site">
                <div class="person">
                    <p style="font-size: 0.3rem">{{orders.username}}</p>
                    <p style="font-size: 0.26rem">{{orders.tel}}</p>
                    <p style="font-size: 0.24rem">默认</p>
                </div>
                <div class="address">
                    {{orders.address}}
                </div>
            </div>
            <div class="ept"></div>
            <div class="goods-box">
                <div class="store" v-for="item in orders.goods" :key="'goods'+item.gid" >
                    <div class="store-top">
                        <span>{{item.gbrand}}</span>
                    </div>
                    <router-link tag="div" :to="{name:'goods',query:{gid:item.gid}}" class="orange">
                        <img :src="IMGURL+item.gthumb" :alt="item.gname">
                        <div class="ora-right">
                            <p class="fresh">{{item.gname}}</p>
                            <div class="ora-mon">
                                <p>{{item.gdiscount}}</p>
                                <p>×{{item.number}}</p>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div style="clear:both"></div>
            </div>
            <div class="ept"></div>
            <!-- 商品金额开始 -->
            <div class="sum">
                <ul>
                    <li>
                        <span class="no-col">应付总额</span>
                        <span class="no-coll">￥{{orders.total}}</span>
                    </li>
                    <li>
                        <span>商品总价</span>
                        <span>￥{{orders.total}}</span>
                    </li>
                    <li>
                        <span>备注</span>
                        <span><input id="rmarks" type="text" v-model="orders.rmarks" placeholder="请输入备注信息"></span>
                    </li>
                    <li>
                        <span>商品总数</span>
                        <span>{{orders.count}}</span>
                    </li>
                    <li>
                        <span></span>
                        <span><van-button type="primary" text="立即支付" @click="show = true" /></span>
                    </li>
                </ul>
            </div>
            <!-- 商品金额结束 -->
            <div class="ept"></div>
            <!-- 编号开始 -->
            <div class="serial">

            </div>
            <!-- 编号结束 -->
        <van-overlay :show="show">
            <i class="iconfont iconxianshi_quxiao xuxiao" @click="show=false"></i>
            <van-password-input
                    :value="value"
                    info="密码为 6 位数字"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"
            />
            <!-- 数字键盘 -->
            <van-number-keyboard
                    close-button-text="完成"
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
            />
        </van-overlay>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import {queryOrders,updateOrders} from "../../api/orders";
    import {IMGURL} from "../../config/base";
    import myFooter from '../../components/my-footer/my-footer'

    export default {
        name: "orders",
        data(){
            return{
                orders:{},
                onum:0,
                IMGURL,
                show:false,
                showKeyboard:false,
                value:''
            }
        },
        components:{
            myFooter
        },
        mounted() {
            this.onum=this.$route.params.onum;
            this.ordersQuery();
        },
        methods:{
            async ordersQuery(){
               let res= await queryOrders(this.onum);
               if(res.code==200){
                   res.data && (this.orders=res.data);
               }
            },
            async onInput(key) {
                this.value = (this.value + key).slice(0, 6);
                if(this.value=='123456'){
                    this.$toast.success('支付成功');
                    this.show=false;
                    let data = {state:2,rmarks:this.orders.rmarks}
                    let result =await updateOrders(this.onum,data);
                    if(result.code==200){
                        
                        this.$router.replace({name:'payresult',query:{onum:this.onum}})
                    }
                }
            },
            onDelete() {
                this.value = this.value.slice(0, this.value.length - 1);
            }
        }

    }
</script>

<style scoped>
    @import "../../css/orders.css";
    .van-password-input{
        position: relative;
        left: 0;
        top: 6.3rem;
        z-index: 999;
    }
    .xuxiao{
        position: absolute;
        right: 0.4rem;
        top: 0.4rem;
        font-size: 0.48rem;
        color: white;
    }
</style>
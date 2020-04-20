<template>
    <div style="height: 100%;padding-top: 0.88rem">
        <div class="wrapper" ref="wrapper">
            <div class="inner">
                <!--标题开始-->
                <div class="payTitle">
                    <div class="back">
                        <i class="iconfont iconcontrol100"></i>
                    </div>
                    <h3>支付成功</h3>
                </div>
                <!--标题结束-->
                <!--内容开始-->
                <div class="payContent">
                    <div class="payImg"></div>
                    <div class="payText">
                        <h1>您的订单已完成  宝贝正在飞奔向你~</h1>
                        <p>YOUR ORDER HAS BEEN COMPLETED <br> BABY IS FLYING TO YOU.</p>
                    </div>
                    <div class="btn">
                        <router-link class="backIndex" :to="{name:'home'}">返回首页</router-link>
                        <router-link class="lookOrder" :to="{name:'OrderList'}">查看订单</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "payresult"
    }
</script>

<style scoped>
    .content{
        width: 100%;
        height: 100%;
        padding-top: 0.88rem;
        overflow: hidden;
    }
    body{
        background: #fcfcfc;
        padding-top: 0.88rem;
    }

    /*标题开始*/
    .payTitle{
        width: 100%;
        height: 0.78rem;
        background: #fff;
        padding: 0 0.24rem;
        border-top: 1px solid #eeeeee;
        border-bottom: 1px solid #eeeeee;

    }
    .payTitle h3{
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.78rem;
    }
    .payTitle .back{
        width: 0.24rem;
        height: 0.24rem;
        float: left;
        margin-top: 0.27rem;
    }
    .back i{
        float: left;
        text-align: center;
        line-height: 0.24rem;
        font-size: 0.24rem;
    }
    /*标题结束*/
    /*内容开始*/
    .payContent{
        width: 7.02rem;
        height: 3.25rem;
        background: #8CB2C5;
        margin: 0 auto 0.4rem;
        border-radius: 0.1rem;
        box-shadow: 0 0.02rem 0.03rem 0
        rgba(0, 0, 0, 0.09);
    }
    .payImg{
        width: 3.85rem;
        height: 2.25rem;
        margin: 0 auto;
    }
    .payImg img{
        width: 100%;
        height:100%;
        display:block;
    }
    .payText{
        width: 100%;
        height: auto;
        margin-top: -1.6rem;
    }
    .payText h1{
        font-size: 0.28rem;
        text-align: center;
    }
    .payText p{
        font-size: 0.18rem;
        text-align: center;
    }
    .payText h3{
        font-size: 0.24rem;
        text-align: center;
        margin-top: 0.5rem;
    }
    .payText h3 .price{
        font-size: 0.28rem;
        color: #ffcb3f;
    }
    .payText h3 .RMB{
        font-size: 0.18rem;
    }
    .btn{
        width: 4.75rem;
        height: 0.5rem;
        margin: 0.2rem auto 0;
        display: flex;
        justify-content: space-between;
    }
    .btn a{
        color: #EA4D13;
    }
</style>
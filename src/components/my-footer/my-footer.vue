<template>
    <div class="menu">
        <ul>
            <li>
                <div>
                    <a href="#/" :class="{active :index==1}">
                        <i class="iconfont iconshouye" ></i>
                        <p>首页</p>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href="#/category" :class="{active :index==2}">
                        <i class="iconfont iconicon04"></i>
                        <p>分类</p>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href="#/cart" :class="{active :index==3}">
                        <i class="iconfont icongouwuche2" ></i>
                        <p >购物车</p>
                    </a>
                </div>
            </li>
            <li>
                <div>
                    <a href="#/myPage" :class="{active :index==4}">
                        <i class="iconfont iconwode"></i>
                        <p>我的</p>
                    </a>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "my-footer",
        props:{
            index:{
                type:Number
            }
        }
    }
</script>

<style scoped>
    .menu{
        width: 100%;
        height: 0.98rem;
        position: fixed;
        bottom: -1px;
        background: #fff;
    }
    .menu ul{
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

    }
    .menu ul li{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .menu li div{
        display: block;
        text-align: center;
        line-height: 0.5rem;
    }
    .menu li i{
        display: block;
        font-size: 0.4rem;
        color: #777777;
    }
    .menu li p{
        display: block;
        font-size: 0.25rem;
        color: #777777;
    }
    .menu ul li a.active i,.menu ul li a.active p{
        color: #d8a452;
    }
</style>
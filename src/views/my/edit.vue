<template>
    <div>
        <van-nav-bar
                title="修改个人信息"
                left-text="返回"
                right-text="设置"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div class="user-info">
            <div class="avatar">
                <van-image
                        round
                        width="2rem"
                        height="2rem"
                        :src="user.avatar"
                />
                <ul class="username">
                    <li>{{user.username}}</li>
                </ul>
            </div>
            <ul class="choose">
                <li>账户与安全</li>
                <li>隐私</li>
                <li>通用</li>
                <li>问题反馈</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {userInfoGet} from "../../api/my";
    export default {
        name: "edit",
        data(){
          return{
              user:{},
              baseUrl:'http://39.105.204.134/mshop'
          }
        },
        methods:{
            onClickLeft(){
                this.$router.push({name:'myPage'})
            },
            onClickRight(){

            },
            getInfo(){
                userInfoGet().then(res=>{
                    if(res.code==200){
                        this.user=res.data;
                        this.user.avatar=this.baseUrl+this.user.avatar;
                    }
                })
            }
        },
        mounted() {
            this.getInfo();
        }
    }
</script>

<style scoped>
    .user-info{
        position: absolute;
        top: 0.8rem;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .van-image{
        margin: 0.4rem 0.4rem 0.2rem 0.4rem;
    }
    .avatar{
        border-bottom: 1px solid #8A8D93;
        display: flex;
        justify-content: space-between;
    }
    .username{
        width: 4.7rem;
        padding: 0.8rem 0 0.2rem;
    }
    .choose li{
        padding: 0.1rem 0.24rem 0 0.4rem;
        width: 100%;
        height: 0.6rem;
        color: #D7D1D1;
        background: #9BCBB5;
        border-bottom: 1px solid #8CB2C5;
    }
    .choose::before{
        content: "";
        display: block;
        width: 100%;
        height: 0.2rem;
        background: #8A8D93;
    }
</style>
<template>
    <div>
        <van-nav-bar
                title="注册"
                left-text="返回"
                right-text="登陆"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div class="login-box">
            <h1>注册</h1>
            <div>
                <van-cell-group>
                    <div class="field">
                        <van-field
                                v-model="form.username"
                                required
                                clearable
                                label="用户名"
                                placeholder="请输入用户名"
                                @input="valueChange({key:'username',value:form.username})"
                        />
                    </div>
                    <div class="field">
                        <van-field
                                v-model="form.password"
                                type="password"
                                label="密码"
                                placeholder="请输入密码"
                                required

                        />
                    </div>
                    <div class="field">
                        <van-field
                                v-model="form.tel"
                                required
                                clearable
                                label="手机号"
                                placeholder="请输入手机号"
                                @input="valueChange({key:'tel',value:form.tel})"
                        />
                    </div>
                    <div class="field">
                        <van-button type="primary" size="large" @click="regesterUser">注册</van-button>
                    </div>
                </van-cell-group>
            </div>
        </div>
        <my-footer></my-footer>
    </div>

</template>

<script>
    import {register,changeValue} from "../../api/my";
    import myFooter from '../../components/my-footer/my-footer'
    export default {
        name: "login",
        data(){
            return{
               form:{
                   username:'',
                   password:'',
                   tel:''
               },
                ifSend:''
            }
        },
        components:{
            myFooter
        },
        methods:{
            regesterUser(){
                if(!this.form.username){
                    this.$toast.fail("用户名不能为空");
                    return false;
                }
                if(!this.form.password){
                    this.$toast.fail("密码不能为空");
                    return false;
                }
                if(!this.form.tel){
                    this.$toast.fail("手机号不能为空");
                    return false;
                }
                register(this.form).then(res=>{
                   if(res.code==200){
                       this.$toast.success(res.msg);
                   }
                })
            },
            valueChange(value){
                if(this.ifSend){
                    clearTimeout(this.ifSend);
                }
               this.ifSend=setTimeout(()=>{
                   changeValue(value).then(res=>{
                       if(res.code==200){
                           this.$toast.fail(res.msg);
                       }else {
                           this.$toast.success(res.msg);
                       }
                   })
               },1000);
            },
            onClickRight(){
                this.$router.push({name:'login'})
            },
            onClickLeft(){

            }
        }
    }
</script>

<style scoped>
    .login-box{
        width: 6rem;
        margin: 3rem auto 0;
        padding-bottom: 0.3rem;
        overflow: hidden;
        border: 1px solid #8CB2C5;
        border-radius: 0.8rem;
    }
    h1{
        text-align: center;
        color: #EA4D13;
        background: #8CB2C5;
        margin-bottom: 0.4rem;
    }
    .field{
        width: 100%;
        text-align: center;
        margin: 0 auto 0.2rem;
    }
    .van-button{
        width: 3rem;
        margin: 0.3rem auto 0;
    }
</style>
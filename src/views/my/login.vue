<template>
    <div>
        <van-nav-bar
                title="登陆"
                left-text="返回"
                right-text="注册"
                left-arrow
                @click-left="onClickLeft"
                @click-right="onClickRight"
        />
        <div class="login-box">
            <h1>登陆</h1>
            <div>
                <van-cell-group>
                    <div class="field">
                        <van-field
                                v-model="form.username"
                                required
                                clearable
                                label="用户名"
                                right-icon="question-o"
                                placeholder="请输入用户名"
                                @click-right-icon="$toast('question')"
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
                        <van-button type="primary" size="large" @click="userLogin">登陆</van-button>
                    </div>
                </van-cell-group>
            </div>
        </div>
        <my-footer></my-footer>
    </div>

</template>

<script>
    import {login} from "../../api/my";
    import myFooter from '../../components/my-footer/my-footer'
    import {queryCart} from "../../api/cart";

    export default {
        components:{
            myFooter
        },
        name: "login",
        data(){
            return{
               form:{
                   username:'',
                   password:''
               }
            }
        },
        methods:{
            userLogin(){
                if(!this.form.username){
                    this.$toast.fail("用户名不能为空");
                    return false;
                }
                if(!this.form.password){
                    this.$toast.fail("密码不能为空");
                    return false;
                }
                login(this.form).then(res=>{
                    if(res.code==200){
                        this.$toast.success(res.msg);
                        sessionStorage.setItem('token',res.token);
                        queryCart().then(result=>{
                            if(result.code==200&&result.data){
                                this.$store.commit('setCart',result.data);
                            }
                        })
                        let redirect = this.$route.query.redirect || 'home';
                        this.$router.push({name:redirect});
                    }else {
                        this.$toast.fail(res.msg);
                    }
                })
            },
            onClickLeft(){},
            onClickRight(){
                this.$router.push({name:'reg'})
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
    .van-nav-bar{
        background: #9BCBB5;
    }
</style>
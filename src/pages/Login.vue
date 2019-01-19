<template>
    <div id="login">
        <el-form ref="form" :model="loginForm" id="loginForm">
            <img alt="logo" src="../assets/logo.png" class="logo">
            <el-form-item>
                <el-input v-model="loginForm.account" placeholder="请输入账号" autofocus></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="loginForm.passwd" placeholder="请输入密码" @keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="width50" @click="onSubmit" round>登录</el-button>
            </el-form-item>
        </el-form>
        <VueCanvasNest :config="{color:'0,0,0', count: 100}"/>
    </div>
</template>

<script>
    import VueCanvasNest from 'vue-canvas-nest'

    export default {
        name: "Login",
        components: {
            VueCanvasNest
        },
        data() {
            return {
                loginForm: {
                    account: '',
                    passwd: ''
                },
                path:'http://106.12.123.92:8081/api/v1/users/login/'
            }
        },
        methods: {
            onSubmit() {
                let api=this.$api.userApi.login;
                api.data={
                    account:this.loginForm.account,
                    pwd:this.loginForm.passwd
                };
                this.axios(api).then(response=>{
                    console.log(response);
                    let data = response.data;
                    if(data.code===0){
                        let token=data.data.token;
                        this.$cookies.set("token", token, 7200);
                        console.log(token)
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$router.push('/');
                    }
                    else{
                        this.$notify.error({
                            message:'用户名或密码错误'
                        })
                    }
                })

            }
        }
    }
</script>

<style scoped>

    #loginForm {
        width: 260px;
        height: 360px;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -200px;
        margin-left: -130px;
    }

    .logo {
        padding: 20px;
    }


</style>
<template>
    <div id="login" :style="bg" style="height: 100%;width: 100%;position: absolute">
        <el-form ref="form" :model="loginForm" id="loginForm">
            <img alt="logo" src="../assets/dhu.png" width="114" height="114" class="logo">
            <el-row :gutter="300"><span
                    style="color: black;font-size: 30px;font-family:sans-serif">东华大学面料疵点检测综合管理平台</span></el-row>
            <br>

            <el-form-item>
                <el-input v-model="loginForm.account" placeholder="请输入账号" autofocus></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="loginForm.passwd" placeholder="请输入密码"
                          @keyup.enter.native="onSubmit"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="width50" style="position: relative;left: -5%" @click="register" round>
                    注册
                </el-button>
                <el-button type="primary" class="width50" style="position: relative;right: -5%" @click="onSubmit" round>
                    登录
                </el-button>
            </el-form-item>
        </el-form>
        <!--<VueCanvasNest :config="{color:'0,0,0', count: 100}"/>-->
        <!--<div id="word" style="width: 100%;height: 70%;position: absolute;margin-top:600px" >-->
        <div style="top: 70%;position: absolute;left: 80%">
            <span style="font-size: 18px;color: #b86312">团队名称：DHU-Cloud</span>
        </div>
        <!--</div>-->
    </div>
</template>


<script>
    // import VueCanvasNest from 'vue-canvas-nest'

    export default {
        name: "Login",
        // components: {
        //     VueCanvasNest
        // },
        data() {
            return {
                loginForm: {
                    account: '',
                    passwd: ''
                },
                path: 'http://10.199.172.62:8081/api/v1/users/login/',
                bg:{
                    backgroundImage:'url('+require('../assets/bg.jpg')+')',
                    backgroundRepeat:'no-repeat'
                }
            }
        },
        methods: {
            register() {
                let api = this.$api.userApi.register;
                let account = this.loginForm.account;
                api.data = {
                    account: this.loginForm.account,
                    pwd: this.loginForm.passwd,
                    role: 0
                };
                this.axios(api).then(response => {
                    let data = response.data;
                    if (data.code === 0) {
                        this.$message({
                            message: '注册成功',
                            type: 'success'
                        });
                        // location.reload();
                        this.loginForm.passwd = '';
                    } else {
                        this.$message({
                            message: '用户已经存在',
                            type: 'error'
                        });
                        this.loginForm.account = '';
                        this.loginForm.passwd = ''
                    }
                })
            },
            onSubmit() {
                let api = this.$api.userApi.login;
                api.data = {
                    account: this.loginForm.account,
                    pwd: this.loginForm.passwd
                };
                this.axios(api).then(response => {
                    console.log(response);
                    let data = response.data;
                    if (data.code === 0) {
                        let token = data.data.token;
                        console.log(token);
                        this.$cookies.set("token", token, 7200);
                        console.log(token);
                        this.$message({
                            message: '登录成功',
                            type: 'success'
                        });
                        sessionStorage.setItem("userName", this.loginForm.account);
                        this.$router.push('/photo-gallery');
                    } else {
                        this.$notify.error({
                            message: '用户名或密码错误'
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
        top: 40%;
        left: 50%;
        margin-top: -200px;
        margin-left: -130px;
    }

    .logo {
        padding: 20px;
    }

    /*#login{*/
        /*height: 88%;*/
        /*weight:80%;*/
        /*position: absolute;*/
    /*}*/

</style>

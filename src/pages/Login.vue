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
                <el-button type="primary" class="width50" @click="onSubmit" round>登录
                </el-button>
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
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message({
                    message: '登录成功',
                    type: 'success'
                });
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
<template>
    <el-container id="home">
        <div class="sidebar-wrapper">
            <el-aside class="sidebar" width="217px">
                <el-menu default-active="dashboard" class="menubar" router>
                    <!--<el-menu-item index="dashboard">-->
                        <!--<i class="el-icon-menu"></i>-->
                        <!--<span slot="title">仪表盘</span>-->
                    <!--</el-menu-item>-->
                    <el-menu-item index="cloth-examine">
                        <i class="el-icon-search"></i>
                        <span slot="title">图片库</span>
                    </el-menu-item>
                    <el-menu-item index="examine-report">
                        <i class="el-icon-document"></i>
                        <span slot="title">布料检测</span>
                    </el-menu-item>
                    <!--<el-menu-item index="user-manage">-->
                        <!--<i class="el-icon-setting"></i>-->
                        <!--<span slot="title">用户管理</span>-->
                    <!--</el-menu-item>-->
                </el-menu>
            </el-aside>
        </div>
        <el-container style="margin-left: 200px">
            <el-header style="height: auto;padding: 5px 20px;">
                <div class="left title">{{$route.meta.title}}</div>
                <el-menu :default-active="activeIndex" mode="horizontal" class="right">
                    <el-submenu index="1">
                        <template slot="title">
                            <img src="../assets/logo.png" class="headpic" alt=""/>
                            超级管理员 李鱼皮
                        </template>
                        <el-menu-item index="1-1">个人</el-menu-item>
                        <el-menu-item index="1-2" @click="logout">注销</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                activeIndex: '1',
                title: '仪表盘'
            }
        },
        methods: {
            logout() {
                let api=this.$api.userApi.logout;
                let token=this.$cookies.get("token")
                console.log(token)
                api.headers={
                    token:token
                }
                this.axios(api).then(response=>{
                    if(response.data.code===0){
                        this.$message({
                            message: '已注销',
                            type: 'success'
                        });
                        this.$cookies.remove("token");
                        this.$router.push('/login');
                    }
                    else{
                        this.$message({
                            message:'失败',
                            type:'failed'
                        })
                    }
                })

            }
        }
    };
</script>

<style scoped>
    #home {
        width: 100%;
        height: 100%;
    }

    #home .el-menu {
        border-bottom: none;
    }

    .sidebar-wrapper {
        height: 100%;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 200px;
        z-index: 1000;
        background-color: white;
        border-right: solid 1px #e6e6e6;
    }

    .sidebar {
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
    }

    .menubar {
        height: 100%;
        border: none;
    }

    #home .title {
        margin-top: 20px;
    }

    .headpic {
        width: 42px;
        height: 42px;
        border-radius: 50%;
        border: 1px solid #ddd;
        padding: 3px;
        margin-right: 10px;
    }
</style>


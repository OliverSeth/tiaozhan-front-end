<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <div style="margin-top: -75px">
            <el-button type="primary">添加机器</el-button>
        </div>
        <div style="margin-top: 30px">
            <el-table :data="examineTable" style="width: 100%;text-align: center">
                <el-table-column prop="id" label="机器号" align="center"></el-table-column>
                <el-table-column prop="image" label="机器图" align="center">
                    <template scope="scope">
                        <img :src="scope.row.image" width="100" height="100"/>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
                <el-table-column prop="models" label="已有模型" align="center"></el-table-column>
                <el-table-column label="操作模型" align="center">
                    <template slot-scope="scope2">
                        <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-circle-plus-outline"
                                @click="addModels">
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="deleteModels">
                        </el-button>
                    </template>
                </el-table-column>
                <!--<span v-model="this[0].models"></span>-->
                <el-table-column prop="used" label="使用模型" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="350">
                    <template slot-scope="scope1">
                        <el-button
                                type="success"
                                size="mini"
                                icon="el-icon-info"
                                style="background-color: darkorange; border: 1px solid darkorange"
                                @click="check()">查看
                        </el-button>
                        <el-button
                                type="primary"
                                size="mini"
                                @click="changeModel(scope1.row)">切换模型
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="removedDevice(scope1.row)">删除设备
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeviceControl",
        methods:{
            check(){
                this.$router.push('/defect-distribution')
            },
            addModels(){
                this.$prompt('请输入想要添加的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更换'
                    });
                });
            },
            deleteModels(){
                this.$prompt('请输入想要删除的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$confirm('此操作将删除模型'+value+', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });

            },
            changeModel(row){
                this.$prompt('请输入想要更换的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this[0].models=value,
                    this.$message({
                        type: 'success',
                        message: '现在的模型是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更换'
                    });
                });
            },
            removedDevice(row){
                this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        data(){
            return{
            //     image:{
            //         url:'url('+require('../assets/logo.png')+')no-repeat'
            // },
                examineTable: [{
                    id: 1,
                    status: '关闭',
                    models: "1,2,3",
                    image:"../assets/logo.png",
                    used:1,
                    operate:0
                }, {
                    id: 1,
                    status: '使用中',
                    models: "1,2,3",
                    picture:"../assets/logo.png",
                    used:1,
                    operate:0
                }, {
                    id: 1,
                    status: '维护',
                    models: "1,2,3",
                    picture:"../assets/logo.png",
                    used:1,
                    operate:0
                }]
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div id="clothExamine" style="width: 80%;height: 88%;position: absolute">
        <div style="margin-top: -75px;margin-left:350px">
            <el-button type="primary" @click="uploadPhoto">上传图片</el-button>
        </div>
        <div style="margin-top: 30px">
            <el-row>
            <el-col>
                <el-table
                        :data="photoTable"
                        style="width: 100%;text-align: center"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="picId"
                            label="图片序列"
                            width="180">
                    </el-table-column>
                    <el-table-column

                            label="图片"
                            width="180">
                        <template scope="scope">
                            <img prop="href" :src="scope.row.image" width="100" height="100"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="defectType"
                            label="疵点种类"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="defectPosition"
                            label="疵点位置">
                    </el-table-column>
                    <el-table-column
                            prop="updateTime"
                            label="检测时间">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template scope="scope">
                            <el-button
                                    type="primary"
                                    size="small"
                                    @click="modify()">修改
                            </el-button>
                            <el-button type="danger" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        </div>
        <div class="block">
            <span class="pages"></span>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :total="photoTable.length"
                    layout="prev, pager, next"
                    :page-size="4">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ClothExamine",
        mounted(){
            let api=this.$api.userApi.getPhotos;
            let that =this;
            that.axios(api,{
                params:{
                    pageNum: that.currentPage,
                    pageSize: that.pageSize
                }
            }).then(function (response) {
                // console.log(response);
                let data=response.data;
                console.log(data);
                if(data.code===0){
                    that.photoTable=data.data.list;
                    for(let i=0;i<that.photoTable.length;i++){
                        if(that.photoTable[i].updateTime===null){
                            that.photoTable[i].updateTime=that.photoTable[i].createTime;
                        }
                    }
                }
            })
        },
        methods: {
            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },

            uploadPhoto(){

            },
            tableRowClassName({row, rowIndex}) {
                switch (row.status) {
                    case 0:
                        return 'success-row';
                    case 1:
                        return 'warning-row';
                    default:
                        return 'danger-row';
                }
            },
            modify(){
                this.$prompt('请输入疵点种类','请输入疵点位置', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '你的邮箱是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        },
        data() {
            return {
                currentPage:1,
                pageSize:4,
                photoTable:[],
                examineTable: [{
                    time: "2018-11-11 12:12:12",
                    status: 0,
                    no: 123,
                    picture:"../../assets/logo.png",
                    badPosition: []
                }, {
                    time: "2018-11-12 11:12:12",
                    status: 1,
                    no: 124,
                    badPosition: [1, 2]
                },{
                    time: "2018-11-12 11:12:12",
                    status: 1,
                    no: 124,
                    badPosition: [1, 2]
                }, {
                    time: "2018-11-12 12:12:12",
                    status: 2,
                    no: 125,
                    badPosition: [1, 2, 3, 4]
                }]
            }
        }
    }
</script>

<style>
    /*.el-table .warning-row {*/
        /*background: oldlace;*/
    /*}*/

    /*.el-table .success-row {*/
        /*background: #f0f9eb;*/
    /*}*/

    /*.el-table .danger-row {*/
        /*background: lightcoral;*/
    /*}*/
</style>

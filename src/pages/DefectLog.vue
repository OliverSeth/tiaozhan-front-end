<template>
    <div id="clothExamine" style="width: 80%;height: 85%;position: absolute">
        <div>
            <el-row>
                <el-col>
                    <el-table
                            :data="defectList"
                            style="width: 100%;text-align: center"
                            :row-class-name="tableRowClassName">
                        <el-table-column
                                prop="createTime"
                                label="检测时间"
                                sortable
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="detectMechine"
                                label="检测机器"
                                sortable
                                width="240">
                        </el-table-column>
                        <el-table-column
                                prop="identifyType"
                                label="疵点种类"
                                width="240">
                        </el-table-column>
                        <!--                        <el-table-column-->
                        <!--                                prop="updateTime"-->
                        <!--                                label="检测时间">-->
                        <!--                        </el-table-column>-->
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        type="primary"
                                        @click="showPic(scope.row)">查看图片
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
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total,prev, pager, next,jumper"
                    :total="total"
                    :page-size="4">
            </el-pagination>
        </div>
        <div class="top">
            <span style="font-size: 18px;color: #06050e">当前共{{total}}个疵点</span>
        </div>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="getscr1(href)" alt="">
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DefectLog",
        data() {
            return {
                defectList: [],
                total: 0,
                dialogVisible: false,
                href: '',
                currentPage:1
            }
        },
        mounted() {
            let url = 'http://10.199.172.62:8081/api/v1';
            this.axios(url, {
                params: {
                    pageSize: 8,
                    pageNum: 1
                }
            }).then(res=>{
                if(res.data.code==0){
                    this.total=res.data.data.total;
                    this.defectList=res.data.data.list;
                }
            })
        },

        methods: {
            showPic(row) {
                this.dialogVisible = true;
                let url = 'http://10.199.172.62:8081/api/v1/pictures/do-user';
                this.axios(url, {
                    params: {
                        picId: row.picId
                    }
                }).then(response => {
                    if (response.data.code == 0) {
                        this.href = response.data.data.href;
                    }
                });
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                // console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange(currentPage){
                this.currentPage=currentPage;
                let url = 'http://10.199.172.62:8081/api/v1';
                this.axios(url, {
                    params: {
                        pageSize: 8,
                        pageNum: currentPage
                    }
                }).then(res=>{
                    if(res.data.code==0){
                        this.total=res.data.data.total;
                        this.defectList=res.data.data.list;
                    }
                })
            },
            getscr1(item) {
                return ('http://10.199.172.62:5555' + item);
            },
        }
    }
</script>

<style scoped>

</style>

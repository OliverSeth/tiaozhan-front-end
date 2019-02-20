<template>

    <div id="clothExamine" style="width: 80%;height: 88%;position: absolute">
        <div style="margin-top: -75px;margin-left:350px">
            <el-button type="primary" @click="uploadPhoto">上传图片</el-button>
        </div>
        <div style="margin-top: 30px">
            <el-row>
            <el-col>
                <el-table
                        :data="photoTable.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        style="width: 100%;text-align: center"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="picId"
                            label="图片序列"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="href"
                            label="图片路径"
                            sortable
                            width="180">

                        <!--插入图片链接的代码-->
                        <template slot-scope="scope">
                            <img  :src="getscr1(scope.row.href)"    style="width: 90px;height: 90px">
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
                                    @click="modify(scope.row)">修改
                            </el-button>
                            <el-button type="danger" size="small" @click="removePhoto(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column>
                        <template scope="scope1">
                            <el-dialog title="修改图片信息" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="疵点类型" :label-width="formLabelWidth">
                                        <el-select v-model="form.type" placeholder="请选择疵点类型" style="width: 300px">
                                            <el-option v-for="item in options"
                                                       :label="item.text"
                                                       :key="item.value"
                                                       :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item label="疵点位置" :label-width="formLabelWidth">
                                        <el-input v-model="form.position" autocomplete="off" style="width:300px"></el-input>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="confirm">确 定</el-button>
                                </div>
                            </el-dialog>
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
                    layout="prev, pager, next"
                    :total="photoTable.length"
                    :page-size="4">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    import utils from '../utils/index'

    export default {

        name: "ClothExamine",
        mounted(){
            let api=this.$api.userApi.getPhotos;
            let that =this;

            let url='http://106.12.123.92:8081/api/v1/pictures/do-user'
            // let photoTable = new Array();
            that.axios(url,{
                params:{
                    pageNum: that.currentPage,
                    pageSize: 100
                }
            }).then(function (response) {

                let data=response.data;

                if(data.code===0){
                    that.photoTable=data.data.list;
                    for(let i=0;i<that.photoTable.length;i++){
                        if(that.photoTable[i].updateTime===null){
                            that.photoTable[i].updateTime=that.photoTable[i].createTime;
                        }


                        switch (that.photoTable[i].defectType) {
                            case 0:{
                                that.photoTable[i].defectType="无";
                                break;
                            }
                            case 1:{
                                that.photoTable[i].defectType="横疵";
                                break;
                            }
                            case 2:{
                                that.photoTable[i].defectType="纵疵";
                                break;
                            }
                            case 3:{
                                that.photoTable[i].defectType="横纵疵";
                                break;
                            }
                            default:that.photoTable[i].defectType="错误";
                        }
                        // console.log(that.photoTable[i].createTime);

                        // that.photoTable[i].picId="/../assets/1.jpg";
                        // that.photoTable[i].href='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                        console.log("that.photoTable[i].href=");

                        console.log(that.photoTable[i].href);
                        console.log("i=");

                        console.log(i);
                        // console.log(that.photoTable[i]);

                        that.photoTable[i].createTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].createTime);
                        that.photoTable[i].updateTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].updateTime);
                    }
                }
            })
        },
        methods: {



            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },
            // getImgPath(path){
            //     let path="";
            //     return require(path);
            //
            // },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },

            uploadPhoto(){
                this.$router.push('/upload-image');
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
            confirm(){
                this.dialogFormVisible = false;
                let id=this.row0.picId;
                console.log(id);
                let api={
                    url:'http://106.12.123.92:8081/api/v1/pictures/'+id+'/do-admin',
                    method:'put',
                };
                api.data={
                    defectPosition:this.form.position,
                    defectType:this.form.type,
                };
                this.axios(api).then(function (response) {
                    console.log(response);
                    // location.reload();
                });
            },
            modify(row){
                this.dialogFormVisible = true;
                this.row0=row;
                // this.$prompt('请输入疵点种类','请输入疵点位置', '提示', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                // }).then(({ value }) => {
                //     this.$message({
                //         type: 'success',
                //         message: '你的邮箱是: ' + value
                //     });
                // }).catch(() => {
                //     this.$message({
                //         type: 'info',
                //         message: '取消输入'
                //     });
                // });
            },
            //获取图片路径
            getscr1(item){
                // document.images.imgInit.src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                return ('http://148.70.63.35:50070'+item);
            },
            removePhoto(row){
                let that=this;
                let id="1";
                let api={
                    url:'http://106.12.123.92:8081/api/v1/pictures/'+id+'/do-admin',
                    method:'delete',
                };
                let flag=false;
                // console.log("api");
                // console.log(api);
                // api.data={
                //     picId:id,
                // };
                this.$confirm('此操作将永久删除该设备，是否继续？','提示',{
                    confirmButtonText:'确定',
                    cancelButtonText:'取消',
                    type:'warning'
                }).then(()=>{
                    flag=true;
                    console.log(flag);
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                }).then(()=>{
                    if(flag===true){
                        console.log("ok");
                        that.axios(api).then(function(response){
                            console.log(response);
                            if(response.data.code===0){
                                that.$message({
                                    type:'success',
                                    message:'删除成功'});
                                // location.reload();
                            }

                        })
                    }
                })

            }
        },
        data() {
            return {
                currentPage:1,
                pageSize:4,
                photoTable:[],
                dialogFormVisible: false,
                form:{
                    type:'',
                    position:'',
                },
                options:[
                    {value:1,text:"横疵"},
                    {value:2,text:"纵疵"},
                    {value:3,text:"横纵疵"},
                    {value:0,text:"无"},
                ],
                formLabelWidth: '120px',
                row0:'',
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

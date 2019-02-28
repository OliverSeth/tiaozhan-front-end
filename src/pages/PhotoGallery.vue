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
                            prop="name"
                            label="图片名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="href"
                            label="图片"
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
                    <el-table-column label="操作">
                        <template slot-scope="scope2">
                            <el-button
                                    type="primary"
                                    size="small"
                                    @click="modify(scope2.row)">标注
                            </el-button>
                            <el-button type="danger" size="small" @click="removePhoto(scope2.row)">
                                删除
                            </el-button>
                            <el-dialog :visible="dialogFormVisible2">
                                <el-upload
                                        class="upload-demo"
                                        ref="upload"
                                        action="http://106.12.123.92:8081/api/v1/pictures/upload/xml/do-admin"
                                        :on-preview="handlePreview"
                                        :on-remove="handleRemove"
                                        :before-upload="handleBefore"
                                        multiple
                                        :on-exceed="handleExceed">
                                    <i class="el-icon-plus"></i>
                                </el-upload>
                                <el-button size="small" type="primary" @click="uploadXML" style="margin-top: 20px">上传XML文件
                                </el-button>
                                <el-button size="small" @click="dialogFormVisible2=false">取消</el-button>
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
                    :total="total"
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
            // let api=this.$api.userApi.getPhotos;
            let that =this;

            let url='http://106.12.123.92:8081/api/v1/pictures/do-user';
            // let photoTable = new Array();
            that.axios(url,{
                params:{
                    pageNum: 1,
                    pageSize: 4
                }
            }).then(function (response) {

                let data=response.data;
                // console.log(data);

                if(data.code===0){
                    that.photoTable=data.data.list;
                    that.total=data.data.total;
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
                            case -1:{
                                that.photoTable[i].defectType="未检测";
                                break;
                            }
                            default:that.photoTable[i].defectType="错误";
                        }
                        // console.log(that.photoTable[i].createTime);

                        // that.photoTable[i].picId="/../assets/1.jpg";
                        // that.photoTable[i].href='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                        // console.log("that.photoTable[i].href=");
                        //
                        // console.log(that.photoTable[i].href);
                        // console.log("i=");
                        //
                        // console.log(i);
                        // console.log(that.photoTable[i]);12

                        that.photoTable[i].createTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].createTime);
                        that.photoTable[i].updateTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].updateTime);
                    }
                }
            })
        },
        methods: {
            modify:function(row){
                this.row=row;
                this.dialogFormVisible2=true;
            },
            uploadXML(){
                // console.log(this.row);
                let fd=new FormData();
                // console.log(this.row.picId);
                let api={
                    url:'http://106.12.123.92:8081/api/v1/pictures/'+this.row.picId+'/do-admin',
                    method:'put'
                };
                fd.append("xmlFile", this.file);
                let xhr=new XMLHttpRequest();
                let that=this;
                xhr.open("post",'http://106.12.123.92:8081/api/v1/pictures/upload/xml/do-admin',true);
                xhr.send(fd);
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            // console.log(xhr.responseText);
                            let xml;
                            let arr=xhr.responseText.split('"');
                            let flag=false;
                            for(let i=0;i<arr.length;i++){
                                if(arr[i]==="成功") flag=true;
                            }
                            if(flag){
                                for(let i=0;i<arr.length;i++){
                                    if(arr[i]==="url"&&arr[i+1]===":"){
                                        xml=arr[i+2];
                                        break;
                                    }
                                }
                            }
                            // console.log(xml);
                            api.data={
                                xml:xml,
                            };
                            that.axios(api).then(function (response) {
                                if(response.data.code===0){
                                    that.$notify({
                                        title: '成功',
                                        message: '上传xml文件成功',
                                        type: 'success'
                                    });
                                }
                                else{
                                    that.$notify.error({
                                                        title: '失败',
                                        message: '上传失败'
                                    });
                                }
                                that.dialogFormVisible2=false;
                                that.$refs.upload.clearFiles();
                                // console.log(response);
                            })
                        }
                    }
                }
            },
            handleBefore(file){
                // console.log(file);
                let fileValue = file.name;
                // console.log(fileValue);
                let index = fileValue.lastIndexOf('.');
                const isXML=fileValue.substring(index)==='.xml';
                // console.log(index);
                if(isXML){
                    this.file=file;
                }
                else{
                    this.$message.error('上传文件只能是 xml 格式!');;
                }
                return isXML;
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files) {
                // this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleRemove(file) {
                console.log(file);
            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                // console.log(this.pagesize)  //每页下拉显示数据
            },
            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                let that =this;

                let url='http://106.12.123.92:8081/api/v1/pictures/do-user';
                // let photoTable = new Array();
                that.axios(url,{
                    params:{
                        pageNum: currentPage,
                        pageSize: 4
                    }
                }).then(function (response) {

                    let data=response.data;
                    console.log(data);

                    if(data.code===0){
                        that.photoTable=data.data.list;
                        that.total=data.data.total;
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
                                case -1:{
                                    that.photoTable[i].defectType="未检测";
                                    break;
                                }
                                default:that.photoTable[i].defectType="错误";
                            }
                            // console.log(that.photoTable[i].createTime);

                            // that.photoTable[i].picId="/../assets/1.jpg";
                            // that.photoTable[i].href='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                            // console.log("that.photoTable[i].href=");
                            //
                            // console.log(that.photoTable[i].href);
                            // console.log("i=");
                            //
                            // console.log(i);
                            // console.log(that.photoTable[i]);12

                            that.photoTable[i].createTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].createTime);
                            that.photoTable[i].updateTime = utils.getDateFormat('yyyy-MM-dd', that.photoTable[i].updateTime);
                        }
                    }
                })
                // console.log(this.currentPage)  //点击第几页
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
            //获取图片路径
            getscr1(item){
                // document.images.imgInit.src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                return ('http://148.70.63.35:50070'+item);
            },
            removePhoto(row){
                // console.log(row);
                let that=this;
                let id=row.picId;
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
                    // console.log(flag);
                }).catch(()=>{
                    this.$message({
                        type:'info',
                        message:'已取消删除'
                    });
                }).then(()=>{
                    if(flag===true){
                        // console.log("ok");
                        that.axios(api).then(function(response){
                            console.log(response);
                            if(response.data.code===0){
                                that.$message({
                                    type:'success',
                                    message:'删除成功'});
                                setTimeout("window.location.reload()",500);
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
                dialogFormVisible2:false,
                form:{
                    type:'',
                    position:'',
                },
                total:0,
                options:[
                    {value:1,text:"横疵"},
                    {value:2,text:"纵疵"},
                    {value:3,text:"横纵疵"},
                    {value:0,text:"无"},
                ],
                formLabelWidth: '120px',
                row:'',
                row0:'',
                file:'',
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

<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <div style="margin-top: -75px">
            <el-button type="primary" v-on:click="addMachine">添加机器</el-button>
            <el-button type="primary" v-on:click="uploadModel">上传模型</el-button>
        </div>
        <div style="margin-top: 30px">
            <el-table :data="deviceTable.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%;text-align: center">
                <el-table-column prop="deviceId" label="机器号" align="center"></el-table-column>
                <el-table-column
                        prop="require(href)"
                        label="机器图片"
                        sortable
                        width="180">

                    <!--插入图片链接的代码-->
                    <template slot-scope="scope">
                        <img  src="../assets/logo.png"   style="width: 90px;height: 90px">
                    </template>

                </el-table-column>
                <el-table-column prop="status" label="状态" align="center"></el-table-column>
                <el-table-column prop="models" label="已有模型" align="center"></el-table-column>
                <el-table-column label="操作模型" align="center" width="250">
                    <template slot-scope="scope2">
                        <el-button
                                type="primary"
                                size="mini"
                                icon="el-icon-circle-plus-outline"
                                @click="addModels(scope2.row)">
                        </el-button>
                        <el-button
                                type="danger"
                                size="mini"
                                icon="el-icon-delete"
                                @click="deleteModels(scope2.row)">
                        </el-button>
                        <el-button
                                type="success"
                                size="mini"
                                v-on:click="changeModel(scope2.row)">切换模型
                        </el-button>
                    </template>
                </el-table-column>
                <!--<span v-model="this[0].models"></span>-->
                <el-table-column prop="usingModel" label="使用模型" align="center"></el-table-column>
                <el-table-column label="设备操作" align="center" width="200">
                    <template slot-scope="scope1">
                        <el-button
                                type="success"
                                size="mini"
                                icon="el-icon-info"
                                style="background-color: darkorange; border: 1px solid darkorange"
                                @click="check()">查看
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
        <div class="block">
            <span class="pages"></span>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="prev, pager, next"
                    :total="deviceTable.length"
                    :page-size="4">
            </el-pagination>
        </div>
        <el-dialog title="上传算法" :visible.sync="dialogFormVisible">
            <el-upload
                    class="upload-demo"
                    action="http://106.12.123.92:8081/api/v1/models/upload/py/do-admin"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="handleBefore"
                    multiple
                    :on-exceed="handleExceed"
                    :file-list="fileList">
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip" style="margin-top: 20px">只能上传py算法文件</div>
            </el-upload>
            <el-button size="small" type="primary" style="margin-top: 20px" v-on:click="saveModel">点击上传</el-button>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DeviceControl",
        mounted() {
            // let api = this.$api.userApi.getMachines;
            let url='http://106.12.123.92:8081/api/v1/devices/do-user';
            let that=this;
            let size=that.pageSize*that.currentPage;
            this.axios(url, {
                params: {
                    pageNum: that.currentPage,
                    pageSize: 100,
                }
            }).then(function (res) {
                // console.log(res);
                let data = res.data;
                // console.log(data);
                if(res.data.code===0){
                    that.deviceTable=data.data.list;

                }
            });

        },
        methods:{

            uploadModel:function(){
                this.dialogFormVisible=true;
            },
            saveModel:function(){
                let fd=new FormData();
                let api=this.$api.userApi.saveModel;
                fd.append("pyFile", this.file);
                let fileName=this.file.name;
                let index=fileName.lastIndexOf('.');
                fileName=fileName.slice(0,index);
                let xhr=new XMLHttpRequest();
                let that=this;
                xhr.open("post",'http://106.12.123.92:8081/api/v1/models/upload/py/do-admin',true);
                xhr.send(fd);
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let py;
                            let arr=xhr.responseText.split('"');
                            let flag=false;
                            for(let i=0;i<arr.length;i++){
                                if(arr[i]==="成功") flag=true;
                            }
                            if(flag){
                                for(let i=0;i<arr.length;i++){
                                    if(arr[i]==="data"&&arr[i+1]===":"){
                                        py=arr[i+2];
                                        break;
                                    }
                                }
                            }
                            api.data={
                                pyUrl:py,
                                name:fileName,
                            };
                            that.axios(api).then(function (response) {
                                console.log(response);
                            })
                        }
                    }
                }
            },
            check(){

                this.$router.push('/defect-distribution')
            },

            handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
            },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
            },

            addMachine(){
                let api=this.$api.userApi.addMachine;

                api.data={
                    name:"dhu",
                    location:"dhu"
                };
                this.axios(api).then(response=>{
                    //console.log(response.data);
                    if(response.data.deviceId!==0){
                        //this.addRow();

                        this.$message({
                            message:"添加成功",
                            type:'success'
                        });
                        location.reload();
                    }
                    else{
                        this.$message({
                            message:"未知错误",
                            type:error
                        })
                    }
                })

            },

            removedDevice(row){
                var that=this;
                let id=row.deviceId;
                let api={
                    url:'http://106.12.123.92:8081/api/v1/devices/'+id+'/do-admin',
                    method:'delete',
                };
                let flag=false;
                // console.log("api=");
                // console.log(api);
                api.data={
                    deviceId:id,
                };

                this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    flag=true;
                    console.log(flag);
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                }).then(()=>{
                    if(flag===true){
                        // console.log(flag);
                        that.axios(api).then(function (response) {
                            // console.log(response);
                            if(response.data.code===0){
                                that.$message({
                                    type: 'success',
                                    message: '删除成功!'});
                                location.reload();
                            }
                        })
                    }
                })
            },

            addModels(row){
                let flag=false;
                let that=this;
                let arr=[];
                let newStr=String();
                this.$prompt('请输入想要添加的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    if(value===null){
                        this.$message({
                            type: 'info',
                            message: '取消添加'
                        });
                    }
                    else{
                        let string=row.models;
                        if(string==="null"){
                            string=null;
                        }
                        // console.log(string);
                        string=string.substr(1,string.length-2);
                        // console.log(string);
                        arr=string.split(',');
                        // console.log(arr);
                        let hf=false;
                        for(let i=0;i<arr.length;i++){
                            if(arr[i]===value){
                                hf=true;
                                const h = this.$createElement;
                                this.$message({
                                    message: h('p', null, [
                                        h('span', null, '模型 '),
                                        h('i', { style: 'color: teal' }, value),
                                        h('span', null, '已存在 '),
                                    ])
                                });
                            }
                        }
                        if(hf===false){
                            arr.push(value);
                            newStr=arr.join(',');
                            console.log(newStr);
                            // row.models=newStr;
                            row.models='['+ newStr +']';
                            flag=true;
                        }
                        else{
                            arr=row.models;
                        }
                        // console.log(row.models);
                    }

                    // console.log(this.getDeviceid());
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更换'
                    });
                }).then(()=>{
                    if(flag===true){
                        // console.log(that.deviceTable);
                        let api={
                            url:'http://106.12.123.92:8081/api/v1/devices/'+row.deviceId+'/models/do-admin',
                            method:'put'
                        };
                        console.log(row.models);
                        // console.log(arr);
                        api.data={
                            models:row.models,
                        };
                        // console.log(arr);
                        that.axios(api).then(function (response) {
                            console.log(response);
                        })
                    }
                })
            },

            deleteModels(){
                let flag=false;
                this.$prompt('请输入想要删除的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$confirm('此操作将删除模型'+value+', 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        flag=true;
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
                let flag=false;
                let v;
                this.$prompt('请输入想要更换的模型',  {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    // this[0].models=value,
                    flag=true;
                    v=value;
                    row.usingModel=value;
                    this.$message({
                        type: 'success',
                        message: '现在的模型是: ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消更换'
                    });
                }).then(()=>{
                    if(flag===true){
                        let api={
                            url:'http://106.12.123.92:8081/api/v1/devices/'+row.deviceId+'/do-admin',
                            method:'put'
                        };
                        console.log(v);
                        api.data={
                            usingModel:v,
                        };
                        this.axios(api).then(function (response) {
                            // console.log(response);
                        })
                    }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleBefore:function (file) {
                // console.log();
                let fileValue = file.name;
                // console.log(fileValue);
                let index = fileValue.lastIndexOf('.');
                const isPy=fileValue.substring(index)==='.py';
                // console.log(index);
                if(isPy){
                    this.file=file;
                }
                else{
                    this.$message.error('上传文件只能是 py 格式!');;
                }
                return isPy;
            },

        },
        data(){
            return{
            //     image:{
            //         url:'url('+require('../assets/logo.png')+')no-repeat'
            // },
                value:"",
                dialogFormVisible:false,
                currentPage:1,
                deviceTable:[],
                pageSize:4,
                file:'',
                fileList:[],
            }
        }
    }
</script>

<style scoped>

</style>

<template>
    <div>
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
            <span>选择文件</span>
            <div slot="tip" class="el-upload__tip" style="margin-top: 20px">只能上传py算法文件</div>
        </el-upload>
        <el-button size="small" type="info" style="margin-top: 20px" @click="preview">查看</el-button>
        <el-button size="small" type="primary" style="margin-top: 20px" v-on:click="saveModel">上传</el-button>
    </div>
</template>

<script>
    export default {
        name: "Upload",
        data(){
            return{
                fileList:'',
                file:''
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
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
                                if(response.data.code===0){
                                    that.$notify({
                                        title: '成功',
                                        message: '上传成功',
                                        type: 'success'
                                    });
                                }
                            })
                        }
                    }
                }
            },
        }
    }
</script>

<style scoped>

</style>

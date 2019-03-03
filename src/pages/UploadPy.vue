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
            <div slot="tip" class="el-upload__tip" style="margin-top: 20px">只能上传py算法文件</div>
        </el-upload>
        <el-button size="small" type="primary" style="margin-top: 20px" v-on:click="saveModel">点击上传</el-button>
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
        }
    }
</script>

<style scoped>

</style>

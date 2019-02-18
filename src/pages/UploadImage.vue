<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <!--<div style="margin-top: -75px">-->
            <!--<el-button type="primary" @click="uploadPhoto">上传</el-button>-->
        <!--</div>-->
        <el-form :model="form">
            <el-form-item>
                <el-upload
                        action="http://106.12.123.92:8081/api/v1/pictures/upload/do-admin"
                        list-type="picture-card"
                        ref="upload"
                        name="picFile"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="uploadSuccess"
                        :auto-upload="false">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="uploadPhoto">上传</el-button>
                <el-button size="small">取消</el-button>
            </el-form-item>
        </el-form>
        <div style="margin-top: 30px">
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>

<script>

    export default {
        name: "uploadImage",
        data(){
            return{
                activeIndex:'1',
                dialogImageUrl: '',
                dialogVisible: false,
                form:{},
                // file:'',
            }
        },
        methods:{
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                const isLt20M = file.size / 1024 / 1024 < 20;
                // this.file=file;

                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt20M) {
                    this.$message.error('上传头像图片大小不能超过 20MB!');
                }
                return isLt20M;
            },
            uploadPhoto(file){
                this.$refs.upload.submit();
               console.log(file);
               let fd=new FormData();
               fd.append("picFile", file);
               let api=this.$api.userApi.uploadPhoto;
               api.data=fd;
               console.log(fd);
               api.headers={
                   "Content-type":"multipart/form-data"
               };
               this.axios(api).then(function (response) {
                   console.log(response);
               })

                // this.$refs.upload.submit();
            },
            uploadSuccess(res){
                console.log(res);
            }
        }
    }
</script>

<style scoped>
    .el-menu-demo{
        position: absolute;
        margin-top: -80.5px;
        margin-left:50px;
    }
</style>

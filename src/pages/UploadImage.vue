<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <!--<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
            <!--<el-menu-item index="1">单张上传</el-menu-item>-->
            <!--<el-menu-item index="2">批量上传</el-menu-item>-->
        <!--</el-menu>-->
        <div style="margin-top: -75px">
            <el-button type="primary" @click="uploadPhoto(file)">上传</el-button>
        </div>
        <div style="margin-top: 30px">
            <el-upload
                    action="http://106.12.123.92:8081/api/v1/pictures/upload/do-admin"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                    :on-preview="handlePictureCardPreview">
                    <!--:on-remove="handleRemove">-->
                <i class="el-icon-plus"></i>
            </el-upload>
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
                dialogVisible: false
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

                // if (!isJPG) {
                //     this.$message.error('上传头像图片只能是 JPG 格式!');
                // }
                if (!isLt20M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isLt20M;
            },
            uploadPhoto(file){
                let fd=new FormData();
                fd.append("picFile", file);
                let api=this.$api.userApi.uploadPhoto;
                api.data={
                    picture:fd,
                };
                this.axios(api).then(function (response) {
                    console.log(response);
                })
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

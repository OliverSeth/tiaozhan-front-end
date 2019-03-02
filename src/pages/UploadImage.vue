<template>
    <div id="ulDiv">
        <!--<div style="margin-top: -75px">-->
        <!--<el-button type="primary" @click="uploadPhoto">上传</el-button>-->
        <!--</div>-->
        <el-form :model="form" id="ulForm">
            <el-form-item>
                <el-upload
                        action='#'
                        http-request=""
                        list-type="picture-card"
                        ref="upload"
                        :before-upload="beforeAvatarUpload"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button size="small" type="primary" @click="uploadPhoto">上传图片</el-button>
                <el-button size="small" @click="returnPg">返回</el-button>
            </el-form-item>
        </el-form>
        <el-dialog :visible.sync="formVisible" title="上传xml文件" width="30%">
            <el-form :model="form2">
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            action="#"
                            http-request=""
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-upload="handleBefore"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="uploadXML">上传XML文件</el-button>
                    <el-button size="small" @click="returnPg">返回</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <div style="margin-top: 30px">
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import cookies from "vue-cookies";

    export default {
        name: "uploadImage",
        mounted(){
            let arr=[];
            // console.log(1);
            console.log(arr.toString());
            // console.log(1);
        },
        data() {
            return {
                formVisible: false,
                activeIndex: '1',
                dialogImageUrl: '',
                dialogVisible: false,
                id:0,
                form: {},
                form2: {},
                file: '',
                file2: '',
                fileList: [],
                fileList2: [],
            }
        },
        methods: {
            handleBefore(file) {
                // console.log(file);
                let fileValue = file.name;
                // console.log(fileValue);
                let index = fileValue.lastIndexOf('.');
                const isXML = fileValue.substring(index) === '.xml';
                // console.log(index);
                if (isXML) {
                    this.file2 = file;
                } else {
                    this.$message.error('上传文件只能是 xml 格式!');
                }
                return isXML;
            },
            returnPg() {
                this.$router.push('/photo-gallery');
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            // beforeRemove(file, fileList) {
            //     return this.$confirm(`确定移除 ${ file.name }？`);
            // },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            beforeAvatarUpload(file, fileList) {
                const isJPG = file.type === 'image/jpeg';
                const isLt5M = file.size / 1024 / 1024 < 5;
                this.file=file;
                // console.log(this.file);
                // this.fileList2.push(file);
                // console.log(this.fileList2);
                // let arr=fileName.split();
                // this.file=file;

                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }

                // if(isJPG && isLt5M){
                //     this.uploadPhoto();
                // }
                return isJPG && isLt5M;
            },
            uploadXML() {
                let fd=new FormData();
                // let that=this;
                // console.log(this.row.picId);
                // let api={
                //     url:'http://106.12.123.92:8081/api/v1/pictures/'+this.id+'/do-admin',
                //     method:'put'
                // };
                fd.append("xmlFile", this.file2);
                let xhr=new XMLHttpRequest();
                let that=this;
                xhr.open("put",'http://106.12.123.92:8081/api/v1/pictures/upload/xml/'+this.id+'/do-admin',true);
                xhr.setRequestHeader('token',cookies.get('token'));
                xhr.send(fd);
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            // console.log(xhr.responseText);
                            // let xml;
                            let arr=xhr.responseText.split('"');
                            let flag=false;
                            for(let i=0;i<arr.length;i++){
                                if(arr[i]==="成功") flag=true;
                            }
                            if(flag){
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
                            that.formVisible=false;
                            that.$refs.upload.clearFiles();
                            // if(flag){
                            //     for(let i=0;i<arr.length;i++){
                            //         if(arr[i]==="url"&&arr[i+1]===":"){
                            //             xml=arr[i+2];
                            //             break;
                            //         }
                            //     }
                            // }
                            // console.log(xml);
                            // api.data={
                            //     xml:xml,
                            // };
                                // that.axios(api).then(function (response) {
                                //     if(response.data.code===0){
                                //         that.$notify({
                                //             title: '成功',
                                //             message: '上传xml文件成功',
                                //             type: 'success'
                                //         });
                                //     }
                                //     else{
                                //         that.$notify.error({
                                //             title: '失败',
                                //             message: '上传失败'
                                //         });
                                //     }
                                //     that.formVisible=false;
                                //     that.$refs.upload.clearFiles();
                                //     // console.log(response);
                                // })
                        }
                    }
                }
            },
            uploadPhoto() {
                let fd = new FormData();
                let that = this;
                // for (let i = 0; i < this.fileList2.length; i++) {
                //     fd.append("pictures", this.fileList2[i]);
                // }
                fd.append("picture", this.file);
                // console.log(this.file);
                // let url='http://106.12.123.92:8081/api/v1/pictures/upload/do-admin';
                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // };
                // this.axios.post(url,fd,config).then(function (response) {
                //     console.log(response);
                // })
                // console.log(fd.get("picture"));

                // let that=this;
                // let api=that.$api.userApi.savePicture;
                let xhr = new XMLHttpRequest();
                // let fileName=this.file.name;
                // let index=fileName.lastIndexOf('.');
                // console.log(index);
                // fileName=fileName.slice(0,index);
                // console.log(fileName);
                // sessionStorage.setItem("name",fileName);
                xhr.open("post", 'http://106.12.123.92:8081/api/v1/pictures/upload/do-admin', true);
                xhr.setRequestHeader('token', cookies.get('token'));
                // console.log(fd.get("picture"));
                xhr.send(fd);
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            // console.log(xhr.responseText);

                            // let url;
                            let arr = xhr.responseText.split('"');
                            let flag = false;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === "成功") {
                                    flag = true;
                                }
                                if(arr[i]==='data'){
                                    // console.log(arr[i+1].substring(2,arr[i+1].length-2));
                                    that.id=parseInt(arr[i+1].substring(1,arr[i+1].length-1));
                                    console.log(that.id);
                                }
                            }
                            if (flag) {
                                that.formVisible=true;
                                that.$notify({
                                    title: '成功',
                                    message: '上传成功',
                                    type: 'success'
                                });
                            } else {
                                that.$notify.error({
                                    title: '失败',
                                    message: '上传失败'
                                });
                            }
                            // if(flag){
                            //     for(let i=0;i<arr.length;i++){
                            //         if(arr[i]==="data"&&arr[i+1]===":"){
                            //             url=arr[i+2];
                            //             break;
                            //         }
                            //     }
                            // }
                            // if(url===undefined){
                            //     that.$notify.error({
                            //         title: '失败',
                            //         message: '图片未上传成功'
                            //     });
                            // }
                            // else{
                            //     api.data={
                            //         href:url,
                            //         // name:fileName,
                            //         defectType: -1,
                            //         defectPosition: -1,
                            //     };
                            //     that.axios(api).then(function (response) {
                            //         console.log(response);
                            //         if(response.data.code===0){
                            //             that.$notify({
                            //                 title: '成功',
                            //                 message: '上传成功',
                            //                 type: 'success'
                            //             });
                            //         }
                            //         else{
                            //             that.$notify.error({
                            //                 title: '失败',
                            //                 message: '上传失败'
                            //             });
                            //         }
                            //     })
                            // }
                            // sessionStorage.setItem("href",url);
                            // console.log(sessionStorage.getItem("href"));
                            // console.log(url);
                            // console.log(fileName);
                            // let that=this;
                            // console.log(url);

                        }
                    }
                };

                // console.log(xhr.responseText);


                // let api=this.$api.userApi.uploadPhoto;
                // api.data={
                //     picture:fd,
                // };
                // api.headers={
                //     "Content-Type": "multipart/form-data"
                // };
                // this.axios(api).then(function (response) {
                //     console.log(response);
                // })
                // this.$refs.upload.submit();
            },
            savePicture() {
                // this.uploadPhoto();

            }
        }
    }
</script>

<style scoped>
    .el-menu-demo {
        position: absolute;
        margin-top: -80.5px;
        margin-left: 50px;
    }

    #ulDiv {
        width: 80%;
        height: 88%;
        position: absolute
    }
    #ulForm{
        top:40%;
        left:50%;
        position: absolute;
        transform: translate(-50%,-50%);
    }
</style>

<template>
    <div style="height: 80%">
        <div style="width: 30%;float: left">
            <el-upload
                    class="upload-demo"
                    action="http://106.12.123.92:8081/api/v1/models/upload/py/do-admin"
                    :on-remove="handleRemove"
                    :before-upload="handleBefore"
                    multiple
                    :on-exceed="handleExceed">
                <i class="el-icon-plus"></i>
                <span>选择文件</span>
                <div slot="tip" class="el-upload__tip" style="margin-top: 20px">只能上传算法文件或压缩包</div>
            </el-upload>
            <el-input v-model="parentModelName" placeholder="母模型" style="width: 200px;margin-top: 20px"></el-input>
            <el-input v-model="deviceName" placeholder="设备名" style="width: 200px;margin-top: 10px"></el-input><br>
            <el-button size="small" type="info" style="margin-top: 20px" @click="preview">查看</el-button>
            <el-button size="small" type="primary" style="margin-top: 20px" v-on:click="saveModel">上传</el-button>
        </div>
        <div class="upCard">
            <el-card shadow="hover" >
                <div slot="header">
                    <span>代码内容</span>
                </div>
                <div>
                    <pre style="overflow: auto;height: 550px;overflow-x: hidden">{{message}}</pre>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import cookies from "vue-cookies";

    export default {
        name: "Upload",
        created(){
            let api=this.$api.userApi.getMachines;
            this.axios(api).then(response=>{
                // console.log(response);
                this.deviceTable=response.data.data.list;
            });
            let url='http://106.12.123.92:8081/api/v1/models';
            this.axios(url).then(response=>{
                // console.log(response);
                this.modelTable=response.data.data.list;
            })
        },
        data() {
            return {
                file: '',
                message: '',
                cardVisible: false,
                parentModelName:'',
                deviceName:'',
                deviceTable:[],
                modelTable:[]
            }
        },
        watch: {
            lmessage(val) {
                alert(val);
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            handleBefore: function (file) {
                // console.log();
                let fileValue = file.name;
                // console.log(fileValue);
                let index = fileValue.lastIndexOf('.');
                const isPy = fileValue.substring(index) === '.py'||fileValue.substring(index) ==='.zip'||fileValue.substring(index) ==='.rar'||fileValue.substring(index) ==='.h5'||fileValue.substring(index) ==='.exe';
                // console.log(index);
                if (isPy) {
                    this.file = file;
                } else {
                    this.$message.error('上传文件只能是 .py 或 .zip 或 .rar 或 .h5 或 .exe 格式!');
                }
                return isPy;
            },
            saveModel: function () {
                let fd = new FormData();
                let api = this.$api.userApi.saveModel;
                fd.append("pyFile", this.file);
                let fileName = this.file.name;
                let index = fileName.lastIndexOf('.');
                fileName = fileName.slice(0, index);
                let xhr = new XMLHttpRequest();
                let that = this;
                let id;
                let model=0;
                for(let i=0;i<this.modelTable.length;i++){
                    if(this.modelTable[i].name===this.parentModelName){
                        model=this.modelTable[i].modelId;
                        break;
                    }
                }
                for(let i=0;i<this.deviceTable.length;i++){
                    if(this.deviceTable[i].name===this.deviceName){
                        id=this.deviceTable[i].deviceId;
                        break;
                    }
                }
                xhr.open("post", 'http://106.12.123.92:8081/api/v1/models/upload/py/do-admin', true);
                xhr.setRequestHeader('token', cookies.get('token'));
                xhr.send(fd);
                xhr.onload = function () {
                    if (xhr.readyState === xhr.DONE) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            let py;
                            let arr = xhr.responseText.split('"');
                            let flag = false;
                            for (let i = 0; i < arr.length; i++) {
                                if (arr[i] === "成功") flag = true;
                            }
                            if (flag) {
                                for (let i = 0; i < arr.length; i++) {
                                    if (arr[i] === "data" && arr[i + 1] === ":") {
                                        py = arr[i + 2];
                                        break;
                                    }
                                }
                            }
                            api.data = {
                                pyUrl: py,
                                name: fileName,
                                parentModel: model,
                                deviceId:id
                            };
                            that.axios(api).then(function (response) {
                                if (response.data.code === 0) {
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
                            })
                        }
                    }
                }
            },
            preview() {
                this.cardVisible = true;
                let f = this.file;
                let that = this;
                let m;
                let r = new FileReader();
                r.readAsText(f, "UTF-8");
                r.onload = function () {
                    that.message = this.result;
                    //document.getElementById('msg').innerText = that.message;
                };
                // that.message = m;
                // console.log(that.message);
            }
        }
    }
</script>

<style scoped>
    .upCard {
        width: 60%;
        height: 80%;
        float: left;
    }
</style>

<template>
    <div id="1" style="height: 80%">
        <div id="2" style="width: 30%;float: left">
            <el-select v-model="value" placeholder="请选择" multiple clearable filterable @change="showInfo">
                <el-option
                        v-for="item in options"
                        :key="item.modelId"
                        :label="item.name"
                        :value="item.modelId">
                </el-option>
            </el-select>
            <div style="margin-top: 30px">
                <el-button size="small" type="info" @click="preview">查看</el-button>
                <el-button size="small" type="primary" v-on:click="downloadModel">下载</el-button>
            </div>
            <el-card shadow="hover" style="margin-top: 100px;width: 80%">
                <div slot="header">
                    <span>模型信息</span>
                </div>
                <span>母模型：{{parentModel}}</span><br><br>
                <span>修改设备：{{deviceName}}</span>
            </el-card>
        </div>

        <!--<div id="2" class="upCard">-->
        <el-card style="position: relative;margin-left: -20%;width: 60%" shadow="hover">
            <div slot="header">
                <span>代码内容</span>
            </div>
            <pre id="div1" style="overflow: auto;height: 550px;overflow-x: hidden">{{message}}</pre>
        </el-card>
        <!--</div>-->
        <!--<div id="1" style="width: 23%;position: absolute;height: 40%;float: left"></div>-->
        <!--<a href="http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN">下载图片</a>-->
    </div>
</template>

<script>
    export default {
        name: "DownloadPy",
        created() {
            let url = 'http://106.12.123.92:8081/api/v1/models/all';
            let that = this;
            this.axios(url).then(function (response) {
                console.log(response);
                if (response.data.code === 0) {
                    that.options = response.data.data;
                    that.modelTable=response.data.data;
                    // console.log(that.modelTable);
                    // console.log(that.options);
                }
            });
            let api=this.$api.userApi.getMachines;
            this.axios(api).then(response=>{
                this.deviceTable=response.data.data.list;
                // console.log(this.deviceTable);
            })
        },
        data() {
            return {
                options: [],
                value: '',
                message: '',
                file: '',
                parentModel: '',
                deviceName: '',
                modelTable:[],
                deviceTable:[]
            }
        },
        methods: {
            showInfo(){
                // console.log('111');
                // console.log(this.value[0]);
                let deviceId;
                for(let i=0;i<this.modelTable.length;i++){
                    if(this.modelTable[i].modelId===this.value[0]){
                        if(this.modelTable[i].parentModel===0){
                            this.parentModel='无';
                        }else{
                            this.parentModel=this.modelTable[i].parentModel;
                        }
                        deviceId=this.modelTable[i].deviceId;
                        // console.log(deviceId);
                        break;
                    }
                }
                for(let i=0;i<this.deviceTable.length;i++){
                    if(this.deviceTable[i].deviceId===deviceId){
                        this.deviceName=this.deviceTable[i].name;
                        break;
                    }
                }
            },
            downloadModel() {
                let url;
                for (let i = 0; i < this.options.length; i++) {
                    // console.log(i);
                    if (this.options[i].modelId === this.value) {
                        url = this.options[i].pyUrl;
                    }
                }
                window.location.href = 'http://106.12.123.92:5555' + url;
                // this.axios({
                //     // url:'http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN',
                // }).then(()=>{
                //     window.location.href='http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN'
                // })
            },
            preview() {
                // this.cardVisible = true;
                let url;
                for (let i = 0; i < this.options.length; i++) {
                    // console.log(i);
                    // console.log(this.value[0]);
                    if (this.options[i].modelId === this.value[0]) {
                        url = this.options[i].pyUrl;
                    }
                }
                // console.log(url);

                document.getElementById('div1').innerHTML = '读取中...';
                $(document).ready(function () {
                    $("#div1").load('http://106.12.123.92:5555'+url);
                });
                // $(document).ready(function(){
                //     $.ajax({async: true, url:'http://bigdata1:50070'+url,success:function(result){
                //             $("#div1").html(result);
                //         }});
                // });
                // // let f = this.file;
                // let that = this;
                // let m;
                // let r = new FileReader();
                // r.readAsText(f, "UTF-8");
                // r.onload = function () {
                //     that.message = this.result;
                //     //document.getElementById('msg').innerText = that.message;
                // };
                // that.message = m;
                // console.log(that.message);
            }
        }
    }
</script>

<style scoped>
    .upCard {
        width: 60%;
        height: 100%;
        float: left;
    }
</style>

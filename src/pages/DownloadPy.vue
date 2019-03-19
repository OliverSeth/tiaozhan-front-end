<template>
    <div style="height: 80%">
        <div style="width: 30%;float: left">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.modelId"
                        :label="item.name"
                        :value="item.modelId">
                </el-option>
            </el-select>
            <div style="margin-top: 50px">
                <el-button size="small" type="info" @click="preview">查看</el-button>
                <el-button size="small" type="primary" v-on:click="downloadModel">下载</el-button>
            </div>
        </div>
        <div class="upCard">
            <el-card>
                <div slot="header">
                    <span>代码内容</span>
                </div>
                <div><pre id="div1">{{message}}</pre></div>
            </el-card>
        </div>
        <!--<a href="http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN">下载图片</a>-->
    </div>
</template>

<script>
    export default {
        name: "DownloadPy",
        mounted(){
            let url='http://106.12.123.92:8081/api/v1/models';
            let that=this;
            this.axios(url).then(function (response) {
                // console.log(response);
                if(response.data.code===0){
                    that.options=response.data.data.list;
                    // console.log(that.options);
                }
            })
        },
        data(){
            return{
                options:[],
                value:'',
                message:'',
                file:''
            }
        },
        methods:{
            downloadModel:function () {
                let url;
                for(let i=0;i<this.options.length;i++){
                    // console.log(i);
                    if(this.options[i].modelId===this.value){
                        url=this.options[i].pyUrl;
                    }
                }
                window.location.href='http://106.12.123.92:5555'+url;
                // this.axios({
                //     // url:'http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN',
                // }).then(()=>{
                //     window.location.href='http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN'
                // })
            },
            preview() {
                // this.cardVisible = true;
                let url;
                for(let i=0;i<this.options.length;i++){
                    // console.log(i);
                    if(this.options[i].modelId===this.value){
                        url=this.options[i].pyUrl;
                    }
                }

                document.getElementById('div1').innerHTML = '读取中...';
                $(document).ready(function(){
                    $("#div1").load('http://106.12.123.92:5555/webhdfs/v1/upload/model-py/19-03/16/1d819852-5578-4c07-bf5d-0465218903b0-test.py?op=OPEN');
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
        height: 80%;
        float: left;
    }
</style>

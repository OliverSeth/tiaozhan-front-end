<template>
    <div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.modelId"
                    :label="item.name"
                    :value="item.modelId">
            </el-option>
        </el-select>
        <div style="margin-top: 20px">
            <el-button size="small" type="info" @click="preview">查看</el-button>
            <el-button size="small" type="primary" v-on:click="downloadModel">下载</el-button>
        </div>
        <div class="upCard">
            <el-card>
                <div slot="header">
                    <span>代码内容</span>
                </div>
                <div><pre>{{message}}</pre></div>
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
            }
        },
        methods:{
            preview(){},
            downloadModel:function () {
                let url;
                for(let i=0;i<this.options.length;i++){
                    console.log(i);
                    if(this.options[i].modelId===this.value){
                        url=this.options[i].pyUrl;
                    }
                }
                window.location.href='http://bigdata1:50070'+url;
                // this.axios({
                //     // url:'http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN',
                // }).then(()=>{
                //     window.location.href='http://bigdata1:50070/webhdfs/v1/upload/model-py/19-02/23/bb83d19c-2696-4884-baa0-2de7dc99d1ea-1.py?op=OPEN'
                // })
            }
        }
    }
</script>

<style scoped>

</style>

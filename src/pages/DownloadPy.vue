<template>
    <div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <div style="margin-top: 20px">
            <el-button size="small" type="info" style="margin-top: 20px" @click="preview">查看</el-button>
            <el-button size="small" type="primary" style="margin-top: 20px" v-on:click="downloadModel">下载</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DownloadPy",
        data(){
            return{
                options:[],
            }
        },
        methods:{
            downloadModel:function () {
                
            }
        }
    }
</script>

<style scoped>

</style>

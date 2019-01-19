<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <div style="margin-top: -80px">
            <el-button type="primary">
                训练新模型
            </el-button>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked1" style="position: relative;float: right" @change="setBorder(0)"></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left; margin-left: 1%;margin-top: 1%"
             :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div style="height: 32%;width: 32%"></div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;background-size: 100% 100%;margin-left: 1%;margin-top: 1%"
             :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div  name="img_div" style="width: 30%;height: 30%; display: block; float: left;background-size: 100% 100%;margin-left: 1%;margin-top: 1%"
             :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">
            <el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>
        </div>

    </div>
</template>

<script>
    export default {
        name: "DefectDistribution",
        methods: {
            // setBorder(index) {
            //     let divs = document.getElementsByName('img_div');
            //     if (this.checked1 === true)
            //         divs[index].style.border = '1px solid blue';
            //     else divs[index].style.border = 'none';
            // }
        },
        data(){
            return{
                // checked1: false,
                bg1:{
                    background:'url('+require('../assets/1.jpg')+')',
                    backgroundRepeat:"no-repeat"
                }
            }
        },
        mounted() {
            let divs = document.getElementsByName('img_div');
            for (let index in divs) {
                divs[index].style.backgroundSize = '100% 100%';
            }
        }
    }
</script>

<style scoped>

</style>
<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <!--<div style="margin-top: -75px">-->
        <!--<el-button type="primary">-->
        <!--训练新模型-->
        <!--</el-button>-->
        <!--</div>-->

        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"
             :style="bg1">
            <span style="position:relative;top:60%;left: 31%">疵点位置：</span>
            <span style="position:relative;top: 75%;left: 8%">疵点种类：</span>
            <span style="position:relative;top: 90%;left: -15%">检测时间：</span>
            <el-checkbox v-model="checked1" style="position: relative;float: right"
                         @change="setBorder(0)"></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left; margin-left: 1%;margin-top: 1%"
             :style="bg2">
            <span style="position:relative;top:60%;left: 31%">疵点位置：</span>
            <span style="position:relative;top: 75%;left: 8%">疵点种类：</span>
            <span style="position:relative;top: 90%;left: -15%">检测时间：</span>
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"
             :style="bg3">
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <div style="height: 32%;width: 32%"></div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"
             :style="bg4">
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <div name="img_div"
             style="width: 30%;height: 30%; display: block; float: left;background-size: 100% 100%;margin-left: 1%;margin-top: 1%"
             :style="bg5">
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"
             :style="bg6">
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"
             :style="bg7">
            <el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>
        </div>
        <el-button type="primary" id="send">111</el-button>
        <!--<div  name="img_div" style="width: 30%;height: 30%; display: block; float: left;background-size: 100% 100%;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg1">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%" :style="bg1">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right" ></el-checkbox>-->
        <!--</div>-->

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
        data() {
            return {
                // checked1: false,
                bg1: {
                    background: 'url(' + require('../assets/1.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg2: {
                    background: 'url(' + require('../assets/2.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg3: {
                    background: 'url(' + require('../assets/3.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg4: {
                    background: 'url(' + require('../assets/4.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg5: {
                    background: 'url(' + require('../assets/5.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg6: {
                    background: 'url(' + require('../assets/6.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                bg7: {
                    background: 'url(' + require('../assets/7.jpg') + ')',
                    backgroundRepeat: "no-repeat"
                },
                checked1:'',
                checked:''
            }
        },
        mounted() {
            let divs = document.getElementsByName('img_div');
            for (let index in divs) {
                divs[index].style.backgroundSize = '100% 100%';
            }
            // // socket连接建立
            // let socket = new WebSocket('ws://kufs5n.natappfree.cc?1');
            // // socket方法绑定
            // {
            //     socket.onmessage = res => {
            //         console.log(res.data);
            //     };
            //
            //     socket.onopen = () => {
            //         console.log('连接成功');
            //     };
            //
            //     socket.onclose = () => {
            //         console.log('连接中断');
            //     };
            //
            //     socket.onerror = () => {
            //         console.log('连接失败，请刷新重试');
            //     }
            // }
            // document.getElementById('send').addEventListener("click", () => {
            //     socket.send('cao ni ma');
            // })
        }
    }
</script>

<style scoped>

</style>

<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <div id="msg" style="width: 100%;height: 100%;position:absolute">
            <img v-for="pictures in picArr" :src="pictures" alt="no" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%">
            <!--<el-card :body-style="{padding:'0px'}">-->
                <!--<img src=pictures.toString() alt="no picture" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%">-->
            <!--<img src="pictures.toString()" alt="no picture" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%">-->
            <!--<img :src="pictures" alt="no picture" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%">-->
            <!--<img :src="pictures" alt="no picture" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%">-->
            <!--</el-card>-->

            <!--<div id="imgs" name="img_div"-->
                 <!--style="width: 30%;height: 30%; display: block;margin-left: 3%;margin-top: 1%"-->
                 <!--:style="{background: 'url('     + pictures + ')', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}">-->
                <!--&lt;!&ndash;<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>&ndash;&gt;-->
            <!--</div>-->
        </div>

        <!--<div style="margin-top: -75px">-->
        <!--<el-button type="primary">-->
        <!--训练新模型-->
        <!--</el-button>-->
        <!--</div>-->

        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg1">-->
        <!--<span style="position:relative;top:60%;left: 31%">疵点位置：</span>-->
        <!--<span style="position:relative;top: 75%;left: 8%">疵点种类：</span>-->
        <!--<span style="position:relative;top: 90%;left: -15%">检测时间：</span>-->
        <!--<el-checkbox v-model="checked1" style="position: relative;float: right"-->
        <!--@change="setBorder(0)"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left; margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg2">-->
        <!--<span style="position:relative;top:60%;left: 31%">疵点位置：</span>-->
        <!--<span style="position:relative;top: 75%;left: 8%">疵点种类：</span>-->
        <!--<span style="position:relative;top: 90%;left: -15%">检测时间：</span>-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg3">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div style="height: 32%;width: 32%"></div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg4">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div"-->
        <!--style="width: 30%;height: 30%; display: block; float: left;background-size: 100% 100%;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg5">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg6">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="bg7">-->
        <!--<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>-->
        <!--</div>-->
        <!--<div name="img_div" style="width: 30%;height: 30%; display: block; float: left;margin-left: 1%;margin-top: 1%"-->
        <!--:style="{background: 'url(' + this.pictures + ')', backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}">-->
        <!--&lt;!&ndash;<el-checkbox v-model="checked" style="position: relative;float: right"></el-checkbox>&ndash;&gt;-->
        <!--</div>-->
        <!--<el-button type="primary" id="send"></el-button>-->
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
            parseSegment(seg) {
                let part = seg.split("@");
                let head = part[0].split(",");
                let pos = parseInt(head[1]) - 1;
                let len = parseInt(head[2]);
                //console.log(head);
                //console.log(this.segcnt[head[0]]);
                if (head[0] in this.segs) {
                    this.segs[head[0]][pos] = part[1];
                    this.segcnt[head[0]]++;
                } else {
                    this.segs[head[0]] = new Array(len);
                    this.segs[head[0]][pos] = part[1];
                    this.segcnt[head[0]] = 1;
                }
                if (this.segcnt[head[0]] === len) {
                    let imgdata = this.segs[head[0]][0];
                    for (let i = 1; i < len; i++) imgdata += this.segs[head[0]][i];
                    console.log(head[0]);
                    // try{
                    //     document.getElementById("msg").append('<p><img src="' + imgdata + '"/></p>');
                    // }catch(e){
                    //     console.log(e.toString());
                    // }
                    //$('#msg').append('<p><img src="' + imgdata + '"/></p>');
                    // let newImg=document.createElement("img");
                    // newImg.src=imgdata;
                    // document.getElementById("msg").appendChild(newImg);
                    this.picArr.push(imgdata);
                    console.log(this.picArr);
                }
            },
            // setBorder(index) {
            //     let divs = document.getElementsByName('img_div');
            //     if (this.checked1 === true)
            //         divs[index].style.border = '1px solid blue';
            //     else divs[index].style.border = 'none';
            // }
            setBgSize() {
                try {
                    let divs = document.getElementsByName('img_div');
                    for (let index in divs) {
                        divs[index].style.backgroundSize = '100% 100%';
                    }
                } catch (e) {
                    console.log(e.toString());
                }
            }
        },
        data() {
            return {
                segs: {},
                segcnt: {},
                plcState: "",
                pictures: "",
                picArr: [],
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
                checked1: false,
                checked: false
            }
        }
        ,
        mounted() {
            console.log(this.picArr);
            this.setBgSize();
            let cnt = -1;
            let segs = "";
            // socket连接建立
            let socket = new WebSocket('ws://106.12.123.92:5929');
            // socket方法绑定
            {
                socket.onmessage = res => {
                    this.parseSegment(res.data);
                    // console.log(this.picArr);
                    // console.log(res);
                    // if (cnt >= 0) {
                    //     if (res.data.length <= 20) {
                    //         //console.log("2" + res.data);
                    //         if (res.data === "start picture")
                    //             cnt = 0;
                    //         else if (res.data === "end picture")
                    //             cnt = -1;
                    //         else if (res.data.substr(0, 5) === "state")
                    //             this.plcState = res.data.substr(6, res.data.length - 6);
                    //         else {
                    //             segs += res.data;
                    //             cnt++;
                    //         }
                    //     } else {
                    //         segs += res.data;
                    //         cnt++;
                    //     }
                    //     if (cnt === -1) {
                    //         this.pictures = segs;
                    //         this.picArr.push(this.pictures);
                    //         //console.log("3");
                    //         for (let i = 0; i < this.picArr.length; i++)
                    //             console.log(this.picArr[i]);
                    //         segs = "";
                    //     }
                    // } else {
                    //     if (res.data === "start picture") {
                    //         cnt = 0;
                    //         //console.log("1" + res.data);
                    //     }
                    // }
                };

                socket.onopen = () => {
                    console.log('连接成功');
                };

                socket.onclose = () => {
                    console.log('连接中断');
                };

                socket.onerror = () => {
                    console.log('连接失败，请刷新重试');
                }
            }
            // document.getElementById('send').addEventListener("click", () => {
            //     socket.send('cao ni ma');
            // })
        }
    }
</script>

<style scoped>

</style>

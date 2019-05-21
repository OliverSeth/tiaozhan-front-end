<template>
    <div style="width: 84%;height: 88%;position: absolute">
        <!--<div style="position:absolute;margin-top: -60px">{{msg1}}</div>-->
        <div id="msg" style="float:left;width: 65%;height: 100%;">
            <!--<div v-for="(pictures,index) in picArr"-->
                 <!--style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                <!--<img :src="pictures" style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                <!--<span>{{infoArr[index]}}</span>-->
            <!--</div>-->
             <div v-for="(pictures,index) in picArr"
             style="float:left;width: 12%;height: 12%;margin-left:0.1%;margin-top: 0%;margin-bottom: 0%">

                 <div style="position:relative;">
                     　　<img :src="pictures" style="float:left;width: 100%;height: 100%;margin-top: 1%;"/>
                     　　<div style="position:absolute;color:black; z-index:2; left:10px;">{{infoArr[index]}}</div>
                 </div>
                 <!--<img :src="pictures" style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                 <!--<span>{{infoArr[index]}}</span>-->
             </div>
            <!--<img v-for="(pictures,index) in picArr" :src="pictures" alt="no" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
            <!--<span>疵点类型：{{infoArr[index]}}</span>-->
        </div>
        <!--<el-aside>-->
            <div id="info" style="width: 30%;height: 100%;position: fixed;right: 0">
                <div style="width: 100%;height: 100%;position: absolute">
                    <img src="../assets/device.jpg" style="width: 100%;height: 30%;position: absolute">
                </div>
                <div id="word" style="width: 80%;height: 70%;position: absolute;bottom: 0" >
                    <!--<el-row>-->
                        <el-col span="24">
                            <br><el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 24px" >PLC状态：{{plc}}</span></el-row><br>
                            <el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 24px">工控机状态：{{state}}</span></el-row><br>
                            <el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 24px">转向：{{turn}}</span></el-row><br>
                            <el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 24px">转速：{{speed}}</span></el-row><br>
                            <el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 24px">光源：{{light}}</span></el-row><br>
                            <el-row :gutter="20" style="margin-left: 20px"><span style="font-size: 42px;color: red;font-weight: bold">{{alarm}}</span></el-row>
                        </el-col>
                    <!--</el-row>-->
                    <br>
                </div>
            </div>
        <!--</el-aside>-->

    </div>
</template>

<script>

    export default {
        name: "DefectDistribution",
        props: {
            // isable: {
            //     type: Boolean,
            //     default: function () {
            //         return false;
            //     }
            // },
            checked1: {
                type: Boolean,
                default: function () {
                    return this.plc;
                }
            },
            checked2: {
                type: Boolean,
                default: function () {
                    return this.state;
                }
            },
            checked3: {
                type: Boolean,
                default: function () {
                    return this.turn;
                }
            },
            checked4: {
                type: Boolean,
                default: function () {
                    return this.speed;
                }
            },
            checked5: {
                type: Boolean,
                default: function () {
                    return this.light;
                }
            }
        },
        methods: {
            Switch () {
                this.$emit('switch', event.target.checked);
            },


            parseSegment(seg) {
                // console.log(this.picArr);
                // console.log(this.infoArr);
                // console.log(this.infoArr[this.index]);
                //console.log(seg);
                let part = seg.split("@");
                if (part.length === 1) {
                    console.log(part[0]);
                    if (part[0] === 'test_connection') {
                        console.log('连接成功！');
                    } else {
                        let msg = part[0].split(':');
                        if (msg[0] === 'PlcWorkState') {
                            let info = msg[1].split(',');
                            if (info[4] === '1') {
                                this.alarm = '报警';
                            } else if (info[4] === '0') {
                                this.alarm = '';
                            }
                            if (info[0] === '0') {
                                this.plc = '未连接';
                            } else if (info[0] === '1') {
                                this.plc = '已连接';
                                if (info[1] === '-1') {
                                    this.state = '未启动';
                                } else {
                                    this.state = '已启动';
                                    if (info[2] === '0') {
                                        this.light = '关';
                                    } else if (info[2] === '1') {
                                        this.light = '开';
                                    }
                                    if (info[1] === '1') {
                                        this.turn = '正转';
                                        if (info[3] === '0') {
                                            this.speed = '低速';
                                        } else if (info[3] === '1') {
                                            this.speed = '高速';
                                        }
                                        if (info[4] === '1') {
                                            this.alarm = '报警';
                                        } else if (info[4] === '0') {
                                            this.alarm = '';
                                        }
                                    } else if (info[1] === '2') {
                                        this.turn = '反转';
                                        if (info[3] === '0') {
                                            this.speed = '低速';
                                        } else if (info[3] === '1') {
                                            this.speed = '高速';
                                        }
                                        if (info[4] === '1') {
                                            this.alarm = '报警';
                                        } else if (info[4] === '0') {
                                            this.alarm = '';
                                        }
                                    }
                                }
                            }
                            console.log(msg[1]);
                            // console.log(this.plc);
                        } else {
                            // this.plc = '没有PLC状态';
                            // this.turn = '无';
                            // this.speed = 0;
                            // this.light = '关';
                            // this.alarm = '';
                            console.log('没有PLC状态');
                        }
                    }
                    return;
                }
                let head = part[0].split(",");
                let pos = parseInt(head[1]) - 1;
                let len = parseInt(head[2]);
                //console.log(head);
                //console.log(this.segcnt[head[0]]);
                if (head[1] === '0') {
                    console.log(part[1]);
                    // switch (part[1]) {
                    //     case 'heng':
                    //         this.infoArr.push('横疵点');
                    //         break;
                    //     case 'zong':
                    //         this.infoArr.push('纵疵点');
                    //         break;
                    //     case 'dong':
                    //         this.infoArr.push('破洞疵点');
                    //         break;
                    //     case 'none':
                    //         this.infoArr.push('无');
                    //         break;
                    //     default:
                    //         this.infoArr.push('');
                    //         break;
                    // }
                    // this.infoArr.push(part[1]);
                    return;
                }
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
                    // console.log(this.picArr);
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
                value4: '',
                plc: '未连接',
                state: '未启动',
                turn: '无',
                speed: '无',
                light: '关',
                alarm: '',
                msg1: 'PLC未连接',
                segs: {},
                segcnt: {},
                plcState: "",
                pictures: "",
                picArr: [],
                infoArr: [],
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
            let socket = new WebSocket('ws://10.199.172.62:5929');
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






<style>
    .wt-switch .label-switch {

        display: inline-block;

        vertical-align: middle;

        width: 3.1rem;/* 整个控件的大小*/

        border-radius: 0.8rem;

        box-sizing: border-box;

        height: 2.1rem;

        position: relative;

        cursor: pointer;

        -ms-flex-item-align: center;

        -webkit-align-self: center;

        align-self: center}

    /*input[type="checkbox"] {*/

        /*display: none;*/

    /*}*/

    /*input[type="checkbox"]:checked + .checkbox {*/

        /*background: #4cd964;*/

    /*}*/

    /*input[type="checkbox"]:checked + .checkbox:after {*/

        /*transform: translateX(1.1rem);*/

    /*}*/

    .checkbox {/* 容器的大小*/

        width: 3.1rem;

        border-radius: 0.8rem;

        box-sizing: border-box;

        height: 1.8rem;

        background: #e5e5e5;

        z-index: 0;

        margin: 0;

        padding: 0;

        -webkit-appearance: none;

        -moz-appearance: none;

        -ms-appearance: none;

        appearance: none;

        border: none;

        cursor: pointer;

        position: relative;

        -webkit-transition-duration: 300ms;

        transition-duration: 300ms}

    .checkbox:before {

         content: ' ';

         position: absolute;

         left: 0.1rem;

         top: 0.1rem;

         width:3.3rem;

         border-radius: 0.8rem;

         box-sizing: border-box;

         height: 2.1rem;

         z-index: 1;

         -webkit-transition-duration: 300ms;

         transition-duration: 300ms;

         -webkit-transform: scale(1);

         transform: scale(1);

     }

    .checkbox:after {

         content: ' ';
        /* 球的大小*/

         height: 1.6rem;

         width: 1.6rem;

         border-radius: 1.4rem;

         background: #fff;

         position: absolute;

         z-index: 2;

         top: 0.1rem;

         left: 0.1rem;

         box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

         -webkit-transform: translateX(0px);

         transform: translateX(0px);

         -webkit-transition-duration: 300ms;

         transition-duration: 300ms;

     }





    /*.el-switch__core {*/
        /*height: 1px;*/
    /*}*/
    /*.switchStyle{*/
        /*width: 100px;*/

    /*}*/
    /*.switchStyle .el-switch__label {*/
        /*position: absolute;*/
        /*display: none;*/
        /*color: #ff8ba7;*/
    /*}*/
    /*.switchStyle .el-switch__label--left {*/
        /*z-index: 9;*/
        /*left: 111px;*/
    /*}*/
    /*.switchStyle .el-switch__label--right {*/
        /*z-index: 24;*/
        /*left: -24px;*/
    /*}*/
    /*.switchStyle .el-switch__label--top {*/
        /*z-index: 24;*/
        /*top: -111px;*/
    /*}*/
    /*.switchStyle .el-switch__label.is-active {*/
        /*display: block;*/
    /*}*/
    /*.switchStyle.el-switch .el-switch__core,*/
    /*.el-switch .el-switch__label {*/
        /*width: 100px !important;*/
    /*}*/
    /*.el-switch__label {*/
        /*position: absolute;*/
        /*display: none;*/
        /*color: #ff38cb;*/
    /*}*/
    /*!*打开时文字位置设置*!*/
    /*.demo .el-switch__label--right {*/
        /*z-index: 1;*/
        /*right: -3px;*/
    /*}*/
    /*!*关闭时文字位置设置*!*/
    /*.demo .el-switch__label--left {*/
        /*z-index: 1;*/
        /*left: 19px;*/
    /*}*/
    /*!*显示文字*!*/
    /*.demo .el-switch__label.is-active {*/
        /*display: block;*/
    /*}*/
    /*.demo.el-switch .el-switch__core,*/
    /*.el-switch .el-switch__label {*/
        /*width: 50px !important;*/
    /*}*/

</style>

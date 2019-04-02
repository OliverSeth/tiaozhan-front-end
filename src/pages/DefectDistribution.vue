<template>
    <div style="width: 84%;height: 88%;position: absolute">
        <!--<div style="position:absolute;margin-top: -60px">{{msg1}}</div>-->
        <div id="msg" style="float:left;width: 74%;height: 100%;">
            <!--<div v-for="(pictures,index) in picArr"-->
                 <!--style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                <!--<img :src="pictures" style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                <!--<span>{{infoArr[index]}}</span>-->
            <!--</div>-->
             <div v-for="(pictures,index) in picArr"
             style="float:left;width: 30%;height: 25%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">

                 <div style="position:relative;">
                     　　<img :src="pictures" style="float:left;width: 100%;height: 100%;margin-top: 1%;" />
                     　　<div style="position:absolute; z-index:2; left:10px;">{{infoArr[index]}}</div>
                 </div>
                 <!--<img :src="pictures" style="float:left;width: 50%;height: 50%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
                 <!--<span>{{infoArr[index]}}</span>-->
             </div>
            <!--<img v-for="(pictures,index) in picArr" :src="pictures" alt="no" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">-->
            <!--<span>疵点类型：{{infoArr[index]}}</span>-->
        </div>
        <div id="info" style="width: 30%;height: 100%;position: absolute;right: 0">
            <div style="width: 100%;height: 100%;position: absolute">
                <img src="../assets/device.jpg" style="width: 100%;height: 30%;position: absolute">
            </div>
            <div id="word" style="width: 100%;height: 70%;position: absolute;bottom: 0">
                <el-row>
                    <el-col span="12">
                        <el-row :gutter="20"><span style="font-size: 24px">PLC状态：</span></el-row>
                        <el-row :gutter="20"><span style="font-size: 24px">工控机状态：</span></el-row>
                        <el-row :gutter="20"><span style="font-size: 24px">转向：</span></el-row>
                        <el-row :gutter="20"><span style="font-size: 24px">转速：</span></el-row>
                        <el-row :gutter="20"><span style="font-size: 24px">光源：</span></el-row>
                        <el-row :gutter="20"><span style="font-size: 30px;color: red;font-weight: bold"></span></el-row>
                    </el-col>
                    <el-col span="12">
                        <el-row :gutter="20">
                            <el-switch
                                    disabled
                                    style="display: block;font-size: 24px"
                                    v-model="plc"
                                    active-value="已连接"
                                    inactive-value="未连接"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    active-text="已连接"
                                    inactive-text="未连接">
                            </el-switch>
                        </el-row>
                        <el-row :gutter="20"></el-row>
                        <el-row :gutter="20"></el-row>
                        <el-row :gutter="20"></el-row>
                        <el-row :gutter="20"></el-row>
                    </el-col>
                </el-row>
                <br>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "DefectDistribution",
        methods: {
            parseSegment(seg) {
                console.log(this.picArr);
                console.log(this.infoArr);
                console.log(this.infoArr[this.index]);
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
                                    if (info[1] === '1') {
                                        this.turn = '正转';
                                        if (info[2] === '0') {
                                            this.light = '关';
                                        } else if (info[2] === '1') {
                                            this.light = '开';
                                        }
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
                                        if (info[2] === '0') {
                                            this.light = '关';
                                        } else if (info[2] === '1') {
                                            this.light = '开';
                                        }
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
                            this.plc = '没有PLC状态';
                            this.turn = '无';
                            this.speed = 0;
                            this.light = '关';
                            this.alarm = '';
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
                    switch (part[1]) {
                        case 'heng':
                            this.infoArr.push('横疵点');
                            break;
                        case 'zong':
                            this.infoArr.push('纵疵点');
                            break;
                        case 'dong':
                            this.infoArr.push('破洞疵点');
                            break;
                        case 'none':
                            this.infoArr.push('无');
                            break;
                        default:
                            this.infoArr.push('无');
                            break;
                    }
                    this.infoArr.push(part[1]);
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
                speed: 0,
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

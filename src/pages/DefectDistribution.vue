<template>
    <div style="width: 80%;height: 88%;position: absolute">
        <!--<div style="position:absolute;margin-top: -60px">{{msg1}}</div>-->
        <div id="msg" style="width: 70%;height: 100%;position:absolute">
            <!--<div :style="bg">-->
            <!--</div>-->
            <img v-for="pictures in picArr" :src="pictures" alt="no" style="float:left;width: 30%;height: 30%;margin-left: 1%;margin-top: 1%;margin-bottom: 1%">
            <!--<span>疵点类型：</span>-->
        </div>
        <div id="info" style="width: 30%;height: 100%;position: absolute;right: 0">
            <div style="width: 100%;height: 100%;position: absolute">
                <img src="../assets/device.jpg" style="width: 100%;height: 30%;position: absolute">
            </div>
            <div id="word" style="width: 100%;height: 70%;position: absolute;bottom: 0">
                <br><p><span style="font-size: 24px">PLC状态：{{plc}}</span></p><br>
                <p><span style="font-size: 24px">转向：{{turn}}</span></p><br>
                <p><span style="font-size: 24px">转速：{{speed}}</span></p><br>
                <p><span style="font-size: 24px">光源：{{light}}</span></p><br>
                <p><span style="font-size: 30px;color: red;font-weight: bold">{{alarm}}</span></p><br>
            </div>
        </div>
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
                if(part.length===1){
                    console.log(head[0]);
                    if(head[0]==='test_connection'){
                        console.log('连接成功！');
                    }else{
                        let msg=head[0].split(':');
                        if(msg[0]==='PlcWorkState'){
                            if(msg[1]==='Stop'){
                                this.plc='未启动';
                            }else if(msg[1]==='Waiting'){
                                this.plc='等待运行';
                            }else if(msg[1]==='Rotating'){
                                this.plc='运行中';
                                this.turn='正转';
                            }else if(msg[1]==='Reversing'){
                                this.plc='运行中';
                                this.turn='反转';
                            }else if(msg[1]==='Disconnected'){
                                this.plc='未连接';
                                this.turn='无';
                                this.speed=0;
                                this.light='关';
                                this.alarm='';
                            }else{
                                this.plc='未知状态';
                                this.turn='无';
                                this.speed=0;
                                this.light='关';
                                this.alarm='';
                            }
                            console.log(msg[1]);
                            // console.log(this.plc);
                        }else{
                            this.plc='没有PLC状态';
                            this.turn='无';
                            this.speed=0;
                            this.light='关';
                            this.alarm='';
                            console.log('没有PLC状态');
                        }
                    }
                    return;
                }
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
                plc:'未连接',
                turn:'无',
                speed:0,
                light:'关',
                alarm:'',
                msg1:'PLC未连接',
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

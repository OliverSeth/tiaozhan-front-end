<template>
    <div style="width: 80%;height:60%;position: absolute"  :data="photoTable" >

        <div style="width: 10%;height:20%;float: left" >
            <p class="optionmenu" ><el-tag>检测设备</el-tag></p>
            <el-select v-model=" value9" clearable placeholder="请选择">
                <el-option
                        v-for="item in deviceTable"
                        :key="item.value"
                        :label="item.deviceId"
                        :value="item.deviceId">
                </el-option>
            </el-select>
        </div>
        <div style="width: 30%;height:20%;float: left">
            <p class="optionmenu" ><el-tag>检测时间</el-tag></p>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>


        </div>
        <div style="width: 15%;height:20%;float: left" >
            <p class="optionmenu" ><el-tag>检测模型</el-tag></p>
            <el-select v-model=" value10" clearable placeholder="请选择">
                <el-option
                        v-for="item in modelTable"
                        :key="item.value"
                        :label="item.modelId"
                        :value="item.modelId">
                </el-option>
            </el-select>
        </div>
        <div style="width: 25%;height:20%;float: left;">
            <p class="optionmenu" > <el-tag>疵点类型</el-tag></p>
            <el-checkbox-group v-model="checkList">
                <!--<el-checkbox label="横疵" v-model="checked1"></el-checkbox>-->
                <!--<el-checkbox label="纵疵" v-model="checked2"></el-checkbox>-->
                <!--<el-checkbox label="横纵疵" v-model="checked3"></el-checkbox>-->
                <!--<el-checkbox label="无" v-model="checked0"></el-checkbox>-->
                <el-checkbox label="横"></el-checkbox>
                <el-checkbox label="纵"></el-checkbox>
                <el-checkbox label="破洞"></el-checkbox>
                <el-checkbox label="无"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div style="width: 15%;height:20%;float: left;">
            <p class="optionmenu" > <el-tag>检测类型</el-tag></p>
            <el-checkbox-group v-model="checkList2">
                <el-checkbox label="人工"></el-checkbox>
                <el-checkbox label="机器"></el-checkbox>

            </el-checkbox-group>
        </div>
        <div style="width: 30%;height:20%;float: left;" >
            <el-row>
                <!--<el-badge :value="total" :max="99" class="item">-->

                <div v-if="downButton">

                    <el-button type="primary" icon="el-icon-search" @click="getPhoto()">进行筛选</el-button>
                    <el-button type="primary" icon="el-icon-download" @click="downImage()" :loading="loading">下载全部图片</el-button>

                </div>
                <div v-else>
                    <el-button type="primary"  icon="el-icon-search" @click="getPhoto()">进行筛选</el-button>
                    <el-button type="primary"  icon="el-icon-download" @click="downImage()" :loading="loading" disabled>下载全部图片</el-button>

                </div>
                <!--</el-badge>-->
                <!--<el-badge :value="total" :max="99" class="item">-->



                <!--</el-badge>-->
            </el-row>
        </div>
        <!--<div style="width: 10%;height: 10%;">-->

            <!--<div id="photo" style="width: 10%;height: 10%;">-->
                <!--<img v-for="photo in photoTable" :src="getscr1(photo.href)" alt="no"  style="float:left; width: 90px;height: 90px">-->
                <!---->
            <!--</div>-->
        <!--</div>-->
        <div style="width: 100%;height:85%;float: left;" id="photo">
            <el-row >
                <el-dialog
                        title="提示"
                        :visible.sync="dialogVisible"
                        width="30%"
                        >
                    <span>无查询信息</span>
                    <span slot="footer" class="dialog-footer">
                       <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
                <el-col  v-for="photo in photoTable" :span="2"   >

                    <!--<el-checkbox :checked="true">备选项</el-checkbox>-->
                    <el-card  :body-style="{ padding: '0px' }">
                        <img   :src="getscr1(photo.href)" name= 'img' style="width: 90px;height: 90px">
                        <el-checkbox  :checked="photo.checked"  ></el-checkbox>
                    </el-card>

                </el-col>

            </el-row>
        </div>
        <div style="width: 100%;height:65%;float: left;" class="block">
            <!--<span class="demonstration">完整功能</span>-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"

                    :page-size="10"
                    layout=" prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    //main引入或者是组件内引入
    let JSZip = require('jszip');
    export default {
        name: "PictureClassify",
        mounted(){
          let that =this;
          this.
          that.getDeviceid();
          that.getModelid();
        },
        methods:{

    //    getBase64Image(img,width,height) {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = width ? width : img.width;
    //     canvas.height = height ? height : img.height;
    //
    //     var ctx = canvas.getContext("2d");
    //     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //        return canvas.toDataURL();
    // },
    //         getBase64(img) {
    //
    //             var image = new Image();
    //             image.crossOrigin = 'Anonymous';
    //             console.log(img);
    //             image.src = img;
    //             var deferred=$.Deferred();
    //
    //             if(img){
    //
    //                 image.onload =function (){
    //
    //                     deferred.resolve(this.getBase64Image(image));
    //                 };
    //                 return deferred.promise();
    //             }
    //
    //
    //         },
            getBase64(img){
                // console.log(img);
              function getBase64Image(img,width,height){
                  let canvas=document.createElement("canvas");
                  canvas.width = width ? width : img.width;
                  canvas.height = height ? height : img.height;
                  let ctx = canvas.getContext("2d");
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                  return canvas.toDataURL();
              }
                let image = new Image();
                image.crossOrigin = 'Anonymous';
                image.src = img;
                let deferred=$.Deferred();
                if(img){
                    // console.log("img");
                    image.onload =function (){
                        // console.log("okokok");

                        deferred.resolve(getBase64Image(image));
                    };
                    image.onerror=function(){
                        // console.log("onerror");
                    }
                    // console.log(deferred.promise());
                    // console.log(deferred.promise());
                }
                // console.log(deferred);

                return deferred.promise();

            },
            getAllphoto(){
                let that=this;
                let dataStrArr=this.toString().split(",");
                let dataIntArr=[];
                for(let i=0;i<this.checkList.length;i++)
                {
                    if(dataStrArr[i]==="横")
                    {
                        dataIntArr[i]=1;
                    }
                    if(dataStrArr[i]==="纵")
                    {
                        dataIntArr[i]=2;
                    }
                    if(dataStrArr[i]==="无")
                    {
                        dataIntArr[i]=0;
                    }
                    if(dataStrArr[i]==="破洞")
                    {
                        dataIntArr[i]=3;
                    }
                }
                let dataStrArr1=this.checkList2.toString().split(",");//分割成字符串数组
                let dataIntArr1=[];//保存转换后的整型字符串
                for(let i=0;i<this.checkList2.length;i++) {
                    if (dataStrArr1[i] === "人工") {
                        dataIntArr1[i] = 0;
                    }
                    if (dataStrArr1[i] === "机器") {
                        dataIntArr1[i] = 1;
                    }
                }
                let photoClass=[];
                this.getDeviceid();
                this.getModelid();
                let url='http://106.12.123.92:8081/api/v1/pictures/search/do-user';

                that.axios(url,{
                    params:{
                        pageSize:10000,

                        types:dataIntArr.toString(),
                        startTime:this.value7 ? this.value7[0] : null,
                        endTime:this.value7 ? this.value7[1] : null,
                        deviceId:this.value9,
                        modelId:this.value10,
                        identifyType:dataIntArr1.toString()
                    }
                }).then(function (response) {
                    let data=response.data;
                    // console.log("response");
                    // console.log(response);
                    if(data.code===0){
                        that.dialogFormVisible=false;
                        // if(data.)
                        that.allPhototable=data.data.list;

                        // console.log(data.data.list);
                        // console.log(that.allPhototable);
                        // console.log(that.allPhototable.length);

                        // that.total=data.data.total;
                        // console.log(response.data);
                        // console.log(response);
                        // for(let i=0;i<that.allPhototable.length;i++){
                        // }
                    }
                    else{
                        console.log("无查询结果");
                        that.allPhototable=[];
                        that.dialogVisible=true;
                    }
                });
                let zip = new JSZip();//定义一个新的压缩文件
                let img = zip.folder("images");
                // console.log(img);
                let baseList = [];
                // let src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/20/beb5250a-31df-4627-9165-82b191e02b7b-945400997.jpg?op=OPEN';

                let arr = ['http://106.12.123.92/webhdfs/v1/upload/picture/19-02/20/beb5250a-31df-4627-9165-82b191e02b7b-945400997.jpg?op=OPEN','http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/20/beb5250a-31df-4627-9165-82b191e02b7b-945400997.jpg?op=OPEN'];
                for (let i = 0; i < arr.length; i++) {
                    let image = new Image();
                    image.setAttribute('crossOrigin', 'anonymous');
                    image.onerror=function requestImg(src){
                        let img = new Image();
                        img.setAttribute('crossOrigin', 'anonymous');//如在img标签加了该属性后，图片在其他网站则无法显示
                        img.src ='http://106.12.123.92/webhdfs/v1/upload/picture/19-02/20/beb5250a-31df-4627-9165-82b191e02b7b-945400997.jpg?op=OPEN';
                        // console.log(src);
                        img.onerror = function(){
                            let timeStamp = new Date();
                            requestImg(src+'?'+timeStamp);
                        }
                    };
                    // console.log("123");
                    image.onload = function () {
                        let canvas = document.createElement('canvas');//canvas仅仅是个图形的容器
                        canvas.width = image.width;
                        canvas.height = image.height;
                        console.log("good");
                        let context = canvas.getContext('2d');//getContext() 方法返回一个用于在画布上绘图的环境。
                        context.drawImage(image, 0, 0, image.width, image.height);//方法在画布上绘制图像、画布或视频。
                        // console.log("12");
                        let url = canvas.toDataURL();// 得到图片的base64编码数据 let url =
                        canvas.toDataURL('image/png');//？？？跟上面的有什么不同
                        baseList.push(url.substring(22));//截取从22索引位置开始,到结束


                        if (baseList.length === arr.length) {//检测是否把数组里的照片都进行编码并传入了baseList数组内了
                            if (baseList.length > 0) {
                                // console.log("baseList");
                                this.$notify({
                                    title: '成功',
                                    message: '即将下载',
                                    type: 'success'
                                });
                                for (let k = 0; k < baseList.length; k++) {
                                    img.file('photo' + k + '.png', baseList[k], {base64: true});//获取图片文件
                                }
                                img.generateAsync({type: 'blob'}).then(function (content) {

                                    // see FileSaver.js
                                    saveAs(content,"photo.zip");
                                    // showMessage("done !");
                                });
                            } else {
                                console.log("error");
                                this.$notify.error({
                                    title: '错误',
                                    message: '暂无图片可下载'
                                })
                            }
                        }
                    };

                    image.src = "http://106.12.123.92/webhdfs/v1/upload/picture/19-02/20/beb5250a-31df-4627-9165-82b191e02b7b-945400997.jpg?op=OPEN";
                    // console.log("good3");

                }

            },
            downImage(){
                this.loading=true;
                let that=this;
                let dataStrArr=this.toString().split(",");
                let dataIntArr=[];
                for(let i=0;i<this.checkList.length;i++)
                {
                    if(dataStrArr[i]==="横")
                    {
                        dataIntArr[i]=1;
                    }
                    if(dataStrArr[i]==="纵")
                    {
                        dataIntArr[i]=2;
                    }
                    if(dataStrArr[i]==="无")
                    {
                        dataIntArr[i]=0;
                    }
                    if(dataStrArr[i]==="破洞")
                    {
                        dataIntArr[i]=3;
                    }
                }
                let dataStrArr1=this.checkList2.toString().split(",");//分割成字符串数组
                let dataIntArr1=[];//保存转换后的整型字符串
                for(let i=0;i<this.checkList2.length;i++) {
                    if (dataStrArr1[i] === "人工") {
                        dataIntArr1[i] = 0;
                    }
                    if (dataStrArr1[i] === "机器") {
                        dataIntArr1[i] = 1;
                    }
                }
                this.getDeviceid();
                this.getModelid();
                let url='http://106.12.123.92:8081/api/v1/pictures/download/do-user';
                that.axios(url,{
                    params:{
                        pageSize:10000,
                        types:dataIntArr.toString(),
                        startTime:this.value7 ? this.value7[0] : null,
                        endTime:this.value7 ? this.value7[1] : null,
                        deviceId:this.value9,
                        modelId:this.value10,
                        identifyType:dataIntArr1.toString()
                    }
                }).then(function (response) {
                    let downScr=response.data;
                    let imgsSrc=downScr.data;
                    let imgBase64=[];
                    let imageSuffix=[];//图片后缀
                    let zip=new JSZip();
                    zip.file("readme.txt","案件详情资料\n");
                    let img=zip.folder("images");

                    for(let i=0;i<imgsSrc.length;i++)
                    {
                        let src="http://106.12.123.92:5555"+imgsSrc[i]+"&namenoderpcaddress=bigdata1:9000&offset=0";
                        // console.log(src);
                        let suffix=src.substring(src.lastIndexOf("."), src.lastIndexOf("?"));
                        imageSuffix.push(suffix);//.jpg
                        // console.log(imgsSrc[i]);
                        // console.log(that.getBase64(imgsSrc[i]));
                        that.getBase64(src)
                            .then(function(base64){
                                imgBase64.push(base64.substring(22));
                            },function(err){
                                console.log(err);//打印异常信息
                            });
                        // console.log(imgBase64.length);
                    }
                    function tt(){
                        setTimeout(function(){
                            // console.log(imgsSrc.length);
                            // console.log("123");
                            if(imgsSrc.length===imgBase64.length){
                                for(let i=0;i<imgsSrc.length;i++)
                                {
                                    img.file(i+imageSuffix[i], imgBase64[i], {base64: true});
                                }
                                zip.generateAsync({type:"blob"}).then(function(content) {
                                    saveAs(content, "images.zip");
                                });
                                $('#status').text('处理完成。。。。。');
                                console.log("下载完成123456");
                                that.loading=false;
                                console.log(this.loading);
                            }else{
                                $('#status').text('已完成：'+imgBase64.length+'/'+imgsSrc.length);
                                // console.log();
                                tt();
                            }
                        },100);
                    }
                    tt();
                    if(downScr.code===0){
                    }
                    else{
                        console.log("无下载结果");
                    }
                });
                // console.log(imgsSrc);
            //     let imgBase64=[];
            //     let imageSuffix=[];//图片后缀
            //     let zip=new JSZip();
            //     zip.file("readme.txt","案件详情资料\n");
            //     let img=zip.folder("images");
            //     for(let i=0;i<imgs.legth;i++)
            //     {
            //         // let src = imgs[i].getAttribute("src");
            //         let suffix = src.substring(src.lastIndexOf("."), src.lastIndexOf("?"));
            //         imageSuffix.push(suffix);
            //
            //         this.getBase64(imgs[i].getAttribute("src"))
            //             .then(function(base64){
            //                 imgBase64.push(base64.substring(22));
            //             },function(err){
            //                 console.log(err);//打印异常信息
            //             });
            //     }
            //
            // },
            // //传入图片路径，返回base64
            // getBase64(img){
            //     function getBase64Image(img,width,height) {
            //         let canvas = document.createElement("canvas");
            //         canvas.width = width ? width : img.width;
            //         canvas.height = height ? height : img.height;
            //
            //         let ctx = canvas.getContext("2d");
            //         ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            //         let dataURL = canvas.toDataURL();
            //         return dataURL;
            //     }
            //     let image = new Image();
            //     image.crossOrigin = 'Anonymous';
            //     image.src = img;
            //     let deferred=$.Deferred();
            //     if(img){
            //         image.onload =function (){
            //             deferred.resolve(getBase64Image(image));
            //         };
            //         return deferred.promise();
            //     }


            },
            // setTimeout(){
            //     if(imgs.length===imgBase64.length){
            //         for(let i=0;i<imgs.length;i++){
            //             img.file(i+imageSuffix[i],imgBase64[i],{base64:true});
            //
            //         }
            //         zip.generateAsync({type:"blob"}).then(function(content){
            //             saveAs(content,"images.zip");
            //         });
            //
            //     }else{
            //         tt();
            //     }
            //
            //
            // }
            // tt(){
            //
            // },
            getPhoto(){
                // this. getAllphoto();
                let that =this;
                // let dataStr=item4;//原始字符串
                // let arryy = [];
                // item4 = item4.replace(/"([^"]*)"/g, "'$1'");
                // let array = eval('(' + item4 + ')');//封装成数
                // console.log(array);
                // arryy=item4;
                let dataStrArr=this.checkList.toString().split(",");//分割成字符串数组
                // let dataInArr=this.checkList.toString().split(",");//分割成字符串数组
                // console.log(dataInArr);
                let dataIntArr=[];//保存转换后的整型字符串
                // console.log(that.checkList);

                for(let i=0;i<this.checkList.length;i++)
                {

                    if(dataStrArr[i]==="横")
                    {
                        dataIntArr[i]=1;
                        // console.log("dayin");

                    }
                    if(dataStrArr[i]==="纵")
                    {
                        dataIntArr[i]=2;
                    }
                    if(dataStrArr[i]==="无")
                    {
                        dataIntArr[i]=0;
                    }
                    if(dataStrArr[i]==="破洞")
                    {
                        dataIntArr[i]=3;
                    }
                }
                let dataStrArr1=this.checkList2.toString().split(",");//分割成字符串数组
                let dataIntArr1=[];//保存转换后的整型字符串

                // dataStrArr.forEach(function(data,index,arr){
                //     dataIntArr.push(+data);
                // });
                // // console.log(this.value7);

                // console.log(dataStrArr);
                for(let i=0;i<this.checkList2.length;i++)
                {
                    if(dataStrArr1[i]==="人工")
                    {

                        dataIntArr1[i]=0;
                        // console.log(dataIntArr1[i]);
                    }
                    if(dataStrArr1[i]==="机器")
                    {
                        dataIntArr1[i]=1;
                        // console.log(dataIntArr1[i]);
                    }
                }
                // console.log(dataIntArr);
                // if(dataIntArr==="1")
                // {
                //     console.log("good");
                // }
                // console.log();
                console.log(dataIntArr1);
                let photoClass=[];
                this.getDeviceid();
                this.getModelid();
                // console.log(item1);
                let url='http://106.12.123.92:8081/api/v1/pictures/search/do-user';
                that.axios(url,{
                    params:{
                        pageNum: 1,
                        pageSize: 10,
                        types:dataIntArr.toString(),
                        startTime:this.value7 ? this.value7[0] : null,
                        endTime:this.value7 ? this.value7[1] : null,
                        deviceId:this.value9,
                        modelId:this.value10,
                        identifyType:dataIntArr1.toString()
                    }
                }).then(function (response) {
                    console.log(response);
                    let data=response.data;

                    if(data.code===0){
                        that.dialogFormVisible=false;
                        // if(data.)
                        that.photoTable=data.data.list;
                        that.total=data.data.total;
                        // console.log(response);
                        // console.log(response.data);
                        // console.log(response);
                        console.log(that.photoTable);
                        that.downButton=true;

                        for(let i=0;i<that.photoTable.length;i++){
                            that.photoTable[i]['checked'] = true;
                            // console.log(that.photoTable[i]);
                        }

                    }
                    else{
                        console.log("无查询结果");
                        that.photoTable=[];
                        that.dialogVisible=true;
                    }

                });


            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                // console.log(`每页    条`);
                // console.log(this.pagesize)  //每页下拉显示数据
            },
            // getImgPath(path){
            //     let path="";
            //     return require(path);
            //
            // },

            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                let dataStrArr=this.checkList.toString().split(",");//分割成字符串数组
                let dataIntArr=[];//保存转换后的整型字符串
                // dataStrArr.forEach(function(data,index,arr){
                //     dataIntArr.push(+data);
                // });
                // // console.log(this.value7);
                // console.log(dataStrArr);
                for(let i=0;i<this.checkList.length;i++)
                {
                    if(dataStrArr[i]==="横")
                    {
                        dataIntArr[i]=1;
                    }
                    if(dataStrArr[i]==="纵")
                    {
                        dataIntArr[i]=2;
                    }
                    if(dataStrArr[i]==="无")
                    {
                        dataIntArr[i]=0;
                    }
                    if(dataStrArr[i]==="破洞")
                    {
                        dataIntArr[i]=3;
                    }
                }
                let dataStrArr1=this.checkList2.toString().split(",");//分割成字符串数组
                let dataIntArr1=[];//保存转换后的整型字符串
                // dataStrArr.forEach(function(data,index,arr){
                //     dataIntArr.push(+data);
                // });
                // // console.log(this.value7);

                // console.log(dataStrArr);
                for(let i=0;i<this.checkList2.length;i++)
                {
                    if(dataStrArr1[i]==="人工")
                    {
                        dataIntArr1[i]=0;
                    }
                    if(dataStrArr1[i]==="机器")
                    {
                        dataIntArr1[i]=1;
                    }

                }
                let that =this;
                let url='http://106.12.123.92:8081/api/v1/pictures/search/do-user';
                that.axios(url,{
                    params:{
                        pageNum: currentPage,
                        pageSize: 10,
                        types:dataIntArr.toString(),
                        startTime:this.value7 ? this.value7[0] : null,
                        endTime:this.value7 ? this.value7[1] : null,
                        deviceId:this.value9,
                        modelId:this.value10,
                        identifyType:dataIntArr1.toString()
                        // createTime:item1,
                    }
                }).then(function (response) {
                    // console.log(response);
                    // console.log("ok");

                    let data=response.data;

                    if(data.code===0){
                        // if(data.)
                        that.photoTable=data.data.list;
                        that.total=data.data.total;
                        // console.log(response.data);
                        for(let i=0;i<that.photoTable.length;i++){
                            that.photoTable[i]['checked'] = true;

                        }
                        console.log(that.photoTable);
                    }
                })
                // console.log(this.currentPage)  //点击第几页
            },
            // getitem4Num(item4)
            // {
            //     item4.length
            // },
            //
            getDeviceid:function() {
                // let api = this.$api.userApi.getMachines;
                let url='http://106.12.123.92:8081/api/v1/devices/do-user';
                let that=this;
                let size=that.pageSize*that.currentPage;
                this.axios(url, {
                    params: {
                        pageNum: that.currentPage,
                        pageSize: 10,
                    }
                }).then(function (res) {
                    // console.log(res);
                    let data = res.data;
                    // console.log(data);
                    if(res.data.code===0){
                        that.deviceTable=data.data.list;

                        // console.log(that.getDeviceid());
                    }
                });

            },
            getModelid:function() {
                // let api = this.$api.userApi.getMachines;
                let url='http://106.12.123.92:8081//api/v1/models';
                let that=this;
                let size=that.pageSize*that.currentPage;
                this.axios(url, {
                    params: {
                        pageNum: that.currentPage,
                        pageSize: 10,
                    }
                }).then(function (res) {
                    // console.log(res);
                    let data = res.data;
                    // console.log(data);
                    if(res.data.code===0){
                        that.modelTable=data.data.list;

                        // console.log(that.modelTable);
                    }
                });

            },

            //获取图片路径
            getscr1(item){
                // document.images.imgInit.src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                // return ('http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/20/ef941f06-7d1f-43ab-b6a0-28275be153e7-153314543.jpg?op=OPEN');
                return ('http://106.12.123.92:5555'+item);
            },
            // getflage(item){
            //
            //     // for(let i=0;i<this.photoTable.length;i++){
            //     //     if(item===this.photoTable[i].deviceId)
            //     //     {
            //     //
            //     //     }
            //     //
            //     //
            //     //
            //     // }
            //     // if(item===)
            //     return true;
            //
            // },
            // handleCheckAllChange(val) {
            //     this.photoTable = val ? cityOptions : [];
            //     this.isIndeterminate = false;
            // },
            // handleCheckedCitiesChange(value) {
            //     let checkedCount = value.length;
            //     this.checkAll = checkedCount === this.photoTable.length;
            //     this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            // },
        },
        data() {
            return {
                downButton:false,
                loading:false,
                deviceTable:[],
                // checkAll: false,
                // checkedCities: ['上海', '北京'],
                // cities: cityOptions,
                isIndeterminate: true,
                total:0,

                value9: '',
                value10:'',
                currentPage4:1,
                dialogVisible:false,//判断是否有查询结果
                modelTable:[],
                allPhototable:[],

                photoTable:[],
                currentPage:1,
                pageSize:10,
                // currentDate: new Date(),
                // bg1:{
                //     background:'url(http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN)',
                //     backgroundRepeat:"no-repeat",
                // },
                url:'',

                checked1:false,
                checked2:false,
                checked3:false,
                checked0:false,
                checkedD1:false,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]

                },
                value7: ["",""],
                checkList:[],
                checkList2:[],
                checkAll: false,
                // options: [{
                //     value: '选项1',
                //     label: '黄金糕'
                // }, {
                //     value: '选项2',
                //     label: '双皮奶'
                // }, {
                //     value: '选项3',
                //     label: '蚵仔煎'
                // }, {
                //     value: '选项4',
                //     label: '龙须面'
                // }, {
                //     value: '选项5',
                //     label: '北京烤鸭'
                // }],
                // value8: '',
            };
        },
    }
</script>

<style scoped>
    .optionmenu{
        color:green;
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }

</style>

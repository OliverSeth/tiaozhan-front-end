<template>
    <div style="width: 80%;height:88%;position: absolute"  :data="photoTable">
        <div style="width: 20%;height:20%;float: left" >
            <p class="optionmenu" >选择设备</p>
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
            <p class="optionmenu" > 检测时间段</p>
            <div class="block">
                <!--<span class="demonstration">带快捷选</span>-->
                <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
        </div>
        <div style="width: 30%;height:20%;float: left;">
            <p class="optionmenu" > 疵点类型</p>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="横疵" v-model="checked1"></el-checkbox>
                <el-checkbox label="纵疵" v-model="checked2"></el-checkbox>
                <el-checkbox label="横纵疵" v-model="checked3"></el-checkbox>
                <el-checkbox label="无" v-model="checked0"></el-checkbox>
            </el-checkbox-group>
        </div>
        <div style="width: 20%;height:20%;float: left;">
            <el-row>

                <el-button type="primary" @click="getflage(value-key)">进行筛选</el-button>

            </el-row>
        </div>
        <div style="width: 100%;height:10%;float: left;">
            <el-row >


                <el-col  v-for="photo in photoTable" :span="2"  >
                    <el-card  :body-style="{ padding: '0px' }">
                        <img  v-if="flage" :src="getscr1(photo.href)" style="width: 90px;height: 90px">

                        <template>
                            <!-- `checked` 为 true 或 false -->
                            <el-checkbox  v-model="checked">备选项</el-checkbox>
                        </template>
                        <!--<div style="padding: 14px;">-->
                        <!--&lt;!&ndash;<span>好吃的汉堡</span>&ndash;&gt;-->
                        <!--&lt;!&ndash;<div class="bottom clearfix">&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<time class="time">{{ currentDate }}</time>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;&lt;!&ndash;<el-button type="text" class="button">操作按钮</el-button>&ndash;&gt;&ndash;&gt;-->
                        <!--&lt;!&ndash;</div>&ndash;&gt;-->
                        <!--</div>-->
                    </el-card>
                </el-col>
            </el-row>


        </div>





        <!--<div name="img_div" style="width: 10%;height: 10%; display: block; float: left;margin:0 0"-->
             <!--:style="bg1">-->
            <!--<el-checkbox v-model="checkedD1" style="position: relative;float: right" @change="setBorder(0)"></el-checkbox>-->
        <!--</div>-->

        <!--<div class="block" style="height: 10%;margin-top: 10%;float: left">-->
            <!--<span class="pages"></span>-->
            <!--<el-pagination-->
                    <!--@size-change="handleSizeChange"-->
                    <!--@current-change="handleCurrentChange"-->
                    <!--:current-page="currentPage"-->
                    <!--layout="prev, pager, next"-->
                    <!--:total="photoTable.length"-->
                    <!--:page-size="4">-->
            <!--</el-pagination>-->
        <!--</div>-->
    </div>
</template>

<script>


    export default {
        name: "PictureClassify",
        mounted(){


            let that =this;
            this.getDeviceid();


            let url='http://106.12.123.92:8081/api/v1/pictures/do-user';
            that.axios(url,{
                params:{
                    pageNum: that.currentPage,
                    pageSize: 100
                }
            }).then(function (response) {
                // console.log("ok");

                let data=response.data;

                if(data.code===0){
                    // if(data.)
                    that.photoTable=data.data.list;
                    console.log(response.data);
                    for(let i=0;i<that.photoTable.length;i++){



                    }
                }

            })
        },
        methods:{
            getDeviceid:function() {
                // let api = this.$api.userApi.getMachines;
                let url='http://106.12.123.92:8081/api/v1/devices/do-user';
                let that=this;
                let size=that.pageSize*that.currentPage;
                this.axios(url, {
                    params: {
                        pageNum: that.currentPage,
                        pageSize: 100,
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
                return that.deviceTable;

            },
            handleSizeChange: function (size) {
                this.pagesize = size;
                // console.log(this.pagesize)  //每页下拉显示数据
            },


            handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                // console.log(this.currentPage)  //点击第几页
            },
            //获取图片路径
            getscr1(item){
                // document.images.imgInit.src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                // return ('http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/20/ef941f06-7d1f-43ab-b6a0-28275be153e7-153314543.jpg?op=OPEN');
                return ('http://148.70.63.35:50070'+item);
            },
            getflage(item){

                // for(let i=0;i<this.photoTable.length;i++){
                //     if(item===this.photoTable[i].deviceId)
                //     {
                //
                //     }
                //
                //
                //
                // }
                // if(item===)
                return true;

            },
        },
        data() {
            return {
                deviceTable:[],
                flage:this.getflage(),
                value9: '请选择设备ID',

                photoTable:[],
                currentPage:1,
                pageSize:4,
                // currentDate: new Date(),
                // bg1:{
                //     background:'url(http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN)',
                //     backgroundRepeat:"no-repeat",
                // },
                url:'',
                checked: true,
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
                value7: '',
                checkList: ['复选框 A'],
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

</style>

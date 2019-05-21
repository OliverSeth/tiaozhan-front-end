<template>
    <el-row>
        <el-col :span="8">
            <el-row :gutter="30">
                <el-col>
                    <el-card style="position: relative;width: 100%;height: 300px" shadow="hover">
                        <div slot="header">
                            <span>现有模型</span>
                        </div>
                        <img style="width: 50%;height: 50%" src="../assets/old.png">
                    </el-card>
                </el-col>
            </el-row>
            <br/><br/>
            <el-row :gutter="30">
                <el-col>
                    <el-card style="position: relative;width: 100%;height: 300px" shadow="hover">
                        <div slot="header">
                            <span>疵点图片</span>
                        </div>
                        <img v-for="photo in photoTable" style="height: 30%;width: 30%" :src="photo">
                    </el-card>
                </el-col>
            </el-row>
            <br/><br>
            <el-row :gutter="30">
                <el-col style="float: right">
                    <el-button type="primary" @click="migration">迁移训练</el-button>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="8">
            <el-progress style="margin-top: 310px" :text-inside="true" :stroke-width="20" :percentage="percent"
                         status="success"></el-progress>
        </el-col>
        <el-col :span="8">
            <el-card style="margin-top: 100px;height: 300px" shadow="hover">
                <div slot="header">
                    <span>新模型</span>
                </div>
                <div id="d1"></div>
            </el-card>
            <br/><br/>
            <el-button type="primary" @click="download">下载新模型</el-button>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "AlgorithmMigration",
        data() {
            return {
                percent: 0,
                photoTable: []
            }
        },
        mounted() {
            // if(localStorage.getItem('photo0')!==null){
            //     for(let i=0;i<6;i++){
            //         this.photoTable.push(this.getscr1(localStorage.getItem('photo'+i.toString())));
            //     }
            // }
            // console.log(this.photoTable);
            // if (this.photoTable.length === 0) {
                let url = 'http://10.199.172.62:8081/api/v1/pictures/do-user';
                this.axios(url, {
                    params: {
                        pageNum: 1,
                        pageSize: 6
                    }
                }).then(response => {
                    let data = response.data;
                    // console.log(data);
                    if (data.code === 0) {
                        for(let i=0;i<6;i++){
                            this.photoTable.push(this.getscr1(response.data.data.list[i].href));
                        }
                    }
                })
            // }else if(this.photoTable.length>6){
            //     this.photoTable.splice(6,this.photoTable.length-6);
            // }
        },
            methods:{
                getscr1(item){
                    // document.images.imgInit.src='http://148.70.63.35:50070/webhdfs/v1/upload/picture/19-02/19/5fa52131-d668-4ec4-99b6-b6fb71ba24fc-803600665.jpg?op=OPEN';
                    return ('http://10.199.172.62:5555'+item);
                },
                migration()
                {
                    this.percent = 0;
                    // console.log(this.percent);
                    let that = this;
                    let interval = setInterval(function () {
                        if (that.percent !== 100) {
                            that.percent++;
                            console.log(that.percent);
                        } else {
                            let d1 = document.getElementById('d1');
                            let img = document.createElement('img');
                            img.setAttribute("style", "height:50%;width:50%");
                            // img.src="../assets/new.png";
                            img.src = require('../assets/new.png');
                            d1.appendChild(img);
                            clearInterval(interval);
                        }
                    }, 300);

                    // while(this.percent!==100){
                    //     // let that=this;
                    //     setInterval()
                    //     setTimeout(this.percentAdd(),1000);
                    //     console.log(this.percent);
                    //     if(this.percent===100){
                    //         break;
                    //     }
                    // }

                }
            ,
                percentAdd()
                {
                    if (this.percent !== 100) {
                        this.percent++;
                    } else {
                        clearInterval(this.interval);
                    }
                }
            ,
                download()
                {
                    let url = '/webhdfs/v1/upload/model-py/19-05/11/3eb9b142-a9b3-4174-9ec0-53a12a6e1250-newModel.h5?op=OPEN';
                    if (this.percent === 100) {
                        window.location.href = 'http://10.199.172.62:5555' + url;
                    }
                }
            ,
            }
        }
</script>

<style scoped>

</style>

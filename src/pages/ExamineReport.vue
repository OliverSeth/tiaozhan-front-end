<template style="padding-left: 217px">
    <!--<div id="clothExamine" :style="bg" style="background-size: cover">-->
    <!--<div style="position: relative;left: 76%;top: 61%;">-->
    <!--<router-link to="device-control">上海</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <div class="fl mapDiv">
        <div class="mapCon">
            <!--<div class="title">城市品种个数</div>-->
            <div id="mapChart" class="mapChart"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ExamineReport",
        mounted() {
            this.drawLine();
        },
        methods: {
            drawLine() {
                // let convertData = function (data) {
                //     let res = [];
                //     for (let i = 0; i < data.length; i++) {
                //         let geoCoord = geoCoordMap[data[i].name];
                //         if (geoCoord) {
                //             res.push({
                //                 name: data[i].name,
                //                 value: geoCoord.concat(data[i].value)
                //             });
                //         }
                //     }
                //     return res;
                // };
                let data = [
                    {name: '上海', value: 25},
                    {name: '泉州', value: 40},
                    {name: '武汉', value: 40},
                ];
                let geoCoordMap = {
                    '上海':[121.48,31.22],
                    '泉州':[118.58,24.93],
                    '武汉':[114.31,30.52],
                };
                let convertData = function (data) {
                    let res = [];
                    for (let i = 0; i < data.length; i++) {
                        let geoCoord = geoCoordMap[data[i].name];
                        if (geoCoord) {
                            res.push({
                                name: data[i].name,
                                value: geoCoord.concat(data[i].value)
                            });
                        }
                    }
                    return res;
                };
                let mapChart = this.$echarts.init(document.getElementById("mapChart"));
                let option = {
                    backgroundColor:'#fff',
                    tooltip: {
                        trigger: "item"
                    },
                    geo: {
                        map: "china",
                        right: "2%",
                        left: "30%",
                        label: {
                            normal: {
                                show: true,
                                color: "#fff"
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                areaColor: "rgba(128, 128, 128, 0)",
                                borderColor: "#3CC3FF"
                            },
                            emphasis: {
                                areaColor: "#3EF3F4",
                                label:{
                                    show:true
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: "",
                            type: "scatter",
                            coordinateSystem: "geo",
                            data: convertData(data),
                            symbolSize: function(val) {
                                return val[2] / 10;
                            },
                            label: {
                                normal: {
                                    formatter: "{b}",
                                    position: "right",
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#1c0ddd"
                                }
                            }
                        },
                        {
                            name: "",
                            type: "effectScatter",
                            coordinateSystem: "geo",
                            data: convertData(
                                data.sort(function(a, b) {
                                    return b.value - a.value;
                                }).slice(0, 6)
                            ),
                            //标记大小，地图上的圆点
                            symbolSize: function(val) {
                                return val[2] / 10;
                            },
                            showEffectOn: "render",
                            rippleEffect: {
                                brushType: "stroke"
                            },
                            hoverAnimation: true,
                            label: {
                                //地图黄点显示内容
                                normal: {
                                    formatter: "{b}",
                                    position: "right",
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#f41b08",
                                    shadowBlur: 10,
                                    shadowColor: "#333"
                                }
                            },
                            zlevel: 1
                        }
                    ]
                };
                mapChart.on('click',param=>{
                    let selected=param.name;
                    if(selected){
                        switch (selected) {
                            case '上海':
                                this.$router.push('/device-control');
                                break;
                            case '湖北':
                                this.$router.push('/device-control');
                                break;
                            case '武汉':
                                this.$router.push('/device-control');
                                break;
                            case '福建':
                                this.$router.push('/device-control');
                                break;
                            case '泉州':
                                this.$router.push('/device-control');
                                break;
                            default:
                                break;
                        }
                    }
                });
                mapChart.setOption(option);
                mapChart.resize();
            }
        },
        data() {
            return {
                bg: {
                    background: 'url(' + require('../assets/map.jpg') + ')no-repeat',
                    // backgroundsize:
                }
            }
        }
    }

</script>

<style scoped>

    #clothExamine {
        width: 70%;
        height: 88%;
        position: absolute;

        /*padding: 0;*/
        /*margin: 0;*/
    }
    .mapDiv {
        width: 80%;
        height: 80%;
        position: relative;
        padding: 10px;
        box-sizing: border-box;
    }
    /*.mapCon .title {*/
        /*position: absolute;*/
        /*z-index: 1;*/
        /*height: 34px;*/
        /*line-height: 34px;*/
        /*font-size: 18px;*/
        /*font-weight: 700;*/
        /*padding-left: 14px;*/
        /*border-left: 6px solid #abd3d5;*/
        /*box-sizing: border-box;*/
    /*}*/
    .mapCon,
    .mapChart {
        height: 120%;
        width: 120%;
        transform: translate(-10%,-5%);
    }
</style>

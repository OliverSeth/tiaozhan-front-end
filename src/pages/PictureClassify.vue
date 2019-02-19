<template>
    <div style="width: 80%;position: absolute">
        <div style="width: 25%;">
            <p class="optionmenu" >选择设备</p>
            <el-select v-model="value8" filterable placeholder="选择设备">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div style="width: 25%">
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
        <div style="width: 30%">
            <p class="optionmenu" > 疵点类型</p>
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="横疵"></el-checkbox>
                <el-checkbox label="纵疵"></el-checkbox>
                <el-checkbox label="横纵疵"></el-checkbox>
                <el-checkbox label="无"></el-checkbox>
            </el-checkbox-group>
        </div>

    </div>
</template>

<script>

    export default {
        name: "PictureClassify",
        data() {
            return {
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
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value8: ''
            };
        },
    }
</script>

<style scoped>
    .optionmenu{
        color:green;
    }

</style>

<template>





    <div>

        <p class="optionmenu" > 检测时间段</p>
        <el-time-picker
                is-range
                v-model="value4"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
        </el-time-picker>
        <el-time-picker
                is-range
                arrow-control
                v-model="value5"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
        </el-time-picker>



        <p class="optionmenu" > 疵点类型</p>



        <el-checkbox-group v-model="checkList">
            <el-checkbox label="横疵"></el-checkbox>
            <el-checkbox label="纵疵"></el-checkbox>
            <el-checkbox label="交叉"></el-checkbox>

        </el-checkbox-group>
    </div>


    
</template>

<script>

    export default {
        name: "PictureClassify",
        data() {
            return {
                value4: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
            };
        },
        data () {
            return {
                checkList: ['复选框 A']
            };
        }

    }
</script>

<style scoped>
    .optionmenu{
        color:green;
    }

</style>
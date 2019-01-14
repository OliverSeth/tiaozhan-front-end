<template>
    <div id="clothExamine">
        <el-row>
            <el-col :span="18">
                <el-table
                        :data="examineTable"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                    <el-table-column
                            prop="no"
                            label="图像序列"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="status"
                            label="状态"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="badPosition"
                            label="疵点位置">
                    </el-table-column>
                    <el-table-column
                            prop="time"
                            label="检测时间">
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="2" :offset="4">
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
                <el-button>默认按钮</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "ClothExamine",
        methods: {
            tableRowClassName({row, rowIndex}) {
                switch (row.status) {
                    case 0:
                        return 'success-row';
                    case 1:
                        return 'warning-row';
                    default:
                        return 'danger-row';
                }
            }
        },
        data() {
            return {
                examineTable: [{
                    time: "2018-11-11 12:12:12",
                    status: 0,
                    no: 123,
                    badPosition: []
                }, {
                    time: "2018-11-12 11:12:12",
                    status: 1,
                    no: 124,
                    badPosition: [1, 2]
                }, {
                    time: "2018-11-12 12:12:12",
                    status: 2,
                    no: 125,
                    badPosition: [1, 2, 3, 4]
                }]
            }
        }
    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .el-table .danger-row {
        background: lightcoral;
    }
</style>
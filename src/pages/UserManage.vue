<template>
    <div id="userManage">
        <!--表格-->
        <el-table
                ref="userTable"
                :data="userTable.concat(userTable).concat(userTable)"
                border
                style="width: 100%"
                height="600px">
            <el-table-column
                    prop="account"
                    label="账号"
                    sortable>
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="role"
                    label="角色"
                    :filters="roles"
                    :filter-method="filterRole"
                    filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag
                            :type="roles[scope.row.role].style"
                            disable-transitions>{{roles[scope.row.role].text}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="注册日期"
                    sortable
                    column-key="date">
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currPage"
                :page-sizes="[10, 20, 30]"
                :page-size="10"
                layout="sizes, prev, pager, next"
                :total="1000">
        </el-pagination>
    </div>
</template>

<script>
    import roles from '@/constant/role'

    export default {
        data() {
            return {
                roles,
                userTable: [{
                    date: '2018-05-13',
                    username: '王二狗',
                    account: 161310415,
                    role: 0
                }, {
                    date: '2019-01-01',
                    username: '王大陆',
                    account: 161310418,
                    role: 1
                }, {
                    date: '2016-05-03',
                    username: '王大虎',
                    account: 161310417,
                    role: 2
                }, {
                    date: '2016-05-03',
                    username: '王小虎',
                    account: 161310416,
                    role: 3
                }],
                currPage: 1
            }
        },
        methods: {
            clearFilter() {
                this.$refs.userTable.clearFilter();
            },
            filterRole(value, row) {
                return row.role === value;
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>
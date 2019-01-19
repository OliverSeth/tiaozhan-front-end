<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'app'
    }
</script>

<style>
    /* common css */
    #app {
        height: 100%;
    }

    .el-container {
        background-color: #fff;
    }

    .el-header {
        border-bottom: 1px solid #efefef;
    }

    .el-pagination {
        margin-top: 30px;
        text-align: center;
    }

    /* css reset */
    * {
        margin: 0;
        padding: 0;
    }

    html, body {
        height: 100%;
    }

    body {
        background: #fafafa;
    }

    .left {
        float: left;
    }

    .right {
        float: right;
    }

    .center {
        margin: 0 auto;
    }

    .width50 {
        width: 50%;
    }
</style>

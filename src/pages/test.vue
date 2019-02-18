<template>
    <div>
        <el-upload
                :action="uploadActionUrl"
                accept="image/jpeg,image/gif,image/png"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :on-error="uploadError"
                :on-success="uploadSuccess"
                :on-remove="onRemoveTxt"
                :before-upload="onBeforeUpload"
                :file-list="files">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">请上传图片格式文件</div>
        </el-upload>
    </div>
</template>

<script>
    export default {
        name: "test"
    }
</script>

<style scoped>

</style>

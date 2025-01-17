<script lang="ts" setup>
import { getPreSignedUrl, putFile, PreSignedUrlReq } from './api'
const uploadPackage = async (fileRequest: any) => {
    const file = fileRequest.file
    console.log(file)
    const preSignedUrlReq: PreSignedUrlReq = {
        module: 'other',
        mediaType: 'file',
        filename: file.name
    }
    const result = await getPreSignedUrl(preSignedUrlReq)
    const url = result.data.url
    console.log(url)
    await putFile(url, file)
    console.log('111')
}
</script>

<template>
    <el-upload
        class="upload-demo"
        drag
        :http-request="uploadPackage"
        :multiple="false"
    >
        <el-icon style="vertical-align: middle; height: 5em; width: 10em">
            <UploadFilled style="height: 5em; width: 5em" />
        </el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <!-- <div>
            <el-progress
                v-show="percentBar.show"
                :percentage="percentBar.percentage"
                :stroke-width="15"
                :status="percentBar.status"
                striped
                striped-flow
                :duration="10"
            />
        </div> -->
    </el-upload>
</template>
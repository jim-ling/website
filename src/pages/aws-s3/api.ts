import { request } from '@/api/axios'
import axios from 'axios'
export interface PreSignedUrlRes {
    data: fileDate
    password: string
}

interface fileDate {
    url: string
    expire: number
    downloadUrl:string
}

export interface PreSignedUrlReq {
    module: string
    mediaType: string
    filename: string
    size?: number
    id?: string
}


/** 获取登录验证码 */
export function getPreSignedUrl(params: PreSignedUrlReq)  {
    return request<PreSignedUrlRes>({
        url: '/file/getPreSignedUrl',
        method: 'get',
        params
    })
}

export function test() {
    fetch('https://www.baidu.com', {
        method: 'GET',
        mode: 'no-cors',
      })
}

export function putFile(url:string,file:File) {
    // fetch(url, {
    //     method: 'PUT',
    //     mode: 'cors',
    //     body: file,
    //     headers: {
    //       'Content-Type': file.type // 设置文件的 MIME 类型
    //     }
    // })
    // 使用代理 URL 上传文件
    // const proxyUrl = url.replace('https://phizoss-test-assets.s3.sa-east-1.amazonaws.com', '/aws-s3');
    // axios.put(proxyUrl, file)
    
    axios.put(url, file)
}
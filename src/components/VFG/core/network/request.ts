import axios from 'axios';
import { createRequestInterceptor, createResponseInterceptor } from './interceptor'

axios.defaults.timeout = 10000; //响应时间
import { ElMessage } from 'element-plus';

export let isRelogin = { show: false };

export interface RequestConfig {
    baseURL: string,
    getToken: Function | null,
    timeout?: number
}

export function createRequest(reqConfig: RequestConfig) {
    const req = axios.create({
        baseURL: reqConfig.baseURL,
        timeout: reqConfig?.timeout || 10000,
    });

    // 请求拦截器
    req.interceptors.request.use(
        createRequestInterceptor(reqConfig.getToken),
        (error) => {
            console.log(error);
            Promise.reject(error);
        }
    );

    // 响应拦截器
    req.interceptors.response.use(
        createResponseInterceptor(isRelogin), (error) => {
            console.log("err" + error);
            let { message } = error;
            if (message == "Network Error") {
                message = "后端接口连接异常";
            } else if (message.includes("timeout")) {
                message = "系统接口请求超时";
            } else if (message.includes("Request failed with status code")) {
                message = "系统接口" + message.substr(message.length - 3) + "异常";
            }
            ElMessage({ message: message, type: "error", duration: 5 * 1000 });
            return Promise.reject(error);
        }
    );
    return req;
}

// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: '',
    // 超时
    timeout: 10000,
});


// 请求拦截器（在发送请求之前做些什么）
service.interceptors.request.use(
    createRequestInterceptor(null),
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    createResponseInterceptor(isRelogin), (error) => {
        console.log("err" + error);
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        ElMessage({ message: message, type: "error", duration: 5 * 1000 });
        return Promise.reject(error);
    }
);

export default service;
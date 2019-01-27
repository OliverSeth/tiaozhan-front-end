import Axios from 'axios'
import Qs from 'qs'
import cookies from 'vue-cookies'

// 配置Axios
let axiosInstance = Axios.create({
    // baseURL: 'http://localhost:8080',
    // 请求时携带Cookie
    withCredentials: true,
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
});
// 全局请求拦截，自动为header添加token
axiosInstance.interceptors.request.use(
    config => {
        let token = cookies.get('token');
        // token存在，则添加至请求头
        if (token) {
            config.headers.token = token;
        }
        return config;
    }, err => {
        return Promise.reject(err);
    });

// // 拦截响应response，并做一些错误处理
// axiosInstance.interceptors.response.use((res) => {
//         let code = res.data.code;
//         if (code === 4) {
//             Vue.$toast('暂无更多');
//             return Promise.reject(res.data);
//         }
//         if (code === 99) {
//             Vue.$toast('系统异常');
//             return Promise.reject(res.data);
//         }
//         return res;
//     },
//     // 这里是返回状态码不为200时候的错误处理
//     (err) => {
//         if (err && err.response) {
//             switch (err.response.status) {
//                 case 400:
//                     err.message = '请求错误';
//                     break;
//                 case 401:
//                     Vue.$toast('您还没有登录');
//                     setTimeout(() => {
//                         router.push('/login');
//                     }, 2000);
//                     break;
//                 case 403:
//                     Vue.$toast('权限不足');
//                     break;
//                 case 500:
//                     Vue.$toast('系统异常');
//                     break;
//                 case 504:
//                     Vue.$toast('请求超时');
//                     break;
//                 default:
//             }
//         }
//         return Promise.reject(err);
//     });



export default axiosInstance;
import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from "./pages/Login"
import UserManage from './pages/UserManage'
import PhotoGallery from './pages/PhotoGallery'
import ExamineReport from './pages/ExamineReport'
import Dashboard from './pages/Dashboard'
import DeviceControl from './pages/DeviceControl'
import DefectDistribution from './pages/DefectDistribution'
import PictureClassify from './pages/PictureClassify'
import UploadImage from './pages/UploadImage'
import UploadPy from './pages/UploadPy'

Vue.use(Router);

let router = new Router({
    mode: 'history',
    // base: process.env.BASE_URL,
    //base:'/tiaozhan-front-end/',
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: '控制台'
            },
            redirect: '/login',
            children: [
                // {
                //     path: '/dashboard',
                //     component: Dashboard,
                //     meta: {
                //         title: '仪表盘'
                //     }
                // },
                // {
                //     path: '/user-manage',
                //     component: UserManage,
                //     meta: {
                //         title: '用户管理'
                //     }
                // },
                {
                    path: '/classify',
                    component: PictureClassify,
                    meta: {
                        title: '图片库'
                    }
                },
                {
                    path: '/photo-gallery',
                    component: PhotoGallery,
                    meta: {
                        title: '图片库'
                    }
                }, {
                    path: '/examine-report',
                    component: ExamineReport,
                    meta: {
                        title: '布料检测'
                    }
                }, {
                    path: '/device-control',
                    component: DeviceControl,
                    // meta{
                    //
                    // }
                }, {
                    path: '/defect-distribution',
                    component: DefectDistribution,
                }, {
                    path: '/upload-image',
                    component: UploadImage,
                }, {
                    path: '/upload-py',
                    component: UploadPy
                }
            ]
        }, {
            path: '/login',
            component: Login
        }
    ]
});

// 切换页面title
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});
export default router;

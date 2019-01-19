import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from "./pages/Login"
import UserManage from './pages/UserManage'
import ClothExamine from './pages/ClothExamine'
import ExamineReport from './pages/ExamineReport'
import Dashboard from "./pages/Dashboard";

Vue.use(Router)

let router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: '控制台'
            },
            children: [
                {
                    path: '/dashboard',
                    component: Dashboard,
                    meta: {
                        title: '仪表盘'
                    }
                },
                {
                    path: '/user-manage',
                    component: UserManage,
                    meta: {
                        title: '用户管理'
                    }
                }, {
                    path: '/cloth-examine',
                    component: ClothExamine,
                    meta: {
                        title: '布料检测'
                    }
                }, {
                    path: '/examine-report',
                    component: ExamineReport,
                    meta: {
                        title: '检测报告'
                    }
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

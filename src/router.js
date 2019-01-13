import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Login from "./pages/Login";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Home
        }, {
            path: '/login',
            component: Login
        }
    ]
})

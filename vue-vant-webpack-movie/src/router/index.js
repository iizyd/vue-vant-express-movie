import Vue from 'vue';
import VueRouter from 'vue-router';

import Test from '../views/Test.vue'
import Index from '../views/index.vue'
import Detail from '../views/detail.vue'
import Search from '../views/Search.vue'
import IndexList from '../views/IndexList.vue'
import More from '../views/More.vue'
import MoreDetail from '../views/MoreDetail.vue'


import Morning from '../views/morning/Morning.vue'
import MDetail from '../views/morning/MDetail.vue'
import MSearch from '../views/morning/MSearch.vue'
import MIndexList from '../views/morning/MIndexList.vue'
import MMore from '../views/morning/MMore.vue'
import MMoreDetail from '../views/morning/MMoreDetail.vue'



Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/detail/:title/:href',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/index',
        component: Index,
        name: 'Index',
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/more',
        component: More
    },
    {
        path: '/more_detail/:title/:url',
        name: 'MoreDetail',
        component: MoreDetail
    },
    {
        path: '/morning',
        component: Morning,
        name: 'Morning',
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/mdetail/:title/:href',
        name: 'MDetail',
        component: MDetail
    },
    {
        path: '/mmore',
        component: MMore
    },
    {
        path: '/Mmore_detail/:title/:url',
        name: 'MMoreDetail',
        component: MMoreDetail
    }
]

const router = new VueRouter({
    routes
});

export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';

import Test from '../views/Test.vue'
import Index from '../views/index.vue'
import Detail from '../views/detail.vue'
import Search from '../views/Search.vue'
import IndexList from '../views/IndexList.vue'
import More from '../views/More.vue'
import MoreDetail from '../views/MoreDetail.vue'

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
    }
]

const router = new VueRouter({
    routes
});

export default router;
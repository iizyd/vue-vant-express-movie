import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '../views/index.vue'
import Detail from '../views/Detail.vue'

Vue.use(VueRouter);

const routes = [{
        path: '/',
        redirect: '/index'
    },
    {
        path: '/index',
        component: Index,
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/detail/:id/:title/:href',
        component: Detail,
        meta: {
            keepAlive: false
        }
    }
]

const router = new VueRouter({
    routes
});

export default router;
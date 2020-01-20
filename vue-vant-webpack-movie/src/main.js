import Vue from 'vue';
import App from './App.vue';
import router from './router/index'
// 引入vant组件
import {
    Search,
    Row,
    Col,
    Lazyload,
    NavBar,
    Toast,
    Tabbar,
    TabbarItem,
    Icon,
    NoticeBar,
    List,
    Tab,
    Tabs
} from 'vant';

Vue.use(Search).use(Row).use(Col).use(Lazyload).use(NavBar).use(Toast).use(Tabbar).use(TabbarItem).use(Icon).use(NoticeBar).use(List).use(Tab).use(Tabs);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
import Vue from 'vue';
import App from './App.vue';
import router from './router/index';

//引入mui
// import mui from './assets/mui/js/mui'
// Vue.prototype.$mui = mui;

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
    Tabs,
    ActionSheet,
    Divider,
    RadioGroup,
    Radio
} from 'vant';

Vue.use(RadioGroup)
    .use(Radio)
    .use(Divider)
    .use(Search)
    .use(Row)
    .use(Col)
    .use(Lazyload)
    .use(NavBar)
    .use(Toast)
    .use(Tabbar)
    .use(TabbarItem)
    .use(Icon)
    .use(NoticeBar)
    .use(List)
    .use(Tab)
    .use(Tabs)
    .use(ActionSheet);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

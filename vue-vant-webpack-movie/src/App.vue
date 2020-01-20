<template>
    <div>
        <!-- <router-view></router-view> -->
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>

        <van-tabbar v-model="active" v-show="isShowFootBar">
            <van-tabbar-item icon="video-o" replace to="/index">首页</van-tabbar-item>
            <van-tabbar-item icon="video-o" replace to="/morning">晨光</van-tabbar-item>
            <van-tabbar-item icon="apps-o" replace to="/more">更多</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data () {
        return {
            isShowFootBar: true,
            active: 0
        }
    },
    created () {
        if (this.$route.path.includes('index')) {
            this.active = 0;
        } else if (this.$route.path.includes('more')) {
            this.active = 1;
        }
    },
    watch: {
        // 监听路由的变化，切换bar的显示
        $route (to, from) {
            if (to.path.includes('detail')) {
                this.isShowFootBar = false;
            } else {
                if (to.path.includes('index')) {
                    this.active = 0;
                } else {
                    this.active = 1;
                }
                this.isShowFootBar = true;
            }
        }
    }
}
</script>

<style lang="less">
</style>

<template>
    <div id="main">
        <!-- <router-view></router-view> -->
        <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!this.$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    created () {
    },
    watch: {
    }
}
</script>

<style lang="less" scoped>
#main {
    width: 100vw;
    height: 100vh;
}
</style>

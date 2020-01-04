<template>
    <div id="all">
        <van-nav-bar
            :title="movie_title"
            left-text="返回"
            right-text="首页"
            @click-right="goIndex"
            left-arrow
            @click-left="back"
        />

        <div class="main">
            <iframe
                marginwidth="0"
                marginheight="0"
                border="0"
                frameborder="0"
                topmargin="0"
                width="100%"
                height="100%"
                allowtransparency="true"
                allowfullscreen="true"
                :src="iframe_src"
            ></iframe>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            movie_title: '',
            iframe_src: ''
        }
    },
    created () {
        let title = this.$route.params.title;
        let url = atob(this.$route.params.url);

        this.movie_title = title;
        this.iframe_src = url;
        console.log(url);
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        goIndex () {
            this.$router.push('/index');
        }
    }
}
</script>

<style lang="less" scoped>
#all {
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .main {
        width: 100vw;
        flex: 1;
    }
}
</style>
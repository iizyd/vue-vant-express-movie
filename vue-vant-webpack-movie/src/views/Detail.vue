<template>
    <div>
        <van-nav-bar
            :title="movie_title"
            left-text="返回"
            right-text="首页"
            @click-right="goIndex"
            left-arrow
            @click-left="back"
        />

        <div class="top">
            <div class="play-box">
                <iframe
                    marginwidth="0"
                    marginheight="0"
                    border="0"
                    scrolling="no"
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
        <div class="set-list-box">
            <div
                class="set-list-item"
                v-for="(item, index) in set_list"
                :key="index"
                :class="{'set-list-item-active': item.isActive}"
                @click="play(item)"
            >{{item.set_title}}</div>
        </div>
    </div>
</template>

<script>
import detail_data from '../utils/detail_data'
import { getDetailData, getPlayUrl } from '../utils/api_methods'

export default {
    data () {
        return {
            movie_title: this.$route.params.title,
            // set_list: detail_data[2].sets
            set_list: [],
            iframe_src: "",
            loadingTag: null
        }
    },
    created () {
        this.loadingTag = this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        let _href = this.$route.params.href.replace(/\+/g, '/').replace(/-/g, '.');
        console.log(_href);

        getDetailData({ params: { url: _href } }).then(res => {
            console.log(res);
            this.set_list = res.data;
            this.loadingTag.clear();
        });

        this.set_list.forEach(item => {
            item.isActive = false;
            this.set_list.push(item);
        });
    },
    methods: {
        back () {
            this.$router.go(-1);
        },
        goIndex () {
            this.$router.push('/index');
        },
        play (item) {
            this.loadingTag = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
            this.changeBgColor(item);
            getPlayUrl({ params: { url: item.set_href } }).then(res => {
                console.log(res.data);
                this.iframe_src = res.data[0].src;
                this.loadingTag.clear();
            })
        },
        changeBgColor (item) {
            this.set_list.map(i => {
                i.isActive = false;
            })
            item.isActive = true;
            console.log(this.set_list)
        }
    }
}
</script>

<style lang="less" scoped>
.top {
    width: 100vw;
    margin-top: 20px;

    .play-box {
        margin: 0 auto;
        width: 90vw;
        height: 55vw;
        background-color: #333333;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
}

.set-list-box {
    max-width: 90vw;
    max-height: 50vh;
    margin: 0 auto;
    margin-top: 2vh;
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    justify-content: center;
    align-content: flex-start;
    box-sizing: border-box;
    border: 1px solid #ccc;

    .set-list-item {
        width: 32.5%;
        text-align: center;
        height: 5vh;
        line-height: 5vh;
        font-size: 14px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 1px;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 5px 0 5px;
    }

    .set-list-item-active {
        background-color: rgb(71, 194, 243);
    }
}
</style>
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
        <van-divider>
            选集 -&nbsp;
            <span style="color: deepskyblue" @click="reload">刷新</span>
        </van-divider>
        <div class="set-list-box" v-if="!bigList">
            <div
                class="set-list-item"
                v-for="(item, index) in set_list"
                :key="index"
                :class="{'set-list-item-active': item.isActive}"
                @click="play(item)"
            >{{item.set_title}}</div>
        </div>

        <div class="set-list-box-big" v-if="bigList">
            <div class="set-source-big" v-for="(source, i) in set_list" :key="i">
                <van-divider>{{source.set_source}}</van-divider>
                <div class="set-line-box-big">
                    <div
                        class="set-list-item-big"
                        v-for="(item, index) in source.sets"
                        :key="index"
                        :class="{'set-list-item-active': item.isActive}"
                        @click="play(item)"
                    >{{item.set_title}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllData } from '../utils/api_methods'

export default {
    data () {
        return {
            movie_title: this.$route.params.title,
            set_list: [],
            iframe_src: "",
            loadingTag: null,
            _id: '',
            bigList: false
        }
    },
    created () {
        this.loadingTag = this.$toast.loading({
            message: '加载中...',
            forbidClick: false,
            duration: 0
        });
        let _href = this.$route.params.href.replace(/\+/g, '/').replace(/-/g, '.');
        this._id = this.$route.params.id;
        console.log(_href);
        console.log(this._id);

        getAllData({ params: { id: this._id, type: 'get_set', url: _href } }).then(res => {
            console.log(res.data);
            this.set_list = res.data;
            if (this.set_list[0]['sets']) {
                this.bigList = true;
            }
            this.loadingTag.clear();
        });

        this.set_list.forEach(item => {
            this.$set(item, 'isActive', false)
            // item.isActive = false;
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
                forbidClick: false,
                duration: 0
            });
            this.changeBgColor(item);
            getAllData({ params: { id: this._id, type: 'get_play_url', url: item.set_href } }).then(res => {
                console.log(res.data, '-----');
                this.iframe_src = res.data[0].src;
                this.loadingTag.clear();
            })
        },
        changeBgColor (item) {
            this.set_list.map(i => {
                i.isActive = false;
            })
            item.isActive = true;
            console.log(item)
        },
        reload () {
            location.reload();
        }
    }
}
</script>

<style lang="less" scoped>
.top {
    width: 100vw;
    margin-top: 0px;

    .play-box {
        margin: 0 auto;
        width: 100vw;
        height: 60vw;
        background-color: #333333;

        iframe {
            width: 100%;
            height: 100%;
        }
    }
}

.set-list-box {
    width: 98vw;
    height: calc(100vh - 50px - 60vw - 100px);
    margin: 0 auto;
    margin-top: 2vh;
    overflow-y: scroll;
    box-sizing: border-box;

    .set-list-item {
        width: 32.5%;
        text-align: center;
        height: 9vw;
        line-height: 9vw;
        font-size: 13px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 1px;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 5px 0 5px;
        float: left;
        border-radius: 5px;
    }
}

.set-list-item-active {
    background-color: rgb(75, 155, 230);
    color: white;
}

.set-list-box-big {
    width: 98vw;
    height: calc(100vh - 50px - 60vw - 100px);
    margin: 0 auto;
    margin-top: 2vh;
    overflow-y: scroll;
    box-sizing: border-box;

    .set-line-box-big {
        display: flex;
        overflow-x: scroll;
    }

    .set-list-item-big {
        flex-shrink: 0;
        white-space: nowrap;
        flex-basis: 27vw;
        text-align: center;
        height: 9vw;
        line-height: 9vw;
        font-size: 13px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        margin: 1px;
        white-space: nowrap;
        overflow: hidden;
        padding: 0 5px 0 5px;
        border-radius: 5px;
    }
}
</style>
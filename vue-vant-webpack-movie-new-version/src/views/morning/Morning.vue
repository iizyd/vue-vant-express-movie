<template>
    <div id="all">
        <div class="top">
            <van-search
                placeholder="请输入搜索关键词"
                v-model="search_bg_value"
                background="deepskyblue"
                @search="search"
            />
        </div>

        <!-- <van-tabs>
            <van-tab v-for="index in 8" :title="'标签 ' + index" :key="index">内容 {{ index }}</van-tab>
        </van-tabs>-->

        <div class="main-padding-box">
            <!-- 首页的数据 -->
            <van-row gutter="0" v-show="!isSearch">
                <van-col
                    span="8"
                    class="hot-list-item"
                    v-for="(item, index) in list_data"
                    :key="index"
                    @click="goDetail(item)"
                >
                    <img v-lazy="item.banner" />
                    <span>{{item.title}}</span>
                </van-col>
            </van-row>

            <!-- 搜索的数据 -->
            <van-row gutter="0" v-show="isSearch">
                <van-col
                    span="8"
                    class="hot-list-item"
                    v-for="(item, index) in search_data"
                    :key="index"
                    @click="goDetail(item)"
                >
                    <img v-lazy="item.banner" />
                    <span>{{item.title}}</span>
                </van-col>

                <div class="tip" v-if="resultIsNull">空</div>
            </van-row>
        </div>
    </div>
</template>

<script>
import { Get, Post } from '../../utils/api'
import { MgetIndexData, MgetSearchData } from '../../utils/api_methods'


export default {
    data () {
        return {
            search_bg_value: '',
            list_data: [],
            search_data: [],
            isSearch: false,
            loadingTag: null,
            resultIsNull: false
        }
    },
    created () {
        this.loadingTag = this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        MgetIndexData().then(res => {
            console.log(res.data);
            this.list_data = res.data;
            this.loadingTag.clear();
        })
    },
    methods: {
        search () {
            this.isSearch = true;
            this.loadingTag = this.$toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration: 0
            });
            MgetSearchData({ params: { wd: this.search_bg_value } }).then(res => {
                this.search_data = res.data;
                this.loadingTag.clear();
            })
        },
        goDetail (item) {
            console.log(item.href);
            this.$router.push(`/mdetail/${item.title.replace(/\//g, '-')}/${item.href.replace(/\./, '-').replace(/\//g, '+')}`);
        }
    },
    watch: {
        search_bg_value () {
            if (this.search_bg_value.length > 0) {
                this.isSearch = true;
            } else {
                this.search_data = [];
                this.isSearch = false;
            }
        },
        search_data () {
            if (this.search_data.length == 0) {
                this.resultIsNull = true;
            } else {
                this.resultIsNull = false;
            }
        }
    }
}
</script>

<style lang="less" scoped>
#all {
    overflow: hidden;
}

.main-padding-box {
    padding-bottom: 8.5vh;
    overflow-y: scroll;
    height: calc(100vh - 8.5vh - 14vh);
    box-sizing: border-box;
}

.top {
    width: 100vw;
    height: 14vh;
    background-color: deepskyblue;
    box-sizing: border-box;
    padding-top: 10vw;
    // overflow: hidden;
    z-index: 1000;
    min-height: 92px;
}

.hot-list-item {
    height: 51vw;
    padding: 10px;
    border-radius: 10px;

    img {
        width: 100%;
        height: 89%;
        border-radius: 2px;
        box-shadow: 0 0 5px 1px rgb(167, 167, 167);
    }

    span {
        display: block;
        height: 11%;
        text-align: center;
        padding: 0 5px;
        font-size: 13px;
        overflow: hidden;
        white-space: nowrap;
    }
}

.tip {
    width: 100vw;
    height: 30vh;
    text-align: center;
    line-height: 30vh;
    color: rgb(97, 97, 97);
}
</style>
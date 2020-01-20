<template>
    <div id="all">
        <div class="search-outter">
            <div class="search-close">
                <van-icon name="close" v-show="inputClear" @click="clearInput" />
            </div>
            <input
                class="search-box"
                :placeholder="inputPlaceholder"
                @focus="inputFocus"
                @blur="inputBlur"
                @keyup="inputKeyUp"
                @keyup.enter="search"
                v-model="keyWords"
                ref="input"
            />
            <div class="search-btn">
                <van-icon name="search" @click="search" />
            </div>
        </div>

        <van-action-sheet v-model="showBottom" :title="keyWords + `--搜索结果`">
            <div class="result-box">
                <van-tabs>
                    <van-tab v-for="(item) in result_list" :title="item.name" :key="item.id">
                        <div class="result-main-box">
                            <!-- 搜索的数据 -->
                            <van-row gutter="0">
                                <van-col
                                    @click="goDetail(item_data, item.id)"
                                    span="8"
                                    class="result-item"
                                    v-for="(item_data, index_data) in item.data"
                                    :key="index_data"
                                >
                                    <img v-lazy="item_data.banner" />
                                    <span>{{item_data.title}}</span>
                                </van-col>
                            </van-row>
                        </div>
                    </van-tab>
                </van-tabs>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import { searchAll } from '../utils/api_methods'

export default {
    data () {
        return {
            showBottom: false,
            inputPlaceholder: "可以少输，但不要输错哦!",
            keyWords: '',
            historyKeyWords: '',
            inputClear: false,
            loadingTag: null,
            result_list: [],
            history_result_list: [],
        }
    },
    created () {
    },
    methods: {
        // 监听事件
        inputFocus () {
            this.inputPlaceholder = '';
            if (this.keyWords.length > 0) {
                this.inputClear = true;
            } else {
                this.inputClear = false;
            }
        },
        inputBlur () {
            this.inputPlaceholder = "可以少输，但不要输错哦!";
        },
        inputKeyUp () {
            if (this.keyWords.length > 0) {
                this.inputClear = true;
            } else {
                this.inputClear = false;
            }
        },
        // 清空
        clearInput () {
            this.keyWords = '';
            this.inputClear = false;
        },
        // 搜索
        search () {
            this.$refs.input.blur();
            if (this.keyWords.length <= 0) {
                this.$toast({
                    message: '请输入关键字!',
                    duration: 1000
                });
                return false;
            }
            console.log(this.loadingTag);
            this.showBottom = true;
            if (this.keyWords == this.historyKeyWords) {
                this.result_list = this.history_result_list;
                return false;
            }
            this.loadingTag = this.$toast.loading({
                message: '加载中...',
                forbidClick: false,
                duration: 0
            });

            searchAll({ params: { wd: this.keyWords } }).then(res => {
                console.log(res.data);
                this.result_list = res.data;
                this.historyKeyWords = this.keyWords;
                this.history_result_list = this.result_list;
                this.loadingTag.clear();
            })
        },
        goDetail (item, id) {
            console.log(id);
            this.$router.push(`/detail/${id}/${item.title.replace(/\//g, '-')}/${item.href.replace(/\./, '-').replace(/\//g, '+')}`);
        }
    },
    watch: {
    }
}
</script>

<style lang="less" scoped>
#all {
    overflow: hidden;

    .search-outter {
        width: 85vw;
        height: 11vw;
        margin: 25vh auto 3vh;
        background-color: rgb(75, 155, 230);
        border-radius: 7px;
        box-shadow: 0px 0px 10px 1px #ccc;
        overflow: hidden;
        position: relative;

        .search-close {
            position: absolute;
            right: 18%;
            height: 100%;
            line-height: 12vw;
            color: #ccc;
        }

        .search-box {
            text-align: center;
            font-size: 12px;
            float: left;
            border: none;
            outline: none;
            -webkit-appearance: none;
            width: 85%;
            height: 100%;
            line-height: 11vw;
            box-sizing: border-box;
            padding: 0 30px 0 18px;
        }

        .search-btn {
            float: left;
            border-radius: 50%;
            margin: 0 auto;
            width: 15%;
            height: 15%;
            line-height: 13vw;

            text-align: center;
            color: #fff;
            font-size: 25px;
        }
    }

    // 底部菜单
    .van-action-sheet {
        max-height: 90vh;
        height: 90vh;
        color: #323233;
    }

    .result-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 5px;

        // 装结果数据的盒子
        .result-main-box {
            width: 100%;
            height: 100%;
            overflow-y: scroll;
            height: calc(90vh - 100px);

            .result-item {
                box-sizing: border-box;
                padding: 15px 12px 10px;
                width: 33.3%;

                img {
                    width: 100%;
                    height: 37vw;
                    box-shadow: 0px 0px 10px 1px #ccc;
                }

                span {
                    display: block;
                    width: 100%;
                    height: 15px;
                    font-size: 12px;
                    line-height: 15px;
                    text-align: center;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
<template>
    <div id="all">
        <div class="search-outter">
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
            <div class="search-close">
                <van-icon name="close" v-show="inputClear" @click="clearInput" />
            </div>
            <div class="search-btn">
                <van-icon name="search" @click="search" />
            </div>
        </div>

        <div class="switch-box">
            <van-divider>搜索模式</van-divider>
            <van-radio-group v-model="radio">
                <van-radio name="all">聚合搜索</van-radio>
                <van-radio name="1">资源一</van-radio>
                <van-radio name="2">资源二</van-radio>
                <van-radio name="3">资源三</van-radio>
            </van-radio-group>
        </div>

        <van-action-sheet v-model="showBottom" :title="keyWords + `--搜索结果`">
            <div class="result-box">
                <van-tabs v-show="radio == 'all' ? true : false">
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

                <div class="result-main-box" v-show="radio != 'all' ? true : false">
                    <!-- 搜索的数据 -->
                    <van-row gutter="0">
                        <van-col
                            @click="goDetail(item_data, radio)"
                            span="8"
                            class="result-item"
                            v-for="(item_data, index_data) in result_list"
                            :key="index_data"
                        >
                            <img v-lazy="item_data.banner" />
                            <span>{{item_data.title}}</span>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
import { searchAll, getSearch } from '../utils/api_methods'

export default {
    data () {
        return {
            showBottom: false,
            inputPlaceholder: "可以少输，但不要输错哦!",
            keyWords: '',
            historyKeyWords: '',
            inputClear: false,
            loadingTag: null,
            timer: null,
            result_list: [],
            history_result_list: [],
            second: 30,
            radio: 'all'
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
            if (this.keyWords.length > 0) {
                this.inputClear = true;
            } else {
                this.inputClear = false;
            }
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
            this.$refs.input.focus();
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

            this.loadingTip();

            if (this.radio == 'all') {
                // 搜索全部
                searchAll({ params: { wd: this.keyWords }, timeout: this.second * 1000 }).then(res => {
                    console.log(res.data);
                    this.result_list = res.data;
                    this.historyKeyWords = this.keyWords;
                    this.history_result_list = this.result_list;

                    this.loadingSuccess();
                }).catch(err => {
                    this.loadingFail();
                })
            } else {
                getSearch({ params: { id: this.radio, type: 'get_search', wd: this.keyWords }, timeout: this.second * 1000 }).then(res => {
                    console.log(res.data);
                    this.result_list = res.data;
                    this.historyKeyWords = this.keyWords;
                    this.history_result_list = this.result_list;

                    this.loadingSuccess();
                }).catch(err => {
                    this.loadingFail();
                });
            }
        },
        goDetail (item, id) {
            console.log(id);
            this.$router.push(`/detail/${id}/${item.title.replace(/\//g, '-')}/${item.href.replace(/\./, '-').replace(/\//g, '+')}`);
        },
        loadingTip () {
            this.loadingTag = this.$toast.loading({
                message: `倒计时${this.second}秒`,
                forbidClick: true,
                duration: 0
            });
            this.timer = setInterval(() => {
                this.second--;
                if (this.second) {
                    this.loadingTag.message = `倒计时 ${this.second} 秒`;
                } else {
                    clearInterval(this.timer);
                    // 手动清除 Toast
                    this.loadingTag.clear();
                    this.loadingFail();
                }
            }, 1000);
        },
        loadingSuccess () {
            this.loadingTag.clear();
            clearInterval(this.timer);
            this.$toast.success('加载成功');
            this.second = 30;
        },
        loadingFail () {
            this.loadingTag.clear();
            clearInterval(this.timer);
            this.$toast.fail('可能网速慢，请重试');
            this.second = 30;
        }
    },
    watch: {
        radio (newValue, oldValue) {
            if (newValue != oldValue) {
                this.historyKeyWords = '';
            }
        }
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
        // position: relative;

        .search-close {
            // position: absolute;
            width: 10%;
            float: left;
            // right: 18%;
            height: 100%;
            line-height: 12vw;
            color: #ccc;
            background-color: #fff;
            text-align: center;
            margin: 0;
        }

        .search-box {
            text-align: center;
            font-size: 12px;
            float: left;
            border: none;
            outline: none;
            margin: 0;
            -webkit-appearance: none;
            width: 76%;
            height: 100%;
            // line-height: 11vw;
            box-sizing: border-box;
            padding: 3.7vw 0px 3.7vw 18px;
            border-radius: 0%;
        }

        .search-btn {
            float: left;
            border-radius: 50%;
            margin: 0 auto;
            width: 14%;
            height: 15%;
            line-height: 13vw;

            text-align: center;
            color: #fff;
            font-size: 25px;
        }
    }

    // 底部菜单
    .van-action-sheet {
        max-height: 90%;
        height: 90%;
        // max-height: 90vh;
        // height: 90vh;
        color: #323233;
        overflow-x: auto;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch; // 解决ios滑动不流畅的问题
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

    .switch-box {
        width: 40vw;
        margin: auto;

        .van-radio {
            width: 100%;
            height: 8vw;
            // border: 1px solid #ccc;
            font-size: 13px;
            line-height: 8vw;
            color: rgb(110, 110, 110);
        }
    }
}
</style>
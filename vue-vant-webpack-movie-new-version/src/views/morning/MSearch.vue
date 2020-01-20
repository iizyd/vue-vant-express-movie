<template>
    <div>
        <van-row gutter="0">
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
    </div>
</template>

<script>
import { MgetIndexData, MgetSearchData } from '../../utils/api_methods'

export default {
    data () {
        return {
            list_data: []
        }
    },
    created () {
        getSearchData({ params: { wd: '11' } }).then(res => {
            console.log(res.data);
            this.list_data = res.data;
        })
    },
    methods: {
        goDetail (item) {
            console.log(item.href);
            this.$router.push(`/detail/${item.title.replace(/\//g, '-')}/${item.href.replace(/\./, '-').replace(/\//g, '+')}`);
        }
    }
}
</script>

<style lang="less" scoped>
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
</style>
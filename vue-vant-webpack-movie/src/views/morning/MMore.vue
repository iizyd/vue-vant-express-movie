<template>
    <div id="all">
        <div class="top-title">精选站点</div>
        <div class="card-box main-padding-box">
            <van-notice-bar
                text="请注意: 本站只提供影视网站的入口地址，不保存任何资源，其站内可能出现不良广告及链接..."
                left-icon="volume-o"
            />
            <div
                class="card"
                v-for="(item, index) in site_list"
                :key="index"
                @click="goMoreDetail(item)"
            >
                <div class="card-id">{{item.id}}</div>
                <div class="card-title">{{item.title}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { MgetSiteList } from '../../utils/api_methods'
export default {
    data () {
        return {
            site_list: [],
            loadingTag: null
        }
    },
    created () {
        this.loadingTag = this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
            duration: 0
        });
        getSiteList().then(res => {
            this.site_list = res.data;
            this.loadingTag.clear();
        })
    },
    methods: {
        goMoreDetail (item) {
            let url = btoa(item.url);
            let title = item.title;
            this.$router.push(`/more_detail/${title}/${url}`);
        }
    }
}
</script>

<style lang="less" scoped>
.all {
    overflow: hidden;
    display: flex;
}

.main-padding-box {
    padding-bottom: 8.5vh;
}

.top-title {
    width: 100vw;
    height: 12vw;
    background-color: deepskyblue;
    box-sizing: border-box;
    text-align: center;
    line-height: 12vw;
    font-size: 18px;
    color: white;
    font-weight: 600;
    box-shadow: 0 2px 5px 1px #ccc;
}

.card-box {
    height: calc(100vh - 12vw - 8.5vh);
    overflow-y: scroll;

    .card {
        width: 95vw;
        height: 15vw;
        margin: 0 auto;
        margin-top: 2.5vw;
        background-color: rgb(115, 196, 216);
        box-sizing: border-box;
        padding: 2vw;
        display: flex;
        flex-wrap: nowrap;
        border-radius: 10px;
        box-shadow: 0 0 5px 1px #ccc;

        .card-id {
            width: 10%;
            height: 11vw;
            line-height: 11vw;
            text-align: center;
            color: white;
            font-size: 22px;
            font-weight: bold;
            font-style: italic;
        }

        .card-title {
            width: 90%;
            height: 11vw;
            line-height: 11vw;
            box-sizing: border-box;
            padding-left: 4vw;
            color: white;
        }
    }
}
</style>
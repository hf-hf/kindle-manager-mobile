<template>
    <div class="wrapper">
        <mt-field label="名称" readonly="readonly" v-model="novel.name"></mt-field>
        <mt-field label="标题" readonly="readonly" v-model="novel.title"></mt-field>
        <mt-field label="地址" readonly="readonly" v-model="novel.url"></mt-field>
        <mt-field label="标题CSS" readonly="readonly" v-model="novel.titleCssQuery"></mt-field>
        <mt-field label="翻页标识" readonly="readonly" v-model="novel.nextPageText"></mt-field>
        <mt-field label="编码" readonly="readonly" v-model="novel.htmlEncoding"></mt-field>
        <mt-field label="内容标识" readonly="readonly" v-model="novel.contentSymbol"></mt-field>
        <br/>
        <mt-button size="large" type="primary">保存</mt-button>
        <mt-button size="large" type="danger" @click="backHome()" style="margin-top: 5px;">取消</mt-button>
    </div>
</template>
<script>
import { Toast, Loadmore, Indicator } from 'mint-ui';
import { getDetail } from '@/api/novel.js'

export default {
    data() {
        return {
            novelId: null,
            novel: {
                name: "",
                domain: "",
                url: "",
                title: "",
                titleCssQuery: "",
                novelSymbol: "",
                nextPageText: "",
                htmlEncoding: "",
                contentSymbol: "",
            }
        }
    },
    methods: {
        getNovelId(){
            const novelId = this.$route.query.novelId
            // 将数据放在当前组件的数据内
            this.novelId = novelId
            //this.keyupMallName()
            //console.log("novelId:" + novelId)
        },
        statusFilter(status) {
            return isdelStatus[status];
        },
        backHome(){
            this.$router.push({
                path: '/'
            })
        }
    },
    mounted(){
        this.novelId = this.$route.query.novelId
        Indicator.open('加载中...')
        getDetail(parseInt(this.$route.query.novelId)).then(response =>{
            this.novel = response.data
            console.log(this.novel)
            Indicator.close()
        }).catch(() => {
            Indicator.close();
        })
    }
}
</script>
<style>
    .mint-cell-title {
        text-align: left;
    }
</style>

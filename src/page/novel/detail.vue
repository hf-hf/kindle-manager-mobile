<template>
    <div class="wrapper">
        <mt-field label="名称" readonly="readonly" v-model="this.novel.name"></mt-field>
        <mt-field label="标题" readonly="readonly" v-model="this.novel.title"></mt-field>
        <mt-field label="地址" readonly="readonly" v-model="this.novel.url"></mt-field>
        <mt-field label="标题CSS" readonly="readonly" v-model="this.novel.titleCssQuery"></mt-field>
        <mt-field label="翻页标识" readonly="readonly" v-model="this.novel.nextPageText"></mt-field>
        <mt-field label="编码" readonly="readonly" v-model="this.novel.htmlEncoding"></mt-field>
        <!-- <mt-field label="状态" readonly="readonly" v-model="this.novel.isdel"></mt-field> -->
        <mt-field label="内容标识" readonly="readonly" v-model="this.novel.contentSymbol"></mt-field>
        <br/>
        <mt-button size="large" type="primary">保存</mt-button>
        <br/>
        <mt-button size="large" type="danger" @click="backHome()">取消</mt-button>
    </div>
</template>
<script>
import { Toast, Loadmore } from 'mint-ui';
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
                isdel: "",
                contentSymbol: ""
            }
        }
    },
    methods: {
        getNovelId(){
            const novelId = this.$route.query.novelId
            // 将数据放在当前组件的数据内
            this.novelId = novelId
            //this.keyupMallName()
            console.log("novelId:" + novelId)
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
        getDetail(parseInt(this.$route.query.novelId)).then(response =>{
            this.novel = response.data
            console.log(this.novel)
        })
    }
}
</script>
<style>
    .mint-cell-title {
        text-align: left;
    }
</style>

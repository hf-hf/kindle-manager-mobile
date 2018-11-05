<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <div class="page-title">{{ selected }}导航菜单</div>
      <!-- <mt-button type="primary" @click.native="fetchData">primary</mt-button> -->
      <div>
        <mt-cell class="page-part" title="当前选中" :value="selected" />
      </div>
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="小说" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="scrollDisabled"
            infinite-scroll-distance="10">
          <mt-cell-swipe v-for="row in data" :key="row.id" :title="row.name" :label="row.title" @click.native="getNovelDetail(row.id)"
            :right="[
                {
                    content: statusFilter(row.isdel),
                    style: { background: backGroupFilter(row.isdel), color: '#fff'},
                    handler: () => disableNovel(row.id,row.isdel == 0 ? 1 : 0)
                }
            ]">
            <!-- <mt-button size="small" v-if="row.isdel == 0" type="danger" @click.native.stop="disableNovel(row.id,1)">{{ statusFilter(row.isdel) }}</mt-button>
            <mt-button size="small" v-if="row.isdel == 1" type="primary" @click.native.stop="disableNovel(row.id,0)">{{ statusFilter(row.isdel) }}</mt-button> -->
            <svg-icon slot="icon" :icon-class="followFilter(row.userId)" @click.native.stop="doFollow(row.id, row.userId)"/>
            <span class="n-update-time">更新:{{ row.updateTimeText }}</span>
          </mt-cell-swipe>
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
          <mt-cell title="标题文字" icon="more" value="带 icon"></mt-cell>
          <mt-cell title="标题文字"></mt-cell>
          <mt-cell title="标题文字" value="说明文字"></mt-cell>
          <mt-cell
            title="标题文字"
            to="//github.com"
            is-link
            value="带链接">
          </mt-cell>
          <mt-cell title="标题文字" is-link>
            <span style="color: green">这里是元素</span>
          </mt-cell>
          <mt-cell title="标题" label="描述信息" is-link></mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="发现">
          <div class="page-cell">
            <div class="page-title">Cell Swipe</div>
            <mt-cell-swipe
              v-for="(n,item) in 10"
              :key="item"
              :right="rightButtons"
              title="swipe me">
            </mt-cell-swipe>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <div class="page-part">
            <mt-cell v-for="(n, index) in 12" :key="index" :title="'我的 ' + n" />
          </div>
          <router-link to="/">
            <mt-button type="danger" size="large">退出</mt-button>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="小说">
        <img slot="icon" src="../assets/novel.png">
        小说
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="../assets/100x100.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/100x100.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/100x100.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Toast, Loadmore, Indicator } from 'mint-ui';
import { getList, disableNovel, followNovel } from '@/api/novel.js'

const isdelStatus = ['启用', '禁用'];
const swipeBackGroup = ['#09F768', '#F70938'];

export default {
  name: 'page-tabbar',
  data() {
    return {
      selected: '小说',
      scrollDisabled: false,
      listQuery: {
        page: 1,
        total: null,
        pageSize: null,
        rows: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        isdel: null,
        follow: null,
        sort: '+id'
      },
      data: null,
      isdelTextMap: {
        0: '启用',
        1: '禁用'
      }
    }
  },
  filters: {
    
  },
  watch: {
      selected: function (val, oldVal) {
        // 这里就可以通过 val 的值变更来确定
        console.log(val)
        if(val == oldVal){
          return;
        }
        if("小说" == val){
          this.fetchData()
        }
      }
  },
  mounted(){
    if(this.selected == "小说"){
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      //this.listLoading = true;
      getList(this.listQuery).then(response => {
        console.log(response.data.list);
        this.data = response.data.list;
        this.listQuery.page = response.data.pageNum;
        this.listQuery.total = response.data.total;
        this.listQuery.pageSize = response.data.pageSize;
        //this.listLoading = false;
      })
    },
    backGroupFilter(isdel){
      return swipeBackGroup[isdel];
    },
    statusFilter(status) {
      return isdelStatus[status];
    },
    followFilter(follow) {
      if(follow == 0){
        return "no_follow"
      } else{
        return "follow"
      }
    },
    disableNovel(id,isdel) {
      console.log("disableNovel" + isdel)
      disableNovel(id,isdel).then(response =>{
        Toast({
            message: this.isdelTextMap[isdel] + '成功',
            iconClass: 'mint-toast-icon mintui mintui-success',
            duration: 2000
        });
        this.fetchData()
      })
    },
    getNovelDetail(id){
      console.log(id)
      this.$router.push({
        path: '/novel/detail',
        query: {
          novelId: id
        }
      })
    },
    doFollow(novelId, flag){
      followNovel(novelId, flag).then(response =>{
        Toast({
          message: response.data,
          iconClass: 'mint-toast-icon mintui mintui-success',
          duration: 2000
        })
        this.fetchData()
      })
    },
    leftButtonHandler(evt) {
      console.log(123);
    },
    loadMore() {
      setTimeout(() => {
        if(this.listQuery.total > this.listQuery.pageSize){
          this.listQuery.pageSize +=10
          if(this.listQuery.pageSize > this.listQuery.total){
            this.listQuery.pageSize = this.listQuery.total;
          }
          this.fetchData()
        } else{
          this.scrollDisabled = true
          Toast({
            message: '已到底部！'
          });
          return;
        }
      }, 2500);
    }
  },
  created() {
      this.rightButtons = [
        {
          content: 'Mark as Unread',
          style: { background: 'lightgray', color: '#fff' }
        },
        {
          content: 'Delete',
          style: { background: 'red', color: '#fff' },
          handler: () => this.$messagebox('delete')
        }
      ];
    }
};
</script>

<style>
  .page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }
  .mint-cell-title {
    text-align: left;
  }
  .mint-cell-title {
    letter-spacing:1px;
    line-height: 100%;
  }
  .mint-cell-title {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .n-update-time{
    position:absolute;
    font-size: 8px;
    right:5px;
    top:5px;
    /* z-index:100; */
  }
</style>
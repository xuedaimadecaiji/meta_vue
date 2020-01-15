<template>
  <div class="Footer">
    <!-- <div class="title">
      {{title}}
    </div> -->
    <div class="links">
      <router-link :to="{name: 'AboutIndex'}">关于我们</router-link>
      <router-link :to="{name: 'ContactIndex'}">联系我们</router-link>
      <router-link :to="{name: 'HelpIndex'}">帮助</router-link>
      <router-link :to="{name: 'DownloadIndex'}">常用下载</router-link>
    </div>
    <div class="copyright">
      <div><i class="fa fa-copyright"></i> Copyright CQU 430 All Right Reserved.</div>
      <div>重庆大学 430 版权所有2019 地址：重庆市沙坪坝区沙正街174号  邮编400044</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      title: '基础制造工艺资源环境负荷数据平台'
    }
  }
}
</script>

<style scoped lang="scss">
  .Footer{
    padding: 10px 0 10px 0;
    background: #4A524F;
    div{
      text-align: center!important;
      color: #fff;
    }
    .title{
      font-size: 18px;
      padding: 20px;
    }
    .links{
      a{
        margin: 10px;
        color: #fff;
        font-size: 13px;
      }
    }
    .copyright{
      padding: 15px 0 0 0;
      line-height: 25px;
      font-size: 12px;
    }
  }
</style>

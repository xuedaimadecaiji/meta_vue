<template>
  <div class="AccountViewMain">
    <div class="Title">
      欢迎来到，基础制造工艺资源环境负荷数据库
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AccountViewMain'
}
</script>

<style lang="scss">
  .AccountViewMain{
    .Title{
      margin: 0 0 20px 0;
      font-size: 30px;
      padding: 80px;
      text-align: center;
      background: #4A524F!important;
      color: gold;
    }
  }
  .Login{
    form{
      padding: 20px 100px;
      margin: 80px auto;
      width: 400px;
      border:2px solid #eef;
      box-shadow: #eef 0 0 10px 2px;//边框内阴影
      .title{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        padding: 10px 0 30px 0;
      }
    }
  }
</style>

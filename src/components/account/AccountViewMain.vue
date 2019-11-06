<template>
  <div class="AccountViewMain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AccountViewMain'
}
</script>

<style lang="scss">
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
      button{
      }
    }
  }
</style>

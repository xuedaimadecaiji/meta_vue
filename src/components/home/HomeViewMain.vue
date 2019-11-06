<template>
  <div class="HomeViewMain">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'HomeViewMain'
}
</script>

<style lang="scss">
  .HomeIndex, .HomeCategory{
    .wrapper{
      max-width: 1000px;
      margin: auto;
      h1{
        font-size: 30px;
        margin: 100px;
        text-align: center;
      }
      a{
        font-weight: bolder;
        font-size: larger;
        text-align: center!important;
        &:hover{
          .el-card{
            background: darkslategray!important;
            color: #ffffff;
          }
        }
      }
      .el-card__body{
        padding: 50px;
        text-align: center!important;
      }
      .el-row{
        margin: 20px 0;
      }
    }
  }
</style>

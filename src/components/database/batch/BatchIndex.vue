<template>
  <div class="BatchIndex">
    <h1>
      数据批量处理中心
      <p>
        <el-button @click="handleClear">
          清理缓存
        </el-button>
      </p>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'BatchIndex',
  methods: {
    handleClear () {
      this.$store.commit('clear')
      history.go(0)
    }
  }
}
</script>

<style lang="scss">
  .BatchIndex{
    h1{
      margin: 50px;
      text-align: center;
    }
  }
</style>

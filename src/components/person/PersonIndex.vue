<template>
  <div class="PersonIndex">
    <div class="wrapper">
      <h3>
        <div>用户名： {{auth['username']}}</div>
        <div>加入时间： {{auth['createdAt']}}</div>
        <div>邮箱： {{auth['email']}}</div>
      </h3>
      <el-divider></el-divider>
      <el-button @click="handleLogout">
        退出登录
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonIndex',
  computed: {
    auth () {
      return this.$store.state.auth
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleLogout () {
      this.$store.commit('logout')
      history.go(0)
    }
  }
}
</script>

<style scoped>

</style>

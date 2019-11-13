<template>
  <div class="Login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <div class="title">账号登录</div>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="账号邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="账号密码"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{name: 'AccountHandle'}">忘记密码</router-link>
        <router-link :to="{name: 'Register'}" style="float: right">注册账号</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from 'api'
export default {
  name: 'Login',
  data () {
    const checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      if (!value) {
        return callback(new Error('邮箱不能为空'))
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的邮箱格式'))
        }
      }, 100)
    }
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.get({url: 'user/1'}).then(res => {
            this.$store.commit('login', res)
            this.$router.push({name: 'HomeIndex'})
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>

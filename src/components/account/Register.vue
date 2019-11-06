<template>
  <div class="Login Register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
      <div class="title">账号注册</div>
      <el-form-item prop="email">
        <el-input v-model="ruleForm.email" placeholder="账号邮箱"></el-input>
      </el-form-item>
      <el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="输入密码"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-form-item prop="passwordAgain">
          <el-input type="password" v-model="ruleForm.passwordAgain" placeholder="确认密码"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{name: 'Login'}">登录账号</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
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
    const checkPasswordAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        password: '',
        passwordAgain: ''
      },
      rules: {
        email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordAgain: [
          { validator: checkPasswordAgain, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
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

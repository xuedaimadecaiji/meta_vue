<template>
  <div class="UserGroup">
    <el-button type="primary" @click="postDrawer = true">
      <i class="fa fa-fw fa-plus-circle"></i> 新建分组
    </el-button>
    <el-divider></el-divider>
    <el-row class="groupSearch" :gutter="20">
      <el-col :span="12">
        <el-input placeholder="搜索群组" v-model="content" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-tabs v-model="activeName">
      <el-tab-pane label="所有分组" name="first">
        <el-row :gutter="20">
          <el-col :span="16">
            <BaseGroupItem v-for="item in groupList" :key="item.index" :item="item"></BaseGroupItem>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="创建的分组" name="second">
        <el-row :gutter="20">
          <el-col :span="16">
            <OwnGroupItem v-for="item in user['ownGroups']" :key="item.index" :item="item"></OwnGroupItem>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="加入的分组" name="third">
        <el-row :gutter="20">
          <el-col :span="16">
            <JoinGroupItem v-for="item in user['joinGroups']" :key="item.index" :item="item"></JoinGroupItem>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-drawer
      title="新建分组"
      :visible.sync="postDrawer"
      :direction="'rtl'"
      size="50%">
      <el-form ref="postForm" v-model="postForm" label-width="120px">
        <el-form-item prop="title" label="分组标题">
          <el-input v-model="postForm.title"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="分组描述">
          <el-input type="textarea" v-model="postForm.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handlePost">
            立即创建
          </el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import api from 'api'
import BaseGroupItem from './widgets/BaseGroupItem'
import OwnGroupItem from './widgets/OwnGroupItem'
import JoinGroupItem from './widgets/JoinGroupItem'
export default {
  name: 'UserGroup',
  computed: {
    user () {
      return this.$store.state.auth
    }
  },
  components: {
    BaseGroupItem,
    OwnGroupItem,
    JoinGroupItem
  },
  data () {
    return {
      content: null,
      activeName: 'first',
      groupList: [],
      postDrawer: false,
      postForm: {
        userId: null,
        title: null,
        description: null
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: '/users/groups'}).then(res => {
        vm.groupList = res
      })
    })
  },
  methods: {
    handleManage (index, row) {
      console.log(index, row)
    },
    handlePost () {
      this.postForm.userId = this.user.id
      api.post({url: 'users/groups', params: this.postForm}).then(res => {
        history.go(0)
      })
    }
  }
}
</script>

<style scoped>

</style>

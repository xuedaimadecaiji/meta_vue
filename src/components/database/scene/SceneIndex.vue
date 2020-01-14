<template>
  <el-container class="SceneCategory">
    <el-header>
      <div class="wrapper">
        <el-button style="margin-top: 20px" type="primary" @click="postSceneDrawer=true">
          <i class="fa fa-plus-circle"></i>
          新增工艺场景
        </el-button>     <!--以弹窗（drawer抽屉）的形式新增工艺场景-->
        <el-divider></el-divider>
        <el-form class="searchForm" ref="searchForm" :model="searchForm" :rules="searchRules">
        <el-form-item>
          <el-radio-group v-model="searchForm.selectCategoryId" size="medium" @change="handleChange">
            <el-radio-button :label="''">
              所有分类
            </el-radio-button>
            <el-radio-button v-for="item in categories" :label="item['id']" :key="item.index">
              {{item['title']}}
            </el-radio-button>    <!--直接从工艺场景分类表中读工艺类型，做成可选的单选按钮-->
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="content">
          <el-input placeholder="搜索工艺场景" v-model="searchForm.content" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-form-item>
      </el-form>
      </div>
      <el-drawer
        title="新增工艺场景"
        :visible.sync="postSceneDrawer"
        :direction="'rtl'"
        :size="'50%'">
        <el-form ref="postSceneForm" :model="postSceneForm" :rules="postSceneRules" label-width="100px">
          <el-form-item label="场景名称" prop="title">
            <el-input v-model="postSceneForm.title"></el-input>  <!--输入-->
          </el-form-item>
          <el-form-item label="场景描述" prop="description">
            <el-input type="textarea"
                      :autosize="{ minRows: 5, maxRows: 10}" v-model="postSceneForm.description"></el-input>
          </el-form-item>
          <el-form-item label="场景分类" prop="categoryId">
            <el-cascader
              v-model="postCategoryList"
              clearable
              :options="categories"
              :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'title', value: 'id' }">
            </el-cascader>  <!--级联选择器，选择场景分类，三级场景分类-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePost('postSceneForm')">立即创建</el-button>
          </el-form-item>  <!--点击创建调用提交方法handlePost-->
        </el-form>
      </el-drawer>
    </el-header>   <!--头文件结束，开始主体部分-->
    <el-main>
      <div class="wrapper">
        <el-table
        :data="sceneList.filter(data => !searchForm.content || data.title.toLowerCase().includes(searchForm.content.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="工艺名称"
          width="200">
          <template slot-scope="scope">
            {{scope.row['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="工艺分类"
          width="120">
          <template slot-scope="scope">
            {{scope.row['category']['title']}}
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          sortable
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <span style="margin-left: 10px">创建时间：{{ scope.row['createdAt'] }}</span>
              <span style="margin-left: 10px">更新时间：{{ scope.row['updatedAt'] }}</span>
            </el-popover>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row['createdAt'] }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDetailDrawer(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="handlePut(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import api from 'api'
export default {
  name: 'SceneIndex',
  computed: {
    categories () {
      let temp = []
      if (this.categoryId && this.$store.state.categories[0]) {
        this.$store.state.categories[0]['children'].forEach(item => {
          if (item['id'] === parseInt(this.categoryId)) {
            temp = item['children']
          }
        })
      }
      return temp
    }
  },
  data () {
    return {
      postCategoryList: [],
      selectScene: {
        category: {}
      },
      categoryId: null,
      searchForm: {
        content: '',
        category: '',
        selectCategoryId: null
      },
      searchRules: {},
      sceneList: [],
      postSceneDrawer: false,
      postSceneForm: {
        title: '',
        description: '',
        categoryId: 1
      },
      postSceneRules: {}
    }
  },
  // 这里表示进入路由页面（工艺场景分类）之前，判断要访问的是什么东西。
  // 如果是所有工艺场景，那么就访问工艺场景表抽取所有工艺场景数据
  // 如果是不同的工艺场景库，那么就表示要抽取同一工艺大类的工艺场景，
  // 就通过工艺类型表抽取此类工艺的工艺场景（先在工艺类型表里面找同类工艺，
  // 然后根据同类工艺在工艺场景表里找工艺场景）
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.categoryId = to.params['categoryId']
      if (to.query['categoryId']) {
        api.get({url: 'category/' + to.query['categoryId']}).then(res => {
          vm.sceneList = res['sceneDataList']
          vm.searchForm.selectCategoryId = to.query['categoryId'] ? to.query['categoryId'] : ''
        })
      } else {
        api.get({url: 'category/' + to.params['categoryId']}).then(res => {
          vm.sceneList = res['sceneDataList']
          vm.searchForm.selectCategoryId = to.params['categoryId'] ? to.params['categoryId'] : ''
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.categoryId = to.params['categoryId']
    if (to.query['categoryId']) {
      api.get({url: 'category/' + to.query['categoryId']}).then(res => {
        this.sceneList = res['sceneDataList']
        this.searchForm.selectCategoryId = to.query['categoryId'] ? to.query['categoryId'] : ''
      })
    } else {
      api.get({url: 'category/' + to.params['categoryId']}).then(res => {
        this.sceneList = res['sceneDataList']
        this.searchForm.selectCategoryId = to.params['categoryId'] ? to.params['categoryId'] : ''
      })
    }
    next()
  },
  methods: {
    handleDetailDrawer (index, row) {
      this.$router.push({name: 'SceneDetail', params: {sceneId: row['id']}})
    },
    handlePost () {
      this.postSceneForm.categoryId = this.postCategoryList[this.postCategoryList.length - 1]
      this.postSceneForm.categoryRootId = this.postCategoryList[1] // 二级分类ID
      api.post({url: 'sceneData', params: this.postSceneForm}).then(result => {
        if (result > 0) {
          this.$router.push({name: 'SceneEdit', params: {sceneId: result}})
        } else {
          this.$message.error('出错了！')
        }
      })
    },
    handlePut (index, row) {
      this.$router.push({name: 'SceneEdit', params: {sceneId: row.id}})
    },
    handleDelete (index, row) {
      this.$message.warning('暂时关闭删除功能')
      console.log(index, row)
    },
    handleChange (value) {
      this.$router.push({name: 'SceneIndex', query: {categoryId: value || ''}})
    }
  }
}
</script>

<style lang="scss">
  .SceneCategory{
    .el-header{
      padding: 20px 0;
    }
    .el-main{
      padding: 20px 0;
    }
    .searchForm{
      margin: 20px 0;
      width: 600px;
    }
    .el-select .el-input {
      width: 130px!important;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
  }
</style>

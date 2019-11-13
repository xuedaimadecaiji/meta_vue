<template>
  <el-container class="SceneCategory">
    <el-header>
      <div class="wrapper">
        <el-button style="margin-top: 20px" type="primary" @click="postSceneDrawer=true">
          <i class="fa fa-plus-circle"></i>
          新增工艺场景
        </el-button>
        <el-divider></el-divider>
        <el-form class="searchForm" ref="searchForm" :model="searchForm" :rules="searchRules">
        <el-form-item>
          <el-radio-group v-model="searchForm.selectCategory" size="medium" @change="handleChange">
            <el-radio-button :label="''">
              所有分类
            </el-radio-button>
            <el-radio-button v-for="item in categories[0]['children']" :label="item['id']" :key="item.index">
              {{item['title']}}
            </el-radio-button>
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
            <el-input v-model="postSceneForm.title"></el-input>
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
            </el-cascader>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handlePost('postSceneForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </el-header>
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
      <el-drawer
        class="SceneDetailDrawer"
        :title="selectScene['title']"
        :visible.sync="sceneDetailDrawer"
        :size="'80%'"
        :direction="'btt'">
        <el-container>
          <el-aside style="width: 25%">
            <el-card class="box-card" style="margin: 20px 60px 20px 20px">
              <el-button
                type="warning"
                style="width: 100%; height: 100%"
                @click="handlePut(null, selectScene)">
                  编辑工艺
              </el-button>
            </el-card>
            <el-card class="box-card" style="margin: 20px 60px 20px 20px">
              <div slot="header" class="clearfix">
                <span>{{selectScene['title']}}</span>
              </div>
              <div class="text item">
                所属分类：{{selectScene['category']['title']}}
              </div>
              <div class="text item">
                创建时间：{{selectScene['createdAt']}}
              </div>
              <div class="text item">
                最近更新：{{selectScene['updatedAt']}}
              </div>
              <div class="text item">
                描述：{{selectScene['description']}}
              </div>
            </el-card>
          </el-aside>
          <el-main>
            <Pane :scene="selectScene" :editable="false" :label="item.label" v-for="item in tabPaneList" :key="item.index"></Pane>
            <br><br><br>
          </el-main>
        </el-container>
      </el-drawer>
    </el-main>
  </el-container>
</template>

<script>
import api from 'api'
import Pane from './widgets/Pane'
export default {
  name: 'SceneCategory',
  components: {
    Pane
  },
  computed: {
    categories () {
      return this.$store.state.categories
    }
  },
  data () {
    return {
      tabPaneList: [
        {
          label: '物料数据',
          name: '1',
          tableName: 'material_data'
        },
        {
          label: '能源数据',
          name: '2',
          tableName: 'energy_data'
        },
        {
          label: '关键工艺参数',
          name: '3',
          tableName: 'material_data'
        },
        {
          label: '设备数据',
          name: '4',
          tableName: 'device_data'
        },
        {
          label: '环境负荷数据',
          name: '5',
          tableName: 'env_load_data'
        }
      ],
      postCategoryList: [],
      selectScene: {
        category: {}
      },
      sceneDetailDrawer: false,
      searchForm: {
        content: '',
        category: '',
        selectCategory: null
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
  beforeRouteEnter (to, from, next) {
    next(vm => {
      api.get({url: 'scene_data', params: {category: to.query['category'] ? to.query['category'] : ''}}).then(result => {
        vm.sceneList = result
        vm.searchForm.selectCategory = to.query['category'] ? to.query['category'] : ''
      })
      if (to.query['id']) {
        api.get({url: 'scene_data/' + to.query['id']}).then(res => {
          vm.selectScene = res
        })
        vm.sceneDetailDrawer = true
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    api.get({url: 'scene_data', params: {category: to.query['category'] ? to.query['category'] : ''}}).then(result => {
      this.sceneList = result
      this.searchForm.selectCategory = to.query['category'] ? to.query['category'] : ''
    })
    if (to.query['id']) {
      api.get({url: 'scene_data/' + to.query['id']}).then(res => {
        this.selectScene = res
      })
      this.sceneDetailDrawer = true
    }
    next()
  },
  methods: {
    handleDetailDrawer (index, row) {
      let query = {}
      for (let i in this.$route.query) {
        query[i] = this.$route.query[i]
      }
      query['id'] = row['id']
      this.$router.push({name: 'SceneCategory', query: query})
    },
    handlePost () {
      this.postSceneForm.categoryId = this.postCategoryList[this.postCategoryList.length - 1]
      this.postSceneForm.categoryRootId = this.postCategoryList[1] // 二级分类ID
      api.post({url: 'scene_data', params: this.postSceneForm}).then(result => {
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
      this.$router.push({name: 'SceneCategory', query: {category: value || ''}})
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

<template>
  <el-card shadow="hover" class="box-card SearchItem">
    <el-row>
      <el-col :span="12">
        <el-tag :type="typeMap[item['modelType']]['tagType']">
          {{typeMap[item['modelType']]['title']}}
        </el-tag>
        <router-link class="title" type="text" :to="{name: typeMap[item['modelType']]['router']['name'],
         params: typeMap[item['modelType']]['router']['params'],
         query: typeMap[item['modelType']]['router']['query']}">
          {{item['title']}}
        </router-link>
      </el-col>
      <el-col :span="12" style="text-align: right; font-size: 14px;color: #999999">
        创建时间：{{item['createdAt']}} &nbsp;&nbsp;
        更新时间：{{item['updatedAt']}}
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="description">
      {{item['description']}}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    item: {
      type: Object
    }
  },
  data () {
    return {
      typeMap: {
        scene: {
          title: '工艺场景',
          tagType: 'success',
          router: {
            name: 'SceneCategory',
            query: {
              id: this.item['id']
            }
          }
        },
        material: {
          title: '物料',
          tagType: 'primary',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'material'
            }
          }
        },
        device: {
          title: '设备',
          tagType: 'warning',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'device'
            }
          }
        },
        energy: {
          title: '能源',
          tagType: 'danger',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'energy'
            }
          }
        },
        env_load: {
          title: '能源',
          tagType: 'danger',
          router: {
            name: 'ManageEdit',
            params: {
              table: 'env_load'
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  .SearchItem{
    border: solid 1px #ddd;
    margin: 20px 0;
    .title{
      display: inline-block;
      font-weight: bolder;
      padding: 0 10px;
    }
    .description {
      color: #999;
      font-size: 14px;
    }
    a{
      text-decoration: underline;
      &:hover{
        color: gold;
      }
    }
  }
</style>

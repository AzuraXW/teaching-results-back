<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">分类列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="listData" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="sort" label="排序权重"></el-table-column>
        <el-table-column prop="is_show" label="是否显示">
          <template #default="scope">
            {{scope.row.is_show ? "是" : "否"}}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              plain
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              v-permission="{ permission: '删除图书', type: 'disabled' }"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <!-- <book-modify v-else @editClose="editClose" :editBookId="editBookId"></book-modify> -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import categoryModel from '@/model/category'
// import BookModify from './book'

export default {
  components: {
    // BookModify,
  },
  setup() {
    const listData = ref([])
    const editBookId = ref(1)
    const loading = ref(false)
    const showEdit = ref(false)

    onMounted(() => {
      getCategories()
    })

    const getCategories = async () => {
      try {
        loading.value = true
        listData.value = (await categoryModel.getCategories()).data
        console.log(listData.value)
        loading.value = false
      } catch (error) {
        loading.value = false
        if (error.code === 10020) {
          listData.value = []
        }
      }
    }

    const handleEdit = id => {
      showEdit.value = true
      editBookId.value = id
    }

    const handleDelete = id => {
      ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await categoryModel.deleteCategory(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          getCategories()
          ElMessage.success(`${res.message}`)
        }
      })
    }

    const editClose = () => {
      showEdit.value = false
      getCategories()
    }

    const indexMethod = index => index + 1

    return {
      listData,
      loading,
      showEdit,
      editClose,
      handleEdit,
      editBookId,
      indexMethod,
      handleDelete,
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>

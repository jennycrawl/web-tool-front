<script setup>
import {useWeiboStore} from "@/stores/WeiboStore.js";
import {onMounted,ref} from "vue";

const weiboStore = useWeiboStore()

const accountList = ref([])

let form = ref({
  id: 0,
  name: '',
  uid: '',
})

let dialogFormVisible = ref(false)
const formLabelWidth = '120px'

const rules = {
  name: [
    { required: true, message: '请输入名称', trigger: 'blur' },
  ],
      uid: [
    { required: true, message: '请输入uid', trigger: 'blur' },
  ],
}

onMounted(async () => {
  accountList.value = await weiboStore.getAccountList()
})

const handleInsert = () => {
  form.value = {}
  dialogFormVisible.value = true;
}

const handleEdit = (index,row) => {
  form.value = {
    'id':row.id,
    'name':row.name,
    'uid':row.uid,
  }
  dialogFormVisible.value = true;
}
const handelPushForm = async () => {
  if (form.value.id) {
    //update
    const res = await weiboStore.updateAccount(form.value.id, form.value)
    if (res && res.data.code === 0 && res.data.message) {
      ElMessage({
        showClose: true,
        message: '提交成功!',
        type: 'success',
      });
      dialogFormVisible.value = false;
      accountList.value = await weiboStore.getAccountList()
    } else {
      ElMessage({
        showClose: true,
        message: '提交失败，' + res.data.message,
        type: 'error',
      });
    }
  } else {
    //insert
    const res = await weiboStore.insertAccount(form.value)
    if (res && res.data.code === 0 && res.data.message) {
      ElMessage({
        showClose: true,
        message: '提交成功!',
        type: 'success',
      });
      dialogFormVisible.value = false;
      accountList.value = await weiboStore.getAccountList()
    } else {
      ElMessage({
        showClose: true,
        message: '提交失败，' + res.data.message,
        type: 'error',
      });
    }
  }
}

const handleDelete = async (index, row) => {
  ElMessageBox.confirm('此操作将永久删除该配置, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const res = await weiboStore.deleteAccount(row.id, {})
    if (res.data.code === 0 && res.data.message) {
      ElMessage({
        showClose: true,
        message: '删除成功!',
        type: 'success',
      });
      accountList.value = await weiboStore.getAccountList()
    } else {
      ElMessage({
        showClose: true,
        message: '删除失败，' + res.data.message,
        type: 'error',
      });
    }
  }).catch(() => {
    ElMessage({
      showClose: true,
      message: '删除取消!',
      type: 'info',
    })
  })
}

</script>
<template>
    <el-button
      type="primary"
      size="small" @click="handleInsert">添加微博号&nbsp;<el-icon><Plus /></el-icon></el-button>
    <el-table
      :data="accountList"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        >
        <template #default="scope">
            <a :href="scope.row.url"
                target="_blank" class="buttonText">{{scope.row.name}}
            </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="uid"
        label="uid"
        >
      </el-table-column>
      <el-table-column
        prop="crawl_time"
        label="最近抓取时间"
        sortable
        >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="公众号信息" v-model="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="dialogForm">
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="uid" prop="uid" :label-width="formLabelWidth">
          <el-input v-model="form.uid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handelPushForm">确 定</el-button>
      </div>
      </template>
    </el-dialog>
</template>

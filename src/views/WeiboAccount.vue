<script setup>
import {useWeiboStore} from "@/stores/WeiboStore.js";
import {onMounted,ref,reactive} from "vue";

const weiboStore = useWeiboStore()

const accountList = ref([])

let form = reactive({
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
const handelPushForm = async () => {
  if (form.id) {
    //update
  } else {
    //insert
    const res = await weiboStore.insertAccount(form)
    if (res.data.success && res.data.msg) {
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
        message: '提交失败，' + res.data.msg,
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
    if (res.data.success && res.data.msg) {
      ElMessage({
        showClose: true,
        message: '删除成功!',
        type: 'success',
      });
      accountList.value = await weiboStore.getAccountList()
    } else {
      ElMessage({
        showClose: true,
        message: '删除失败，' + res.data.msg,
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
  <el-main>
    <el-button
      type="primary"
      size="small" @click="handleInsert">添加微博号<i class="el-icon-plus el-icon--right"></i></el-button>
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

  </el-main>
</template>

<!--  <script>-->
<!--    import { mapState, mapActions } from 'vuex';-->
<!--    export default({-->
<!--      computed: mapState({-->
<!--        list: state => state.Weibo.accountList-->
<!--      }),-->
<!--      created() {-->
<!--        this.$store.dispatch('Weibo/getAccountList');-->
<!--      },-->
<!--      methods: {-->
<!--        ...mapActions([-->
<!--            'Weibo/getAccountList',-->
<!--        ]),-->
<!--        handleDelete(index, row) {-->
<!--            this.$confirm('此操作将永久删除该配置, 是否继续?', '提示', {-->
<!--              confirmButtonText: '确定',-->
<!--              cancelButtonText: '取消',-->
<!--              type: 'warning'-->
<!--            }).then(() => {-->
<!--                this.$store.dispatch('Weibo/deleteAccount', {'id':row['id'], 'params':{}}).then(res => {-->
<!--                    if (res.data && res.data['success']) {-->
<!--                        this.dialogFormVisible = false;-->
<!--                        this.$store.dispatch('Weibo/getAccountList');-->
<!--                        this.$message({-->
<!--                            type: 'success',-->
<!--                            message: '删除成功!'-->
<!--                        });-->
<!--                    } else {-->
<!--                        this.$message({-->
<!--                            type: 'error',-->
<!--                            message: '删除失败，' + res.data['msg'],-->
<!--                        });-->
<!--                    }-->
<!--                });-->
<!--            }).catch(() => {-->
<!--              this.$message({-->
<!--                type: 'info',-->
<!--                message: '已取消删除'-->
<!--              });          -->
<!--            });-->
<!--        },-->
<!--        handleInsert() {-->
<!--            this.form = {}-->
<!--            this.dialogFormVisible = true;-->
<!--        },-->
<!--        handleEdit(index,row) {-->
<!--            this.form = this.genPostParams(row);-->
<!--            this.dialogFormVisible = true;-->
<!--        },-->
<!--        handelPushForm() {-->
<!--            this.$refs['dialogForm'].validate((valid) => {-->
<!--                if (!valid) {-->
<!--                    return false;-->
<!--                } else {-->
<!--                    if (this.form['id']) {-->
<!--                        this.$store.dispatch('Weibo/updateAccount', {'id':this.form['id'], 'params':this.form}).then(res => {-->
<!--                            if (res.data && res.data['success']) {-->
<!--                                this.dialogFormVisible = false;-->
<!--                                this.$store.dispatch('Weibo/getAccountList');-->
<!--                                this.$message({-->
<!--                                    type: 'success',-->
<!--                                    message: '提交成功!'-->
<!--                                });-->
<!--                            } else {-->
<!--                                this.$message({-->
<!--                                    type: 'error',-->
<!--                                    message: '提交失败，' + res.data['msg'],-->
<!--                                });-->
<!--                            }-->
<!--                        });-->
<!--                    } else {-->
<!--                        this.$store.dispatch('Weibo/insertAccount', this.form).then(res => {-->
<!--                            if (res.data && res.data['success']) {-->
<!--                                this.dialogFormVisible = false;-->
<!--                                this.$store.dispatch('Weibo/getAccountList');-->
<!--                                this.$message({-->
<!--                                    type: 'success',-->
<!--                                    message: '提交成功!'-->
<!--                                });-->
<!--                            } else {-->
<!--                                this.$message({-->
<!--                                    type: 'error',-->
<!--                                    message: '提交失败，' + res.data['msg'],-->
<!--                                });-->
<!--                            }-->
<!--                        });-->
<!--                    }-->
<!--                }-->
<!--            });-->
<!--        },-->
<!--        genPostParams(row) {-->
<!--            var params = {-->
<!--                'id':row['id'],-->
<!--                'name':row['name'],-->
<!--                'uid':row['uid'],-->
<!--            };-->
<!--            return params;-->
<!--        }-->
<!--      },-->
<!--      data() {-->
<!--        return {-->
<!--            dialogFormVisible: false,-->
<!--            form: {-->
<!--              id: 0,-->
<!--              name: '',-->
<!--              uid: '',-->
<!--            },-->
<!--            formLabelWidth: '120px',-->
<!--            rules: {-->
<!--              name: [-->
<!--                { required: true, message: '请输入名称', trigger: 'blur' },-->
<!--              ],-->
<!--              uid: [-->
<!--                { required: true, message: '请输入uid', trigger: 'blur' },-->
<!--              ],-->
<!--            },-->
<!--        }-->
<!--      }-->
<!--    });-->

<!--  </script>-->

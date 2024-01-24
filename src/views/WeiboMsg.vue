<script setup>
import {useWeiboStore} from "@/stores/WeiboStore.js";
import {onMounted,ref,reactive} from "vue";

const weiboStore = useWeiboStore()

const table = ref(null);
const accountList = ref([])
const msgList = ref([])
let searchForm = reactive({
  dateRange: '',
  accountId: '',
  page: '',
  sortProp: '',
  sortOrder: '',
})

onMounted(async () => {
  accountList.value = await weiboStore.getAccountList()
  msgList.value = await weiboStore.getMsgList(searchForm)
})
// let searchForm = weiboStore.getSearchForm(weiboStore)
const shortcuts = weiboStore.datePickerOptions.shortcuts
const onSubmit = async (searchForm) => {
  msgList.value = await weiboStore.getMsgList(searchForm)
}
const onClear = async (table) => {
  searchForm.accountId = ''
  searchForm.dateRange = []
  searchForm.page = ''
  searchForm.sortProp = ''
  searchForm.sortOrder = ''
  msgList.value = await weiboStore.getMsgList(searchForm)
  table.clearSort();
}
const onCurrentPageChange = async(page) => {
  searchForm.page = page;
  msgList.value = await weiboStore.getMsgList(searchForm)
}
const onSortChange = async ({prop, order }) => {
  searchForm.sortProp = prop;
  if (order === 'descending') {
    searchForm.sortOrder = 'desc';
  } else if (order === 'ascending') {
    searchForm.sortOrder = 'asc';
  }
  msgList.value = await weiboStore.getMsgList(searchForm)
}
</script>
<template>
  <el-main>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline" ref="refname">
      <el-form-item label="账号" prop="accountId">
        <el-select v-model="searchForm.accountId" filterable placeholder="请选择">
        <el-option
          v-for="item in accountList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      </el-form-item>
      <el-form-item label="发布日期" prop="dateRange">
        <el-date-picker
          v-model="searchForm.dateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :shortcuts="shortcuts">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(searchForm)">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onClear(table)">清空<i class="el-icon-delete el-icon--right"></i></el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="msgList.msg_list"
      fixed="left"
      style="width: 100%"
      @sort-change="onSortChange"
      ref="table">
      <el-table-column
        prop="id"
        label="id"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="account_name"
        label="账号"
        >
      </el-table-column>
      <el-table-column
        prop="url"
        label="url"
        min-width="240"
        >
        <template #default="scope">
          <a :href="scope.row.url" target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="forward"
        label="转发"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="comment"
        label="评论"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="like"
        label="点赞"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="pubtime"
        label="发布时间"
        sortable="custom">
      </el-table-column>
      <el-table-column
        prop="crawl_time"
        label="抓取时间"
        min-width="170">
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="onCurrentPageChange"
      :current-page.sync="msgList.current_page"
      :page-size="20"
      :total="msgList.total">
    </el-pagination>
  </el-main>
</template>

<script setup>
import {useWeiboStore} from "@/stores/WeiboStore.js";
import {onMounted,ref,reactive} from "vue";

const weiboStore = useWeiboStore()

const accountList = ref([])
const statisticsList = ref([])
let searchForm = reactive({
  accountId: '',
  dateRange: [],
})

onMounted(async () => {
  accountList.value = await weiboStore.getAccountList()
  statisticsList.value = await weiboStore.getStatisticsList(searchForm)
})
// let searchForm = weiboStore.getSearchForm(weiboStore)
const shortcuts = weiboStore.datePickerOptions.shortcuts
const onSubmit = async (searchForm) => {
  statisticsList.value = await weiboStore.getStatisticsList(searchForm)
}
const onClear = async () => {
  searchForm.accountId = ''
  searchForm.dateRange = []
  statisticsList.value = await weiboStore.getStatisticsList(searchForm)
}
</script>
<template>
  <el-form :inline="true" :model="searchForm" class="demo-form-inline" >
    <el-form-item label="名称" prop="accountId">
      <el-select v-model="searchForm.accountId" filterable placeholder="请选择">
      <el-option
        v-for="item in accountList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="日期选择" prop="dateRange">
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
      <el-button type="warning" @click="onClear">清空<i class="el-icon-delete el-icon--right"></i></el-button>
    </el-form-item>
      <el-form-item>
        <download-excel
            class = "export-excel-wrapper"
            :data = "statisticsList"
            :fields = "weiboStore.excelFields"
            name = "weibo.xls">
            <el-button type="primary">导出<i class="el-icon-download el-icon--right"></i></el-button>
        </download-excel>
      </el-form-item>
  </el-form>
    <el-table
      :data="statisticsList"
      max-height="650"
      fixed="left"
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="id"
        min-width="50"
        sortable>
      </el-table-column>
      <el-table-column
        fixed
        prop="name"
        label="名称"
        min-width="150"
        >
      </el-table-column>
      <el-table-column
        prop="fans"
        label="粉丝数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="feed"
        label="总微博数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="count"
        label="微博数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="forward_sum"
        label="总转发数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="comment_sum"
        label="总评论数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="like_sum"
        label="总点赞数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="forward_avg"
        label="平均转发数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="comment_avg"
        label="平均评论数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="like_avg"
        label="平均点赞数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="forward_max"
        label="最大转发数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="comment_max"
        label="最大评论数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="like_max"
        label="最大点赞数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="crawl_time"
        label="抓取时间"
        min-width="170"
        sortable>
      </el-table-column>
    </el-table>
</template>
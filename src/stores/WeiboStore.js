import {defineStore} from "pinia";
import api from "@/api.js";
// import weiboAccountList from "@/views/WeiboAccountList.vue";

export const useWeiboStatisticsStore = defineStore('weiboStatisticsStoreId', {
    state: () => ({
        accountList: [],
        statisticsList: [],
        msgList: [],
        searchForm: {
            dateRange: '',
            accountId: '',
        },
        datePickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '最近一周',
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    return [start, end];
                }
            }, {
                text: '最近一个月',
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    return [start, end];
                }
            }, {
                text: '最近三个月',
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    return [start, end];
                }
            }, {
                text: '最近半年',
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                    return [start, end];
                }
            }, {
                text: '最近一年',
                value: () => {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                    return [start, end];
                }
            }]
        },
    }),
    getters: {
        // accountId(state) {
        //     return state.searchForm.accountId()
        // },
        // getAccountList(state) {
        //     return state.accountList
        // }
    },
    actions: {
        accountList: Promise.resolve(undefined),
        statisticsList: Promise.resolve(undefined),
        searchForm: undefined,


        async getAccountList(params = {}) {
            try {
                const res = await api.getWeiboAccountList(params)
                console.log(res.data.msg)
                if (res.data.success && res.data.msg) {
                    this.accountList = res.data.msg
                }
            } catch (error) {
                console.log(error)
            }
            return this.accountList
        },
        async getStatisticsList() {
            try {
                let params = {}
                if (this.searchForm.accountId) {
                    params.account_id = this.searchForm.accountId;
                }
                if (this.searchForm.dateRange instanceof Array) {
                    if (this.searchForm.dateRange[0]) {
                        params.start_date = this.searchForm.dateRange[0]
                    }
                    if (this.searchForm.dateRange[1]) {
                        params.end_date = this.searchForm.dateRange[1]
                    }
                }
                const res = await api.getWeiboStatisticsList(params)
                console.log(res.data.msg)
                if (res.data.success && res.data.msg) {
                    this.statisticsList = res.data.msg
                }
            } catch (error) {
                console.log(error)
            }
            return this.statisticsList
        },
        getDatePickerOptions() {
            return this.datePickerOptions
        },
        getSearchForm() {
            return this.searchForm
        },
        setSearchForm(searchForm) {
            if (searchForm.accountId) {
                this.searchForm.accountId = searchForm.accountId;
            }
            if (searchForm.dateRange) {
                this.searchForm.dateRange = searchForm.dateRange;
            }
            // if (this.searchForm.dateRange instanceof Array) {
            //     if (this.searchForm.dateRange[0]) {
            //         params.start_date = this.searchForm.dateRange[0]
            //     }
            //     if (this.searchForm.dateRange[1]) {
            //         params.end_date = this.searchForm.dateRange[1]
            //     }
            // }
        }
    }

})
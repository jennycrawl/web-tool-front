import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_DEFAULTS_BASEURL
// console.log(import.meta.env.VITE_AXIOS_DEFAULTS_BASEURL, axios.defaults.baseURL)
export default {
  // 列表接口
  getWechatAccountList: function (params) {
    return axios.get('wechat/account/list', {
      params: params
    })
  },
  insertWechatAccount: function (params) {
    return axios.post('wechat/account', params);
  },
  updateWechatAccount: function (id, params) {
    return axios.patch('wechat/account/' + id, params);
  },
  deleteWechatAccount: function (id, params) {
    return axios.delete('wechat/account/' + id, params);
  },
  getWechatStatisticsList: function (params) {
    return axios.get('wechat/statistics', {
      params: params
    })
  },
  getWechatMsgList: function (params) {
    return axios.get('wechat/msg', {
      params: params
    })
  },

  getWeiboAccountList: function (params) {
    return axios.get('weibo/account/list', {
      params: params
    })
  },
  insertWeiboAccount: function (params) {
    return axios.post('weibo/account/', params);
  },
  updateWeiboAccount: function (id, params) {
    return axios.patch('weibo/account/' + id, params);
  },
  deleteWeiboAccount: function (id, params) {
    return axios.delete('weibo/account/' + id, params);
  },
  getWeiboStatisticsList: function (params) {
    return axios.get('weibo/statistics', {
      params: params
    })
  },
  getWeiboMsgList: function (params) {
    return axios.get('weibo/msg', {
      params: params
    })
  },
}

import axios from 'axios'

axios.defaults.baseURL = '/proxyapi';
export default {
  // 列表接口
  getWechatAccountList: function (params) {
    return axios.get('api/wechat/account/list', {
      params: params
    })
  },
  insertWechatAccount: function (params) {
    return axios.post('api/wechat/account', params);
  },
  updateWechatAccount: function (id, params) {
    return axios.put('api/wechat/account/' + id, params);
  },
  deleteWechatAccount: function (id, params) {
    return axios.delete('api/wechat/account/' + id, params);
  },
  getWechatStatisticsList: function (params) {
    return axios.get('api/wechat/statistics', {
      params: params
    })
  },
  getWechatMsgList: function (params) {
    return axios.get('api/wechat/msg', {
      params: params
    })
  },

  getWeiboAccountList: function (params) {
    return axios.get('api/weibo/account/list', {
      params: params
    })
  },
  insertWeiboAccount: function (params) {
    return axios.post('api/weibo/account', params);
  },
  updateWeiboAccount: function (id, params) {
    return axios.put('api/weibo/account/' + id, params);
  },
  deleteWeiboAccount: function (id, params) {
    return axios.delete('api/weibo/account/' + id, params);
  },
  getWeiboStatisticsList: function (params) {
    return axios.get('api/weibo/statistics', {
      params: params
    })
  },
  getWeiboMsgList: function (params) {
    return axios.get('api/weibo/msg', {
      params: params
    })
  },
}

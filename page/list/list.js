// page/list/list.js
let request = require('../../utils/request')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommend: '',
    markType:'',
    markPeople: ''
  },
  onLoad: function() {
    this.getData()
    this.getFirstStorage()
  },
  getData() {
    let self = this
    let reg = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine'
    request({
      url: reg + '/getRecommendInfo',
      success(data) {
        self.setData({
          recommend: data
        })
      }
    })
    
    wx.request({
      url: reg + '/getMarkTypeList',
      success(res) {
        let data = res.data.data
        self.setData({
          markType: data
        }) 
      }
    })
    wx.request({
      url: reg + '/getHomeArticleList',
      success(res) {
        self.setData({
          markPeople: res.data.data
        })
      }
    })
  },
  onMoretap(e) {
    let articletype = e.currentTarget.dataset.articletype
    wx.showActionSheet({
      itemList: ['内容过期了', '内容和'+ articletype +'不相关', '不再显示来自'+ articletype +'的内容'],
      success(res) {
        console.log(res.tapIndex)
      }
    })
  },
  onLike(e) {
    let index = e.currentTarget.dataset.index
    let listLike = this.data.listLike
    listLike[index] = !listLike[index] 
    this.setData({
      listLike
    })
    wx.setStorage({
      key: 'listLike',
      data: listLike
    })
  },
  getFirstStorage() {
    let listLikeStorage = wx.getStorageSync('listLike')
    let listLike = listLikeStorage ? listLikeStorage : {}
    this.setData({
      listLike
    }) 
  },
  toNextPage(e) {
    let typeId = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '/page/type/type?typeId=' + typeId
    })
  }
})
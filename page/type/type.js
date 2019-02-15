// page/type/type.js
let request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article:'',
    markPeople:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeId = options.typeId
    console.log(typeId)
    this.getData(typeId)
  },
  getData(typeId) {
    let self = this
    let baseUrl = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine'
    request({
      url: baseUrl + '/getArticleTypeTitleInfo/' + typeId,
      success(data) {
        self.setData({
          article: data
        })
      }
    })
    request({
      url: baseUrl + '/getArticleTypeList/' + typeId,
      success(data) {
        self.setData({
          markPeople: data
        })
      }
    })
  },
  toArticlePage(e) {
    console.log(e.currentTarget.dataset.id, 'type.js')
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../articleDetail/articleDetail?id=' + id
    })
  }

})
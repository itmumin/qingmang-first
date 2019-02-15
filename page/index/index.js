// page/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  toNextPage() {
    // wx.redirectTo({
    //   url: '/page/inside/inside'
    // })
    wx.navigateTo({
      url: '/page/inside/inside'
    })
  }
})
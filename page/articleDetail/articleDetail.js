// page/articleDetail/articleDetail.js
const request = require('../../utils/request')
var audio = wx.getBackgroundAudioManager()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleDetail: '',
    danmuList: [
      {
        text: 'hello',
        color: '#000',
        time: 15
      },
      {
        text: 'world',
        color: 'green',
        time: 8
      }
    ],
    videoControlHidden: true,
    onAudioPlayImg: false,
    percent: 0,
    currentTime: 0,
    progressWidth: '520',
    progressCircleLeft: '0'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let id = options.id
    this.getData(id)




  },
  getData(id) {
    let self = this
    let baseUrl = 'https://easy-mock.com/mock/5bb8c1c63ccc501a316e3ccb/magazine'
    request({
      url: baseUrl + '/getArticleDetail/' + id,
      success(data) {
        console.log(data)
        self.setData({
          articleDetail: data
        })
      }
    })
  },
  onVideoPlay() {
    let myVideo = wx.createVideoContext('myVideo')
    myVideo.play()
    this.setData({
      videoControlHidden: false
    })

  },
  onAudioPlay() {
    audio.src = 'http://music.163.com/song/media/outer/url?id=1328973552.mp3'
    audio.title = '1'
    audio.singer = 'mumin'
    audio.coverImgUrl = "http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000"
    audio.duration = '401'

    this.setData({
      onAudioPlayImg: !this.data.onAudioPlayImg
    })

    if(this.data.onAudioPlayImg) {
      audio.pause()
    } else {
      audio.play()
    }

    this.listenAudioPlay()
    this.updateAudioData()


  },
  listenAudioPlay() {
    audio.onPause(() => {
      this.setData({
        onAudioPlayImg: false
      })
    })
    
    audio.onStop(() => {
      this.setData({
        onAudioPlayImg: false
      })
    })
    
    audio.onEnded(() => {
      this.setData({
        onAudioPlayImg: false
      })
    })
    
    audio.onPlay(() => {
      this.setData({
        onAudioPlayImg: true
      })
    })


  },
  updateAudioData() {
    let duration = this.data.articleDetail.audio.duration
    audio.onTimeUpdate(() => {
      let currentTime = audio.currentTime
      let percent = currentTime / duration * 100
      let progressCircleLeft = this.data.progressWidth * percent / 100
      this.setData({
        percent,
        currentTime: currentTime.toFixed(),
        progressCircleLeft
      })

    })

  }
 
})
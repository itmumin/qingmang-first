// params = {
//     url: '',
//     success(res) {}
// }

function request(params) {
    wx.request({
        url: params.url,
        success(res) {
            if (res.statusCode == 200) {
                params.success(res.data.data)
            } else if (res.statusCode == 404) {
                showError()
            }
        },
        fail() {
            showError()
        }
    })
}

function showError() {
    wx.showToast({
        title: '请求错误',
        icon: 'none'
    })
}

module.exports = request
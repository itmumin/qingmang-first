### notes

#### 如何在 text 中添加空格

1. [查看文档](https://developers.weixin.qq.com/miniprogram/dev/component/text.html)

2. 方法一：

   ​	设置 text 属性,添加解码功能，然后在设置 `&nbsp;`

   `decode="true"`

   还有其他的方法，可以参考文档进行设置

#### rpx 和 px 的区别

1. 定义所有机型的宽度为 750rpx 高度为 1334rpx
2. 如果当前机型的实际宽度是500cm
   - 对应的rpx为： 1rpx = 500cm / 750
3. 不同机型，对应的 1rpx 的大小也各不相同
4. 1rpx = 0.5px

#### view

​	容器组件，类似于html中的div

​	可以给view设置点[击态属性](https://developers.weixin.qq.com/miniprogram/dev/component/view.html)

#### image

​	属性 mode 可以设置图片根据宽度进行高度的自适应

- `mode="widthFix"`

#### vertical-align

​	css属性设置图片文字居中

- `vertical-align: middle;`

#### [生命周期函数](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0)

1. onLoad(Object query)

   页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。 

2. onShow()

   页面显示/切入前台时触发。 

3. onReady()

   页面初次渲染完成时触发。一个页面只会调用一次，代表页面已经准备妥当，可以和视图层进行交互。 

4. onHide()

   页面隐藏/切入后台时触发。 如 `navigateTo` 或底部 `tab` 切换到其他页面，小程序切入后台等 

5. onUnload()

   页面卸载时触发。如`redirectTo`或`navigateBack`到其他页面时。 

#### [页面事件处理函数](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html#%E9%A1%B5%E9%9D%A2%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%87%BD%E6%95%B0)

1. onPullDownRefresh()

   监听用户下拉刷新事件 

   - 需要在`app.json`的[`window`](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#window)选项中或[页面配置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE)中开启`enablePullDownRefresh="true or false"`。
   - 可以通过[`wx.startPullDownRefresh`](https://developers.weixin.qq.com/miniprogram/dev/api/wx.startPullDownRefresh.html)触发下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。
   - 当处理完数据刷新后，[`wx.stopPullDownRefresh`](https://developers.weixin.qq.com/miniprogram/dev/api/wx.stopPullDownRefresh.html)可以停止当前页面的下拉刷新

2. onReachBottom()

   监听用户上拉触底事件

   - 可以在`app.json`的[`window`](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#window)选项中或[页面配置](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E9%A1%B5%E9%9D%A2%E9%85%8D%E7%BD%AE)中设置触发距离`onReachBottomDistance`。
   - 在触发距离内滑动期间，本事件只会被触发一次。

3. onPageScroll(Object)

   监听用户滑动页面事件。 

#### currentTarget 和 target 的区别

- currentTarget 

  事件绑定的当前组件

- target

  触发事件的原组件

#### button边框去掉border

- 必须在button的伪元素::after上去掉`border:none;`

#### 数据缓存

- wx.[setStorage](https://developers.weixin.qq.com/miniprogram/dev/api/wx.setStorage.html)

  将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容。数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。 

- wx.getStorage

- wx.getStorageSync( 同步获取数据缓存 )

实现数据缓存的步骤

1. 先获取数据中的缓存信息
   - 在onload中设置
   - 使用wx.getStorageSync()
2. 通过缓存设置数据中的值
   - 当数据缓存中没有需要的值，需要初始化
   - 然后保存到data数据中
3. tap事件
   - 获取data中的数据值
   - 进行逻辑上的数据修改
   - 将修改后的值保存到data中，同时通过wx.setStorage设置进缓存中

- 

#### 共有wxss加载使用（wxss复用）

- 先创建`.wxss`文件
- 使用`@import 'url';` url必须是相对路径
- 在末尾一定要添加分号，不然会报错

#### utils（封装共有工具方法的文件夹）

- 通过 `module.exports`导出
- 通过`require（'url‘）`导入 url为相对路径

#### [小程序脚本语言（.wxs）](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/)

WXS（WeiXin Script）是小程序的一套脚本语言，结合 `WXML`，可以构建出页面的结构 

使用：可以在utils文件夹中创建单独的.wxs文件，然后通过 `<wxs src="../../utils/filter.wxs" module="filter"></wxs> `引入

注意：

1. wxs 不依赖于运行时的基础库版本，可以在所有版本的小程序中运行。
2. wxs 与 javascript 是不同的语言，有自己的语法，并不和 javascript 一致。
3. wxs 的运行环境和其他 javascript 代码是隔离的，wxs 中不能调用其他 javascript 文件中定义的函数，也不能调用小程序提供的API。
4. wxs 函数不能作为组件的事件回调。
5. 由于运行环境的差异，在 iOS 设备上小程序内的 wxs 会比 javascript 代码快 2 ~ 20 倍。在 android 设备上二者运行效率无差异。

案例：

- 设置整篇文章首行缩进

  ```
  <view class="content">
  <text decode="true">{{ filter(articleDetail.content) }}</text>
  </view>
  
  <wxs module="filter">
      var filter = function (text) {
          if(!text) {
              return 
          }
          var reg = getRegExp('\\n', 'g')
          return text.replace(reg, '\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
      }
      module.exports = filter
  </wxs>
  ```

#### [跳转到公众号文章页面](https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html)

web-view 组件是一个可以用来承载网页的容器，会自动铺满整个小程序页面 

#### video[遮罩层](https://developers.weixin.qq.com/miniprogram/dev/component/video.html)

- [原生组件的使用限制](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)

- 因此必须使用[cover-view 与 cover-image](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html)设置遮罩层
   cover-image 不支持gif等动图

- [设置点击并播放](https://developers.weixin.qq.com/miniprogram/dev/api/VideoContext.html)

  VideoContext 实例，可通过 [wx.createVideoContext](https://developers.weixin.qq.com/miniprogram/dev/api/wx.createVideoContext.html) 获取。 

#### audio组件

audio组件不再维护，因此可以使用自己布局的页面代替

progress 进度条


















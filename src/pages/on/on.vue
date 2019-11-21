<template>
	<view class="container">
	<!-- gps未授权显示提示，授权隐藏 -->
	  <view v-if="isAuthLocation" class="gps-tip">* GPS未授权</view>
	  <image src="./../../static/bg-off.png" class="bg-off"></image>
	  <picker @change="choiceLocation" mode="selector" :range="lnList">
	    <view class="wifi-picker">
	      <image src="./../../static/location.png" class="wifi-location"></image>
	      {{ln}}
	    </view>
	  </picker>
	  <view class="content">
	  <!-- 判断图片 -->
	    <view class="wifi-wrap wifi-wrap-on">
	      <image class="pic-wifi-on" src="./../../static/wifi-on.png"></image>
	    </view>
	    <!-- 判断文字 -->
	    <text class="tip-wifi-on">Wi-Fi已连接</text>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAuthLocation: false,  //是否授权 true 授权 false未授权
				status: 'on', //off未连接，error连接失败，on连接成功
				ln: '虹桥机场', //位置
				lnList:['虹桥机场','浦东机场'], //位置数组
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			
		},
		methods: {
			// 获取定位信息
			authLocation:function(){
				wx.getLocation({
					success: function(res) {
						console.log(res)
					},
				})
			},
			// 获取用户信息
			getUserInfo:function(){
				wx.getSetting({
					success:(res)=> {
						// console.log("res", res)
						if (res.authSetting['scope.userInfo']) {
							console.log("已授权=====")
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称
							wx.getUserInfo({
								success:(res)=> {
									console.log("获取用户信息成功", res)
									this.setData({
										name: res.userInfo.nickName
									})
								},
								fail:(res)=> {
									console.log("获取用户信息失败", res)
								}
							})
						} else {
							console.log("未授权=====")
							this.showSettingToast("请授权")
						}
					}
				})
			},
			//选择所在位置
			choiceLocation:function(e){
				const index = e.detail.value
				this.ln = this.lnList[index]
			},
      linkTo(){
        uni.navigateTo({url:'./../off/off'})
      }
		}
	}
</script>

<style lang="scss" scoped>
	.container{
  position: relative;
  padding-top:330rpx;
  box-sizing: border-box;
}

.container .bg-off{
  position: absolute;
  left:0;
  top:-70rpx;
  width:750rpx;
  height:100vh;
}
.container .content{
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .wifi-wrap-on{
  background-image: linear-gradient(0deg, 
		#5ece9a 0%, 
		#96eac0 100%);
	box-shadow: 0px 0px 20px 8px 
		rgba(15, 63, 117, 0.04);
}

.container .pic-wifi-on{
  width:128rpx;
  height:98rpx;
}
.container .tip-wifi-on{
  font-size:28rpx;
  margin-top:50rpx;
  width:100%;
  text-align: center;
}
.container .tip-wifi-on{
  color: #6bd4a3;
}
</style>

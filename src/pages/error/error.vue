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
	    <view class="wifi-wrap wifi-wrap-error">
	      <image class="pic-wifi-error" src="./../../static/wifi-error.png"></image>
	    </view>
	    <!-- 判断文字 -->
	    <text class="tip-wifi-error">Wi-Fi 连接失败</text>
	    <!-- 错误的时候显示原因 -->
	    <view class="error-text">
	      <text class="error-reason">可能的原因：</text>
	      <view class="error-desc">
	        <text>1.当前信号不佳</text>
	        <text>2.您不在机场范围内</text>
	        <text>3.系统版本不适配，请手动打开wifi</text>
	      </view>
	    </view>
	    <!-- 判断按钮 -->
	    <button class="wifi-btn" type="primary" size="mini">重新连接Wi-Fi</button>
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
			//选择所在位置
			choiceLocation:function(e){
				const index = e.detail.value
				this.setData({
					ln:this.data.lnList[index]
				})
			},
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
	
	
	.container .wifi-wrap-error{
	  box-shadow: 0px 0px 20px 8px 
			rgba(15, 63, 117, 0.08);
	    background:#ffffff;
	}
	
	.container .pic-wifi-error{
	  width:128rpx;
	  height:98rpx;
	}
	.container .tip-wifi-error{
	  font-size:28rpx;
	  margin-top:50rpx;
	  width:100%;
	  text-align: center;
	}
	.container .tip-wifi-error{
	  color: #f4223f;
	}
	.container .error-text{
	  display: flex;
	  margin-top:80rpx;
	}
	.container .error-reason{
	  font-size:28rpx;
	  color:#7f7c8d;
	}
	.container .error-desc{
	  display: flex;
	  flex-direction: column;
	  font-size:28rpx;
	  color:#7f7c8d;
	}
	.container .wifi-btn{
		margin-top:80rpx;
	}
</style>

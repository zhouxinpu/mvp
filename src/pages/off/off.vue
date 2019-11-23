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
	    <view class="wifi-wrap wifi-wrap-off">
	      <image class="pic-wifi-off" src="./../../static/wifi-off.png"></image>
	    </view>
	    <!-- 判断文字 -->
	    <text class="tip-wifi-off">Wi-Fi 未连接</text>
	    <!-- 判断按钮 -->
	    <button class="wifi-btn" type="primary" size="mini">连接Wi-Fi</button>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAuthLocation: false,  //是否授权 true 授权 false未授权
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
				this.ln = this.lnList[index]
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
	
	.container .wifi-wrap{
	  width:188rpx;
	  height:188rpx;
	  border-radius:50%;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.container .wifi-wrap-off{
	  box-shadow: 0px 0px 20px 8px 
			rgba(15, 63, 117, 0.08);
	    background:#ffffff;
	}
	.container .pic-wifi-off{
	  width:128rpx;
	  height:98rpx;
	}
	.container .tip-wifi-off{
	  font-size:28rpx;
	  margin-top:50rpx;
	  width:100%;
	  text-align: center;
	}
	.container .tip-wifi-off{
	  color: #888888;
	}
</style>

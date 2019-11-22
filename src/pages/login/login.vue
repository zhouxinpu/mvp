<template>
	<view class="container">
	  <image class="bg-login" src="./../../static/bg-login.png"></image>
	  <!-- 底部content -->
	  <view class="bottom-tab">
	    <view class="tab">
	    <!-- 循环渲染tabs -->
	    <view 
	    v-for="item in tabs" 
	    @tap="selectTab(item)" 
			:key="item.title"
			class="item"
	    :class="{'active':active==item.title}">
	    <!-- 动态渲染拼接图片 -->
	        <image :src="require('./../../static/'+(active==item.title?item.pic+'-active':item.pic)+'.png')"></image>
	        {{item.title}}
	      </view>
	    </view>
	    <view class="content"></view>
	    <view class="bottom-tip">
	      <view class="tip-left">
	        <text @tap="alertTip">使用条款及隐私通知</text>
	      </view>
	      <view class="tip-right">
	
	      </view>
	    </view>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: '微信登陆',
				tabs: [
					{ title: '微信登陆', pic: 'wechat'},
					{ title: '短信登陆', pic: 'phone'},
					{ title: '取号机登陆', pic: 'others'}
				],
				checked: true,  //复选框
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {

		},
		methods: {
			selectTab: function(item){
				this.active = item.title
			},
			alertTip:function(){
				
			},
			onChange:function(){
				console.log(1);
				this.setData({
					checked: !this.data.checked
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* login */
	.container{
	  width:100vw;
	  height:100vh;
	  position: relative;
	}
	.container .bg-login{
	  position: absolute;
	  width:100%;
	  height: 100%;
	}
	.container .bottom-tab{
	  height: 334rpx;
	  width:100%;
	  position: absolute;
	  bottom:0;
	  left:0;
	  display: flex;
	  flex-direction: column;
	}
	.container .tab{
	  height: 74rpx;
	  display: flex;
	}
	.container .item{
	  flex: 1;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  font-size: 26rpx;
	  color:#ffffff;
	  background: rgba(0, 0, 0, .4);
	}
	.container .item.active{
	  color:#05c160;
	  background: rgba(0, 0, 0, .6);
	}
	.container .item image{
	  width:36rpx;
	  height:32rpx;
	  margin-right: 20rpx;
	}
	
	.container .bottom-tip{
	  height: 60rpx;
	  position: absolute;
	  bottom: 0;
	  left:0;
	  padding:0 40rpx;
	  box-sizing: border-box;
	  width:100%;
	  display: flex;
	  align-items: center;
	  justify-content: space-between;
	  background: rgba(0, 0, 0, .6);
	}
	.container .tip-left{
	  display: flex;
	  align-items: center;
	}
	.container .tip-left .cb{
	  transform: scale(0.7);
	  margin-right:20rpx;
	}
	.container .tip-left text{
	  font-size:22rpx;
	  color:#9e9e9f;
	  text-decoration: underline;
	}
</style>

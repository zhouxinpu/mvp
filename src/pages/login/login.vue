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
	    <view class="content">
				<view v-if="active=='微信登录'" class="content-wechat">
					<button type="primary">微信一键登录</button>
				</view>
				<view v-else-if="active=='短信登录'" class="content-phone">
					<view class="form">
						<input type="number" placeholder="输入手机号" />
						<input type="number" placeholder="输入验证码" />
					</view>
					<button class="btn">登录</button>
				</view>
				<view v-else-if="active=='取号机登录'" class="content-machine">machine</view>
			</view>
	    <view class="bottom-tip">
	      <view class="tip-left">
					<checkbox class="cb" @change="cbHandleChange" :checked="checked" color="#05c160" />
	        <text @tap="alertTip">使用条款及隐私通知</text>
	      </view>
	      <view class="tip-right">
					<view class="btn">热线</view>
					<view class="btn">en</view>
	      </view>
	    </view>
	  </view>
		<uni-popup ref="popup" type="center">
			<view class="pop">
				<view class="pop-top">
					top
				</view>
				<view class="pop-content">
					content
				</view>
				<view class="pop-bottom">
					bottom
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			return {
				active: '短信登录',
				tabs: [
					{ title: '微信登录', pic: 'wechat'},
					{ title: '短信登录', pic: 'phone'},
					{ title: '取号机登录', pic: 'others'}
				],
				checked: true,  //复选框
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		components: {uniPopup},
		onLoad() {

		},
		methods: {
			selectTab: function(item){
				this.active = item.title
			},
			alertTip:function(){
				this.$refs.popup.open()
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

	 .bg-login{
		position: absolute;
		width:100%;
		height: 100%;
	}
	 .bottom-tab{
		height: 334rpx;
		width:100%;
		position: absolute;
		bottom:0;
		left:0;
		display: flex;
		flex-direction: column;
	}
	 .tab{
		height: 74rpx;
		display: flex;
	}
	 .item{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color:#ffffff;
		background: rgba(0, 0, 0, .4);
	}
	 .item.active{
		color:#05c160;
		background: rgba(0, 0, 0, .6);
	}
	 .item image{
		width:36rpx;
		height:32rpx;
		margin-right: 20rpx;
	}
	
	 .bottom-tip{
		height: 60rpx;
		padding:0 40rpx;
		box-sizing: border-box;
		width:100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(0, 0, 0, .6);
	}
	.content{
		flex: 1;
		display: flex;
		padding:0 40rpx;
		background: rgba(0, 0, 0, .6);
		&-wechat{
			flex: 1;
			display: flex;
			justify-content: center;
			flex-direction: column;
			button{
				width:100%;
				font-size:36rpx;
				height:88rpx;
				line-height:88rpx;
			}
		}
		&-phone{
			display: flex;
			flex: 1;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.form{
				width:458rpx;
				flex:1;
			}
			.btn{
				width:170rpx;
				height:62rpx;
				border-radius:31rpx;
				font-size:28rpx;
				color:#ffffff;
				background: #9ba0b0;
			}
		}
		&-machine{}
	}
	
	 .tip-left{
		display: flex;
		align-items: center;
	}
	 .tip-left .cb{
		transform: scale(0.5);
	}
	 .tip-left text{
		font-size:22rpx;
		color:#9e9e9f;
		text-decoration: underline;
	}
	.tip-right{
		display: flex;
		align-items: center;
		.btn{
			border:1rpx solid #ffffff;
			font-size:22rpx;
			color:#ffffff;
			width:80rpx;
			height:36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius:6rpx;
			&:first-child{
				margin-right:40rpx;
			}
		}
	}
}
</style>

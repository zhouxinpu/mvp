<template>
	<view class="container">
		<tip-mark imgText="8" tipText="连接网络失败" :top="30"></tip-mark>
		<!-- <view class="wifi-connect"><image src="../../static/5.png" mode=""></image><text>您已成功联网</text></view> -->
		<image class="pre" src="./../../static/pre.jpg" mode="scaleToFill"></image>
		<!-- 广告标示 -->
		<view class="tip-mark" @tap="skip">跳过广告 {{second}} s</view>
		<view class="ad">
			<text>小程序/程序/H5</text>
			<view @tap="enter" class="enter-btn">点击进去</view>
		</view>
	</view>
</template>

<script>
	import tipMark from '@/components/tip-mark/tip-mark.vue'
	export default {
		data() {
			return {
				second: 3
			}
		},
		components:{
			tipMark
		},
		onShow(){
			this.second = 3
			// this.timing()
		},
		onLoad() {
			
		},
		methods: {
			// 倒计时3s跳到下个页面
			timing(){
				let timer = setInterval(()=>{
					if(this.second==0){
						clearInterval(timer)
						this.skip()
					}else{
						this.second--
					}
				},1000)
			},
			// 点击跳转到下一个页面
			skip(){
				uni.navigateTo({
					url:'/pages/wifi/wifi'
				})
			},
			// 点击进入广告小程序
			enter(){
				uni.showToast({
					title: 'enter'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		// .wifi-connect{
		// 	padding: 0 30rpx;
		// 	height: 60rpx;
		// 	background-color: #fff;
		// 	box-shadow: 0rpx 0rpx 8rpx 6rpx 
		// 		rgba(15, 63, 117, 0.04);
		// 	border-radius: 30rpx;
		// 	position: absolute;
		// 	top:30rpx;
		// 	left:calc(50% - 147rpx);
		// 	display: flex;
		// 	justify-content: space-evenly;
		// 	align-items: center;
		// 	image{
		// 		width: 38rpx;
		// 		height: 30rpx;
		// 		margin-right: 20rpx;
		// 	}
		// 	text{
		// 		font-size: 28rpx;
		// 		color: #302c48;
		// 	}
		// }
		.pre{
			width:100vw;
			height: 100vh;
		}
		.tip-mark{
			padding: 0 20rpx;
			height: 40rpx;
			border-radius: 20rpx;
			font-size:20rpx;
			color: #353535;
			line-height: 40rpx;
			text-align: center;
			background: rgba(255,255,255,0.5);
			position: absolute;
			top:calc(100vh - 260rpx);
			right: 3%;
		}
		.ad{
			height:174rpx;
			width:94%;
			background:#ffffff;
			border-radius:10rpx;
			position:absolute;
			bottom:20rpx;
			left:3%;
			display: flex;
			align-items: center;
			justify-content: center;
			.enter-btn{
				width: 132rpx;
				height: 46rpx;
				line-height: 46rpx;
				text-align: center;
				background-color: #ffffff;
				border-radius: 23px;
				border: solid 1px #05c160;
				font-size: 26rpx;
				color: #05c160;
				position: absolute;
				right:20rpx;
				top:calc(50% - 23rpx);
			}
		}
	}
</style>

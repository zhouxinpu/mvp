<template>
	<view class="container">
		<view class="wifi-connect"><image src="../../static/5.png" mode=""></image><text>Wi-Fi连接中...</text></view>
		<image class="pre" src="./../../static/pre.jpg" mode="scaleToFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.s8Next()
		},
		methods: {
			s8Next(){
				setTimeout(()=>{
					uni.navigateTo({
						url: '/pages/login/login'
					})
				},5000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		.wifi-connect{
			padding: 0 30rpx;
			height: 60rpx;
			background-color: rgba(0, 0, 0, 0.6);
			box-shadow: 0rpx 0rpx 8rpx 6rpx 
				rgba(15, 63, 117, 0.04);
			border-radius: 30rpx;
			position: absolute;
			top:30rpx;
			left:calc(50% - 147rpx);
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			image{
				width: 38rpx;
				height: 30rpx;
				margin-right: 20rpx;
			}
			text{
				font-size: 28rpx;
				color: #ffffff;
			}
		}
		.pre{
			width:100vw;
			height: 100vh;
		}
	}
</style>

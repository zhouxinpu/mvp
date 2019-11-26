<template>
	<view :style="{top:top+'rpx'}" class="wifi-connect">
		<image :src="require('../../static/'+imgText+'.png')" mode="scaleToFill"></image>
		<text>{{tipText}}</text>
	</view>
</template>

<script>
	export default {
		name: 'TipMark',
		components: {

		},
		props: {
			top:{
				type: Number,
				default: 30
			},
			tipText: {
				type: String,
				default: '您已成功联网'
			},
			imgText: {
				type: String,
				default : '8'
			}
		},
		data() {
			
		},
		methods: {
			
		}
	}
</script>
<style lang="scss" scoped>
	.wifi-connect{
		padding: 0 30rpx;
		height: 60rpx;
		background-color: #fff;
		box-shadow: 0rpx 0rpx 8rpx 6rpx 
			rgba(15, 63, 117, 0.04);
		border-radius: 30rpx;
		position: absolute;
		left:50%;
		transform: translateX(-50%);
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
			color: #302c48;
		}
	}
</style>

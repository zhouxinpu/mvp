<template>
	<view class="container">
		<!-- gps未授权显示提示，授权隐藏 -->
		<!-- <view v-if="!isAuthLn" class="gps-tip">* GPS未授权</view> -->
		<image src="./../../static/bg-off.jpg" class="bg-off"></image>
		<picker-ln></picker-ln>
		<view class="content">
			<!-- 判断图片 -->
			<view class="wifi-wrap wifi-wrap-on">
				<image class="pic-wifi-status" src="./../../static/wifi-on.png"></image>
			</view>
			<!-- 判断文字 -->
			<text 
			style="marginBottom:90rpx"
			class="tip-wifi on">Wi-Fi 已连接</text>
		</view>
	</view>
</template>

<script>
	import pickerLn from '@/components/picker-ln/picker-ln.vue'
	export default {
		components: {
			pickerLn
		},
		computed: {
			
		},
		data() {
			return {
				isAuthLn: false, //是否授权位置 true 授权 false未授权
				ln: '虹桥机场', //位置
				// lnList: [{
				// 	name: '上海虹桥国际机场',
				// 	code: 'hq'
				// }, {
				// 	name: '上海浦东国际机场',
				// 	code: 'pd'
				// }], //位置数组
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		position: relative;
		padding-top: 330rpx;
		box-sizing: border-box;
		.bg-off {
			position: absolute;
			left: 0;
			top: -70rpx;
			width: 750rpx;
			height: 100vh;
		}
		
		.content {
			position: relative;
			z-index: 2;
			display: flex;
			flex-direction: column;
			align-items: center;
		}
		
		.wifi-wrap {
			width: 188rpx;
			height: 188rpx;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		.wifi-wrap-on{
			background: linear-gradient(0deg, 
					#5ece9a 0%, 
					#96eac0 100%);
			box-shadow: 0px 0px 20px 8px 
					rgba(15, 63, 117, 0.04);
		}
		
		.pic-wifi-status {
			width: 128rpx;
			height: 98rpx;
		}
		
		.tip-wifi {
			font-size: 28rpx;
			margin-top: 50rpx;
			width: 100%;
			text-align: center;
			color: #888888;
			&.on{
				color: #6bd4a3;
			}
		}
	}
</style>

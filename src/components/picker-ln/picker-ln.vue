<template>
	<picker @change="choiceLocation" range-key="name" :value="index" mode="selector" :range="lnList">
		<view class="wifi-picker">
			<image src="./../../static/location.png" class="wifi-location" mode="scaleToFill"></image>
			{{ln}}
			<image src="./../../static/arrow-right.png" class="arrow-right" mode="scaleToFill"></image>
		</view>
	</picker>
</template>

<script>
	export default {
		name: 'PickerLn',
		components: {

		},
		props: {
			lnList:{
				type:Array,
				default: [{
					name: '上海虹桥国际机场',
					code: 'hq'
				}, {
					name: '上海浦东国际机场',
					code: 'pd'
				}], //位置数组
			}
		},
		data() {
			return {
				ln: '上海虹桥国际机场', //位置
			}
		},
		methods: {
			//选择所在位置
			choiceLocation: function(e) {
				const index = e.detail.value
				this.ln = this.lnList[index].name
			}
		}
	}
</script>
<style lang="scss" scoped>
	/* 顶部picker样式 */
	.wifi-picker {
		width: 393rpx;
		padding: 0;
		height: 56rpx;
		position: absolute;
		top: 60rpx;
		left: 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 38rpx;

		.wifi-location {
			width: 28rpx;
			height: 36rpx;
		}

		.arrow-right {
			width: 12rpx;
			height: 20rpx;
		}
	}
</style>

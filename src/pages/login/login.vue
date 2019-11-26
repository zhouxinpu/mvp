<template>
	<view class="container">
		<image class="bg-login" src="./../../static/bg-login.jpg"></image>
		<!-- 广告标示 -->
		<view class="tip-mark">广告</view>
		<!-- 底部content -->
		<view v-if="toggleFlag" class="bottom-tab">
			<view class="tab">
				<!-- 循环渲染tabs -->
				<view v-for="item in tabs" @tap="selectTab(item)" :key="item.title" class="item" :class="{'active':active==item.title}">
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
						<view class="form-input">
							<button @tap="getAreacode">+86 <view class="triangle"></view></button>
							<input placeholder-style="color:#b2b2b2;" v-model="phoneMode.phone" type="number" placeholder="输入手机号" />
						</view>
						<view class="form-input">
							<input placeholder-style="color:#b2b2b2;" v-model="phoneMode.code" type="number" placeholder="输入验证码" />
							<button @tap="getSafecode">{{safeText}}</button>
						</view>
					</view>
					<button :disabled="btnDisabled" @tap="handlePhone" type="primary" class="btn">登录</button>
				</view>
				<view v-else-if="active=='取号机登录'" class="content-machine">
					<view class="machine-left">
						<view @tap="getMachine" class="search-machine">查找Wi-Fi取号机<image src="../../static/arrow-r.png" mode="scaleToFill"></image>
						</view>
						<view class="form">
							<input placeholder-style="color:#b2b2b2;" v-model="machineMode.account" type="text" placeholder="账号">
							<view class="line"></view>
							<input placeholder-style="color:#b2b2b2;" v-model="machineMode.password" type="text" placeholder="密码">
						</view>
					</view>
					<button :disabled="btnDisabled" type="primary" @tap="handleMachine" class="btn">登录</button>
				</view>
			</view>
			<view class="bottom-tip">
				<view v-if="!checked" class="warning">
					<image src="../../static/warning.png" mode=""></image>请接受使用条款及隐私通知"
				</view>
				<view class="tip-left">
					<checkbox class="cb" @tap="cbHandleChange" :checked="checked" color="#07c160" />
					<text @tap="alertTerms">使用条款及隐私通知</text>
				</view>
				<view class="tip-right">
					<view @tap="toggle" class="btn">热线</view>
					<view @tap="toggleLanguage" class="btn" v-text="L"></view>
				</view>
			</view>
		</view>
		<view v-if="!toggleFlag" class="hot-line">
			<text class="hot-tip">24小时热线电话</text>
			<text class="hot-tel" v-text="phoneNum"></text>
			<button @tap="ringUp" type="primary">拨打热线</button>
			<image @tap="toggle" src="../../static/circle.png" mode="scaleToFill"></image>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="pop">
				<view class="pop-top">
					<text>使用条款及隐私通知</text>
					<image @tap="closePop" src="../../static/close.png" mode="scaleToFill"></image>
				</view>
				<view class="pop-content">
					<view v-for="(item,index) in 100" :key="index">content</view>
				</view>
				<view class="pop-bottom">
					<label @tap="cbHandleChange">
						<checkbox class="cb" :checked="checked" color="#07c160" /><text>阅读并接受使用条款及隐私通知</text>
					</label>
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
				active: '取号机登录',
				tabs: [{
						title: '微信登录',
						pic: 'wechat'
					},
					{
						title: '短信登录',
						pic: 'phone'
					},
					{
						title: '取号机登录',
						pic: 'others'
					}
				],
				L: 'EN',	//语言
				phoneNum: '400 9200 657',	//电话号码
				btnDisabled: false, //控制按钮disabled状态
				safeText: '获取验证码',
				checked: true, //复选框
				toggleFlag: true,
				phoneMode:{
					phone: '',
					code: ''
				},
				machineMode:{
					account: '',
					password: ''
				},
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		components: {
			uniPopup
		},
		onLoad() {
			// this.$refs.popup.open()
		},
		methods: {
			// 切换登陆方式
			selectTab: function(item) {
				this.active = item.title
			},
			// 获取验证码
			getSafecode: function() {
				let ss = 60
				let timer = setInterval(() => {
					if (ss == 0) {
						clearInterval(timer)
						this.safeText = '获取验证码'
					} else {
						this.safeText = ss + ' s'
						ss--
					}
				}, 1000)
			},
			//切换语言
			toggleLanguage:function(){
				if(this.L=='EN'){
					this.L = '中文'
				}else{
					this.L = 'EN'
				}
			},
			//热线页和tab选择页面切换
			toggle: function() {
				this.toggleFlag = !this.toggleFlag
			},
			//打电话功能
			ringUp: function() {
				wx.makePhoneCall({
					phoneNumber: this.phoneNum
				})
			},
			// 复选框切换事件
			cbHandleChange:function(){
				this.checked = !this.checked
			},
			// 手机号登陆
			handlePhone: function() {
				uni.showToast({
					title: this.phoneMode.phone
				})
				// this.btnDisabled = !this.btnDisabled
			},
			// 取号机登陆
			handleMachine: function(){
				uni.showToast({
					title: this.machineMode.account
				})
			},
			// 获取区号
			getAreacode: function() {
				this.$refs.popup.open()
			},
			// 关闭弹出层
			closePop: function(){
				this.$refs.popup.close()
			},
			//弹出机器
			getMachine: function() {
				this.$refs.popup.open()
			},
			// 弹出协议
			alertTerms: function() {
				this.$refs.popup.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* login */
	.container {
		width: 100vw;
		height: 100vh;
		position: relative;

		.bg-login {
			position: absolute;
			width: 100%;
			height: 100%;
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
			top:calc(100vh - 400rpx);
			right: 40rpx;
		}

		.bottom-tab,
		.hot-line {
			height: 334rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			left: 0;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
		}

		.hot-line {
			background: rgba(0, 0, 0, .6);
			padding: 60rpx 150rpx;
			justify-content: space-between;
			align-items: center;

			.hot-tip {
				font-size: 26rpx;
				color: #ffffff;
			}

			.hot-tel {
				font-size: 40rpx;
				color: #05c160;
			}

			button {
				width: 100%;
				height: 88rpx;
				line-height: 88rpx;
				background: #05c160;
				border-radius: 44rpx;
				font-size: 30rpx;
			}

			image {
				width: 74rpx;
				height: 74rpx;
				position: absolute;
				top: calc(50% - 37rpx);
				left: 40rpx;
			}
		}

		.content {
			flex: 1;
			display: flex;
			padding: 0 40rpx;
			background: rgba(0, 0, 0, .6);

			&-wechat {
				flex: 1;
				display: flex;
				justify-content: center;
				flex-direction: column;

				button {
					width: 100%;
					font-size: 36rpx;
					height: 88rpx;
					line-height: 88rpx;
				}
			}

			&-phone {
				display: flex;
				flex: 1;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;

				.form {
					flex: 1;
					margin-right: 40rpx;

					input {
						font-size: 28rpx;
						color: #949494;
						height: 62rpx;
					}

					&-input {
						background: #eeeeee;
						width: 100%;
						height: 62rpx;
						box-sizing: border-box;
						border-radius: 31rpx;
						position: relative;

						&:nth-child(1) {
							margin-bottom: 20rpx;

							input {
								padding-left: 220rpx;
							}

							button {
								position: absolute;
								top: 0;
								left: 0;
								background: #eeeeee;
								width: 180rpx;
								border-radius: 31rpx 0 0 31rpx;
								height: 62rpx;
								font-size: 28rpx;
								color: #353535;

								&::after {
									border: none;
								}

								.triangle {
									width: 0px;
									height: 0px;
									position: absolute;
									top: 50%;
									right: 35rpx;
									transform: translate(-50%, -50%);
									border-top: 8rpx solid rgba(0, 0, 0, 0);
									border-right: 8rpx solid rgba(0, 0, 0, 0);
									border-bottom: 8rpx solid #353535;
									border-left: 8rpx solid rgba(0, 0, 0, 0);
								}
							}
						}

						&:nth-child(2) {
							input {
								padding-left: 40rpx;
								width: 280rpx;
								box-sizing: border-box;
							}

							button {
								width: 158rpx;
								height: 46rpx;
								padding: 0;
								line-height: 46rpx;
								background: #ffffff;
								border-radius: 23rpx;
								color: #949494;
								font-size: 22rpx;
								position: absolute;
								right: 20rpx;
								top: calc(50% - 23rpx);

								&::after {
									border: none;
								}
							}
						}
					}
				}
			}

			&-machine {
				flex: 1;
				display: flex;
				flex-direction: row;

				.machine-left {
					flex: 1;
					margin-right: 30rpx;
					display: flex;
					flex-direction: column;
				}

				.search-machine {
					font-size: 26rpx;
					color: #ffffff;
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: flex-end;
					margin: 25rpx 0;

					image {
						margin-left: 10rpx;
						width: 26rpx;
						height: 26rpx;
					}
				}

				.form {
					display: flex;
					height: 62rpx;
					border-radius: 31rpx;
					background: #ffffff;
					position: relative;

					input {
						width: 50%;
						height: 100%;
						font-size: 28rpx;
						padding-left: 20rpx;
						color: #949494;
					}

					.line {
						width: 1rpx;
						height: 32rpx;
						background: #525252;
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.btn {
					margin-top: 88rpx;
				}
			}

			.btn {
				width: 170rpx;
				height: 62rpx;
				border-radius: 31rpx;
				font-size: 28rpx;
				color: #ffffff;

				&[disabled][type="primary"] {
					background-color: #9ba0b0 !important;
				}

			}
		}

		.tab {
			height: 74rpx;
			display: flex;
		}

		.item {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 26rpx;
			color: #ffffff;
			background: rgba(0, 0, 0, .4);
		}

		.item.active {
			color: #05c160;
			background: rgba(0, 0, 0, .6);
		}

		.item image {
			width: 36rpx;
			height: 32rpx;
			margin-right: 20rpx;
		}

		.bottom-tip {
			height: 60rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: rgba(0, 0, 0, .6);
			position: relative;

			.tip-left {
				display: flex;
				align-items: center;
			}

			.warning {
				font-size: 18rpx;
				color: #f86b4e;
				position: absolute;
				display: flex;
				align-items: center;
				top: -16rpx;
				left: 60rpx;

				image {
					width: 22rpx;
					height: 22rpx;
					margin-right: 10rpx;
				}
			}

			.tip-left text {
				font-size: 22rpx;
				color: #9e9e9f;
				text-decoration: underline;
			}

			.tip-right {
				display: flex;
				align-items: center;

				.btn {
					border: 1rpx solid #ffffff;
					font-size: 22rpx;
					color: #ffffff;
					width: 80rpx;
					height: 36rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 6rpx;

					&:first-child {
						margin-right: 40rpx;
					}
				}
			}
		}

		.cb {
			transform: scale(0.5);
		}

		.pop {
			width: 80vw;
			height: 80vh;
			background-color: #34363a;

			&-top {
				height: 84rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				box-sizing: border-box;
				border-bottom: 1rpx solid #5d6164;
				text-align: center;

				text {
					font-size: 32rpx;
					color: #fff;
				}

				image {
					width: 32rpx;
					height: 32rpx;
					position: absolute;
					top: calc(50% - 20rpx);
					right: 40rpx;
				}
			}
			
			&-content{
				height:calc(80vh - 84rpx - 82rpx);
				padding: 20rpx 40rpx;
				box-sizing: border-box;
				overflow-y: auto;
			}

			&-bottom {
				height: 82rpx;
				border-top: 1rpx solid #5d6164;
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				label{
					display: flex;
					align-items: center;
					text{
						font-size: 32rpx;
						color: #ffffff;
					}
				}
			}
		}
	}
</style>

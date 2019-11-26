<template>
	<view class="container">
		<!-- gps未授权显示提示，授权隐藏 -->
		<view v-if="!isAuthLn" class="gps-tip">* GPS未授权</view>
		<image src="./../../static/bg-off.jpg" class="bg-off"></image>
		<picker-ln :lnList="lnList"></picker-ln>
		<view class="content">
			<!-- 判断图片 -->
			<view :class="statusClazz">
				<image v-if="status=='off'" class="pic-wifi-status" src="./../../static/wifi-off.png"></image>
				<image v-else-if="status=='on'" class="pic-wifi-status" src="./../../static/wifi-on.png"></image>
				<image v-else-if="status=='close'" class="pic-wifi-status" src="./../../static/wifi-close.png"></image>
				<image v-else class="pic-wifi-status" src="./../../static/wifi-other.png"></image>
			</view>
			<!-- 判断文字 -->
			<text 
			:style="{'margin-bottom':status=='other'?'30rpx':'90rpx'}" 
			:class="{'on':status=='on'?'on':''}" 
			class="tip-wifi">{{statusText}}</text>
			<!-- other时特异处理 -->
			<text v-if="status=='other'" class="tip-other">建议使用机场Wi-Fi</text>
			<!-- 判断按钮 -->
			<button @tap="handleConnectWifi" v-if="['off','other'].includes(status)" class="wifi-btn" type="primary">连接Wi-Fi</button>
			<button v-if="status=='close'" class="wifi-btn" type="primary">前往开启</button>
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
			statusClazz(){	//动态返回class
				let addCls = ''
				if(this.status=='off'){
					addCls = 'wifi-wrap-off'
				}else if(this.status == 'on'){
					addCls = 'wifi-wrap-on'
				}else if(this.status == 'close'){
					addCls = 'wifi-wrap-close'
				}else if(this.status == 'other'){
					addCls = 'wifi-wrap-other'
				}
				return 'wifi-wrap ' + addCls;
			},
			statusText(){	//动态返回文字
				let str = ''
				if(this.status=='off'){
					str = 'Wi-Fi 未连接'
				}else if(this.status == 'on'){
					str = 'Wi-Fi 已连接'
				}else if(this.status == 'close'){
					str = 'Wi-Fi 未开启'
				}else if(this.status == 'other'){
					str = '当前使用为非机场Wi-Fi'
				}
				return str;
			}
		},
		data() {
			return {
				status: 'off', //on off other close
				isAuthLn: false, //是否授权位置 true 授权 false未授权
				ln: '虹桥机场', //位置
				lnList: [{
					name: '上海虹桥国际机场',
					code: 'hq'
				}, {
					name: '上海浦东国际机场',
					code: 'pd'
				}], //位置数组
				account: '501',
				password: '1a2a3a4a5a',
				canIUse: wx.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			this.getLn()
		},
		methods: {
			// 授权获取地理位置信息
			getLn(){
				uni.getSetting({
					success:(res)=>{
						let status = res.authSetting['scope.userLocation']// 查看位置权限的状态
						if(!status){
							uni.authorize({	//授权
								scope:'scope.userLocation',
								success:()=>{
									uni.getLocation({	//获取地理位置
										geocode:true,
										success:(res)=>{
											this.isAuthLn = true
											uni.showToast({
												title:`(${res.latitude},${res.longitude})`
											})
										}
									})
								},
								fail:()=>{
									this.isAuthLn = false
									uni.showToast({
										title:"获取位置信息失败"
									})
								}
							})
						}else{
							this.isAuthLn = true
						}
					}
				})
			},
			handleConnectWifi(){
			    uni.getSystemInfo({
					success: (res)=> {
						console.log(res);
						var system = '';
						if (res.platform == 'android') system = parseInt(res.system.substr(8));
						if (res.platform == 'ios') system = parseInt(res.system.substr(4));
						if (res.platform == 'android' && system < 6) {
						  uni.showToast({
							title: '手机版本不支持',
						  })
						  return
						}
						if (res.platform == 'ios' && system < 11.2) {
						  uni.showToast({
							title: '手机版本不支持',
						  })
						  return
						}
						this.startWifi()
					}
			    })
			  },
			  startWifi:function(){
			    wx.startWifi({
			      success:res=>{
			        this.connectWifi();
			      },
			      fail:err=>{
					  console.log(err)
			        uni.showToast({
			          title: String(err)
			        })
			      }
			    })
			  },
			  connectWifi:function(){
			    wx.connectWifi({
			      SSID: this.account,
			      password: this.password,
			      success:res=>{
			        uni.showToast({
			          title: '连接wifi成功',
			        })
			        // wx.onWifiConnected(function(res){
			        //   console.log(res);
			        // })
			      },
			      fail:err=>{
			        uni.showToast({
			          title: '连接出错',
			        })
			      }
			    })
			 }
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
		
		.wifi-wrap-off,
		.wifi-wrap-other{
			box-shadow: 0px 0px 20px 8px rgba(15, 63, 117, 0.08);
			background: #ffffff;
		}
		.wifi-wrap-on{
			background: linear-gradient(0deg, 
					#5ece9a 0%, 
					#96eac0 100%);
			box-shadow: 0px 0px 20px 8px 
					rgba(15, 63, 117, 0.04);
		}
		.wifi-wrap-close{
			background-color: #eeeff1;
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
		.tip-other{
			color: #302c48;
			font-size: 30rpx;
			margin-bottom:54rpx;
		}
		
		// .tip-wifi-off {
		// 	color: #888888;
		// }
	}
</style>

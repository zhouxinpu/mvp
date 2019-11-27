<script>
	let {fetch_get} = require('./utils/index.js')
	export default {
		onLaunch: function() {
			console.log('App Launch')
			uni.getSystemInfo({
				success:(res)=>{
					if(res.wifiEnabled){
						wx.getConnectedWifi({
							success:(result)=>{
								uni.showToast({
									title: `wifi:${result.wifi.SSID}`
								})
							}
						})
					}else{
						uni.showToast({
							icon: 'none',
							title:'打开wifi开关'
						})
					}
				}
			})
			uni.login({
				success: (res)=>{
					console.log(fetch_get)
					fetch_get('/wx/getOpenIdByCode',{'js_code':res.code})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
			let obj = wx.getLaunchOptionsSync()
			console.log(obj,obj.scene)
			if(obj.scene==1011){
				console.log('扫码进入')
			}else if(obj.scene==1001){
				console.log('发现栏小程序主入口进入')
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/**app.wxss**/
	.container {
	  width:100vw;
	  height:100vh;
	  background: #ffffff;
	} 
	/* gps提示 */
	.container .gps-tip{
	  position: absolute;
	  left:0;
	  top:0;
	  background-color: rgba(220, 0, 0, 0.41);
	  width:100%;
	  padding:10rpx 30rpx;
	  z-index:2;
	  box-sizing: border-box;
	  font-size:20rpx;
	  color:#ffffff;
	}
	
	/* wifi-wrap样式 */
	.container .wifi-wrap{
	  width:188rpx;
	  height:188rpx;
	  border-radius:50%;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	/* 按钮样式 */
	.container .wifi-btn{
		width:320rpx;
		height:88rpx;
	  border-radius:44rpx;
	  font-size:36rpx;
	  color:#ffffff;
	  padding: 0;
	}
</style>

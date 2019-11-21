<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
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
	/* 顶部picker样式 */
	.container .wifi-picker{
	  width:220rpx;
	  height:70rpx;
	  border-radius:35rpx;
	  box-shadow: 0px 0px 5px 4px 
			rgba(15, 63, 117, 0.04);
	    position: absolute;
	    top:60rpx;
	    left:28rpx;
	    display: flex;
	    align-items: center;
	    justify-content: space-evenly;
	    font-size:28rpx;
	}
	.container .wifi-location{
	  width:30rpx;
	  height:38rpx;
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
	  border-radius:44rpx;
	  font-size:36rpx;
	  color:#ffffff;
	}
</style>

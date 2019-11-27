let base_url = 'http://212.64.68.135'

let fetch_get = (url, data)=>{
	return new Promise((resolve,reject)=>{
		wx.request({
			url: base_url+ url,
			method:"GET",
			data: data,
			dataType: 'json',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				uni.showToast({
					title: err,
					icon:'none'
				})
			}
		})
	})
}

let fetch_post = (url, data)=>{
	return new Promise((resolve,reject)=>{
		wx.request({
			url: base_url+ url,
			method:"POST",
			data: data,
			dataType: 'json',
			header: {
				'content-type': 'application/json' // 默认值
			},
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				uni.showToast({
					title: err,
					icon:'none'
				})
			}
		})
	})
}

module.exports = {
	fetch_get,
	fetch_post
}
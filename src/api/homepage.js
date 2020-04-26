export const getCouponData = (callBack=null, url=null, filter=null) => {
	let uri = 'http://3.6.87.222/api/coupons/coupon/';
	if(filter){
		uri += "?filter=" + filter.replace(/ /g, "")
 	}
	if(url){
		let n = url.indexOf("api");
		uri = "http://3.6.87.222/" + url.slice(n)
	}
	fetch(uri , {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json;charset=utf-8'
		},
	})
		.then(res => {
			return res.json()
		})
		.then(data => {
			callBack(data);
		})
		.catch(err => {
			console.error("error occured");
			console.error(err);
		});
}

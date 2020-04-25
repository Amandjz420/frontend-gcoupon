export const getCouponData = (callBack=null, url=null, filter=null) => {
	let uri = 'http://localhost:8000/api/coupons/coupon/';
	if(filter){
		uri += "?filter=" + filter.replace(/ /g, "")
 	}
	if(url){
		uri = url
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

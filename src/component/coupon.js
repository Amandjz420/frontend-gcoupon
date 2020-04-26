import React, { Component } from 'react'
import './component.css';
import Tags from './tags'

export default class CouponCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			label: props.name
		};
	}
	redirect = (link) =>{
		window.open(link, "_blank")
	}
	render() {
		let data = this.props.data;
		return(
			<div className="coupon-card" onClick={() => this.redirect(this.state.data.link)}>
				<div className={'coupon'}>
					<div className={'coupon-info'}>
						<div className={'coupon-expiry'}>
							<span>expiry: {data.expiry_time}</span>
						</div>
						<div className={'coupon-label'}>
							<span>{data.name}</span>
						</div>

						<div></div>
					</div>
					{data.categories.length > 0 && <Tags tags={data.categories}/>}
				</div>
			</div>
		)
	}
}

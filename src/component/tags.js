import React, { Component } from 'react'
import './component.css';

export default class Tags extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div className={'tags-container'}>
				{
					this.props.tags.map((item) => {
						return <span className={'tags'}>{item}</span>
					})
				}
			</div>
		)
	}
}

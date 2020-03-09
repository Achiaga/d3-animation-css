import React from 'react';
import * as d3 from 'd3';

export default class Axis extends React.Component {
	componentDidMount() {
		this.renderAxis();
	}
	componentDidUpdate() {
		this.renderAxis();
	}
	renderAxis() {
		let node = this.refs.axis;
		if (this.props.orient !== 'bottom') {
			let axis = d3
				.axisLeft()
				.ticks(5)
				.scale(this.props.scale);
			d3.select(node).call(axis);
			console.log(this.props);
		} else {
			let axis = d3
				.axisBottom()
				.ticks(5)
				.scale(this.props.scale);
			d3.select(node).call(axis);
			console.log(this.props);
		}
	}
	render() {
		return <g className='axis' ref='axis' transform={this.props.translate}></g>;
	}
}

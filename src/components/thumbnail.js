import React, {Component} from "react";
import {connect} from "react-redux";

import {featurePhoto} from "../actions/";

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	} 
	buildUrl() {
		return `https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}_q.jpg`;
	}
	handleLoad() {
		this.setState({
			loaded: true
		});
		this.props.imagesLoaded();
	}
	handleClick() {
		this.props.featurePhoto(this.props.index);
	}
	render() {
		return (
			<div className="text-xs-center thumbnail col-lg-2 col-md-3 col-sm-4 col-xs-6">
				<img 
					onLoad={this.handleLoad.bind(this)}
					onClick={this.handleClick.bind(this)}
					className={"img-thumbnail " + (this.state.loaded ? "visible" : "invisible")} 
					src={this.buildUrl()} 
					alt={this.props.title}
				/>
			</div>
		);
	}
}

export default connect(null, {featurePhoto})(Thumbnail);

import React, {Component} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Loader from "./loader";

class Lightbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,
			winWidth: null,
			winHeight: null,
			imageWidth: null,
			imageHeight: null
		};
		handleScreenResize();
	}
	renderLoader() {
		if(!this.state.imageLoaded) {
			return (
				<Loader />
			);
		}
	}
	handleLoad() {
		this.setState({
			imageLoaded: true
		});
	}
	renderImage() {
		const fp = this.props.photos.photo[this.props.featuredPhoto];
		const src = `https://farm${fp.farm}.staticflickr.com/${fp.server}/${fp.id}_${fp.secret}_c.jpg`;
		const description = fp.title ? fp.title : "Untitled";
		return (
			<div className="featured-image">
				<div className="image-holder">
					<img onLoad={this.handleLoad.bind(this)} src={src} alt={description} />
					<div className="description">
						{description}
					</div>
				</div>
			</div>
		);
	}
	render() {
		return (
			<div className="lightbox">
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={200}>
					{this.renderImage()}
					{this.renderLoader()}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		photos: state.animal.photos,
		featuredPhoto: state.animal.featuredPhoto
	};
}
function handleScreenResize() {
	window.addEventListener("resize", function() {
		console.log(window.innerWidth);
	});
}

export default connect(mapStateToProps)(Lightbox);

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
			imageHeight: null
		};
		window.addEventListener("resize", this.handleWindowResize.bind(this));
	}
	componentWillMount() {
		this.setState({
			winHeight: window.innerHeight
		});
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
			<div className={"featured-image " + (this.state.imageLoaded ? "visible" : "invisible")}>
				<div className="image-holder">
					<img onLoad={this.handleLoad.bind(this)} src={src} alt={description} className={this.state.imageLoaded ? "visible" : "invisible"} style={{maxHeight: (this.state.winHeight - 20) + "px"}} />
					<div className="description">
						{description}
					</div>
				</div>
			</div>
		);
	}
	handleWindowResize() {
		this.setState({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight
		});
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

export default connect(mapStateToProps)(Lightbox);

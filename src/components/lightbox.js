import React, {Component} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Loader from "./loader";
import {featurePhoto} from "../actions/";

class Lightbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,
			winWidth: null,
			winHeight: null
		};
		this.handleWindowResize = this.handleWindowResize.bind(this);
		window.addEventListener("resize", this.handleWindowResize);
	}
	componentDidMount() {
		this.setState({
			winHeight: window.innerHeight,
			winWidth: window.innerWidth
		});
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize);
	}
	renderLoader() {
		if(!this.state.imageLoaded) {
			return (
				<Loader />
			);
		}
	}
	renderFeaturedImage() {
		if(this.props.featuredPhoto !== null) {
			const fp = this.props.photos.photo[this.props.featuredPhoto];
			const src = `https://farm${fp.farm}.staticflickr.com/${fp.server}/${fp.id}_${fp.secret}_c.jpg`;
			const description = fp.title ? fp.title : "Untitled";
			return (
				<div className="image-holder">
					<img onLoad={this.handleLoad.bind(this)} src={src} alt={description} className={this.state.imageLoaded ? "visible" : "invisible"} style={{maxHeight: (this.state.winHeight - 40) + "px", maxWidth: (this.state.winWidth - 40) + "px"}} />
					<div className="description">
						{description}
					</div>
				</div>
			);
		}
	}
	handleLoad() {
		this.setState({
			imageLoaded: true
		});
	}
	handleCloseClick() {
		this.props.featurePhoto(null);
	}
	renderImage() {
		return (
			<div className={"featured-image " + (this.state.imageLoaded ? "visible" : "invisible")}>
				<div className="fake-table" style={{height: this.state.winHeight}}>
					<div className="fake-row">
						<div className="fake-cell">
							{this.renderFeaturedImage()}
						</div>
					</div>
				</div>
				<div onClick={this.handleCloseClick.bind(this)} className="lightbox-button close-button"></div>
				<div className="lightbox-button prev-button"></div>
				<div className="lightbox-button next-button"></div>
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

export default connect(mapStateToProps, {featurePhoto})(Lightbox);

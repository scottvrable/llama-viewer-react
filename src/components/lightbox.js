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
	componentWillUpdate(prevProps) {
		if(prevProps.featuredPhoto !== this.props.featuredPhoto) {
			this.setState({
				imageLoaded: false
			});
		}
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
	handleLoad() {
		this.setState({
			imageLoaded: true
		});
	}
	handlePrevClick() {
		let newPhotoIndex;
		newPhotoIndex = (this.props.featuredPhoto === 0) ? 23 : (this.props.featuredPhoto - 1);
		this.props.featurePhoto(newPhotoIndex);
	}
	handleCloseClick() {
		this.props.featurePhoto(null);
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
	renderLightbox() {
		return (
			<div className={"featured-image " + (this.state.imageLoaded ? "loaded" : "not-loaded")}>
				<div className="fake-table" style={{height: this.state.winHeight}}>
					<div className="fake-row">
						<div className="fake-cell">
							{this.renderFeaturedImage()}
						</div>
					</div>
				</div>
				<div onClick={this.handleCloseClick.bind(this)} className="lightbox-button close-button"></div>
				<div onClick={this.handlePrevClick.bind(this)} className="lightbox-button prev-button"></div>
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
	handleClick(e) {
		if(e.target.className === "fake-cell") {
			this.handleCloseClick();
		}
	}
	render() {
		return (
			<div className="lightbox" onClick={this.handleClick.bind(this)}>
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={200}>
					{this.renderLightbox()}
				</ReactCSSTransitionGroup>
				{this.renderLoader()}
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

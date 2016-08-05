import React, {Component} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Loader from "./loader";
import {featurePhoto} from "../actions/";

var lightboxTimer;

class Lightbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,
			winWidth: null,
			winHeight: null,
			timedOut: false,
			timerCleared: false
		};
		this.handleWindowResize = this.handleWindowResize.bind(this);
		this.removeLoader = this.removeLoader.bind(this);
		window.addEventListener("resize", this.handleWindowResize);
	}
	componentDidMount() {
		this.setState({
			winHeight: window.innerHeight,
			winWidth: window.innerWidth
		});
		this.startTimer();
	}
	componentDidUpdate(prevProps) {
		if(prevProps.featuredPhoto !== this.props.featuredPhoto) {
			this.setState({
				imageLoaded: false
			});
			if(!this.state.timerCleared) {
				this.clearTimer();
			}
			this.startTimer();
		}
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.handleWindowResize);
		this.clearTimer();
	}
	startTimer() {
		this.setState({
			timerCleared: false
		});
		lightboxTimer = window.setTimeout(this.removeLoader, 10000);
	}
	clearTimer() {
		this.setState({
			timerCleared: true
		});
		window.clearTimeout(lightboxTimer);
	}
	removeLoader() {
		this.setState({
			timedOut: true
		});
		this.props.displayLoadWarning();
	}
	handleWindowResize() {
		this.setState({
			winWidth: window.innerWidth,
			winHeight: window.innerHeight
		});
	}
	renderLoader() {
		if(!this.state.imageLoaded) {
			if(!this.state.timedOut) {
				return (
					<Loader />
				);
			}
		} else if(!this.state.timerCleared) {
			this.clearTimer();
		}
	}
	handleLoad() {
		this.setState({
			imageLoaded: true
		});
	}
	handlePrevClick() {
		let newPhotoIndex;
		let counter = 1;
		function findPrevPhoto(counter) {
			newPhotoIndex = (this.props.featuredPhoto === 0) ? (24 - counter) : (this.props.featuredPhoto - counter);
			if(this.props.photos.photo[newPhotoIndex]) {
				this.props.featurePhoto(newPhotoIndex);
			} else {
				++counter;
				findPrevPhoto(counter);
			}
		}
		findPrevPhoto = findPrevPhoto.bind(this);
		findPrevPhoto(counter);
	}
	handleNextClick() {
		let newPhotoIndex;
		let counter = 1;
		function findNextPhoto(counter) {
			newPhotoIndex = (this.props.featuredPhoto === (24 - counter)) ? 0 : (this.props.featuredPhoto + counter);
			if(this.props.photos.photo[newPhotoIndex]) {
				this.props.featurePhoto(newPhotoIndex);
			} else {
				++counter;
				findNextPhoto(counter);
			}
		}
		findNextPhoto = findNextPhoto.bind(this);
		findNextPhoto(counter);
	}
	handleCloseClick() {
		this.props.featurePhoto(null);
	}
	handleClick(e) {
		if(e.target.className === "fake-cell") {
			this.handleCloseClick();
		}
	}
	renderFeaturedImage() {
		if(this.props.featuredPhoto !== null) {
			const fp = this.props.photos.photo[this.props.featuredPhoto];
			const src = `https://farm${fp.farm}.staticflickr.com/${fp.server}/${fp.id}_${fp.secret}_c.jpg`;
			const description = fp.title ? fp.title : "Untitled";
			return (
				<div className="image-holder">
					<img onLoad={this.handleLoad.bind(this)} src={src} alt={description} style={{maxHeight: (this.state.winHeight - 40) + "px", maxWidth: (this.state.winWidth - 40) + "px"}} />
					<div className="description">
						{description}
					</div>
				</div>
			);
		}
	}
	renderLightbox() {
		return (
			<div className={"featured-image " + (this.state.imageLoaded ? "visible" : "invisible")}>
				<div className={(this.state.imageLoaded ? "loaded" : "not-loaded")}>
					<div className="fake-table" style={{height: this.state.winHeight}}>
						<div className="fake-row">
							<div className="fake-cell">
								{this.renderFeaturedImage()}
							</div>
						</div>
					</div>
					<div onClick={this.handleCloseClick.bind(this)} className="lightbox-button close-button"></div>
					<div onClick={this.handlePrevClick.bind(this)} className="lightbox-button prev-button"></div>
					<div onClick={this.handleNextClick.bind(this)} className="lightbox-button next-button"></div>
				</div>
			</div>
		);
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

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AnimalArray from "../animal_array";
import Warning from "./warning";
import Loader from "./loader";
import Thumbnail from "./thumbnail";
import Lightbox from "./lightbox";
import {setAnimal, fetchAnimal, clearImages} from "../actions/";

var timer;

class Gallery extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			imagesLoaded: 0,
			timedOut: false,
			timerCleared: false,
			featuredPhotoTimedOut: false
		};
		this.removeLoader = this.removeLoader.bind(this);
		this.displayLoadWarning = this.displayLoadWarning.bind(this);
		this.clearLoadWarning = this.clearLoadWarning.bind(this);
	}
	componentWillMount() {
		const pageParam = Number(this.props.params.page);
		if(this.matchToAnimalArray() === false) {
			this.context.router.push("/llama/1");
		} else if(isNaN(pageParam) || pageParam < 1 || pageParam > 40) {
			this.context.router.push("/" + this.props.params.animal + "/1");
		}
		this.startTimer();
	}
	componentDidUpdate(prevProps) {
		let oldParams = prevProps.params
    let newParams = this.props.params
    let oldFeature = prevProps.featuredPhoto;
    let newFeature = this.props.featuredPhoto;
    if(newParams !== oldParams) {
    	this.props.clearImages({photos: []});
      this.matchToAnimalArray();
      if(!this.state.timerCleared) {
      	this.clearTimer();
      }
    	this.startTimer();
    }
    if(newFeature !== oldFeature) {
    	this.renderLightbox();
    }
	}
	matchToAnimalArray() {
		let matchFound = false;
		this.setState({imagesLoaded: 0, timedOut: false});
		AnimalArray.forEach(animalObj => {
			if(animalObj.single === this.props.params.animal) {
				this.props.setAnimal({...animalObj, page: this.props.params.page});
				this.props.fetchAnimal({...animalObj, page: this.props.params.page});
				matchFound = true;
			}
		});
		return matchFound;
	}
	imagesLoaded() {
		this.setState({
			imagesLoaded: (++this.state.imagesLoaded)
		});
	}
	removeLoader() {
		this.setState({
			timedOut: true
		});
	}
	startTimer() {
		this.setState({
			timerCleared: false
		});
		timer = window.setTimeout(this.removeLoader, 10000);
	}
	clearTimer() {
		this.setState({
			timerCleared: true
		});
		window.clearTimeout(timer);
	}
	displayLoadWarning() {
		this.setState({
			featuredPhotoTimedOut: true
		});
	}
	clearLoadWarning() {
		this.setState({
			featuredPhotoTimedOut: false
		});
	}
	renderWarning() {
		if(this.state.featuredPhotoTimedOut) {
			return (
				<div className="row">
					<div className="col-xs-12">
						<Warning />
					</div>
				</div>
			);
		}
	}
	renderThumbnails() {
		if(this.props.photos.photo) {
			return this.props.photos.photo.map((thumb, index) => {
				return (
					<Thumbnail key={thumb.id} index={index} {...thumb} imagesLoaded={this.imagesLoaded.bind(this)} clearLoadWarning={this.clearLoadWarning} />
				);
			});
		}
	}
	renderLoader() {
		if(this.state.imagesLoaded !== 24) {
			if(!this.state.timedOut) {
				return (
					<Loader />
				);
			} else if(!this.state.timerCleared) {
				this.clearTimer();
			}
		}
	}
	renderLightbox() {
		if(this.props.featuredPhoto !== null && !this.state.featuredPhotoTimedOut) {
			return (
				<Lightbox displayLoadWarning={this.displayLoadWarning} />
			);
		}
	}
	render() {
		return (
			<div className="gallery clearfix">
				<div className="col-xs-12">
					<div className="container">
						{this.renderWarning()}
						<div className="row">
							{this.renderThumbnails()}
							<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={200}>
								{this.renderLightbox()}
								{this.renderLoader()}
							</ReactCSSTransitionGroup>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: {
			single: state.animal.single,
			plural: state.animal.plural,
			page: state.animal.page
		},
		photos: state.animal.photos,
		featuredPhoto: state.animal.featuredPhoto
	};
}

export default connect(mapStateToProps, {setAnimal, fetchAnimal, clearImages})(Gallery);

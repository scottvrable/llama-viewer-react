import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import AnimalArray from "../animal_array";
import Loader from "./loader";
import Thumbnail from "./thumbnail";
import {setAnimal, fetchAnimal} from "../actions/";

class Gallery extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	constructor(props) {
		super(props);
		this.state = {
			imagesLoaded: 0
		};
	}
	componentWillMount() {
		const pageParam = Number(this.props.params.page);
		if(this.matchToAnimalArray() === false) {
			this.context.router.push("/llama/1");
		} else if(isNaN(pageParam) || pageParam < 1 || pageParam > 40) {
			this.context.router.push("/" + this.props.params.animal + "/1");
		} 
	}
	componentDidUpdate(prevProps) {
		let oldParams = prevProps.params.animal
    let newParams = this.props.params.animal
    if (newParams !== oldParams) {
      this.matchToAnimalArray();
    }
	}
	matchToAnimalArray() {
		let matchFound = false;
		AnimalArray.forEach(animalObj => {
			if(animalObj.single === this.props.params.animal) {
				this.props.setAnimal(animalObj);
				this.props.fetchAnimal(animalObj);
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
	renderThumbnails() {
		if(this.props.photos) {
			return this.props.photos.photo.map((thumb, index) => {
				return (
					<Thumbnail key={thumb.id} index={index} {...thumb} imagesLoaded={this.imagesLoaded.bind(this)} />
				);
			});
		}
	}
	renderLoader() {
		if(this.state.imagesLoaded !== 24) {
			return (
				<Loader />
			);
		}
	}
	render() {
		return (
			<div className="gallery clearfix">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							<ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={200}>
								{this.renderThumbnails()}
							</ReactCSSTransitionGroup>
							{this.renderLoader()}
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
		photos: state.animal.photos
	};
}

export default connect(mapStateToProps, {setAnimal, fetchAnimal})(Gallery);

import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import AnimalArray from "../animal_array";
import Thumbnail from "./thumbnail";
import {setAnimal, fetchAnimal} from "../actions/";

class Gallery extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	componentWillMount() {
		if(this.matchToAnimalArray() === false) {
			this.context.router.push("/llama/1");
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
	renderThumbnails() {
		if(this.props.photos) {
			return this.props.photos.photo.map((thumb, index) => {
				return (
					<Thumbnail key={thumb.id} index={index} {...thumb} />
				);
			});
		}
	}
	render() {
		return (
			<div className="gallery clearfix">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							{this.renderThumbnails()}
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

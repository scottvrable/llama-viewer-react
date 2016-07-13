import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";

import AnimalArray from "../animal_array";
import {setAnimal} from "../actions/";

class Gallery extends Component {
	static contextTypes = {
		router: PropTypes.object
	};
	componentWillMount() {
		if(this.matchToAnimalArray() === false) {
			this.context.router.push("/llama");
		}
	}
	matchToAnimalArray() {
		let matchFound = false;
		AnimalArray.forEach(animalObj => {
			if(animalObj.single === this.props.params.animal) {
				this.props.setAnimal(animalObj);
				matchFound = true;
			}
		});
		return matchFound;
	}
	render() {
		return (
			<div className="gallery">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								{this.props.animal.single}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({animal}) {
	return {animal};
}

export default connect(mapStateToProps, {setAnimal})(Gallery);

import React, {Component} from "react";
import {connect} from "react-redux";

import AnimalArray from "../animal_array";
import {setAnimal} from "../actions/";

class Gallery extends Component {
	constructor(props) {
		super(props);
		AnimalArray.forEach(animalObj => {
			if(animalObj["single"] === this.props.params.animal) {
				this.props.setAnimal(animalObj);
				return;
			}
		});
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

import React, {Component} from "react";
import onClickOutside from "react-onclickoutside";
import {Link} from "react-router";
import {connect} from "react-redux";

import AnimalArray from "../animal_array";

class DiffButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdown: false
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick() {
		this.setState({
			dropdown: !(this.state.dropdown)
		});
	}
	handleClickOutside(evt) {
		this.setState({
			dropdown: false
		});
	}
	hideActiveAnimal(linkedAnimal) {
		if(this.props.animal === linkedAnimal) {
			return "hide";
		}
	}
	dropdown() {
		if(this.state.dropdown) {
			return (
				<div className="dropdown-menu dropdown-menu-right">
					{AnimalArray.map(animalObj => {
						return (
							<Link to={"/" + animalObj.single + "/1"} key={animalObj.single} onClick={this.handleClick} className={"dropdown-item text-capitalize " + this.hideActiveAnimal(animalObj.single)}>
								{animalObj.single}
							</Link>
						);
					})}
					<span className="up-pointer"></span>
				</div>
			);
		}
	}
	render() {
		return (
			<div className={"diff-btn btn-group " + (this.state.dropdown ? 'open' : '')} >
				<button onClick={this.handleClick} type="button" className="btn text-capitalize dropdown-toggle">
					Show me something different
				</button>
				{this.dropdown()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: state.animal.single
	};
}

export default connect(mapStateToProps)(onClickOutside(DiffButton));

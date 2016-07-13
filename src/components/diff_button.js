import React, {Component} from "react";
import onClickOutside from "react-onclickoutside";
import {Link} from "react-router";

import AnimalArray from "../animal_array";

class DiffButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdown: false
		};
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
	dropdown() {
		if(this.state.dropdown) {
			return (
				<div className="dropdown-menu dropdown-menu-right">
					{AnimalArray.map(animalObj => {
						return (
							<Link to={"/" + animalObj.single} key={animalObj.single} onClick={this.handleClick} className="dropdown-item text-capitalize" activeClassName="hide">
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
				<button onClick={this.handleClick.bind(this)} type="button" className="btn text-capitalize dropdown-toggle">
					Show me something different
				</button>
				{this.dropdown()}
			</div>
		);
	}
}

export default onClickOutside(DiffButton);

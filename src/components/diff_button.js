import React, {Component} from "react";
import onClickOutside from "react-onclickoutside";

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
					<a className="dropdown-item" href="#">Llamas</a>
					<a className="dropdown-item" href="#">Pigs</a>
					<a className="dropdown-item" href="#">Horses</a>
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

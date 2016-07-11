import React, {Component} from "react";

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
	dropdown() {
		if(this.state.dropdown) {
			return (
				<div className="dropdown-menu dropdown-menu-right">
					<a className="dropdown-item" href="#">Llamas</a>
					<a className="dropdown-item" href="#">Pigs</a>
					<a className="dropdown-item" href="#">Horses</a>
				</div>
			);
		}
	}
	render() {
		return (
			<div className={"btn-group " + (this.state.dropdown ? 'open' : '')}>
				<button onClick={this.handleClick.bind(this)} type="button" className="btn show-diff-btn text-capitalize dropdown-toggle">
					Show me something different
				</button>
				{this.dropdown()}
			</div>
		);
	}
}

export default DiffButton;

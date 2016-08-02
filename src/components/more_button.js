import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class MoreButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nextPageNum: this.pickRandomPage()
		};
	}
	componentWillReceiveProps() {
		this.setState({
			nextPageNum: this.pickRandomPage()
		});
	}
	pickRandomPage() {
		let nextNum;
		nextNum = Math.ceil(40 * Math.random());
		if(nextNum === Number(this.props.page)) {
			this.pickRandomPage();
		}
		return nextNum;
	}
	render() {
		return (
			<div className="more-btn">
				<Link to={"/" + this.props.animal.single + "/" + this.state.nextPageNum} className="btn text-capitalize">
					Show me more {this.props.animal.plural}!
				</Link>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: {
			single: state.animal.single,
			plural: state.animal.plural
		},
		page: state.animal.page
	};
}

export default connect(mapStateToProps)(MoreButton);

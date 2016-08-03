import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class MoreButton extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nextPageNum: null
		};
	}
	componentWillReceiveProps() {
		this.setState({
			nextPageNum: this.pickRandomPage()
		});
	}
	pickRandomPage() {
		let nextNum;
		const max = 40;
		nextNum = Math.ceil(max * Math.random());
		if(nextNum === Number(this.props.page)) {
			if(nextNum < max) {
				++nextNum;
			} else {
				nextNum = 1;
			}
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

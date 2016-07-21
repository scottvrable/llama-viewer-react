import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";

class MoreButton extends Component {
	render() {
		return (
			<Link to={"/" + this.props.animal.single + "/2"} className="btn show-more-btn text-capitalize">
				Show me more {this.props.animal.plural}!
			</Link>
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

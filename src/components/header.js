import React, {Component} from "react";
import {connect} from "react-redux";

import DiffButton from "./diff_button";

class Header extends Component {
	render() {
		console.log(this.props);
		return (
			<header className="header row">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<h1 className="text-xs-center pull-md-left">
									The Amazing <span className="featured-animal">{this.props.animal.single}</span> Viewer!
								</h1>
								<div className="button-group text-xs-center pull-md-right">
									<DiffButton />
									<button type="button" className="btn show-more-btn text-capitalize">Show me more {this.props.animal.plural}!</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

function mapStateToProps(state) {
	return {
		animal: state.animal
	};
}

export default connect(mapStateToProps)(Header);

import React, {Component} from "react";
import {connect} from "react-redux";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import Loader from "./loader";

class Lightbox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false
		};
	}
	renderLoader() {
		if(!this.state.imageLoaded) {
			return (
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={200}>
					<Loader />
				</ReactCSSTransitionGroup>
			);
		}
	}
	render() {
		return (
			<div className="lightbox">
				{this.renderLoader()}
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		featuredPhoto: state.featuredPhoto
	};
}

export default connect(mapStateToProps)(Lightbox);

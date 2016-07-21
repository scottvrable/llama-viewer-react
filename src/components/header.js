import React from "react";
import {connect} from "react-redux";

import DiffButton from "./diff_button";
import MoreButton from "./more_button";
import AnimalArray from "../animal_array";

const Header = (props) => {
	return (
		<header className="header row">
			<div className="col-xs-12">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h1 className="text-xs-center pull-md-left">
								The Amazing <span className="featured-animal">{props.animal.single}</span> Viewer!
							</h1>
							<div className="button-group text-xs-center pull-md-right">
								<DiffButton />
								<MoreButton />
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

function mapStateToProps({animal}) {
	return {animal};
}

export default connect(mapStateToProps)(Header);

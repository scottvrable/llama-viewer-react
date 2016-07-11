import React, {Component} from "react";

class Header extends Component {
	render() {
		return (
			<header className="header row">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							<div className="col-xs-12">
								<h1 className="text-xs-center pull-md-left">
									The Amazing <span className="featured-animal">Llama</span> Viewer!
								</h1>
								<div className="button-group text-xs-center pull-md-right">
									<button className="btn show-diff-btn text-capitalize">Show me something different</button>
									<button className="btn show-more-btn text-capitalize">Show me more llamas!</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;

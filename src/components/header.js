import React, {Component} from "react";

class Header extends Component {
	render() {
		return (
			<header className="header row">
				<div className="col-xs-12">
					<div className="container">
						<div className="row">
							<div className="col-xs-12 col-md-6">
								<h1 className="text-xs-center text-md-left">
									The Amazing <span className="featured-animal">Llama</span> Viewer!
								</h1>
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

export default Header;

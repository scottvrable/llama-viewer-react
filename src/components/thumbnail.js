import React, {Component} from "react";

class Thumbnail extends Component {
	buildUrl() {
		return `https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}_q.jpg`;
	}
	render() {
		console.log(this.props.index);
		return (
			<div className="thumbnail col-lg-2 col-md-3 col-sm-4 col-xs-6">
				<img className="img-thumbnail center-block" src={this.buildUrl()} />
			</div>
		);
	}
}

export default Thumbnail;

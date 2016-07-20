import React, {Component} from "react";

class Thumbnail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false
		};
	} 
	buildUrl() {
		return `https://farm${this.props.farm}.staticflickr.com/${this.props.server}/${this.props.id}_${this.props.secret}_q.jpg`;
	}
	handleLoad() {
		this.setState({
			loaded: true
		});
	}
	render() {
		return (
			<div className="text-xs-center thumbnail col-lg-2 col-md-3 col-sm-4 col-xs-6">
				<img 
					onLoad={this.handleLoad.bind(this)}
					className={"img-thumbnail " + (this.state.loaded ? "show" : "hide")} 
					src={this.buildUrl()} 
					alt={this.props.title}
				/>
			</div>
		);
	}
}

export default Thumbnail;

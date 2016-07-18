import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";

import App from "./components/app";
import Gallery from "./components/gallery";

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/llama/1" />
		<Route path="/:animal/:page" component={Gallery} />
	</Route>
);

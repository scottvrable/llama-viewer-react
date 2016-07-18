import React from "react";
import {Route, IndexRedirect, Redirect} from "react-router";

import App from "./components/app";
import Gallery from "./components/gallery";

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/llama/1" />
		<Route path="/:animal/:page" component={Gallery} />
		<Redirect from="/:animal" to="/:animal/1" />
	</Route>
);

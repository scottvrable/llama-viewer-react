import React from "react";
import {Route, IndexRoute, IndexRedirect} from "react-router";

import App from "./components/app";
import Gallery from "./components/gallery";

export default (
	<Route path="/" component={App}>
		<IndexRedirect to="/llama" />
		<Route path=":animal" component={Gallery} />
	</Route>
);

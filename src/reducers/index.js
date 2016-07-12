import {combineReducers} from "redux";

import AnimalReducer from "./reducer_animal";

const rootReducer = combineReducers({
	animal: AnimalReducer
});

export default rootReducer;

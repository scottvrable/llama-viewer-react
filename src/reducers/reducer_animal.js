import {SET_ANIMAL} from "../actions/types";

export default function(state = {}, action) {
	switch(action.type) {
	case SET_ANIMAL:
		return {...state, ...action.payload};
	default:
		return state;
	}
}

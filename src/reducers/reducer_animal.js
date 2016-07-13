import {SET_ANIMAL} from "../actions/types";
import AnimalArray from "../animal_array";

export default function(state = AnimalArray[0], action) {
	switch(action.type) {
	case SET_ANIMAL:
		return {...state, ...action.payload};
	default:
		return state;
	}
}

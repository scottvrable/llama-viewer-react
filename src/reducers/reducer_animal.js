import {SET_ANIMAL, FETCH_ANIMAL, CLEAR_IMAGES, FEATURE_PHOTO} from "../actions/types";
import AnimalArray from "../animal_array";

const INITIAL_STATE = {...AnimalArray[0], page: 1, photos: [], featuredPhoto: null}

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
	case FETCH_ANIMAL:
		return {...state, ...action.payload.data};
	case SET_ANIMAL:
		return {...state, ...action.payload};
	case CLEAR_IMAGES:
		return {...state, ...action.payload};
	case FEATURE_PHOTO:
		return {...state, ...action.payload};
	default:
		return state;
	}
}

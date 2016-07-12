import {SET_ANIMAL} from "./types";

export function setAnimal(animalObj) {
	return {
		type: SET_ANIMAL,
		payload: animalObj
	};
}

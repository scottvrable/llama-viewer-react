import axios from "axios";

import {SET_ANIMAL, FETCH_ANIMAL} from "./types";

const API_KEY = "9874b5ae39cf7e7517ccaa37d29c262a";
const ROOT_URL_1 = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=`;
const ROOT_URL_2 = `&format=json&sort=relevance&content_type=1&per_page=24&safe_search=1&page=`;
const ROOT_URL_3 = `&nojsoncallback=1`;

export function fetchAnimal(animalObj) {
	console.log("Inside fetchAnimal action: ", animalObj);
	const url = `${ROOT_URL_1}${animalObj.single}${ROOT_URL_2}${animalObj.page}${ROOT_URL_3}`;
	const request = axios.get(url);
	return {
		type: FETCH_ANIMAL,
		payload: request
	};
}
export function setAnimal(animalObj) {
	return {
		type: SET_ANIMAL,
		payload: animalObj
	};
}

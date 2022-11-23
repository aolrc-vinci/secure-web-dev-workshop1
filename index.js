// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// https://opendata.paris.fr/explore/dataset/lieux-de-tournage-a-paris/information
const filmingLocations = require('./lieux-de-tournage-a-paris.json')

console.log('🚀 It Works!');

/**
 * 💅 Try to produce the most readable code, use meaningful variable names
 * Your intentions should be clear by just reading the code
 * Good luck, have fun !
 */

// 📝 TODO: Number of filming locations
// 1. Make the function return the number of filming locations
function getFilmingLocationsNumber () {
	return filmingLocations.length
}
console.log(`There is ${getFilmingLocationsNumber()} filming locations in Paris`)

// 📝 TODO: Filming locations sorted by start date, from most recent to oldest.
// 1. Implement the function
// 2. Log the first and last item in array
function sortFilmingLocationsByStartDate () {
	function compare( a, b ) {
		if ( a.fields.date_debut > b.fields.date_debut ){
		  return -1;
		}
		if ( a.fields.date_debut < b.fields.date_debut ){
		  return 1;
		}
		return 0;
	  }	
	return filmingLocations.sort(compare)
}
console.log(`\nMost recent filming location : ${sortFilmingLocationsByStartDate()[0].fields.nom_tournage} le ${sortFilmingLocationsByStartDate()[0].fields.date_debut}
\nOldest filming location : ${sortFilmingLocationsByStartDate()[filmingLocations.length - 1].fields.nom_tournage} le ${sortFilmingLocationsByStartDate()[filmingLocations.length - 1].fields.date_debut}`)

// 📝 TODO: Number of filming locations in 2020 only
// 1. Make the function return the number of filming locations in 2020 only
// 2. Log the result
function getFilmingLocationsNumber2020 () {
	let nb = 0
	for (let i = 0; i < filmingLocations.length; i++){
		if(filmingLocations[i].fields.annee_tournage == "2020"){
			nb += 1
		}
	}
	return nb
}
console.log(`\nThere are ${getFilmingLocationsNumber2020()} of filming locations in 2020`)

// 📝 TODO: Number of filming locations per year
// 1. Implement the function, the expected result is an object with years as
// keys and filming locations number as value, e.g:
//    const filmingLocationsPerYear = {
//      '2020': 1234,
//      '2021': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerYear() {
	const sortedLocations = sortFilmingLocationsByStartDate()
	const db = sortedLocations[sortedLocations.length - 1].fields.annee_tournage
	const df = sortedLocations[0].fields.annee_tournage
	let NumLocPerYear = {}
	for (let i = db; i <= df; i++){
		let nb = 0
		for (let j = 0; j < filmingLocations.length; j++){
			if(filmingLocations[j].fields.annee_tournage == i){
				nb = nb + 1
			}
		}
		NumLocPerYear[i] = nb

	}	
	return NumLocPerYear
}

console.log(getFilmingLocationsNumberPerYear())

// 📝 TODO: Number of filming locations by district (arrondissement)
// 1. Implement the function, the expected result is an object with
// district as keys and filming locations number as value, e.g:
//    const filmingLocationsPerDistrict = {
//      '75013': 1234,
//      '75014': 1234,
//    }
// 2. Log the result
function getFilmingLocationsNumberPerDistrict () {
	let NumLocPerDistrict = {}
	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const district = []
	for (let k = 0; k < filmingLocations.length; k++){
		district.push(filmingLocations[k].fields.ardt_lieu)
	}
	const distunique = district.filter(getUniqueVal)
	for (let i = 0; i < distunique.length; i++){
		let nb = 0
		for (let j = 0; j < filmingLocations.length; j++){
			if(filmingLocations[j].fields.ardt_lieu == distunique[i]){
				nb = nb + 1
			}
		}
		NumLocPerDistrict[distunique[i]] = nb

	}
	return NumLocPerDistrict
}
console.log(getFilmingLocationsNumberPerDistrict())

// 📝 TODO: Number of locations per film, sorted in descending order
// 1. Implement the function, result expected as an array of object like:
//    const result = [{film: 'LRDM - Patriot season 2', locations: 12}, {...}]
// 2. Log the first and last item of the array
function getFilmLocationsByFilm () {
	
	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const Films = []
	for (let k = 0; k < filmingLocations.length; k++){
		Films.push(filmingLocations[k].fields.nom_tournage)
	}
	const Tournage = Films.filter(getUniqueVal)

	const result = []
	for (let i = 0; i < Tournage.length; i++){
		let nb = 0
		let film = {}
		for (let j = 0; j < filmingLocations.length; j++){
			if(filmingLocations[j].fields.nom_tournage == Tournage[i]){
				nb = nb + 1
			}
		}
		film["film"] = Tournage[i]
		film["locations"] = nb
		result.push(film)

	}
	function compare( a, b ) {
		if ( a.locations > b.locations ){
		  return -1;
		}
		if ( a.locations < b.locations ){
		  return 1;
		}
		return 0;
	  }	
	return result.sort(compare)
}
/*console.log(`Film with the most locations : ${getFilmLocationsByFilm()[0].film} ${getFilmLocationsByFilm()[0].locations} locations
\nFilm with the less locations : ${getFilmLocationsByFilm()[getFilmLocationsByFilm().length - 1].film} ${getFilmLocationsByFilm()[getFilmLocationsByFilm().length - 1].locations} locations\n`)
*/

// 📝 TODO: Number of different films
// 1. Implement the function
// 2. Log the result
function getNumberOfFilms() {
	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const Films = []
	for (let k = 0; k < filmingLocations.length; k++){
		Films.push(filmingLocations[k].fields.nom_tournage)
	}
	const FilmsUnique = Films.filter(getUniqueVal)

	return FilmsUnique.length
}

console.log(`There are ${getNumberOfFilms()} films`)

// 📝 TODO: All the filming locations of `LRDM - Patriot season 2`
// 1. Return an array with all filming locations of LRDM - Patriot season 2
// 2. Log the result
function getArseneFilmingLocations () {
	const locations = []
	for (let i = 0; i < filmingLocations.length; i++){
		if (filmingLocations[i].fields.nom_tournage == "LRDM - Patriot season 2"){
			locations.push(filmingLocations[i].fields.adresse_lieu + "\n")
		}
	}
	return locations
}

console.log(`All the filming locations of LRDM :\n${getArseneFilmingLocations()}`)

// 📝 TODO: Tous les arrondissement des lieux de tournage de nos films favoris
//  (favoriteFilms)
// 1. Return an array of all the districts of each favorite films given as a
//    parameter. e.g. :
//    const films = { 'LRDM - Patriot season 2': ['75013'] }
// 2. Log the result
function getFavoriteFilmsLocations (favoriteFilmsNames) {
	const films = {}

	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	for (let f = 0; f < favoriteFilmsNames.length; f++){
		const district = []
		for (let k = 0; k < filmingLocations.length; k++){
			if (filmingLocations[k].fields.nom_tournage == favoriteFilmsNames[f])
			district.push(filmingLocations[k].fields.ardt_lieu)
		}
		const distunique = district.filter(getUniqueVal)
		films[favoriteFilmsNames[f]] = distunique
	}

	return films
}
const favoriteFilms =
	[
		'LRDM - Patriot season 2',
		'Alice NEVERS',
		'Emily in Paris',
	]

console.log(getFavoriteFilmsLocations(favoriteFilms))

// 📝 TODO: All filming locations for each film
//     e.g. :
//     const films = {
//        'LRDM - Patriot season 2': [{...}],
//        'Une jeune fille qui va bien': [{...}]
//     }
function getFilmingLocationsPerFilm () {
	const films = {}

	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const Films = []
	for (let k = 0; k < filmingLocations.length; k++){
		Films.push(filmingLocations[k].fields.nom_tournage)
	}
	const FilmsUnique = Films.filter(getUniqueVal)

	for (let i = 0; i < FilmsUnique.length; i++){
		let locations = []
		for(let j = 0; j < filmingLocations.length; j++){
			if (filmingLocations[j].fields.nom_tournage == FilmsUnique[i]){
				locations.push(filmingLocations[j].fields.adresse_lieu)
			}
		}
		films[FilmsUnique[i]] = locations
	}
	return films
}

console.log(getFilmingLocationsPerFilm())


// 📝 TODO: Count each type of film (Long métrage, Série TV, etc...)
// 1. Implement the function
// 2. Log the result
function countFilmingTypes () {
	const nb_type = {}

	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const type_film = []
	for (let k = 0; k < filmingLocations.length; k++){
		type_film.push(filmingLocations[k].fields.type_tournage)
	}
	const type = type_film.filter(getUniqueVal)

	for(let i = 0; i < type.length; i++){
		let nb = 0
		for(let j = 0; j < type_film.length; j++){
			if(type_film[j] == type[i]){
				nb += 1
			}
		}
		nb_type[type[i]] = nb
	}

	return nb_type
}

console.log(countFilmingTypes())

// 📝 TODO: Sort each type of filming by count, from highest to lowest
// 1. Implement the function. It should return a sorted array of objects like:
//    [{type: 'Long métrage', count: 1234}, {...}]
// 2. Log the result
function sortedCountFilmingTypes () {

	function getUniqueVal(value, index, self){
		return self.indexOf(value) === index;
	}
	const type_film = []
	for (let k = 0; k < filmingLocations.length; k++){
		type_film.push(filmingLocations[k].fields.type_tournage)
	}
	const type = type_film.filter(getUniqueVal)

	const result = []

	for(let i = 0; i < type.length; i++){
		let nb = 0
		let couple = {}
		for(let j = 0; j < type_film.length; j++){
			if(type_film[j] == type[i]){
				nb += 1
			}
		}
		couple["Type"] = type[i]
		couple["count"] = nb
		result.push(couple)
	}

	function compare( a, b ) {
		if ( a.count > b.count ){
		  return -1;
		}
		if ( a.count < b.count ){
		  return 1;
		}
		return 0;
	}

	return result.sort(compare)
}

console.log(sortedCountFilmingTypes())


/**
 * This arrow functions takes a duration in milliseconds and returns a
 * human-readable string of the duration
 * @param ms
 * @returns string
 */
const duration = (ms) => `${(ms/(1000*60*60*24)).toFixed(0)} days, ${((ms/(1000*60*60))%24).toFixed(0)} hours and ${((ms/(1000*60))%60).toFixed(0)} minutes`

// 📝 TODO: Find the filming location with the longest duration
// 1. Implement the function
// 2. Log the filming location, and its computed duration

// 📝 TODO: Compute the average filming duration
// 1. Implement the function
// 2. Log the result

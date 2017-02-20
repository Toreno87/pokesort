const URL = 'http://pokeapi.co';
const PURL = '/api/v1/pokemon/';

const F = document.getElementsByClassName('field')[0];
const NEXT = document.getElementsByClassName('next')[0];
const PREV = document.getElementsByClassName('prev')[0];
const LOADER = document.getElementsByClassName('preloader')[0];

let mainCards;
let ver = 2;
let limit = 9;
let offset = 0;
let next;
let prev;

let getUrl = (off = 0, lim = 3, v = ver) => {
	return URL + '/api/v' + v + '/pokemon/?' + 'limit=' + lim + '&offset=' + off;
};

let getArray = (data) => {
	let arr = [];
	data.forEach( (obj, i) => arr[i] = obj);

	return arr
};

let getOffset = (url) => {
	let offs = 0;
	if(url != null){
		let arr = url.split('/');
		arr.forEach( (elem) => {
			let s = elem.indexOf('=', 7);

			if (s != -1) {
				offs = elem.substr(s + 1, elem.length - 1);
			}
		});
	}

	return offs
};

let start = (dta, isNext) => {

	if(mainCards != undefined ) F.removeChild(mainCards);

	LOADER.style.display = 'block';
	NEXT.classList.add('disabled');
	PREV.classList.add('disabled');

	ajax(dta)
		.then(resolve => {return getJSON(resolve)})
		.then(JSON => {
			next = JSON.next;
			prev = JSON.previous;
			let results = JSON.results;

			createElement('div', F, 'row', 'main-content');
			mainCards = document.getElementsByClassName('main-content')[0];

			offset = (isNext == true) ? getOffset(dta) : getOffset(prev);

			createCard(limit, offset);

			return getArray(results);
		})
		.then(objects => {
			let int = 0;

			objects.forEach( (obj) => {
				let url = obj.url;

				ajax(url)
					.then(resolve => {return getJSON(resolve)})
					.then(JSON => {
						let id = JSON.id;
						console.log(id + '  ' + offset + '  ' + dta);
						let cardChilds = document.getElementById(id).childNodes;
						let imgContainer = cardChilds[0];
						let name = cardChilds[1];
						let param = cardChilds[2].childNodes;
						let hp = imgContainer.lastChild.lastChild;
						let atk = param[0].lastChild;
						let def = param[1].lastChild;
						let speed = param[2].lastChild;
						let sprites = JSON.sprites;
						let imgFront = sprites.front_default;

						imgContainer.firstChild.setAttribute('src', imgFront);
						name.innerText = JSON.name;

						ajax(URL +  PURL + id)
							.then(resolve => {return getJSON(resolve)})
							.then(JSON => {
								hp.innerText = JSON.hp;
								atk.innerText = JSON.attack;
								def.innerText = JSON.defense;
								speed.innerText = JSON.speed;

								int++;
								if(int == limit) {
									LOADER.style.display = 'none';

									if(prev != null) PREV.style.display = 'inline-block';
									else PREV.style.display = 'none';

									NEXT.innerText = 'Next';
									NEXT.classList.remove('disabled');
									PREV.classList.remove('disabled');
								}
							})
							.catch(reject => {console.error(reject)});


					})
					.catch(reject => {console.error(reject)});

			});
		})
		.catch(reject => {console.error(reject)});
};

let init = () => {
	F.style.minHeight = ((180 / limit) * limit) + 'px';
	next = getUrl(0, limit);
	prev = null;

	NEXT.addEventListener('click', () => {
		start(next, true);
	});
	PREV.addEventListener('click', () => {
		start(prev, false);
	});
};

init();


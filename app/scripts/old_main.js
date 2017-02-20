const URL = 'http://pokeapi.co';
const LIMIT = 3;
const F = document.getElementsByClassName('field')[0];
const BTN = document.getElementsByClassName('start')[0];

const loader = document.getElementsByClassName('preloader')[0];
let offset = 0;

let pokeUrl = (off = 0, lim = 6, ver = 2, url = URL) => {

	return url + '/api/v' + ver + '/pokemon/?' + 'limit=' + lim + '&offset=' + off;
};

let httpGet = (url) => {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);

		xhr.onload = () => {
			if (xhr.status == 200) {
				loader.style.display = 'block';
				BTN.classList.add('disabled');

				resolve(xhr.response);
			} else {
				let error = new Error(xhr.status.text);
				error.code = xhr.status;
				reject(error);
			}
		};

		xhr.onerror = () => {
			reject(new Error('Network Error'));
		};

		xhr.send();
	});
};

let getCard = () => {

	httpGet(pokeUrl(offset, LIMIT))
		.then(response => {

			let data = JSON.parse(response);
			let urls = [];

			data.results.forEach( (u,i) => {
				urls[i] = u.url;
			});

			return urls
		})
		.then(url => {
			let cards = document.getElementsByClassName('card');
			let count = 0;
			let pokemons = [];

			offset = offset + LIMIT;

			url.forEach( (e) => {
				httpGet(e).then(url => {
					let data = JSON.parse(url);

					return data
				})
					.then(data => {
						pokemons[count] = data;

						count++;
						return pokemons;
					})
					.then(pokemons => {
						if(count == LIMIT) {
							pokemons.forEach( (dta) => {

								let card = createElement('div', F, 'col-md-4', 'card');
								let head = createElement('h4', card);
								let imgContainer = createElement('div', card, 'img-container');
								let img = createElement('img', imgContainer);

								head.innerHTML = dta.name;
								img.setAttribute('src', dta.sprites.front_default);

							});

							setTimeout( () => {
								loader.style.display = 'none';
								BTN.classList.remove('disabled');
								count = 0;
							}, 2000);
						}
					});
			});
		});
};


let init = () => {
	BTN.addEventListener('click', () => getCard());
};

init();


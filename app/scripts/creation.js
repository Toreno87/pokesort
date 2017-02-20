/**
 * Created by Sam on 17.02.2017.
 */
let createElement = (tag, parent, ...classes) => {
	let elem = document.createElement(tag);

	classes.forEach( (cl) => {
		elem.classList.add(cl);
	});

	parent.appendChild(elem);

	return elem
};

let createCard = (limit, offset) => {
	for(let i = 0; i < limit; i++) {
		let card = {};
		offset++;

		card.container = createElement('div', mainCards, 'col-sm-4', 'card');
		card.imgContainer = createElement('div', card.container, 'img-container');
		card.imgPokemon = createElement('img', card.imgContainer, 'img-pokemon');

		card.hp = createElement('div', card.imgContainer, 'HP');
		card.imgHP = createElement('img', card.hp);
		card.imgHP.setAttribute('src', '../dist/images/hp.png');
		card.spanHP = createElement('span', card.hp, 'text-param');

		card.name = createElement('h4', card.container, 'pokemon-name');
		card.paramContainer = createElement('div', card.container, 'row');

		card.atk = createElement('div', card.paramContainer, 'col-4');
		card.imgAtk = createElement('img', card.atk, 'img-atk');
		card.imgAtk.setAttribute('src', '../dist/images/atk.png');

		card.textAtk = createElement('span', card.atk, 'text-param');

		card.def = createElement('div', card.paramContainer, 'col-4');
		card.imgDef = createElement('img', card.def);
		card.imgDef.setAttribute('src', '../dist/images/def.png');

		card.textDef = createElement('span', card.def, 'text-param');

		card.speed = createElement('div', card.paramContainer, 'col-4');
		card.imgSpeed = createElement('img', card.speed);
		card.imgSpeed.setAttribute('src', '../dist/images/speed.png');

		card.textSpeed  = createElement('span', card.speed, 'text-param');

		card.container.setAttribute('id', offset.toString() );

	}

};
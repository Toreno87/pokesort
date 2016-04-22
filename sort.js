var elemets = {
	message: document.querySelector('.status'),
	po: document.getElementById('pokemons'),
	load: document.getElementById('loader')
};

var data = {
	limit: 6,
	offset: 0,
	dtaRes:0,
	apiUrl: 'http://pokeapi.co/api/v2/pokemon/',
	pokemonUrl:0
};

var dta;

function next() {
	data.pokemonUrl = data.apiUrl + '?limit=' + data.limit + '&offset=' + data.offset;
	
	req(data.pokemonUrl);
	console.log(dta);
	data.dtaRes = dta.results;
	
	
	getpokemon();
	
	data.offset = data.offset + data.limit;
	
}

function req(pokUrl) {
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', pokUrl, false);
	xhr.send();
	
		if(xhr.status == 200) {
			elemets.message.innerHTML = "Base Pokemons";
			elemets.load.style.display = "block";

			var data = JSON.parse(xhr.responseText);
			
			data.dta = data;
				
			} else {
				console.log('ERR');

				elemets.message.innerHTML = xhr.status + ': ' + xhr.statusText;
			}
		elemets.load.style.display = "none";
}

function getpokemon() {
	var card = {
		flipCont: null,
		flipper: null,
		cardBack: null,
		cardFront: null,
		name: null,
		imgCont: null,
		img: null
	};
	
	var dtRs = data.dtaRes;
	
//	dtRs.forEach(function(item, i, dtRs) {
//		
//		pokemonUrl = item.url;
//		req();
//		
//		card.flipCont = document.createElement('div');
//		card.flipCont.className = 'flipper_container';
//		
//		card.flipper = document.createElement('div');
//		card.flipper.className = 'flipper';
//		
//		card.cardBack = document.createElement('div');
//		card.cardBack.className = 'back';
//		
//		card.cardFront = document.createElement('div');
//		card.cardFront.id = 'card__' + data.dta.name;
//		card.cardFront.className = 'front';
//
//		card.name = document.createElement('h2');
//		card.name.innerHTML = data.dta.name;
//		
//		card.imgCont = document.createElement('div');
//		card.imgCont.className = 'img_container';
//		
//		card.img = document.createElement('img');
//		
//		card.img.setAttribute('src', 'http://pokeapi.co/media/img/'+ data.dta.id +'.png');
//
//		card.cardBack.appendChild(imgCont);
//		card.imgCont.appendChild(img);
//		card.cardBack.appendChild(name);
//		card.flipper.appendChild(cardBack);
//		card.flipper.appendChild(cardFront);
//		card.flipCont.appendChild(flipper);
//		elemets.po.appendChild(flipCont);
//	
//		});
}

next();



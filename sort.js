var test111;
var message = document.querySelector('.status');
var po = document.getElementById('pokemons');

var dta;

function req() {
	var apiUrl = 'http://pokeapi.co';
	var pokemonUrl = '/api/v1/pokemon/?limit=12';

	var xhr = new XMLHttpRequest();

	xhr.open('GET', apiUrl + pokemonUrl, false);
	xhr.send();

		if(xhr.status == 200) {
			console.log('OK');
			message.innerHTML = "Your Pokemons";

			var data = JSON.parse(xhr.responseText);

			dta = data.objects;
			getpokemon();

		} else {
			console.log('ERR');

			message.innerHTML = xhr.status + ': ' + xhr.statusText;

		}
    
var load = document.getElementById('loader');

var limit = 6;
var offset = 0;
var dta;
var dtaRes;

var apiUrl = 'http://pokeapi.co/api/v2/pokemon/';
var pokemonUrl;

function next() {
	pokemonUrl = apiUrl + '?limit=' + limit + '&offset=' + offset;
	
	req();
	dtaRes = dta.results;
	getpokemon();
	
	offset = offset + limit;
	
}


function getpokemon() {
	var flipCont;
	var flipper;
	var cardBack;
	var cardFront;
	var name;
	var imgCont;
	var img;

	for(i = 0; i < dta.length; i++) {
		card = document.createElement('div');
		card.className = 'card';

		name = document.createElement('h2');
		name.innerHTML = dta[i].name;

	
	dtaRes.forEach(function(item, i, dtaRes) {
		pokemonUrl = item.url;
		req();
		
		flipCont = document.createElement('div');
		flipCont.className = 'flipper_container';
		
		flipper = document.createElement('div');
		flipper.className = 'flipper';
		
		cardBack = document.createElement('div');
		cardBack.className = 'back';
		
		cardFront = document.createElement('div');
		cardFront.id = 'card__' + dta.name;
		cardFront.className = 'front';

		name = document.createElement('h2');
		name.innerHTML = dta.name;
		
		imgCont = document.createElement('div');
		imgCont.className = 'img_container';
		
		img = document.createElement('img');
		
		img.setAttribute('src', 'http://pokeapi.co/media/img/'+ dta.id +'.png');

		card.appendChild(img);
        card.appendChild(name);
		po.appendChild(card);
	}

}

req();
		
		cardBack.appendChild(imgCont);
		imgCont.appendChild(img);
		cardBack.appendChild(name);
		flipper.appendChild(cardBack);
		flipper.appendChild(cardFront);
		flipCont.appendChild(flipper);
		po.appendChild(flipCont);
	
});
}

function req() {
	
	var xhr = new XMLHttpRequest();
	
	xhr.open('GET', pokemonUrl, false);
	xhr.send();
	
		if(xhr.status == 200) {
			message.innerHTML = "Base Pokemons";
			load.style.display = "block";

			var data = JSON.parse(xhr.responseText);
			
			dta = data;
				
			} else {
				console.log('ERR');

				message.innerHTML = xhr.status + ': ' + xhr.statusText;
			}
		load.style.display = "none";
}

next();


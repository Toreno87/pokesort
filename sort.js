var message = document.querySelector('.status');
var po = document.getElementById('pokemons');
var dta;

function req() {
	var apiUrl = 'http://pokeapi.co';
	var pokemonUrl = '/api/v1/pokemon/?limit=2';

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

	
}

function getpokemon() {
	var card;
	var name;
	var img;
	
	for(i = 0; i < dta.length; i++) {
		card = document.createElement('div');
		card.className = 'card__' + dta[i].name;

		name = document.createElement('h2');
		name.innerHTML = dta[i].name;
		
		img = document.createElement('img');
		img.setAttribute('src', 'http://pokeapi.co/media/img/'+ dta[i].national_id +'.png');

		card.appendChild(name);
		card.appendChild(img);
		po.appendChild(card);
	}
	
}

req();


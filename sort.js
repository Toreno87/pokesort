var Elements = function() {
	
	this.loader = document.getElementById('loader');
	this.pokemons = document.getElementById('pokemons');
	
	this.dta = '';
	
	this.apiUrl = 'http://pokeapi.co';
	this.url = '/api/v1/pokemon/?limit=12&offset=';
	this.offset = 0;
	
	this.ajax = function(url, clbk) {
		clearTimeout(el.loadTimer);
		el.loader.style.display = 'block';
		
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', el.apiUrl + el.url + el.offset, true);
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200) {
				var data = JSON.parse(xhr.responseText);
				
				el.dta = data.objects;
				
				el.loadTimer = setTimeout(function() {
					el.loader.style.display = 'none';
				}, 200);
				
				if(clbk) {
					clbk(data);
				}
			}
		};
		
		
		xhr.send();
	}
	
	this.next = function() {
		
		el.ajax();
		
		for(var i = 0; i < el.dta.length; i++) {
			el.createCard(i);
			
		}
		
		el.offset = el.offset + 12;
		
	}
	
	this.createCard = function(i) {
		
		var flipperContainer = document.createElement('div'),
		flipper = document.createElement('div'),
		front = document.createElement('div'),
		back = document.createElement('div'),
		img_container = document.createElement('div'),
		img = document.createElement('img'),
		name = document.createElement('h2');
		
		flipperContainer.className = 'flipper_container';
		flipper.className = 'flipper';
		front.className = 'front';
		back.className = 'back';
		img_container.className = 'img_container';
		img.className = 'img_pokemon';
		
		el.pokemons.appendChild(flipperContainer);
		flipperContainer.appendChild(flipper);
		flipper.appendChild(front);
		flipper.appendChild(back);
		back.appendChild(img_container);
		img_container.appendChild(img);
		back.appendChild(name);
		
		name.innerHTML = el.dta[i].name;
		img.setAttribute('src', el.apiUrl + '/media/img/' + el.dta[i].national_id + '.png');
		
	}
	
};

window.el = new Elements();
el.next();



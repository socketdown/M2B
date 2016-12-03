ajapp.service('IconProvider', function() {
	this.stringToManaIcon = function(code){
		if (code === null || code == "") {
			return "";
		}

		var codes = code.replace(/{|}/g, "");
		var paths = '{"W": "W.svg.png", "B": "B.svg.png", "C": "C.svg.png", "G": "G.svg.png", "R": "R.svg.png", "U": "U.svg.png"}';
		paths = JSON.parse(paths);

		var imageArray = [];

		codes = codes.split("");

		for (var i = 0; i < codes.length; i++) {
			if (isNaN(codes[i]) == true) {
				imageArray.push({"path":'img/' + paths[codes[i]], "isImage":true});
			}
			else{
			imageArray.push({"path":codes[i], "isImage":false});
			}
		}

		return imageArray;
	}
});

ajapp.service('CardProvider', function(ErrorProvider, Cards, $http) {
	this.getSetList = function(){
		
		return {};
	}
	
	this.getDecks = function(){
		//if (Cards.precache_setlist === undefined)
		
		$http.get('content/SetList.json').success(function(data, status){
			
			return data;
		}).error(function (data, status) {
			ErrorProvider.errorMessage("File Request Failed ["+status+"]");
		});

		return "ERROR";
	}
	
	this.getCards = function(deck){
		var cards = {name: "lul"};
		
		$http.get('content/offline_sets/'+code+'.json').success(function(data, status){
			
			return data.cards
		}).error(function (data, status) {
			ErrorProvider.errorMessage("File Request Failed ["+status+"]");
		});
		
		return "ERROR";
	}
});

ajapp.service('ErrorProvider', function($mdDialog){
	this.errorMessage = function(message){
		vibrate();
		$mdDialog.show(
			$mdDialog.alert()
				.clickOutsideToClose(true)
				.title('Oops!')
				.textContent('It looks like something got butched there. I`m apparently caused by: '+message)
				.ariaLabel('ErrorMessage')
				.ok('Understood')
				// You can specify either sting with query selector
				.openFrom('#left')
				// or an element
				.closeTo(angular.element(document.querySelector('#right')))
		);
	}
});
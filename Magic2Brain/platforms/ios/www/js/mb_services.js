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
		return $http.get('content/SetList.json');
	}
	
	this.getCards = function(code){
		
		$http.get('content/offline_sets/'+code+'.json').success(function(data, status){
			Cards.data = data;
		}).error(function (data, status) {
			ErrorProvider.errorMessage("File Request Failed ["+status+"]");
		});
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

ajapp.service('SwitchPage', function(Pages){
	this.reset = function(){
		var pages = { isOptionScreen: false, isCardPreviewScreen: false, isFavoriteScreen: false, isGreetingScreen: false, isLastSeenScreen: false };
		Pages.pages = pages;
	}
	
	this.init = function(){
		var pages = { isOptionScreen: false, isCardPreviewScreen: true, isFavoriteScreen: false, isGreetingScreen: false, isLastSeenScreen: false };
		Pages.pages = pages;
	}
	
	this.set = function(id){
		this.reset();
		Pages.pages[id] = true;
	}
});

ajapp.factory('nukeService', function($rootScope, $http) {
    var nukeService = {};

    nukeService.data = {};

    //Gets the list of nuclear weapons
    nukeService.getNukes = function() {
        $http.get('content/SetList.json')
            .success(function(data) {
                nukeService.data.nukes = data;
            });

        return nukeService.data;
    };

    return nukeService;
});
function MenuBar(){
	this.make = makeMenuBar;
}

var file_reader_data;
var isOptions = true;
function makeMenuBar(ajapp){
	ajapp.controller('MenuBarCtrl', function($scope, $timeout, $mdSidenav, $http, $mdDialog, Option, MBar, LastSeen, Pages, Cards, IconProvider, ErrorProvider, SwitchPage) {
		$scope.isOpen = false;
		
		//Menubar global interchangable variable init
		
		function mb_init(){
			var buttons = [
				{ icon: 'search', color: '#ffffff', size: '', alabel: 'Menu', action: 'loadSearch'},
				{ icon: 'cloud-download', color: '#ffffff', size: '', alabel: 'Cache Files', action: 'loadLastSeen'},
				{ icon: 'star', color: '#ffffff', size: '', alabel: 'View Favorites', action: 'loadFavorite'},
				{ icon: 'gear', color: '#ffffff', size: '', alabel: 'Export', action: 'loadOptions'}
			];
			
			MBar.menupoints = [].concat(buttons);
			
			SwitchPage.init();
			$scope.apag = Pages.pages;
		}
		
		mb_init();

		//Buttons for the (Top) Menubar
		
		$scope.menupoints = MBar.menupoints;
		
		$scope.toggleSide = function(){
			$mdSidenav('left').toggle();
		}	
		
		$scope.runAction = function(command){
			
			if(command === 'loadSearch'){
				SwitchPage.set("isCardPreviewScreen");
				$scope.toggleSide();
			}
			else if(command=== 'loadOptions'){
				SwitchPage.set("isOptionScreen");
			}
			else if(command=== 'loadLastSeen'){
				SwitchPage.set("isLastSeenScreen");
			}
			else if(command=== 'loadFavorite'){
				SwitchPage.set("isFavoriteScreen");
			}
			$scope.apag = Pages.pages;
		}
		
		$scope.$watch(Pages.pages, function(){
			$scope.apag = Pages.pages;
		});
		
		function loadSearch(){
			$scope.isCardPreviewScreen = true;
			$scope.toggleSide();
		}
		
		//Load LRU Decklist
		
		$scope.lastUsedDecks;
		$scope.loadLastUsedDecks = function(){
			var list = window.localStorage.getItem("lru_decklist");
			if(list == null){
				window.localStorage.setItem("lru_decklist", "");
				list = [];
			}
			else{
				list = JSON.parse(list);
			}
			$scope.lastUsedDecks = list;
		}
		$scope.updateLastUsedDecks = function(code){
			var deck = $scope.lastUsedDecks;
			if(deck.length > 5){
				deck.splice(-1,1);
			}
			var compiled = JSON.stringify(deck);
			window.localStorage.setItem("lru_decklist", compiled);
		}
		
		$scope.loadLastUsedDecks();
		
		//Load Sets and Decks
		
		$scope.cards;
		$scope.decks;
		
		$http.get('content/SetList.json').success(function(data, status){
			$scope.decks = data;
			Cards.setlist = data;
		}).error(function (data, status) {
			ErrorProvider.errorMessage("File Request Failed ["+status+"]");
		});

		
		
		$scope.loadSet = function(code) {

			if(typeof Cards.cache[code] == 'undefined'){
				$http.get('content/offline_sets/'+code+'.json').success(function(data, status){
					Cards.cache[code] = data.cards;
					$scope.cards = data.cards;
				}).error(function (data, status) {
					ErrorProvider.errorMessage("File Request Failed ["+status+"]");
				});
			}
			else{
				$scope.cards = Cards.cache[code];
			}

			$scope.lastUsedDecks.unshift(code);
			$scope.updateLastUsedDecks();
			$scope.toggleSide();
		}
		
		//Loads Images for the specific deck (to display in sidebar)
		
		$scope.getManaImages = function(code){
			return IconProvider.stringToManaIcon(code);
		}
		
		console.log(Option.engine);
	});
}

function MenuBar(){
	this.make = makeMenuBar;
}

var file_reader_data;
var isOptions = true;
function makeMenuBar(ajapp){
	ajapp.controller('MenuBarCtrl', function($scope, $mdSidenav, $http, $mdDialog, Option, MBar, LastSeen, Pages, Cards, IconProvider, CardProvider) {
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
			
			$scope.isOptionScreen = false;
			$scope.isCardPreviewScreen = true;
			$scope.isFavoritesScreen = false;
			$scope.isGreetingScreen = false;
			$scope.isLastSeenScreen = false;
			
			$scope.activePages = Pages.pages;
		}
		
		mb_init();

		//Buttons for the (Top) Menubar
		
		$scope.menupoints = MBar.menupoints;
		
		$scope.toggleSide = function(){
			$mdSidenav('left').toggle();
		}	
		
		$scope.runAction = function(command){

			$scope.isOptionScreen = false;
			$scope.isCardPreviewScreen = false;
			$scope.isFavoriteScreen = false;
			$scope.isGreetingScreen = false;
			$scope.isLastSeenScreen = false;
			
			if(command === 'loadSearch'){
				$scope.isCardPreviewScreen = true;
				$scope.toggleSide();
			}
			else if(command=== 'loadOptions'){
				$scope.isOptionScreen = true;
			}
			else if(command=== 'loadLastSeen'){
				$scope.isLastSeenScreen = true;
			}
			else if(command=== 'loadFavorite'){
				$scope.isFavoriteScreen = true;
			}
		}
		
		function loadSearch(){
			$scope.isCardPreviewScreen = true;
			$scope.toggleSide();
		}
		
		//Load LRU Decklist
		
		$scope.lastUsedDecks;
		$scope.loadLastUsedDecks = function(){
			var list = window.localStorage.getItem("lru_decklist");
			if(list === undefined){
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
		$scope.decks = CardProvider.getDecks();

		$scope.loadSet = function(code) {
			$scope.cards = CardProvider.getCards(code);
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

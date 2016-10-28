function MenuBar(){
	this.make = makeMenuBar;

}

var file_reader_data;

function makeMenuBar(ajapp){
	ajapp.controller('MenuBarCtrl', function($scope, $mdSidenav, $http, $mdDialog) {
		$scope.isOpen = false;

		//Custom errormessage ->> call with $scope.errorMessage(<your error description here>);
		$scope.errorMessage = function(errorcode) {
			$mdDialog.show(
				$mdDialog.alert()
					.clickOutsideToClose(true)
					.title('Oops!')
					.textContent('It looks like something got butched there. I`m apparently caused by: '+errorcode)
					.ariaLabel('ErrorMessage')
					.ok('Understood')
					// You can specify either sting with query selector
					.openFrom('#left')
					// or an element
					.closeTo(angular.element(document.querySelector('#right')))
			);
		};
		
		//Buttons for the (Top) Menubar
		
		var buttons = [
			{ icon: 'search', color: '#ffffff', size: '', alabel: 'Menu', action: 'toggleSide'},
			{ icon: 'cloud-download', color: '#ffffff', size: '', alabel: 'Cache Files', action: ''},
			{ icon: 'star', color: '#ffffff', size: '', alabel: 'View Cached files', action: ''},
			{ icon: 'gear', color: '#ffffff', size: '', alabel: 'Export', action: ''}
		];
		
		$scope.menupoints = [].concat(buttons);
		
		$scope.toggleSide = function(){
			$mdSidenav('left').toggle();
		}
		
		$scope.runAction = function(command){
			if(command === 'toggleSide'){
				$scope.toggleSide();
			}
		}
		
		//Load LRU Decklist
		
		$scope.lastUsedDecks;
		$scope.loadLastUsedDecks = function(){
			var list = window.localStorage.getItem("lru_decklist");
			if(list == undefined){
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
		
		//Load Set (Loads a specific set of cards to main list)
		var setdata;

		$scope.cards;
		$scope.decks;

		$scope.loadSet = function(code) {

			$http.get('content/offline_sets/'+code+'.json').success(function(data, status){
				
				$scope.cards = data.cards;
			}).error(function (data, status) {
				$scope.errorMessage("File Request Failed ["+status+"]");
                $scope.response = 'Request failed';
            });
			
			$scope.lastUsedDecks.unshift(code);
			$scope.updateLastUsedDecks();
			
			$scope.toggleSide();
		}
		
		//Load Deck loads a list of avaiable decks to the sidebar
		
		$scope.loadDecks = function() {

			$http.get('content/SetList.json').success(function(data, status){
				
				$scope.decks = data;
			}).error(function (data, status) {
				
                $scope.response = 'Request failed';
            });
		}
		
		$scope.loadDecks();
		
		//Loads Images for the specific deck (to display in sidebar)
		
		$scope.getImage = function(code){
			return 'img/deck_icon.png';
		}
		
	});
}
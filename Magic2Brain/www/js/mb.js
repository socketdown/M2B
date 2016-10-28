function MenuBar(){
	this.make = makeMenuBar;

}

var file_reader_data;

function makeMenuBar(ajapp){
	ajapp.controller('MenuBarCtrl', function($scope, $mdSidenav, $http) {
		$scope.isOpen = false;

		$scope.demo = {
		isOpen: false,
		count: 0,
		selectedDirection: 'left'
		};
		
		var buttons = [
			{ icon: 'bars', color: '#ffffff', size: '', alabel: 'Menu', action: 'toggleSide'},
			{ icon: 'cloud-download', color: '#ffffff', size: '', alabel: 'Cache Files', action: ''},
			{ icon: 'hdd-o', color: '#ffffff', size: '', alabel: 'View Cached files', action: ''},
			{ icon: 'share', color: '#ffffff', size: '', alabel: 'Export', action: ''}
		];
		
		$scope.menupoints = [].concat(buttons);
		
		var img_path = 'img/deck_icon.png';
		var deck_content_path = "content/offline_sets/";
		
		var decks_data = [
			{ picture: img_path, name: 'lea', game_type: 'Modern - 200+ cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: deck_content_path+'LEA.json'},
			{ picture: img_path, name: 'leb', game_type: 'Modern - 160 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: deck_content_path+'LEB.json'},
			{ picture: img_path, name: 'arn', game_type: 'Modern - 70 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: deck_content_path+'ARN.json'},
			{ picture: img_path, name: '2ed', game_type: 'Modern - 365 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: deck_content_path+'2ED.json'}
		];
		
		$scope.decklist = [].concat(decks_data);
		
		$scope.toggleSide = function(){
			$mdSidenav('left').toggle();
		}
		
		$scope.runAction = function(command){
			if(command === 'toggleSide'){
				$scope.toggleSide();
			}
		}
		
		var setdata;

		$scope.cards;
		$scope.decks;

		$scope.loadSet = function(setURL) {

			$http.get(setURL).success(function(data, status){
				
				$scope.cards = data.cards;
			}).error(function (data, status) {
                $scope.response = 'Request failed';
            });
			
			$scope.toggleSide();
		}
		
		$scope.loadDecks = function() {

			$http.get('content/SetList.json').success(function(data, status){
				
				$scope.decks = data;
			}).error(function (data, status) {
                $scope.response = 'Request failed';
            });
		}
		
		$scope.loadDecks();
		
		$scope.getImage = function(code){
			return 'img/deck_icon.png';
		}
		
	});
}
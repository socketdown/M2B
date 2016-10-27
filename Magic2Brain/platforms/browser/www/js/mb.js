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
		
		/*$http.get('content/offline_sets/LEA.json').success(function(data) {
		   $scope.deck_lea = data;
		});*/
		
		var decks_data = [
			{ picture: img_path, name: 'Inistrad', game_type: 'Modern - 200+ cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: 'LEA.json'},
			{ picture: img_path, name: 'Kaladesch', game_type: 'Modern - 160 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: 'LEA.json'},
			{ picture: img_path, name: 'Dunkelmond', game_type: 'Modern - 70 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: 'LEA.json'},
			{ picture: img_path, name: 'Standart', game_type: 'Modern - 365 cards', deck_synopsis: 'Die letzte Verteidigung Innistrads ist verschwunden...', db_file: 'LEA.json'}
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

		$scope.loadSet = function() {
			
			$scope.cards;
			
			$http.get('content/offline_sets/LEA.json').success(function(data){
				setdata = data;
				alert(typeof(data));
				alert(data.size());
				//$scope.cards = JSON.parse(data.replace(/\\'/g, "'"));
			});
			
			dump($scope.cards);
		}
		
	});
}
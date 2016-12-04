ajapp.controller('QuizController', function($scope) {
		$scope.cardimg = "img/deck_icon.png";
		$scope.name = true;
		$scope.answer = function(){
			$scope.cardimg = "img/logo.png";
		}
});
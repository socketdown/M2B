ajapp.controller('OptionController', function( $scope, Option, MBar, CurrentPages ) {
	$scope.cb1 = true;
	
	$scope.appeareance = {};

	$scope.dloptions = { image_autoupdate: "Daily", caching: true };

	$scope.about = {};
/*
	$scope.imagepacks = [
		{ name: "Dunno", selected: false, loaded: false}
	];

	$scope.selectAllImagepacks = false;
	if( $scope.selectAllImagePacks ){
		for( var i = 0; i < $scope.imagepacks.length; i++ ){
			$scope.imagepacks.[i].selected = true;
		}
	}*/
});

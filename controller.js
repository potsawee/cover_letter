var app = angular.module('coverLetterApp', [])
.controller('stringController', ['$scope', function($scope) {

	$scope.letter = '';
	$scope.company = '';
	$scope.address = '';
	$scope.hiring_person = '';
	$scope.postcode = '';
	$scope.date = new Date().toDateString();

	$scope.processLetter = function ()
	{
		var str = $scope.letter;
		str = str.replace(/#COMPANY/g, $scope.company)
				 .replace(/#HIRING_PERSON/g, $scope.hiring_person)
				 .replace(/#ADDRESS/g, $scope.address)
				 .replace(/#DATE/g, $scope.date)
				 .replace(/#POSTCODE/g, $scope.postcode);
		console.log(str);
		$scope.letter = str;
	}

}]);

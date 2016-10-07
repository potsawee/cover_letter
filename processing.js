

var app = angular.module('cover_letter')
.controller('stringController', ['$scope', function($scope) {

	$scope.letter = '';
	$scope.company = '';
	$scope.date = '';
	$scope.person = '';
	$scope.address = '';
	$scope.post_code = '';

	$scope.processLetter = function ()
	{
		letter = letter.replace(/#COMPANY/g, company);
		letter = letter.replace(/#PERSON/g, person);
		letter = letter.replace(/#ADDRESS/g, address);
		letter = letter.replace(/#DATE/g, date);
		letter = letter.replace(/#POST_CODE/g, post_code);
		console.log(letter);
	}

}]);



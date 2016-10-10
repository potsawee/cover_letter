var app = angular.module('coverLetterApp', [])
.controller('stringController', ['$scope', function($scope) {

	initial_letter = '';
	$scope.company = '';
	$scope.address = '';
	$scope.hiring_person = '';
	$scope.postcode = '';
	$scope.date = new Date().toDateString();

	$scope.processLetter = function ()
	{
		var textarea = document.getElementById('mainTextarea');

		console.log(textarea.value);

		textarea.value = textarea.value.replace(/COMPANY/g, $scope.company)
			.replace(/HIRING_PERSON/g, $scope.hiring_person)
			.replace(/ADDRESS/g, $scope.address)
			.replace(/DATE/g, $scope.date)
			.replace(/POSTCODE/g, $scope.postcode);
	}
}]);
var contactsController = angular.module('contactsController', []);

contactsController.controller('ContactsController', ['$rootScope', '$scope', '$routeParams', '$location', 'contactsFactory',
    function($rootScope, $scope, $routeParams, $location, contactsFactory) {
	
	$scope.id = $routeParams.id;
	
	$rootScope.title = 'Kontakte';
	$rootScope.submenu = 'contact';
	
	$scope.contacts = contactsFactory.get();
	
	$scope.editContact = function(id) {
		$location.path('/contact/edit/' + id);
	};
	
}]);
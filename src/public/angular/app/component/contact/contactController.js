var contactController = angular.module('contactController', []);

contactController.controller('ContactController', ['$rootScope', '$scope', '$routeParams', '$location', 'contactsFactory', 'contactFactory',
    function($rootScope, $scope, $routeParams, $location, contactsFactory, contactFactory) {
	
	$scope.id = $routeParams.id;
	
	$rootScope.title = 'Kontakte';
	$rootScope.submenu = 'contact';
	
	$scope.contact = {};
	
	if (typeof $scope.id != 'undefined')
		$scope.contact = contactFactory.get({id: $scope.id});

	$scope.saveContact = function(contactForm) {
		
		if (!contactForm.$valid) return;
		
		if (typeof $scope.id != 'undefined') {
			contactFactory.update({ 
				id: $scope.id, 
				name: $scope.contact.name,
				email: $scope.contact.email
			});
		} else {
			contactsFactory.create({
				name: $scope.contact.name,
				email: $scope.contact.email
			});
		}
		
		$location.path('/contact/all');
	};
	
	$scope.deleteContact = function() {
		
		contactFactory.delete({ id: $scope.id });
		$location.path('/contact/all');
	};
	
}]);
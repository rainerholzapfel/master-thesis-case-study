var mailsController = angular.module('mailsController', []);

mailsController.controller('MailsController', ['$rootScope', '$scope', '$routeParams', '$location', 'mailsFactory',
    function($rootScope, $scope, $routeParams, $location, mailsFactory) {
	
	$scope.folder = $routeParams.folder;
	
	$rootScope.title = 'Mails';
	$rootScope.submenu = 'mail';
	
	$scope.mails = mailsFactory.get({folder: $scope.folder});
	
	$scope.updateMails = function() {
		$scope.mails = mailsFactory.get({folder: $scope.folder});
	}
	
	$scope.openMail = function(id) {
		$location.path('/mail/' + $scope.folder + '/' + id);
	}

	if (typeof $rootScope.data[$scope.folder] != 'undefined') {
		$scope.search = $rootScope.data[$scope.folder].search;
		$scope.predicate = $rootScope.data[$scope.folder].predicate;
		$scope.reverse = $rootScope.data[$scope.folder].reverse;
	}
	
	$scope.$on("$destroy", function() {
		if ($scope.folder != 'new') {
			$rootScope.data[$scope.folder] = {};
			$rootScope.data[$scope.folder].search = $scope.search;
			$rootScope.data[$scope.folder].predicate = $scope.predicate;
			$rootScope.data[$scope.folder].reverse = $scope.reverse;
		}
	});
}]);
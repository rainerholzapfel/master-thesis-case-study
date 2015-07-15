var mailController = angular.module('mailController', []);

mailController.controller('MailController', ['$rootScope', '$scope', '$routeParams', '$location', 'mailsFactory', 'mailFactory',
    function($rootScope, $scope, $routeParams, $location, mailsFactory, mailFactory) {
	
	$scope.folder = $routeParams.folder;
	$scope.id = $routeParams.id;
	
	$rootScope.title = 'Mails';
	$rootScope.submenu = 'mail';
	
	if (typeof $scope.folder != 'undefined' && typeof $scope.id != 'undefined')
		$scope.detail = mailFactory.get({folder: $scope.folder, id: $scope.id});
	
	$scope.mail = {};

	$scope.sendMail = function(mailForm) {
		
		if (!mailForm.$valid) return;
		
		$scope.mail.sender = 'rainer@mail.mvc';
		$scope.mail.date = new Date();
		
		if (typeof $scope.detail != 'undefined') {
			$scope.mail.ref = 'RE: ' + $scope.detail.ref;
			$scope.mail.recipient = $scope.detail.sender;
		}
		
		mailsFactory.create({ 
			folder: 'out', 
		    ref: $scope.mail.ref, 
			body: $scope.mail.body, 
			date: $scope.mail.date, 
			sender: $scope.mail.sender, 
			recipient: $scope.mail.recipient
		});
		$location.path('/mail/out');
	}

}]);
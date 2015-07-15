var mailMVC = angular.module('mailMVC', [
	'ngResource',
    'ngRoute',
    'contactController',
    'contactsController',
    'mailController',
    'mailsController',
    'backendService'
]);

mailMVC.config(['$routeProvider',
    function($routeProvider) {
	
    $routeProvider.
        when('/contact/add', { // +1 line
            templateUrl: 'app/component/contact/contact.html',
            controller: 'ContactController'
        }).
        when('/contact/edit/:id', {
            templateUrl: 'app/component/contact/contact.html',
            controller: 'ContactController'
        }).
        when('/contact/all', {
            templateUrl: 'app/component/contacts/contacts.html',
            controller: 'ContactsController'
        }).
        when('/mail/:folder/:id', {
            templateUrl: 'app/component/mail/mail.html',
            controller: 'MailController'
        }).
        when('/mail/new', {
            templateUrl: 'app/component/mail/mail.html',
            controller: 'MailController'
        }).
        when('/mail/:folder', {
            templateUrl: 'app/component/mails/mails.html',
            controller: 'MailsController'
        }).
        otherwise({
            redirectTo: '/mail/in' 
        });
}]);

mailMVC.run(['$rootScope',
    function($rootScope) {
	
	$rootScope.data = [];
	
}])
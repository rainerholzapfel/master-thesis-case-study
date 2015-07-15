var backendService = angular.module('backendService', ['ngResource']);

backendService.factory('mailsFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/server/mails/:folder',
    	{ folder: '@folder' }, {
        'get':    { method: 'GET', isArray: true },
        'create': { method: 'POST' }
    })
}]);

backendService.factory('mailFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/server/mail/:folder/:id', 
    	{ folder: '@folder', id: '@id' }, {
        'get':    { method: 'GET' },
        'delete': { method: 'DELETE' }
    })
}]);

backendService.factory('contactsFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/server/contacts', {}, {
        'get': { method: 'GET', isArray: true }
    })
}]); // +1 line

backendService.factory('contactCreateFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/server/contact', {}, {
    	'create': { method: 'POST' }
    })
}]); // +5 lines

backendService.factory('contactFactory', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/server/contact/:id', 
    	{ id: '@id' }, {
        'get':    { method: 'GET' },
        'update': { method: 'PUT' },
        'delete': { method: 'DELETE' }
    })
}]);


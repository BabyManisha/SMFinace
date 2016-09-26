myApp.factory('Api', ['$resource', function($resource){
    return {
        Action: $resource('/api/action/:id', {id: '@id'})
    }
}])
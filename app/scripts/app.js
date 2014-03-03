'use strict';

angular.module('shoppingListApp', [
    'ui.router',
    'firebase'
]).config (function ($stateProvider, ShoppingListConstantes) {

    // Login
    $stateProvider.state (ShoppingListConstantes.states.LOGIN, {
        url : '',
        views: {
            main: {
                templateUrl: 'views/login.html'
            }
        }
    });
});

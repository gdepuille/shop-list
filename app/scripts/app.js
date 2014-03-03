'use strict';

angular.module('shoppingListApp', [
    'ui.router',
    'firebase'
]).config (function ($stateProvider, $urlRouterProvider, ShoppingListConstantes) {

    // Quand aucune page ne correspond on redirige sur l'index (page de login)
    $urlRouterProvider.otherwise(ShoppingListConstantes.urls.LOGIN);

    // Login
    $stateProvider.state (ShoppingListConstantes.states.LOGIN, {
        url : ShoppingListConstantes.urls.LOGIN,
        views : {
            main : {
                templateUrl : 'views/login.html'
            }
        }
    }).state(ShoppingListConstantes.states.MAIN, {
        url : ShoppingListConstantes.urls.MAIN,
        views : {
            main : {
                templateUrl : 'views/main.html'
            }
        }
    });
});

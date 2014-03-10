'use strict';

angular.module('shoppingListApp').constant('ShoppingListConstantes', {
    states : {
        LOGIN : 'login',
        MAIN : 'main'
    },
    urls : {
        LOGIN : '/',
        MAIN : '/content'
    },
    events : {
        USER_LOADED : 'UsersModel_USER_LOADED',
        USER_UNLOADED : 'UsersModel_USER_UNLOADED'
    },
    firebase : {
        ROOT : 'https://listecourses.firebaseio.com/'
    }

});

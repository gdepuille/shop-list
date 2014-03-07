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
        USER_LOADED : 'UsersModel_USER_LOADED'
    },
    firebase : {
        ROOT : 'https://listecourses.firebaseio.com/'
    }

});

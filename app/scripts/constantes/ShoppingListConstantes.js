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

    },
    firebase : {
        ROOT : 'https://listecourses.firebaseio.com/'
    }

});

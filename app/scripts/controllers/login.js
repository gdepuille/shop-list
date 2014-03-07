'use strict';

angular.module ('shoppingListApp').controller ('LoginCtrl', function ($scope, UsersCommand) {

    // ------------------------------------------------ //
    // -------------------- SCOPE --------------------- //
    // ------------------------------------------------ //

    /**
     * Google login
     */
    $scope.loginGoogle = function () {
        UsersCommand.login('google', {
            rememberMe: true,
            scope: 'https://www.googleapis.com/auth/plus.login'
        });
    };

    /**
     * Facebook login
     */
    $scope.loginFacebook = function () {
        UsersCommand.login('facebook', {
            rememberMe: true,
            scope: 'email,user_about_me'
        });
    };

    /**
     * Twitter login
     */
    $scope.loginTwitter = function () {
        UsersCommand.login('twitter', {
            rememberMe: true
        });
    };
});

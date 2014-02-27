'use strict';

angular.module('shoppingListApp')
    .controller('MainCtrl', function ($scope) {
        $scope.user = {
            firstName: "God",
            lastName: "Michel",
            username: "god.michel@ste.fr"
        };
    }
);

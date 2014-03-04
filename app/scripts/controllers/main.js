'use strict';

angular.module('shoppingListApp')
    .controller('MainCtrl', function ($scope) {
        $scope.user = {
            id: '12345',
            firstName: "God",
            lastName: "Michel",
            username: "god.michel@ste.fr",
            provider: 'twitter',
            premium: false,
            dateCreation: '2014-03-03T22:34:00Z',
            lastConnection : '2014-03-03T22:42:00Z',
            lists: [12, 43, 45]
        };

        $scope.lists = [{
            id: 1,
            name: 'Achat pour Haloween',
            ownerId: 12345,
            icon: 'base64 : wxccddsfsbb==',
            items: [{
                id: 34566,
                name: 'Beurre',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 1,
                checked: false
            }, {
                id: 123,
                name: 'Carambar',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 3,
                checked: false
            }]
        }, {
            id: 2,
            name: 'Achat pour Noël',
            ownerId: 12345,
            icon: 'base64 : wxccddsfsbb==',
            items: [{
                id: 12,
                name: 'Foie gras',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 1,
                checked: false
            }, {
                id: 345,
                name: 'Champagne',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 3,
                checked: false
            }]
        }];

        $scope.selectedList = {
            id: 2,
            name: 'Achat pour Noël',
            ownerId: 12345,
            icon: 'base64 : wxccddsfsbb==',
            items: [{
                id: 12,
                name: 'Foie gras',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 1,
                checked: false
            }, {
                id: 345,
                name: 'Champagne',
                icon: 'base64 : dgdfhfhdfgdhdghdghd==',
                qte: 3,
                checked: false
            }]
        };
    }
);

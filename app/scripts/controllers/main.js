'use strict';

angular.module('shoppingListApp')
    .controller('MainCtrl', function ($rootScope, $scope, $log, ListsCommand, ListsModel, UsersModel) {

        // START MOCK

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

        // END MOCK

        // ---------------------------------------------------------------- //
        // ------------------------------ SCOPE --------------------------- //
        // ---------------------------------------------------------------- //

        /* Information sur l'utilisateur connecté */
        $scope.user = UsersModel.getUser();

        // Appel du logout
        $scope.logout = function () {
            UsersCommand.logout();
        };

        $scope.addList = function () {
            ListsCommand.createList();
        };

        // ---------------------------------------------------------------- //
        // ------------------------- PRIVATE BUSINESS --------------------- //
        // ---------------------------------------------------------------- //

        /* Méthode d'initialisation du controller */
        var initialise = function() {
            // Redirection sur la page de login si l'utilisateur n'est pas authentifié
            if ($scope.user == undefined) {
                $log.debug('Pas encore authentifié, on va sur la page de login')

                // Dispatch de l'event firebase afin de ne pas recoder ce qui est déjà fait dans le UsersObserver
                $rootScope.$broadcast('$firebaseSimpleLogin:logout');
            }
        };

        // ---------------------------------------------------------------- //
        // ---------------------------- INITIALIZE ------------------------ //
        // ---------------------------------------------------------------- //

        initialise();
    }
);

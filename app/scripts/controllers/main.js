'use strict';

angular.module('shoppingListApp')
    .controller('MainCtrl', function ($rootScope, $scope, $log, ShoppingListConstantes, ListsCommand, ListsModel, UsersModel) {

        // ---------------------------------------------------------------- //
        // ------------------------------ SCOPE --------------------------- //
        // ---------------------------------------------------------------- //

        /* Information sur l'utilisateur connecté */

        $scope.user = UsersModel.getUser();

        /* Ensemble des listes de la base de données */
        $scope.lists = ListsModel.getListsFirebaseNode();

        /* Liste en cours et selectionné */
        $scope.selectedList = undefined;

        // Appel du logout
        $scope.logout = function () {
            UsersCommand.logout();
        };

        // Ajout d'une nouvelle liste.
        $scope.addList = function () {
            ListsCommand.createList();
        };

        $scope.selectList = function(listId) {
            $scope.selectedList = ListsModel.getListsFirebaseNode().$child(listId);
        }

        // ---------------------------------------------------------------- //
        // -------------------------- EVENT HANDLERS ---------------------- //
        // ---------------------------------------------------------------- //

        $rootScope.$on(ShoppingListConstantes.events.NEW_LIST_ADDED, function(event, listId) {
            $scope.selectList(listId);
        });

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

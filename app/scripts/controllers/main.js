'use strict';

angular.module('shoppingListApp')
    .controller('MainCtrl', function ($rootScope, $scope, $log, ListsCommand, ListsModel, UsersModel) {

        $scope.lists = ListsModel.getListsFirebaseNode();

        $scope.selectedList = null;

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

        $scope.selectList = function(list) {
            $scope.selectedList = ListsModel.getListsFirebaseNode().$child(list.$id);
        }

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

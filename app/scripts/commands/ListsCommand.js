'use strict';

angular.module('shoppingListApp')
    .service('ListsCommand', function ($log, $rootScope, $firebase, ShoppingListConstantes, ListsModel, UsersModel, ErrorCommand) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _listsNode = ListsModel.getListsFirebaseNode();

        // ------------------------------------------------ //
        // -------------- PUBLIC BUSINESS ----------------- //
        // ------------------------------------------------ //

        /**
         * Create e new list
         */
        this.createList = function () {
            $log.debug('ListsCommand : create a list');

            var newList = {
                name : 'Nouvelle liste',
                ownerUid : UsersModel.getUser().$id,
            };

            _listsNode.$add(newList).then(
                function (list) {
                    $log.debug('Ajout de la nouvelle liste : ' + list.name());

                    // Ajout d'un premier item exemple.
                    var firstItem = {
                        name: 'Article',
                        qte: 1,
                        checked: false
                    };

                    _listsNode.$child(list.name()).$child(ShoppingListConstantes.firebase.ITEMS).$add(firstItem).then(
                        function (item) {
                            $log.debug ('Ajout du premier item dans la nouvelle liste : ' + item.name());

                            // Dispatch notif
                            $rootScope.$broadcast(ShoppingListConstantes.events.NEW_LIST_ADDED, list.name());
                        }
                    );
                }
            );

        }

        // ------------------------------------------------ //
        // -------------- PRIVATE BUSINESS ---------------- //
        // ------------------------------------------------ //


    });
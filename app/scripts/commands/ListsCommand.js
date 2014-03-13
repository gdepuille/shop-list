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

        this.createList = function () {
            $log.debug('ListsCommand : create a list');

            var newList = {
                name : 'Nouvelle liste',
                ownerUid : UsersModel.getUser().uid
            };

            _listsNode.$add(newList).then(
                function (list) {
                    $log.debub('test new list :' + list);
                }
            );

        }

        // ------------------------------------------------ //
        // -------------- PRIVATE BUSINESS ---------------- //
        // ------------------------------------------------ //


    });
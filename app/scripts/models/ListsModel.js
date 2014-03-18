'use strict';

angular.module ('shoppingListApp').service ('ListsModel',
    function ($rootScope, GlobalModel, ShoppingListConstantes) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _listsFirebaseNode = GlobalModel.getRootFirebaseNode().$child(ShoppingListConstantes.firebase.LISTS);

        // ------------------------------------------------ //
        // ------------------- ACCESSORS ------------------ //
        // ------------------------------------------------ //

        /**
         * Get the lists firebase node
         * @returns {*}
         */
        this.getListsFirebaseNode = function () {
            return _listsFirebaseNode;
        }

    });
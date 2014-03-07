'use strict';

angular.module ('shoppingListApp').service ('GlobalModel',
    function ($rootScope, ShoppingListConstantes, $firebase) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _rootFirebaseNode = $firebase (new Firebase(ShoppingListConstantes.firebase.ROOT));

        // ------------------------------------------------ //
        // ------------------- ACCESSORS ------------------ //
        // ------------------------------------------------ //

        /**
         * Get the root firebase node
         * @returns {*}
         */
        this.getRootFirebaseNode = function () {
            return _rootFirebaseNode;
        }

    });
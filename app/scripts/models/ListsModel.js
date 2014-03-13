'use strict';

angular.module ('shoppingListApp').service ('ListsModel',
    function ($rootScope, GlobalModel) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _lists;

        var _listsFirebaseNode = GlobalModel.getRootFirebaseNode().$child('lists');

        // ------------------------------------------------ //
        // ------------------- ACCESSORS ------------------ //
        // ------------------------------------------------ //

        /**
         * Get the lists
         * @returns {*}
         */
        this.getLists = function () {
            return _lists;
        }

        /**
         * Set the user
         * @param value
         */
        this.setLists = function (value) {
            _lists = value;
        }

        /**
         * Get the lists firebase node
         * @returns {*}
         */
        this.getListsFirebaseNode = function () {
            return _listsFirebaseNode;
        }

    });
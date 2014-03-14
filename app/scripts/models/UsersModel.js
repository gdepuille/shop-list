'use strict';

angular.module ('shoppingListApp').service ('UsersModel',
    function ($rootScope, ShoppingListConstantes, $firebase, GlobalModel) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _user;

        var _usersFirebaseNode = GlobalModel.getRootFirebaseNode().$child(ShoppingListConstantes.firebase.USERS);

        // ------------------------------------------------ //
        // ------------------- ACCESSORS ------------------ //
        // ------------------------------------------------ //

        /**
         * Get the user
         * @returns {*}
         */
        this.getUser = function () {
            return _user;
        }

        /**
         * Set the user
         * @param value
         */
        this.setUser = function (value) {
            _user = value;
            if (angular.isDefined(_user)) {
                $rootScope.$broadcast (ShoppingListConstantes.events.USER_LOADED, _user);
            } else {
                $rootScope.$broadcast (ShoppingListConstantes.events.USER_UNLOADED);
            }
        }

        /**
         * Get the user firebase node
         * @returns {*}
         */
        this.getUsersFirebaseNode = function () {
            return _usersFirebaseNode;
        }

    });
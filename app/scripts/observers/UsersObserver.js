/**************************************************************************************************
 * Copyright (c) Nicolas Hodicq (nicolas.hodicq@gmail.com).                                       *
 **************************************************************************************************/

'use strict';

angular.module ('shoppingListApp')
    .service ('UsersObserver', function ($rootScope, UsersModel, UsersCommand, $log) {

    // ------------------------------------------------ //
    // --------------- PRIVATE FIELDS ----------------- //
    // ------------------------------------------------ //

    var _usersNode = UsersModel.getUsersFirebaseNode();

    var authenticatedUserRef;

    // ------------------------------------------------ //
    // ------------------ LISTENERS ------------------- //
    // ------------------------------------------------ //

    $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
        authenticatedUserRef = _usersNode.$child(user.uid);
        authenticatedUserRef.$on('loaded', function (value) {
            if (value === null) {
                UsersCommand.createUserDataBase(user);
            } else {
                // Set the user to model
                UsersModel.setUser(value);
            }

            // stop the synchronization for loaded
            authenticatedUserRef.$off('loaded');
        });
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function (e, user) {
        authenticatedUserRef = undefined;
        UsersModel.setUser(undefined);
    });

    // ------------------------------------------------ //
    // -------------------- INITALIZE ----------------- //
    // ------------------------------------------------ //

    /**
     * Initilalize the observer
     */
    this.initialize = function () {
        $log.debug('UsersObserver initialized');
    }

});

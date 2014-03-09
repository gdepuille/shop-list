'use strict';

angular.module ('shoppingListApp')
    .service ('UsersObserver', function ($rootScope, UsersModel, UsersCommand, $log, $state, ShoppingListConstantes) {

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
            if (angular.isUndefined(value)) {
                UsersCommand.createUserDataBase(user);
            } else {
                UsersCommand.updateUserDataBase(user);
            }

            // stop the synchronization for loaded
            authenticatedUserRef.$off('loaded');
        });

        // GO to the app
        $state.go(ShoppingListConstantes.states.MAIN);

    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function (e, user) {
        authenticatedUserRef = undefined;
        UsersModel.setUser(undefined);

        // GO to the login pages
        $state.go(ShoppingListConstantes.states.LOGIN);
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

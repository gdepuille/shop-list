'use strict';

angular.module ('shoppingListApp')
    .service ('UsersObserver', function ($rootScope, UsersModel, UsersCommand, $log, $state, ShoppingListConstantes) {

    // ------------------------------------------------ //
    // --------------- PRIVATE FIELDS ----------------- //
    // ------------------------------------------------ //

    var _usersNode = UsersModel.getUsersFirebaseNode();

    var _authenticatedUserRef;

    // ------------------------------------------------ //
    // ------------------ LISTENERS ------------------- //
    // ------------------------------------------------ //

    $rootScope.$on('$firebaseSimpleLogin:login', function (e, user) {
        _authenticatedUserRef = _usersNode.$child(user.uid);
        _authenticatedUserRef.$on('loaded', function (value) {
            if (value == null || angular.isUndefined(value)) {
                UsersCommand.createUserDataBase(user);
            } else {
                UsersCommand.updateUserDataBase(user);
            }

            // stop the synchronization for loaded
            _authenticatedUserRef.$off('loaded');
        });
    });

    $rootScope.$on('$firebaseSimpleLogin:logout', function (e, user) {
        _authenticatedUserRef = undefined;
        UsersModel.setUser(_authenticatedUserRef);
    });

    /* Une fois le compte utilisateur chargé on va sur l'application */
    $rootScope.$on(ShoppingListConstantes.events.USER_LOADED, function(user) {
        // GO to the app
        $state.go(ShoppingListConstantes.states.MAIN);
    });

    /* Lors du reset de l'utilisateur dans le model, on va sur le login */
    $rootScope.$on(ShoppingListConstantes.events.USER_UNLOADED, function() {
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

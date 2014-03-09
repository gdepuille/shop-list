'use strict';

angular.module('shoppingListApp')
    .service('UsersCommand', function ($log, $rootScope, $firebase, ShoppingListConstantes, GlobalModel, $firebaseSimpleLogin, UsersModel, ErrorCommand) {

        // ------------------------------------------------ //
        // --------------- PRIVATE FIELDS ----------------- //
        // ------------------------------------------------ //

        var _loginObj = $firebaseSimpleLogin(new Firebase(ShoppingListConstantes.firebase.ROOT));

        var _usersNode = UsersModel.getUsersFirebaseNode();

        // ------------------------------------------------ //
        // -------------- PUBLIC BUSINESS ----------------- //
        // ------------------------------------------------ //

        /**
         * Create user in data base with the authenticated user
         * @param authenticatedUser
         */
        this.createUserDataBase = function (authenticatedUser) {
            if(angular.isDefined(authenticatedUser)){
                // User does not exist so we 'll create it from authenticated user
                var userTocreate = {};

                switch (authenticatedUser.provider) {
                    case 'facebook' :
                        userTocreate.firstName = authenticatedUser.first_name;
                        userTocreate.lastName = authenticatedUser.last_name;
                        userTocreate.username = authenticatedUser.username;
                        break;
                    case 'google' :
                        userTocreate.firstName = authenticatedUser.thirdPartyUserData.given_name;
                        userTocreate.lastName = authenticatedUser.thirdPartyUserData.family_name;
                        userTocreate.username = authenticatedUser.email;
                        break;
                    case 'twitter' :
                        userTocreate.firstName = authenticatedUser.displayName;
                        userTocreate.lastName = '';
                        userTocreate.username = authenticatedUser.username;
                        break;
                }

                // ADD the user in BDD
                _usersNode[authenticatedUser.uid] = userTocreate;
                _usersNode.$save(authenticatedUser.uid).then(
                    function () {
                        UsersModel.setUser(userTocreate);
                    }, errorCallback);
            }
        }

        /**
         * Update the user data base with the authenticated user
         * @param authenticatedUser
         */
        this.updateUserDataBase = function (authenticatedUser) {
            if(angular.isDefined(authenticatedUser)){

                var user = _usersNode.$child(authenticatedUser.uid);
                $log.info(user);

            }
        }

        /**
         * Login
         * @param provider
         * @param options
         */
        this.login = function (provider, options) {

            if (angular.isString(provider) && angular.isDefined(options) && angular.isObject(options)) {
                _loginObj.$login(provider, options).then(null, errorCallback);
            }
        }

        /**
         * Logout
         */
        this.logout = function () {
            _loginObj.$logout();
        }

        /**
         * Is the user is authenticated
         * @returns {boolean}
         */
        this.isUserAuthenticated = function () {
            var result = false;
            var connectedRef = GlobalModel.getRootFirebaseNode().$child('/.info/connected');
            connectedRef.on("value", function (snap) {
                if (snap.val() === true) {
                    result = true;
                }
            });

            return result;
        }

        // ------------------------------------------------ //
        // -------------- PRIVATE BUSINESS ---------------- //
        // ------------------------------------------------ //

        /**
         * Error Callback
         * @param error
         */
        var errorCallback = ErrorCommand.notifyFirebaseError;
    });
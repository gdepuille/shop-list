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
                retrieveUserInfosFromProvider(authenticatedUser, {});
                $log.debug("Ajout d'un nouvel utilisateur : " + authenticatedUser.uid);
            }
        }

        /**
         * Update the user data base with the authenticated user
         * @param authenticatedUser
         */
        this.updateUserDataBase = function (authenticatedUser) {
            if(angular.isDefined(authenticatedUser)) {
                // User is already added. Update the datas from authentication values
                retrieveUserInfosFromProvider(authenticatedUser, _usersNode.$child(authenticatedUser.uid));
                $log.debug("Modification des informations de l'utilisateur : " + authenticatedUser.uid);
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

        /**
         * Récupération des informations de l'utilisateur depuis les infos du provider
         */
        var retrieveUserInfosFromProvider = function(authenticatedUser, initUser) {
            switch (authenticatedUser.provider) {
                case 'facebook' :
                    initUser.firstName = authenticatedUser.first_name;
                    initUser.lastName = authenticatedUser.last_name;
                    initUser.username = authenticatedUser.username;
                    break;
                case 'google' :
                    initUser.firstName = authenticatedUser.thirdPartyUserData.given_name;
                    initUser.lastName = authenticatedUser.thirdPartyUserData.family_name;
                    initUser.username = authenticatedUser.email;
                    break;
                case 'twitter' :
                    initUser.firstName = authenticatedUser.displayName;
                    initUser.lastName = '';
                    initUser.username = authenticatedUser.username;
                    break;
            }

            // ADD the user in BDD
            _usersNode[authenticatedUser.uid] = initUser;
            _usersNode.$save(authenticatedUser.uid).then(
                function () {
                    UsersModel.setUser(initUser);
                }, errorCallback);

            return initUser;
        };
    });
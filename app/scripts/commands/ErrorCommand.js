'use strict';

angular.module ('shoppingListApp').service ('ErrorCommand', function ($log) {

    // ------------------------------------------------ //
    // --------------- PRIVATE FIELDS ----------------- //
    // ------------------------------------------------ //

    // ------------------------------------------------ //
    // -------------- PUBLIC BUSINESS ----------------- //
    // ------------------------------------------------ //

    /**
     * Notify a firebase error
     * @param error
     */
    this.notifyFirebaseError = function (error) {
        $log.error (error.message);
    };
});
(function () {
    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$stateParams', 'UserServices', 'toaster', '$sce', '$state', 'FORM_VALIDATION_REGEX','$window'];

    function LoginCtrl($scope, $stateParams, UserServices, toaster, $sce, $state, FORM_VALIDATION_REGEX,$window) {
        $scope.Email = undefined;
        $scope.Password = undefined;
        $scope.EMAIL_PATTERN = FORM_VALIDATION_REGEX.EMAIL;
        $scope.LogIn = function () {
            UserServices.LogIn($scope.Email, $scope.Password)
                .then(function (success) {
                    /* toaster.pop({
                        type: 'success',
                        title: 'Logged In',
                        body: success
                    }); */
                    $state.go('app.main');
                }).catch(function (error) {
                    toaster.pop({
                        type: 'error',
                        title: '',
                        body: error
                    });
                });
        };

        $scope.gSignIn = function () {
            $window.location = $window.location.protocol + "//" + $window.location.host + $window.location.pathname + "user/google/LogIn";
        };
    }
}());
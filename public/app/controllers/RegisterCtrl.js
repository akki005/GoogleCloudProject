(function () {
    angular
        .module('app')
        .controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$scope', '$stateParams', 'UserServices', 'toaster', '$sce']

    function RegisterCtrl($scope, $stateParams, UserServices, toaster, $sce) {
        $scope.Email = undefined;
        $scope.Password = undefined;
        $scope.Repeat_Password = undefined;
        $scope.Email_Regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        $scope.Password_Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@]).{8,}$/;
        $scope.Registered = false;
        /*  $scope.password_tip = $sce.trustAsHtml("<span>Password must contain One Uppercase, One Lowercase latter, One digit,<br> One special character(_,@) and at least 8 char long</span>"); */
        $scope.password_tip = '<ul style="list-style-type:none" class="password-tip-list">' +
            "<li>One Uppercase</li>" +
            "<li>One Lowercase</li>" +
            "<li>One Digit</li>" +
            "<li>One Special character( _ , @)</li>" +
            '<li>At least 8 char long</li></ul>';
        $scope.Register = function () {
            UserServices.Register($scope.Email, $scope.Password)
                .then(function (success) {
                    $scope.Registered = true;
                    $scope.registered_msg = success;
                }).catch(function (error) {
                    for (var obj in error) {
                        toaster.pop({
                            type: 'error',
                            title: obj,
                            body: error[obj]
                        });
                    }
                });
        };
    }
}());
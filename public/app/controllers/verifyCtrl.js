(function () {
    angular
        .module('app')
        .controller('VerifyCtrl', VerifyCtrl);

    VerifyCtrl.$inject = ['$scope', '$stateParams', 'UserServices']

    function VerifyCtrl($scope, $stateParams, UserServices) {
        var key = $stateParams.key;
        $scope.done=false;
        if (key) {
            $scope.message="Please wait. We are verifying your account......";        
            UserServices.VerifyEmail(key)
                .then(function (msg) {
                    $scope.message=msg;
                    $scope.done=true;
                    $scope.success=true;
        
                    //alert("verified");
                })
                .catch(function (err) {
                    //console.log(err);
                    //alert(err);
                    $scope.message=err;
                    $scope.success=false;
                    $scope.done=true;
                    
                });
        }
    }
}());
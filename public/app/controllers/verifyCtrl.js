(function () {
    angular
        .module('app')
        .controller('VerifyCtrl', VerifyCtrl);

    VerifyCtrl.$inject = ['$scope', '$stateParams', 'UserServices']

    function VerifyCtrl($scope, $stateParams, UserServices) {
        var key = $stateParams.key;
        console.log(key);
        alert(key);
        if (key) {
            UserServices.VerifyEmail(key)
                .then(function (msg) {
                    alert("verified");
                })
                .catch(function (err) {
                    console.log(err);
                    alert(err);
                });
        }
    }
}());
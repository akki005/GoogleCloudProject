// controller.js
angular
    .module('app')
    .controller('VerifyCtrl', VerifyCtrl);

VerifyCtrl.$inject = ['$routeParams', 'UserServices'];

function VerifyCtrl($routeParams, UserServices) {
    var key = $routeParams.key;
    console.log(key);
    alert(key);
    if (key) {
        UserServices.VerifyEmail(key)
            .then(function (msg) {
                alert("verified");
            })
            .catch(function (err) {
                console.log(err);
                alert("Error occured");
            })
    }
}
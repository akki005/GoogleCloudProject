angular
    .module('app')
    .factory('UserServices', UserServices);

UserServices.$inject = ['$http', '$q'];

function UserServices($http, $q) {
    return {
        VerifyEmail: VerifyEmail,
        Register: Register
    }

    function Register(email, password) {
        return $http({
                method: 'POST',
                url: '/user/Register',
                data: {
                    password: password,
                    email: email
                }
            })
            .then(function (success) {
                return success.data.msg;
            })
            .catch(function (err) {
                return $q.reject(err.data.msg);
            })
    }


    function VerifyEmail(token) {
        return $http({
                method: 'POST',
                url: '/user/verification',
                data: {
                    token: token
                }
            })
            .then(function (success) {
                return success.data.msg;
            })
            .catch(function (err) {
                return $q.reject(err.data.msg);
            })
    }
}
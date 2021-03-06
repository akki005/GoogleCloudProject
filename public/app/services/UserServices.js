angular
    .module('app')
    .factory('UserServices', UserServices);

UserServices.$inject = ['$http', '$q', '$window'];

function UserServices($http, $q, $window) {
    return {
        getProfile: getProfile,
        Authenticate: Authenticate,
        VerifyEmail: VerifyEmail,
        Register: Register,
        LogIn: LogIn,
        LogOut: LogOut,
        gSignIn: gSignIn
    }


    function getProfile() {
        return $http({
                method: 'GET',
                url: '/userdata/profile'
            })
            .then(function (success) {
                return success.data;
            })
            .catch(function (err) {
                return $q.reject(err);
            });
    }

    function gSignIn() {
        return $http({
                method: 'GET',
                url: '/user/google/LogIn'
            })
            .then(function (success) {
                return success.data.msg;
            })
            .catch(function (err) {
                return $q.reject(err);
            });
    }

    function LogOut() {
        return $http({
                method: 'POST',
                url: '/user/LogOut'
            })
            .then(function (success) {
                return success.data.msg;
            })
            .catch(function (err) {
                return $q.reject(err);
            });
    }


    function Authenticate() {
        return $http({
                method: 'GET',
                url: '/user/Authenticate'
            })
            .then(function (success) {
                return;
            })
            .catch(function (err) {
                return $q.reject("Not logged in");
            });
    }

    function LogIn(email, password) {
        return $http({
                method: 'POST',
                url: '/user/Login',
                data: {
                    password: password,
                    email: email
                }
            })
            .then(function (success) {
                console.log(success);
                return success.data.msg;
            })
            .catch(function (err) {
                console.log(err);
                return $q.reject(err.data.msg);
            })
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
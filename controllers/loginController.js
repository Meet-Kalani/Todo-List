app.controller('loginController', ($scope, $http, $location, $rootScope) => {
    $scope.data = {};
    // Removing Access Token from localStorage to set new Token after Login
    window.localStorage.clear();

    // Removing userName to set new userName after Login
    $rootScope.userName = "";

    // Submitting Data to Login Route Handler
    $scope.submit = function () {
        $http({
            url: '/user/login',
            method: 'POST',
            data: $scope.data,
        }).then((response) => {

            // Checking if User has Logged in or not
            if (response.data.success) {
                $scope.show = !response.data.success;
                window.localStorage.setItem('token', `${response.data.token}`);
                $location.path('/todo');
            } else {
                alert('Invalid Credentials! Please try again');
                $scope.data = {};
                $location.path('/login');
            }
        })
    }
})
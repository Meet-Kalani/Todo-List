app.controller('contactController', ($scope, $http,$location) => {
    $scope.data = {};

    // Checking for Request header if User have Authorization to add new Todo
    if (window.localStorage.getItem('token') == undefined) {
        $location.path("/");
        return;
    } else {
        // Submitting Data to Contact Route Handler
        $scope.submit = () => {
            $http({
                url: '/user/contact',
                method: 'POST',
                data:$scope.data,
                headers: {
                    'authorization': window.localStorage.getItem('token'),
                    'If-Modified-Since': '0',
                    "Pragma": "no-cache",
                    "Expires": -1,
                    "Cache-Control": "no-cache, no-store, must-revalidate"
                }
            })
            $location.path("/todo");
        }
    }    
})
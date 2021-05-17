app.controller('contactController', ($scope, $http,$location) => {
    $scope.data = {};

    if (window.localStorage.getItem('token') == undefined) {
        $location.path("/login");
        return;
    } else {
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
app.controller('accordionBtnController', ($scope, $http, $location, $route, $rootScope) => {
    
    $scope.update = (data) => {
        $rootScope.todoID = data._id;

        $http({
            url: `/todo/u/${$rootScope.userID}/${$rootScope.todoID}`,
            method: "GET",
            headers: {
                'authorization': window.localStorage.getItem('token'),
                'If-Modified-Since': '0',
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache, no-store, must-revalidate"
            }
        }).then((response) => {
            $rootScope.data = response.data;
            $location.path('/todo/u')
        }, (error) => {
            console.log(error);
        });
    }

    $scope.delete = (data) => {
        $http({
            url: "/todo/d/" + data._id,
            method: "delete",
            headers: {
                'authorization': window.localStorage.getItem('token'),
                'If-Modified-Since': '0',
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache, no-store, must-revalidate"
            }
        }).then((response) => {
            $route.reload();
        })
    }
})
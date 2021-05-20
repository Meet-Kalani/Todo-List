app.controller('accordionBtnController', ($scope, $http, $location, $route, $rootScope) => {
    
    // Function for Requesting Update in To-Do
    $scope.update = (data) => {
        // Setting ID in $rootScope for using it in updateTodoController for actually updating data
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
            // Setting data in $rootScope for using it in updateTodoController
            $rootScope.data = response.data;
            $location.path('/todo/u')
        }, (error) => {
            console.log(error);
        });
    }

    // Function for Requesting Delete in To-Do
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
            // Refreshing view to reflect data
            $route.reload();
        })
    }
})
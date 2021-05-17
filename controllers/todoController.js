app.controller('todoController', ($scope, $http, $rootScope, $route,$location) => {
    $scope.data = {};
    $scope.toDo = [];
    $scope.doing = [];
    $scope.done = [];
    $scope.userID;

    if(window.localStorage.getItem('token') == undefined){
        $location.path('/login');
    } else {
        $http({
            url: '/todo/',
            method: 'GET',
            headers: {
                'authorization': window.localStorage.getItem('token'),
                'If-Modified-Since': '0',
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache, no-store, must-revalidate"
            }
        }).then((response) => {
            $scope.data = response.data;
            $rootScope.userName = response.data.userName;
            $rootScope.userID = response.data._id;
    
            for (let i = 0; i < $scope.data.todo.length; i++) {
                if ($scope.data.todo[i].position == "To Do") {
                    $scope.toDo.push($scope.data.todo[i]);
                } else if ($scope.data.todo[i].position == "Doing") {
                    $scope.doing.push($scope.data.todo[i]);
                } else {
                    $scope.done.push($scope.data.todo[i]);
                }
            }
        })
    }

    
})
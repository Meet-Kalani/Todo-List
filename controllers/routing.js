let app = angular.module('todo', ['ngRoute', 'ngAnimate']);
        app.config(($routeProvider) => {
            $routeProvider
                .when('/', {
                    templateUrl: "views/howItWorks.html",
                    cache:false
                })
                .when('/todo', {
                    templateUrl: "views/todo.html",
                    cache:false
                })
                .when('/contact', {
                    templateUrl: 'views/contact.html',
                    cache:false
                })
                .when('/signup', {
                    templateUrl: 'views/signup.html',
                    cache:false
                })
                .when('/login', {
                    templateUrl: 'views/login.html',
                    cache:false
                })
                .when('/addTodo', {
                    templateUrl: 'views/addNewTodo.html',
                    cache:false
                })
                .when('/logout', {
                    templateUrl:'views/login.html',
                    cache:false
                })
                .when('/todo/u',{
                    templateUrl:'views/updateTodo.html',
                    cache:false
                })
                .when('/todo/u', {
                    templateUrl: 'views/updateTodo.html',
                    cache:false
                })
                .otherwise('/');
        })

        app.config(['$qProvider', function ($qProvider) {
            $qProvider.errorOnUnhandledRejections(false);
        }]);
// For ROutes
export function routes($stateProvider) {
    $stateProvider
        .state('Home', {
            url: '/',
            templateUrl: 'src/modules/home/home.html',
            controller: 'navbarController',
            // Login Required
            requireAuth: true,
        })
        .state('Create Article', {
            url: '/create-article',
            templateUrl: 'src/modules/createArticle/createArticle.html',
            controller: 'createArticleController',
            requireAuth: true,
        })
        .state('Profile', {
            url: '/profile',
            templateUrl: 'src/modules/profile/profile.html',
            controller: 'profileController',
            requireAuth: true,
        })
        .state('Signup', {
            url: '/signup',
            templateUrl: 'src/modules/signup/signup.html',
            controller: 'signupController',
            // Only for non-loggedIn Users
            onlyNoAuth: true,
        })
        .state('Signin', {
            url: '/signin',
            templateUrl: 'src/modules/signup/signup.html',
            controller: 'signinController',
            onlyNoAuth: true,
        })
        .state('ArticleDetail', {
            url: '/article-detail/:articleId',
            templateUrl: 'src/modules/articleDetail/articleDetail.html',
            controller: 'articleDetailController',
        })
        .state('404', {
            url: '/404',
            templateUrl: 'src/views/404.html',
        })
        .state('otherwise', {
            url: '*path',
            templateUrl: 'src/views/404.html',
        });
};

export function authRoutes($rootScope, $transitions, $state, Toast, TOAST_CONSTANTS, Auth) {
    Auth.getUser();
    $transitions.onSuccess({}, function($transition) {
        if ($transition.$to().self.requireAuth && !$rootScope.isLoggedIn) {
            Toast.setToast(TOAST_CONSTANTS.INFO, 'Please Login to continue!');
            $state.go('Signin');
        } else if ($transition.$to().self.onlyNoAuth && $rootScope.isLoggedIn) {
            Toast.setToast(TOAST_CONSTANTS.INFO, 'You are Logged In');
            $state.go('Home');
        }
    });
}

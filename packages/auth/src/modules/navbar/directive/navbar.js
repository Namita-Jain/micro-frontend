export default function navbarDirective() {
    return {
        restrict: 'E',
        templateUrl: 'src/modules/navbar/navbar.html',
        replace: true,
        controller: 'navbarController',
    }
};
